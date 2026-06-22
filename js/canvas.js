/* AIGC管理后台 - 画布模块（深色主题 + 节点系统 + 图片生成 + 本地上传） */
var CanvasModule = (function() {

    var canvasSize = '1024×1024';
    var canvasStyle = '写实';
    var genCounter = 0;
    var nodeCounter = 0;

    // ===== 项目列表渲染 =====
    function renderProjectList() {
        var grid = Utils.byId('canvasProjectGrid');
        var html = '';
        html += '<div class="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 hover:bg-blue-50/30 transition cursor-pointer flex flex-col items-center justify-center text-gray-400 hover:text-blue-500" style="min-height:140px" onclick="CanvasModule.showCreateProjectModal()">'
            + '<i class="fa-solid fa-plus-circle text-3xl mb-2"></i>'
            + '<span class="text-sm font-medium">新建项目</span>'
            + '<span class="text-xs mt-1">创建一个新的画布项目</span>'
            + '</div>';
        html += AppData.canvasProjects.map(function(p) {
            return '<div class="border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-blue-300 transition cursor-pointer bg-white"'
                + ' onclick="CanvasModule.enterProject(\'' + p.id + '\',\'' + p.name.replace(/'/g,"\\'") + '\')">'
                + '<div class="flex items-center justify-between mb-2"><span class="text-xs text-blue-600 font-semibold">' + p.id + '</span><span class="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">' + p.type + '</span></div>'
                + '<h4 class="font-semibold text-gray-800 mb-1">' + p.name + '</h4>'
                + '<p class="text-xs text-gray-400 mb-2">' + p.desc + '</p>'
                + '<div class="flex items-center justify-between text-xs text-gray-400"><span><i class="fa-solid fa-film mr-1"></i>' + p.episodes + '</span><span class="text-blue-500"><i class="fa-solid fa-arrow-right mr-1"></i>进入画布</span></div>'
                + '</div>';
        }).join('');
        grid.innerHTML = html;
    }

    // ===== 新建项目 =====
    function showCreateProjectModal() {
        var existing = Utils.byId('modal-create-project');
        if (existing) existing.remove();
        var overlay = document.createElement('div');
        overlay.id = 'modal-create-project';
        overlay.className = 'modal-overlay';
        overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };
        overlay.innerHTML = '<div class="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md" onclick="event.stopPropagation()">'
            + '<div class="flex items-center justify-between mb-5"><h3 class="text-lg font-bold text-gray-800">新建画布项目</h3><button class="text-gray-400 hover:text-gray-600 text-lg" onclick="document.getElementById(\'modal-create-project\').remove()"><i class="fa-solid fa-xmark"></i></button></div>'
            + '<div class="space-y-4">'
            + '<div><label class="text-xs text-gray-500 block mb-1">项目名称 <span class="text-red-400">*</span></label><input id="newProjectName" type="text" placeholder="请输入项目名称" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 outline-none"></div>'
            + '<div><label class="text-xs text-gray-500 block mb-1">项目类型</label><select id="newProjectType" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 outline-none"><option>短剧</option><option>悬疑</option><option>都市</option><option>科幻</option><option>武侠</option><option>奇幻</option><option>生活</option><option>探险</option><option>动漫</option><option>广告</option></select></div>'
            + '<div><label class="text-xs text-gray-500 block mb-1">项目描述</label><textarea id="newProjectDesc" rows="2" placeholder="简要描述项目内容..." class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 outline-none resize-none"></textarea></div>'
            + '<div class="flex space-x-3 pt-2"><button onclick="document.getElementById(\'modal-create-project\').remove()" class="flex-1 border border-gray-300 text-gray-600 py-2 rounded-md text-sm hover:bg-gray-50">取消</button><button onclick="CanvasModule.createProject()" class="flex-1 bg-blue-600 text-white py-2 rounded-md text-sm hover:bg-blue-700 font-medium">创建项目</button></div>'
            + '</div></div>';
        document.body.appendChild(overlay);
    }

    function createProject() {
        var name = (Utils.byId('newProjectName').value || '').trim();
        if (!name) { alert('请输入项目名称'); return; }
        var type = Utils.byId('newProjectType').value;
        var desc = (Utils.byId('newProjectDesc').value || '').trim() || type + '类项目';
        var newProj = { id: '#' + (AppData.nextIdCounter++), name: name, type: type, episodes: '—', desc: desc };
        AppData.canvasProjects.push(newProj);
        Utils.byId('modal-create-project').remove();
        renderProjectList();
    }

    // ===== 进入画布项目 =====
    function enterProject(id, name) {
        Utils.byId('canvasProjectName').textContent = id + ' - ' + name;
        Utils.pageTitle('画布 - ' + name);
        Utils.byId('mainContent').style.display = 'none';
        Utils.byId('workspace-canvas').classList.remove('hidden');
        Utils.qsa('.view-panel').forEach(function(p) { p.classList.remove('active'); });
        Utils.qsa('.nav-item').forEach(function(el) { el.classList.remove('active'); });
        Utils.qsa('.nav-item').forEach(function(el) {
            var span = el.querySelector('span:last-child');
            if (span && span.textContent === '画布') el.classList.add('active');
        });
    }

    // ===== 尺寸与风格 =====
    function setSize(btn, val) {
        Utils.qsa('.size-btn').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        canvasSize = val;
    }
    function setStyle(btn, val) {
        Utils.qsa('.style-btn').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        canvasStyle = val;
    }
    function clearWorkspace() {
        Utils.byId('canvasCardsArea').innerHTML = '';
        Utils.byId('generateHistory').innerHTML = '';
        Utils.byId('canvasEmpty').style.display = '';
        genCounter = 0;
        updateHistoryCount();
    }

    // ===== 添加文本节点 =====
    function addTextNode() {
        nodeCounter++;
        var area = Utils.byId('canvasCardsArea');
        var nodeId = 'node-' + nodeCounter;
        var node = document.createElement('div');
        node.id = nodeId;
        node.className = 'canvas-node text-node';
        node.style.left = (60 + nodeCounter * 30) + 'px';
        node.style.top = (60 + nodeCounter * 30) + 'px';
        node.style.width = '300px';
        node.innerHTML = '<div class="node-header"><span><i class="fa-solid fa-file-lines mr-2"></i>文本节点 #' + nodeCounter + '</span><i class="fa-solid fa-xmark cursor-pointer hover:text-red-400" onclick="document.getElementById(\'' + nodeId + '\').remove()"></i></div>'
            + '<div class="node-body"><textarea onfocus="window._selectedNodeId=\'' + nodeId + '\'" placeholder="输入文本内容..."></textarea></div>'
            + '<div class="node-footer"><span style="color:#888">双击编辑</span><div class="node-actions"><i class="fa-solid fa-copy" title="复制"></i><i class="fa-solid fa-trash-can" title="删除" onclick="document.getElementById(\'' + nodeId + '\').remove()"></i></div></div>';
        area.appendChild(node);
        Utils.byId('canvasEmpty').style.display = 'none';
        makeDraggable(node);
    }

    // ===== 本地上传图片 =====
    function uploadLocalImage() {
        var inp = document.createElement('input');
        inp.type = 'file'; inp.accept = 'image/*'; inp.style.display = 'none';
        inp.onchange = function() {
            var file = inp.files[0];
            if (!file) return;
            var reader = new FileReader();
            reader.onload = function(e) {
                addImageNode(e.target.result, '本地上传', file.name);
            };
            reader.readAsDataURL(file);
        };
        document.body.appendChild(inp);
        inp.click();
        setTimeout(function() { document.body.removeChild(inp); }, 1000);
    }

    function addImageNode(imgUrl, sourceLabel, detail) {
        nodeCounter++;
        var area = Utils.byId('canvasCardsArea');
        var nodeId = 'node-' + nodeCounter;
        var node = document.createElement('div');
        node.id = nodeId;
        node.className = 'canvas-node';
        node.style.left = (80 + nodeCounter * 40) + 'px';
        node.style.top = (80 + nodeCounter * 40) + 'px';
        node.style.width = '260px';
        node.innerHTML = '<div class="node-header"><span><i class="fa-solid fa-image mr-2"></i>' + sourceLabel + ' #' + nodeCounter + '</span><i class="fa-solid fa-xmark cursor-pointer hover:text-red-400" onclick="document.getElementById(\'' + nodeId + '\').remove()"></i></div>'
            + '<div class="node-image" style="height:200px" onclick="CanvasModule.previewImage(\'' + imgUrl + '\')"><img src="' + imgUrl + '" alt="图片"></div>'
            + '<div class="node-footer"><span style="color:#888">' + (detail || '') + '</span><div class="node-actions"><i class="fa-solid fa-magnifying-glass-plus" title="预览" onclick="CanvasModule.previewImage(\'' + imgUrl + '\')"></i><i class="fa-solid fa-download" title="下载" onclick="CanvasModule.downloadImg(\'' + imgUrl + '\')"></i><i class="fa-solid fa-trash-can" title="删除" onclick="document.getElementById(\'' + nodeId + '\').remove()"></i></div></div>';
        area.appendChild(node);
        Utils.byId('canvasEmpty').style.display = 'none';
        makeDraggable(node);
    }

    // ===== 图片生成 =====
    function generateImage() {
        var positive = Utils.byId('promptPositive').value.trim();
        if (!positive) { alert('请输入正面提示词'); return; }
        var size = canvasSize;
        var style = canvasStyle;
        var area = Utils.byId('canvasCardsArea');
        var empty = Utils.byId('canvasEmpty');
        genCounter++; nodeCounter++;
        var cardId = 'node-' + nodeCounter;
        var nodeId = cardId;

        var node = document.createElement('div');
        node.id = nodeId;
        node.className = 'canvas-node';
        node.style.left = (100 + genCounter * 30) + 'px';
        node.style.top = (100 + genCounter * 30) + 'px';
        node.style.width = '260px';
        node.innerHTML = '<div class="node-header"><span><i class="fa-solid fa-spinner fa-spin mr-2"></i>生成中...</span><span style="color:#888;font-size:10px">' + size + ' · ' + style + '</span></div>'
            + '<div class="node-image" style="height:200px;display:flex;align-items:center;justify-content:center"><div style="text-align:center;color:#888"><div class="animate-spin w-8 h-8 border-3 border-indigo-500 border-t-transparent rounded-full mx-auto mb-3"></div><span style="font-size:11px">AI 生成中...</span></div></div>'
            + '<div class="node-footer"><span style="color:#888">' + positive.substring(0, 30) + '...</span><div class="node-actions"></div></div>';
        area.appendChild(node);
        empty.style.display = 'none';
        node.scrollIntoView({ behavior: 'smooth', block: 'end' });
        makeDraggable(node);

        setTimeout(function() {
            var colors = ['#6366f1','#8b5cf6','#ec4899','#f43f5e','#f97316','#eab308','#22c55e','#06b6d4','#3b82f6','#14b8a6'];
            var bg = colors[(genCounter - 1) % colors.length];
            var sizeMap = { '512×512': [512, 512], '768×768': [768, 768], '1024×1024': [1024, 1024], '512×768': [512, 768], '768×512': [768, 512] };
            var wh = sizeMap[size] || [1024, 1024];
            var imgUrl = 'https://placehold.co/' + wh[0] + 'x' + wh[1] + '/' + bg.replace('#', '') + '/ffffff?text=' + encodeURIComponent(positive.substring(0, 20));
            node.innerHTML = '<div class="node-header"><span><i class="fa-solid fa-image mr-2"></i>AI生成 #' + genCounter + '</span><i class="fa-solid fa-xmark cursor-pointer hover:text-red-400" onclick="document.getElementById(\'' + nodeId + '\').remove()"></i></div>'
                + '<div class="node-image" style="height:200px;cursor:pointer" onclick="CanvasModule.previewImage(\'' + imgUrl + '\')"><img src="' + imgUrl + '" alt="生成图片"></div>'
                + '<div class="node-footer"><span style="color:#888">' + size + ' · ' + style + '</span><div class="node-actions"><i class="fa-solid fa-magnifying-glass-plus" title="预览" onclick="CanvasModule.previewImage(\'' + imgUrl + '\')"></i><i class="fa-solid fa-download" title="下载" onclick="CanvasModule.downloadImg(\'' + imgUrl + '\')"></i><i class="fa-solid fa-trash-can" title="删除" onclick="document.getElementById(\'' + nodeId + '\').remove()"></i></div></div>';
            addHistoryThumb(imgUrl, positive);
        }, 2000 + Math.random() * 1500);
    }

    function addHistoryThumb(imgUrl, positive) {
        var hist = Utils.byId('generateHistory');
        var thumb = document.createElement('div');
        thumb.className = 'history-thumb';
        thumb.title = positive;
        thumb.innerHTML = '<img src="' + imgUrl + '" style="width:100%;height:100%;object-fit:cover">';
        thumb.onclick = function() { CanvasModule.previewImage(imgUrl); };
        hist.insertBefore(thumb, hist.firstChild);
        updateHistoryCount();
    }

    function updateHistoryCount() {
        var cnt = Utils.byId('generateHistory').querySelectorAll('.history-thumb').length;
        Utils.byId('historyCount').textContent = cnt + ' 张';
    }

    function previewImage(url) {
        var ov = document.createElement('div');
        ov.className = 'image-preview-overlay';
        ov.onclick = function() { ov.remove(); };
        ov.innerHTML = '<img src="' + url + '" onclick="event.stopPropagation()">';
        document.body.appendChild(ov);
    }

    function downloadImg(url) {
        var a = document.createElement('a'); a.href = url; a.download = 'generated-' + Date.now() + '.png'; a.click();
    }

    // ===== 拖拽 =====
    var dragState = null;
    function makeDraggable(el) {
        el.addEventListener('mousedown', function(e) {
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'I' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
            e.preventDefault();
            var ws = Utils.byId('canvasWorkspace');
            var rect = el.getBoundingClientRect();
            var wsRect = ws.getBoundingClientRect();
            dragState = {
                el: el,
                startX: e.clientX,
                startY: e.clientY,
                origLeft: parseInt(el.style.left) || 0,
                origTop: parseInt(el.style.top) || 0,
                scrollX: ws.scrollLeft,
                scrollY: ws.scrollTop
            };
            el.style.cursor = 'grabbing';
            el.style.zIndex = '10';
        });
    }
    document.addEventListener('mousemove', function(e) {
        if (!dragState) return;
        var dx = e.clientX - dragState.startX;
        var dy = e.clientY - dragState.startY;
        dragState.el.style.left = (dragState.origLeft + dx) + 'px';
        dragState.el.style.top = (dragState.origTop + dy) + 'px';
    });
    document.addEventListener('mouseup', function() {
        if (!dragState) return;
        dragState.el.style.cursor = 'grab';
        dragState.el.style.zIndex = '';
        dragState = null;
    });

    // ===== 右键菜单 =====
    function showContextMenu(e) {
        if (dragState) return;
        e.preventDefault();
        removeContextMenu();
        var ws = Utils.byId('canvasWorkspace');
        var menu = document.createElement('div');
        menu.className = 'context-menu';
        menu.style.left = e.clientX + 'px';
        menu.style.top = e.clientY + 'px';
        menu.innerHTML = '<div class="menu-item" onclick="CanvasModule.addTextNode();removeContextMenu()"><i class="fa-solid fa-font"></i>添加文本节点</div>'
            + '<div class="menu-item" onclick="CanvasModule.uploadLocalImage();removeContextMenu()"><i class="fa-solid fa-upload"></i>上传本地图片</div>'
            + '<div class="menu-item" style="border-top:1px solid #444;margin-top:4px;padding-top:8px" onclick="removeContextMenu()"><i class="fa-solid fa-arrows-to-dot"></i>重置视图</div>';
        document.body.appendChild(menu);
        menu._closeHandler = function(ev) { if (!menu.contains(ev.target)) removeContextMenu(); };
        setTimeout(function() { document.addEventListener('click', menu._closeHandler); }, 0);
    }
    function removeContextMenu() {
        var m = document.querySelector('.context-menu');
        if (m) { document.removeEventListener('click', m._closeHandler); m.remove(); }
    }

    // ===== 初始化坐标/右键 =====
    function initCanvasEvents() {
        var ws = Utils.byId('canvasWorkspace');
        if (!ws) return;
        ws.addEventListener('mousemove', function(e) {
            var c = Utils.byId('canvasCoord');
            if (c) c.textContent = 'X:' + Math.round(e.offsetX) + ' Y:' + Math.round(e.offsetY);
        });
        ws.addEventListener('contextmenu', showContextMenu);
    }

    return {
        renderProjectList: renderProjectList,
        refreshProjectList: renderProjectList,
        showCreateProjectModal: showCreateProjectModal,
        createProject: createProject,
        enterProject: enterProject,
        setSize: setSize,
        setStyle: setStyle,
        clearWorkspace: clearWorkspace,
        generateImage: generateImage,
        addTextNode: addTextNode,
        uploadLocalImage: uploadLocalImage,
        previewImage: previewImage,
        downloadImg: downloadImg,
        initCanvasEvents: initCanvasEvents,
        initCoordTracker: initCanvasEvents
    };
})();

window.setCanvasSize = CanvasModule.setSize;
window.setCanvasStyle = CanvasModule.setStyle;
window.clearCanvasWorkspace = CanvasModule.clearWorkspace;
window.generateCanvasImage = CanvasModule.generateImage;
window._selectedNodeId = null;
