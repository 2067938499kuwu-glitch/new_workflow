/* AIGC管理后台 - 图片生成模块（深色主题 + 节点系统 + 图片生成 + 本地上传） */
var CanvasModule = (function() {

    var canvasSize = '1024×1024';
    var canvasStyle = '写实';
    var genCounter = 0;
    var nodeCounter = 0;

    // ===== 项目列表渲染（表格形式） =====
    function renderProjectList() {
        var tbody = Utils.byId('canvasProjectTableBody');
        var countEl = Utils.byId('canvasProjectCount');
        var totalEl = Utils.byId('canvasProjectTotal');
        if (!tbody) return;

        tbody.innerHTML = AppData.canvasProjects.map(function(p) {
            return '<tr class="hover:bg-gray-50/50">'
                + '<td class="py-3.5 px-4 font-semibold text-blue-600">' + p.id + '</td>'
                + '<td class="py-3.5 px-4 text-gray-900 font-medium">' + p.name + '</td>'
                + '<td class="py-3.5 px-4"><span class="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">' + p.type + '</span></td>'
                + '<td class="py-3.5 px-4 text-gray-600">' + p.episodes + '</td>'
                + '<td class="py-3.5 px-4 text-gray-400 max-w-[200px] truncate">' + p.desc + '</td>'
                + '<td class="py-3.5 px-4 text-center"><button class="text-blue-600 hover:text-blue-800 font-semibold" onclick="CanvasModule.enterProject(\'' + p.id + '\',\'' + p.name.replace(/'/g,"\\'") + '\')"><i class="fa-solid fa-pen-fancy"></i> 进入图片生成</button></td>'
                + '</tr>';
        }).join('');

        var count = AppData.canvasProjects.length;
        if (countEl) countEl.textContent = '共 ' + count + ' 项';
        if (totalEl) totalEl.textContent = '共 ' + count + ' 条';
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
            + '<div class="flex items-center justify-between mb-5"><h3 class="text-lg font-bold text-gray-800">新建图片生成项目</h3><button class="text-gray-400 hover:text-gray-600 text-lg" onclick="document.getElementById(\'modal-create-project\').remove()"><i class="fa-solid fa-xmark"></i></button></div>'
            + '<div class="space-y-4">'
            + '<div><label class="text-xs text-gray-500 block mb-1">项目名称 <span class="text-red-400">*</span></label><input id="newProjectName" type="text" placeholder="请输入项目名称" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 outline-none"></div>'
            + '<div><label class="text-xs text-gray-500 block mb-1">项目题材</label><select id="newProjectType" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 outline-none"><option>短剧</option><option>悬疑</option><option>都市</option><option>科幻</option><option>武侠</option><option>奇幻</option><option>生活</option><option>探险</option><option>动漫</option><option>广告</option></select></div>'
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

    // ===== 进入图片生成项目 =====
    function enterProject(id, name) {
        Utils.byId('canvasProjectName').textContent = id + ' - ' + name;
        Utils.pageTitle('图片生成 - ' + name);
        Utils.byId('mainContent').style.display = 'none';
        Utils.byId('workspace-canvas').classList.remove('hidden');
        Utils.qsa('.view-panel').forEach(function(p) { p.classList.remove('active'); });
        Utils.qsa('.nav-item').forEach(function(el) { el.classList.remove('active'); });
        Utils.qsa('.nav-item').forEach(function(el) {
            var span = el.querySelector('span:last-child');
            if (span && span.textContent === '图片生成') el.classList.add('active');
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
        node.style.width = '280px';
        node.innerHTML = '<div class="node-header"><span><i class="fa-solid fa-image mr-2"></i>' + sourceLabel + ' #' + nodeCounter + '</span><i class="fa-solid fa-xmark cursor-pointer hover:text-red-400" onclick="document.getElementById(\'' + nodeId + '\').remove()"></i></div>'
            + '<div class="node-image" style="height:180px;position:relative" onclick="CanvasModule.previewImage(\'' + imgUrl + '\')"><img src="' + imgUrl + '" alt="图片" style="width:100%;height:100%;object-fit:cover"></div>'
            + '<div class="flex gap-2 px-2 py-2 border-t border-[#333]"><button class="flex-1 py-1.5 rounded bg-indigo-600 text-white text-[11px] font-medium hover:bg-indigo-500 flex items-center justify-center gap-1" onclick="event.stopPropagation();CanvasModule.showSaveModal(\'' + imgUrl + '\')"><i class="fa-solid fa-floppy-disk"></i>保存</button><button class="flex-1 py-1.5 rounded bg-[#333] text-gray-300 text-[11px] hover:bg-[#444] flex items-center justify-center gap-1" onclick="event.stopPropagation();CanvasModule.previewImage(\'' + imgUrl + '\')"><i class="fa-solid fa-magnifying-glass-plus"></i>预览</button><button class="flex-1 py-1.5 rounded bg-[#333] text-gray-300 text-[11px] hover:bg-[#444] flex items-center justify-center gap-1" onclick="event.stopPropagation();CanvasModule.downloadImg(\'' + imgUrl + '\')"><i class="fa-solid fa-download"></i>下载</button></div>'
            + '<div class="px-3 py-1.5 flex justify-between text-[10px] text-gray-500">'
            + '<span>' + (detail || '') + '</span>'
            + '<span class="text-red-400 cursor-pointer hover:text-red-300" onclick="document.getElementById(\'' + nodeId + '\').remove()">删除</span>'
            + '</div>';
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
                + '<div class="node-image" style="height:180px;position:relative;cursor:pointer" onclick="CanvasModule.previewImage(\'' + imgUrl + '\')"><img src="' + imgUrl + '" alt="生成图片" style="width:100%;height:100%;object-fit:cover"></div>'
                + '<div class="flex gap-1.5 px-2 py-2 border-t border-[#333]"><button class="flex-1 py-1.5 rounded bg-indigo-600 text-white text-[11px] font-medium hover:bg-indigo-500 flex items-center justify-center gap-1" onclick="event.stopPropagation();CanvasModule.showSaveModal(\'' + imgUrl + '\',\'' + positive.replace(/'/g,"\\'") + '\')"><i class="fa-solid fa-floppy-disk"></i>保存</button><button class="flex-1 py-1.5 rounded bg-emerald-700 text-white text-[11px] font-medium hover:bg-emerald-600 flex items-center justify-center gap-1" onclick="event.stopPropagation();CanvasModule.editImage(\'' + imgUrl + '\',\'' + nodeId + '\')"><i class="fa-solid fa-wand-magic-sparkles"></i>编辑</button><button class="flex-1 py-1.5 rounded bg-[#333] text-gray-300 text-[11px] hover:bg-[#444] flex items-center justify-center gap-1" onclick="event.stopPropagation();CanvasModule.previewImage(\'' + imgUrl + '\')"><i class="fa-solid fa-magnifying-glass-plus"></i>预览</button></div>'
                + '<div class="px-3 py-1.5 flex justify-between text-[10px] text-gray-500"><span>' + size + ' · ' + style + '</span><span class="text-red-400 cursor-pointer hover:text-red-300" onclick="document.getElementById(\'' + nodeId + '\').remove()">删除</span></div>';
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

    // ===== 保存弹窗 =====
    function showSaveModal(imgUrl, prompt) {
        var existing = Utils.byId('modal-save-image');
        if (existing) existing.remove();

        var overlay = document.createElement('div');
        overlay.id = 'modal-save-image';
        overlay.className = 'modal-overlay';
        overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };

        overlay.innerHTML = '<div class="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg" onclick="event.stopPropagation()">'
            + '<div class="flex items-center justify-between mb-4"><h3 class="text-lg font-bold text-gray-800">保存图片</h3><button class="text-gray-400 hover:text-gray-600 text-lg" onclick="document.getElementById(\'modal-save-image\').remove()"><i class="fa-solid fa-xmark"></i></button></div>'
            + '<div class="flex gap-4 mb-4">'
            + '<div class="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200"><img src="' + imgUrl + '" style="width:100%;height:100%;object-fit:cover"></div>'
            + '<div class="flex-1"><p class="text-sm text-gray-600 mb-1">选择保存位置：</p>' + (prompt ? '<p class="text-xs text-gray-400">' + prompt.substring(0, 60) + '</p>' : '') + '</div>'
            + '</div>'
            + '<div class="grid grid-cols-3 gap-3">'
            + '<button onclick="CanvasModule.showProjectSaveForm(\'' + imgUrl + '\',\'' + (prompt ? prompt.replace(/'/g,"\\'") : '') + '\')" class="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition text-center">'
            + '<i class="fa-solid fa-folder-open text-2xl text-blue-500 mb-2 block"></i><span class="text-sm font-medium text-gray-700">项目库</span><span class="text-xs text-gray-400 block mt-1">保存到当前项目</span>'
            + '</button>'
            + '<button onclick="CanvasModule.showMaterialSaveForm(\'' + imgUrl + '\',\'' + (prompt ? prompt.replace(/'/g,"\\'") : '') + '\')" class="p-4 border-2 border-gray-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition text-center">'
            + '<i class="fa-solid fa-cubes text-2xl text-green-500 mb-2 block"></i><span class="text-sm font-medium text-gray-700">素材库</span><span class="text-xs text-gray-400 block mt-1">保存到公共素材库</span>'
            + '</button>'
            + '<button onclick="CanvasModule.saveToLocal(\'' + imgUrl + '\')" class="p-4 border-2 border-gray-200 rounded-xl hover:border-orange-400 hover:bg-orange-50 transition text-center">'
            + '<i class="fa-solid fa-download text-2xl text-orange-500 mb-2 block"></i><span class="text-sm font-medium text-gray-700">本地</span><span class="text-xs text-gray-400 block mt-1">下载到本地电脑</span>'
            + '</button>'
            + '</div>'
            + '<div class="mt-4 pt-3 border-t border-gray-100 text-center"><button class="text-sm text-gray-400 hover:text-gray-600" onclick="document.getElementById(\'modal-save-image\').remove()">取消</button></div>'
            + '</div>';

        document.body.appendChild(overlay);
    }

    function saveToLocal(imgUrl) {
        Utils.byId('modal-save-image').remove();
        downloadImg(imgUrl);
        showToast('已下载到本地');
    }

    // ===== 项目库保存表单 =====
    function showProjectSaveForm(imgUrl, prompt) {
        var existing = Utils.byId('modal-project-save');
        if (existing) existing.remove();

        var overlay = document.createElement('div');
        overlay.id = 'modal-project-save';
        overlay.className = 'modal-overlay';
        overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };

        overlay.innerHTML = '<div class="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg" onclick="event.stopPropagation()">'
            + '<div class="flex items-center justify-between mb-5"><h3 class="text-lg font-bold text-gray-800">保存到项目库</h3><button class="text-gray-400 hover:text-gray-600 text-lg" onclick="document.getElementById(\'modal-project-save\').remove()"><i class="fa-solid fa-xmark"></i></button></div>'
            + '<div class="flex gap-4 mb-5">'
            + '<div class="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200"><img src="' + imgUrl + '" style="width:100%;height:100%;object-fit:cover"></div>'
            + '<div class="flex-1 space-y-4">'
            + '<div><label class="text-xs text-gray-500 block mb-1">图片名称 <span class="text-red-400">*</span></label><input id="projectNameInput" type="text" placeholder="请输入图片名称" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 outline-none"></div>'
            + '<div><label class="text-xs text-gray-500 block mb-1">图片分类 <span class="text-red-400">*</span></label><select id="projectCategorySelect" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 outline-none"><option value="">请选择分类</option><option value="角色">角色</option><option value="场景">场景</option><option value="道具">道具</option><option value="截图">截图</option></select></div>'
            + '</div>'
            + '</div>'
            + '<div class="flex gap-3 justify-end pt-4 border-t border-gray-100">'
            + '<button class="px-5 py-2 rounded bg-white border border-gray-300 text-gray-600 text-sm hover:bg-gray-50" onclick="document.getElementById(\'modal-project-save\').remove()">取消</button>'
            + '<button class="px-5 py-2 rounded bg-blue-500 text-white text-sm font-medium hover:bg-blue-600" onclick="CanvasModule.doProjectSave(\'' + imgUrl + '\')">确认保存</button>'
            + '</div>'
            + '</div>';

        document.body.appendChild(overlay);
        setTimeout(function() { var inp = Utils.byId('projectNameInput'); if (inp) inp.focus(); }, 100);
    }

    function doProjectSave(imgUrl) {
        var name = Utils.byId('projectNameInput').value.trim();
        var category = Utils.byId('projectCategorySelect').value;
        if (!name) { showToast('请输入图片名称'); return; }
        if (!category) { showToast('请选择图片分类'); return; }

        AppData.projectImages.push({url: imgUrl, name: name, category: category, time: new Date().toLocaleString()});
        Utils.byId('modal-project-save').remove();
        Utils.byId('modal-save-image').remove();
        showToast('已保存到项目库');
    }

    // ===== 素材库保存表单 =====
    function showMaterialSaveForm(imgUrl, prompt) {
        var existing = Utils.byId('modal-material-save');
        if (existing) existing.remove();

        var overlay = document.createElement('div');
        overlay.id = 'modal-material-save';
        overlay.className = 'modal-overlay';
        overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };

        overlay.innerHTML = '<div class="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg" onclick="event.stopPropagation()">'
            + '<div class="flex items-center justify-between mb-5"><h3 class="text-lg font-bold text-gray-800">保存到素材库</h3><button class="text-gray-400 hover:text-gray-600 text-lg" onclick="document.getElementById(\'modal-material-save\').remove()"><i class="fa-solid fa-xmark"></i></button></div>'
            + '<div class="flex gap-4 mb-5">'
            + '<div class="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200"><img src="' + imgUrl + '" style="width:100%;height:100%;object-fit:cover"></div>'
            + '<div class="flex-1 space-y-4">'
            + '<div><label class="text-xs text-gray-500 block mb-1">素材分类 <span class="text-red-400">*</span></label><select id="materialCategorySelect" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 outline-none"><option value="">请选择分类</option><option value="角色">角色</option><option value="场景">场景</option><option value="道具">道具</option><option value="截图">截图</option></select></div>'
            + '<div><label class="text-xs text-gray-500 block mb-1">素材名称 <span class="text-red-400">*</span></label><input id="materialNameInput" type="text" placeholder="请输入素材名称" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 outline-none"></div>'
            + '<div><label class="text-xs text-gray-500 block mb-1">标签</label><input id="materialTagsInput" type="text" placeholder="多个标签用逗号分隔" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 outline-none"></div>'
            + '<div><label class="text-xs text-gray-500 block mb-1">素材描述词</label><textarea id="materialDescInput" rows="2" placeholder="请输入素材的描述词..." class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 outline-none"></textarea></div>'
            + '</div>'
            + '</div>'
            + '<div class="flex gap-3 justify-end pt-4 border-t border-gray-100">'
            + '<button class="px-5 py-2 rounded bg-white border border-gray-300 text-gray-600 text-sm hover:bg-gray-50" onclick="document.getElementById(\'modal-material-save\').remove()">取消</button>'
            + '<button class="px-5 py-2 rounded bg-blue-500 text-white text-sm font-medium hover:bg-blue-600" onclick="CanvasModule.doMaterialSave(\'' + imgUrl + '\')">确认保存</button>'
            + '</div>'
            + '</div>';

        document.body.appendChild(overlay);
        setTimeout(function() { var inp = Utils.byId('materialNameInput'); if (inp) inp.focus(); }, 100);
    }

    function doMaterialSave(imgUrl) {
        var category = Utils.byId('materialCategorySelect').value;
        var name = Utils.byId('materialNameInput').value.trim();
        if (!category) { showToast('请选择素材分类'); return; }
        if (!name) { showToast('请输入素材名称'); return; }

        var tags = Utils.byId('materialTagsInput').value.trim();
        var desc = Utils.byId('materialDescInput').value.trim();

        AppData.materialImages.push({url: imgUrl, name: name, category: category, tags: tags, description: desc, time: new Date().toLocaleString()});
        Utils.byId('modal-material-save').remove();
        Utils.byId('modal-save-image').remove();
        showToast('已保存到素材库');
    }

    // ===== 图片编辑器（涂鸦 + 框选遮盖） =====
    function editImage(imgUrl, nodeId) {
        var existing = Utils.byId('image-editor-modal');
        if (existing) existing.remove();

        var overlay = document.createElement('div');
        overlay.id = 'image-editor-modal';
        overlay.style.cssText = 'position:fixed;inset:0;z-index:100;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;';
        overlay.onclick = function(e) { if (e.target === overlay) CanvasModule.closeEditor(); };

        var container = document.createElement('div');
        container.style.cssText = 'background:#1e1e1e;border-radius:12px;width:min(95vw,1100px);max-height:92vh;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.5);';
        container.onclick = function(e) { e.stopPropagation(); };

        container.innerHTML = '<div style="display:flex;align-items:center;justify-content:space-between;padding:14px 20px;border-bottom:1px solid #333;flex-shrink:0">'
            + '<h3 style="color:#fff;font-size:15px;font-weight:600">图片编辑 <span style="color:#888;font-weight:400;font-size:12px">涂鸦 · 框选遮盖</span></h3>'
            + '<div style="display:flex;gap:8px"><button class="editor-tip-btn" style="background:#333;border:none;color:#aaa;padding:6px 14px;border-radius:6px;font-size:11px;cursor:pointer" onclick="CanvasModule.closeEditor()">取消</button>'
            + '<button class="editor-tip-btn" style="background:#059669;border:none;color:#fff;padding:6px 14px;border-radius:6px;font-size:11px;font-weight:500;cursor:pointer" onclick="CanvasModule.saveEditedImage()">完成编辑</button></div></div>'
            + '<div style="display:flex;flex:1;min-height:0">'
            + '<!-- 工具栏 -->'
            + '<div style="width:64px;flex-shrink:0;background:#252525;padding:12px 8px;display:flex;flex-direction:column;align-items:center;gap:6px;border-right:1px solid #333">'
            + '<button class="editor-tool active" data-tool="pen" style="width:48px;height:48px;border-radius:10px;background:#4f46e5;border:none;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff" onclick="CanvasModule.setEditorTool(\'pen\')"><i class="fa-solid fa-pen-nib" style="font-size:16px"></i><span style="font-size:8px;margin-top:2px">涂鸦</span></button>'
            + '<button class="editor-tool" data-tool="rect" style="width:48px;height:48px;border-radius:10px;background:#333;border:none;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#aaa" onclick="CanvasModule.setEditorTool(\'rect\')"><i class="fa-solid fa-vector-square" style="font-size:16px"></i><span style="font-size:8px;margin-top:2px">框选</span></button>'
            + '<button class="editor-tool" data-tool="eraser" style="width:48px;height:48px;border-radius:10px;background:#333;border:none;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#aaa" onclick="CanvasModule.setEditorTool(\'eraser\')"><i class="fa-solid fa-eraser" style="font-size:16px"></i><span style="font-size:8px;margin-top:2px">橡皮</span></button>'
            + '<div style="border-top:1px solid #333;width:100%;margin:4px 0"></div>'
            + '<button style="width:48px;height:48px;border-radius:10px;background:#333;border:none;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#aaa" onclick="CanvasModule.undoEditor()" title="撤销"><i class="fa-solid fa-rotate-left" style="font-size:16px"></i><span style="font-size:8px;margin-top:2px">撤销</span></button>'
            + '<button style="width:48px;height:48px;border-radius:10px;background:#333;border:none;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#aaa" onclick="CanvasModule.downloadEditedImage()" title="下载"><i class="fa-solid fa-download" style="font-size:16px"></i><span style="font-size:8px;margin-top:2px">下载</span></button>'
            + '</div>'
            + '<!-- 画布区 -->'
            + '<div style="flex:1;display:flex;align-items:center;justify-content:center;background:#1a1a1a;position:relative;overflow:hidden;min-width:0">'
            + '<div style="position:relative;max-width:100%;max-height:100%" id="editorCanvasWrapper"><canvas id="editorCanvas" style="display:block;cursor:crosshair"></canvas></div>'
            + '</div>'
            + '<!-- 颜色 / 粗细面板 -->'
            + '<div style="width:200px;flex-shrink:0;background:#252525;padding:16px;border-left:1px solid #333;overflow-y:auto">'
            + '<div style="margin-bottom:14px"><div style="color:#888;font-size:10px;text-transform:uppercase;margin-bottom:8px;font-weight:600">画笔颜色</div>'
            + '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px" id="editorColors">'
            + '  <div class="editor-color active" data-color="#ffffff" style="width:100%;aspect-ratio:1;border-radius:6px;background:#ffffff;cursor:pointer;border:2px solid transparent"></div>'
            + '  <div class="editor-color" data-color="#ff4444" style="width:100%;aspect-ratio:1;border-radius:6px;background:#ff4444;cursor:pointer;border:2px solid transparent"></div>'
            + '  <div class="editor-color" data-color="#ff8800" style="width:100%;aspect-ratio:1;border-radius:6px;background:#ff8800;cursor:pointer;border:2px solid transparent"></div>'
            + '  <div class="editor-color" data-color="#ffdd00" style="width:100%;aspect-ratio:1;border-radius:6px;background:#ffdd00;cursor:pointer;border:2px solid transparent"></div>'
            + '  <div class="editor-color" data-color="#44ff44" style="width:100%;aspect-ratio:1;border-radius:6px;background:#44ff44;cursor:pointer;border:2px solid transparent"></div>'
            + '  <div class="editor-color" data-color="#00ccff" style="width:100%;aspect-ratio:1;border-radius:6px;background:#00ccff;cursor:pointer;border:2px solid transparent"></div>'
            + '  <div class="editor-color" data-color="#4488ff" style="width:100%;aspect-ratio:1;border-radius:6px;background:#4488ff;cursor:pointer;border:2px solid transparent"></div>'
            + '  <div class="editor-color" data-color="#cc44ff" style="width:100%;aspect-ratio:1;border-radius:6px;background:#cc44ff;cursor:pointer;border:2px solid transparent"></div>'
            + '  <div class="editor-color" data-color="#222222" style="width:100%;aspect-ratio:1;border-radius:6px;background:#222222;cursor:pointer;border:2px solid transparent"></div>'
            + '  <div class="editor-color" data-color="#555555" style="width:100%;aspect-ratio:1;border-radius:6px;background:#555555;cursor:pointer;border:2px solid transparent"></div>'
            + '  <div class="editor-color" data-color="#999999" style="width:100%;aspect-ratio:1;border-radius:6px;background:#999999;cursor:pointer;border:2px solid transparent"></div>'
            + '</div></div>'
            + '<div style="margin-bottom:14px"><div style="color:#888;font-size:10px;text-transform:uppercase;margin-bottom:8px;font-weight:600">画笔大小</div>'
            + '<div style="display:flex;gap:6px;align-items:center"><input type="range" id="editorBrushSize" min="2" max="40" value="4" style="flex:1;accent-color:#6366f1"><span id="editorBrushSizeLabel" style="color:#aaa;font-size:12px;min-width:24px">4</span></div></div>'
            + '<div style="margin-bottom:14px"><div style="color:#888;font-size:10px;text-transform:uppercase;margin-bottom:8px;font-weight:600">遮盖透明度</div>'
            + '<div style="display:flex;gap:6px;align-items:center"><input type="range" id="editorOpacity" min="0.1" max="1" step="0.1" value="0.6" style="flex:1;accent-color:#6366f1"><span id="editorOpacityLabel" style="color:#aaa;font-size:12px;min-width:24px">0.6</span></div></div>'
            + '<div style="border-top:1px solid #333;padding-top:12px"><button style="width:100%;padding:8px 0;background:#dc2626;border:none;border-radius:6px;color:#fff;font-size:11px;cursor:pointer" onclick="CanvasModule.clearEditorDrawings()"><i class="fa-solid fa-trash-can mr-1"></i>清除所有涂鸦</button></div>'
            + '</div></div>';

        overlay.appendChild(container);
        document.body.appendChild(overlay);

        // 加载图片到 canvas
        var img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = function() {
            initEditorCanvas(img, nodeId);
        };
        img.onerror = function() {
            // fallback for cross-origin
            initEditorCanvasFallback(imgUrl, nodeId);
        };
        img.src = imgUrl;
    }

    // ===== 编辑器内部状态 =====
    var _editor = {
        canvas: null,
        ctx: null,
        overlayCanvas: null,
        overlayCtx: null,
        tool: 'pen',
        color: '#ffffff',
        brushSize: 4,
        opacity: 0.6,
        isDrawing: false,
        lastX: 0, lastY: 0,
        imgUrl: '',
        nodeId: '',
        undoStack: [],
        startX: 0, startY: 0,
        img: null
    };

    function initEditorCanvas(img, nodeId) {
        _editor.img = img;
        _editor.nodeId = nodeId;
        _editor.imgUrl = img.src;

        var wrapper = Utils.byId('editorCanvasWrapper');
        var maxW = wrapper.clientWidth - 4 || 800;
        var maxH = wrapper.clientHeight - 4 || 600;
        var scale = Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight, 1);
        var dispW = Math.round(img.naturalWidth * scale);
        var dispH = Math.round(img.naturalHeight * scale);

        // 底图 canvas
        var canvas = document.createElement('canvas');
        canvas.id = 'editorCanvas';
        canvas.width = dispW;
        canvas.height = dispH;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, dispW, dispH);

        // 覆盖层 canvas（用于涂鸦/框选）
        var overlayCanvas = document.createElement('canvas');
        overlayCanvas.id = 'editorOverlayCanvas';
        overlayCanvas.width = dispW;
        overlayCanvas.height = dispH;
        overlayCanvas.style.cssText = 'position:absolute;top:0;left:0;cursor:crosshair';
        var overlayCtx = overlayCanvas.getContext('2d');

        wrapper.innerHTML = '';
        wrapper.appendChild(canvas);
        wrapper.appendChild(overlayCanvas);

        _editor.canvas = canvas;
        _editor.ctx = ctx;
        _editor.overlayCanvas = overlayCanvas;
        _editor.overlayCtx = overlayCtx;
        _editor.undoStack = [{data: overlayCtx.getImageData(0, 0, dispW, dispH)}];

        // Events
        overlayCanvas.addEventListener('mousedown', onEditorMouseDown);
        overlayCanvas.addEventListener('mousemove', onEditorMouseMove);
        overlayCanvas.addEventListener('mouseup', onEditorMouseUp);
        overlayCanvas.addEventListener('mouseleave', onEditorMouseUp);

        // Color picker
        document.querySelectorAll('#editorColors .editor-color').forEach(function(el) {
            el.addEventListener('click', function() {
                document.querySelectorAll('#editorColors .editor-color').forEach(function(e) { e.style.borderColor = 'transparent'; });
                this.style.borderColor = '#6366f1';
                _editor.color = this.getAttribute('data-color');
            });
        });

        // Brush size
        var bs = Utils.byId('editorBrushSize');
        if (bs) {
            bs.addEventListener('input', function() {
                _editor.brushSize = parseInt(this.value);
                Utils.byId('editorBrushSizeLabel').textContent = this.value;
            });
        }

        // Opacity
        var op = Utils.byId('editorOpacity');
        if (op) {
            op.addEventListener('input', function() {
                _editor.opacity = parseFloat(this.value);
                Utils.byId('editorOpacityLabel').textContent = this.value;
            });
        }
    }

    function initEditorCanvasFallback(imgUrl, nodeId) {
        // 跨域降级 - 创建 canvas 用纯色背景
        _editor.nodeId = nodeId;
        _editor.imgUrl = imgUrl;

        var wrapper = Utils.byId('editorCanvasWrapper');
        var w = Math.min(wrapper.clientWidth - 4 || 600, 600);
        var h = Math.min(wrapper.clientHeight - 4 || 400, 400);

        var canvas = document.createElement('canvas');
        canvas.id = 'editorCanvas';
        canvas.width = w;
        canvas.height = h;
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = '#2a2a2a';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = '#666';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('图片加载中 - 可在编辑后保存', w/2, h/2);

        var overlayCanvas = document.createElement('canvas');
        overlayCanvas.id = 'editorOverlayCanvas';
        overlayCanvas.width = w;
        overlayCanvas.height = h;
        overlayCanvas.style.cssText = 'position:absolute;top:0;left:0;cursor:crosshair';
        var overlayCtx = overlayCanvas.getContext('2d');

        wrapper.innerHTML = '';
        wrapper.appendChild(canvas);
        wrapper.appendChild(overlayCanvas);

        _editor.canvas = canvas;
        _editor.ctx = ctx;
        _editor.overlayCanvas = overlayCanvas;
        _editor.overlayCtx = overlayCtx;
        _editor.undoStack = [{data: overlayCtx.getImageData(0, 0, w, h)}];

        overlayCanvas.addEventListener('mousedown', onEditorMouseDown);
        overlayCanvas.addEventListener('mousemove', onEditorMouseMove);
        overlayCanvas.addEventListener('mouseup', onEditorMouseUp);
        overlayCanvas.addEventListener('mouseleave', onEditorMouseUp);
    }

    // ===== 编辑器鼠标事件 =====
    function getEditorPos(e) {
        var rect = _editor.overlayCanvas.getBoundingClientRect();
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    function onEditorMouseDown(e) {
        _editor.isDrawing = true;
        var pos = getEditorPos(e);
        _editor.lastX = pos.x;
        _editor.lastY = pos.y;
        _editor.startX = pos.x;
        _editor.startY = pos.y;

        var overlayCtx = _editor.overlayCtx;
        if (_editor.tool === 'pen') {
            overlayCtx.beginPath();
            overlayCtx.moveTo(pos.x, pos.y);
        }
    }

    function onEditorMouseMove(e) {
        if (!_editor.isDrawing) return;
        var pos = getEditorPos(e);
        var overlayCtx = _editor.overlayCtx;
        var tool = _editor.tool;

        if (tool === 'pen') {
            overlayCtx.strokeStyle = _editor.color;
            overlayCtx.lineWidth = _editor.brushSize;
            overlayCtx.lineCap = 'round';
            overlayCtx.lineJoin = 'round';
            overlayCtx.beginPath();
            overlayCtx.moveTo(_editor.lastX, _editor.lastY);
            overlayCtx.lineTo(pos.x, pos.y);
            overlayCtx.stroke();
            _editor.lastX = pos.x;
            _editor.lastY = pos.y;
        } else if (tool === 'eraser') {
            overlayCtx.globalCompositeOperation = 'destination-out';
            overlayCtx.beginPath();
            overlayCtx.arc(pos.x, pos.y, _editor.brushSize, 0, Math.PI * 2);
            overlayCtx.fill();
            overlayCtx.globalCompositeOperation = 'source-over';
            _editor.lastX = pos.x;
            _editor.lastY = pos.y;
        } else if (tool === 'rect') {
            // 实时预览框选 - 需要在 mouseup 时实际绘制
            // 先恢复上一次快照
            if (_editor.undoStack.length > 1) {
                var prevData = _editor.undoStack[_editor.undoStack.length - 1].data;
                overlayCtx.putImageData(prevData, 0, 0);
            } else if (_editor.undoStack.length === 1) {
                overlayCtx.putImageData(_editor.undoStack[0].data, 0, 0);
            }
            // 绘制预览矩形
            var x = Math.min(_editor.startX, pos.x);
            var y = Math.min(_editor.startY, pos.y);
            var w = Math.abs(pos.x - _editor.startX);
            var h = Math.abs(pos.y - _editor.startY);
            overlayCtx.strokeStyle = _editor.color;
            overlayCtx.lineWidth = 1;
            overlayCtx.setLineDash([5, 3]);
            overlayCtx.strokeRect(x, y, w, h);
            overlayCtx.setLineDash([]);
        }
    }

    function onEditorMouseUp(e) {
        if (!_editor.isDrawing) return;
        _editor.isDrawing = false;

        var overlayCtx = _editor.overlayCtx;

        if (_editor.tool === 'rect') {
            var rect = _editor.overlayCanvas.getBoundingClientRect();
            var pos = getEditorPos(e);
            var x = Math.min(_editor.startX, pos.x);
            var y = Math.min(_editor.startY, pos.y);
            var w = Math.abs(pos.x - _editor.startX);
            var h = Math.abs(pos.y - _editor.startY);
            if (w > 2 || h > 2) {
                overlayCtx.fillStyle = hexToRgba(_editor.color, _editor.opacity);
                overlayCtx.fillRect(x, y, w, h);
                overlayCtx.strokeStyle = _editor.color;
                overlayCtx.lineWidth = 1;
                overlayCtx.strokeRect(x, y, w, h);
            }
        }

        // 保存撤销快照
        saveUndoState();
    }

    function saveUndoState() {
        var data = _editor.overlayCtx.getImageData(0, 0, _editor.overlayCanvas.width, _editor.overlayCanvas.height);
        if (_editor.undoStack.length > 20) _editor.undoStack.shift();
        _editor.undoStack.push({data: data});
    }

    function hexToRgba(hex, alpha) {
        var r = parseInt(hex.slice(1,2), 16) * 17 || parseInt(hex.slice(1,3), 16);
        var g = parseInt(hex.slice(2,3), 16) * 17 || parseInt(hex.slice(3,5), 16);
        var b = parseInt(hex.slice(3,4), 16) * 17 || parseInt(hex.slice(5,7), 16);
        if (hex.length === 7) {
            r = parseInt(hex.slice(1,3), 16);
            g = parseInt(hex.slice(3,5), 16);
            b = parseInt(hex.slice(5,7), 16);
        }
        return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
    }

    // ===== 编辑器工具切换 =====
    function setEditorTool(tool) {
        _editor.tool = tool;
        document.querySelectorAll('.editor-tool').forEach(function(el) {
            if (el.getAttribute('data-tool') === tool) {
                el.style.background = '#4f46e5';
                el.style.color = '#fff';
            } else {
                el.style.background = '#333';
                el.style.color = '#aaa';
            }
        });
        var canvas = _editor.overlayCanvas;
        if (canvas) canvas.style.cursor = tool === 'rect' ? 'crosshair' : tool === 'eraser' ? 'cell' : 'crosshair';
    }

    // ===== 撤销 =====
    function undoEditor() {
        if (_editor.undoStack.length <= 1) return;
        _editor.undoStack.pop();
        var state = _editor.undoStack[_editor.undoStack.length - 1];
        if (state) {
            _editor.overlayCtx.putImageData(state.data, 0, 0);
        }
    }

    // ===== 清除所有涂鸦 =====
    function clearEditorDrawings() {
        if (!_editor.overlayCanvas) return;
        _editor.overlayCtx.clearRect(0, 0, _editor.overlayCanvas.width, _editor.overlayCanvas.height);
        saveUndoState();
    }

    // ===== 下载编辑后的图片 =====
    function downloadEditedImage() {
        if (!_editor.canvas || !_editor.overlayCanvas) return;
        var tmpCanvas = document.createElement('canvas');
        tmpCanvas.width = _editor.canvas.width;
        tmpCanvas.height = _editor.canvas.height;
        var tmpCtx = tmpCanvas.getContext('2d');
        tmpCtx.drawImage(_editor.canvas, 0, 0);
        tmpCtx.drawImage(_editor.overlayCanvas, 0, 0);
        var dataUrl = tmpCanvas.toDataURL('image/png');
        downloadImg(dataUrl);
    }

    // ===== 保存编辑后的图片到节点 =====
    function saveEditedImage() {
        if (!_editor.canvas || !_editor.overlayCanvas) return;

        var tmpCanvas = document.createElement('canvas');
        tmpCanvas.width = _editor.canvas.width;
        tmpCanvas.height = _editor.canvas.height;
        var tmpCtx = tmpCanvas.getContext('2d');
        tmpCtx.drawImage(_editor.canvas, 0, 0);
        tmpCtx.drawImage(_editor.overlayCanvas, 0, 0);
        var dataUrl = tmpCanvas.toDataURL('image/png');

        // 更新节点图片
        var nodeId = _editor.nodeId;
        if (nodeId) {
            var nodeImg = document.querySelector('#' + nodeId + ' .node-image img');
            if (nodeImg) nodeImg.src = dataUrl;
        }

        closeEditor();
        showToast('编辑已保存');
    }

    function closeEditor() {
        var modal = Utils.byId('image-editor-modal');
        if (modal) modal.remove();
        _editor.undoStack = [];
    }
    function showToast(msg) {
        var existing = document.querySelector('.custom-toast');
        if (existing) existing.remove();

        var toast = document.createElement('div');
        toast.className = 'custom-toast';
        toast.style.cssText = 'position:fixed;bottom:40px;left:50%;transform:translateX(-50%);background:#222;color:#fff;padding:10px 28px;border-radius:8px;font-size:13px;z-index:9999;box-shadow:0 8px 24px rgba(0,0,0,0.3);transition:opacity 0.3s';
        toast.textContent = '✓ ' + msg;
        document.body.appendChild(toast);

        setTimeout(function() {
            toast.style.opacity = '0';
            setTimeout(function() { toast.remove(); }, 300);
        }, 2000);
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
        showSaveModal: showSaveModal,
        showProjectSaveForm: showProjectSaveForm,
        doProjectSave: doProjectSave,
        showMaterialSaveForm: showMaterialSaveForm,
        doMaterialSave: doMaterialSave,
        saveToLocal: saveToLocal,
        editImage: editImage,
        setEditorTool: setEditorTool,
        undoEditor: undoEditor,
        clearEditorDrawings: clearEditorDrawings,
        downloadEditedImage: downloadEditedImage,
        saveEditedImage: saveEditedImage,
        closeEditor: closeEditor,
        initCanvasEvents: initCanvasEvents,
        initCoordTracker: initCanvasEvents
    };
})();

window.setCanvasSize = CanvasModule.setSize;
window.setCanvasStyle = CanvasModule.setStyle;
window.clearCanvasWorkspace = CanvasModule.clearWorkspace;
window.generateCanvasImage = CanvasModule.generateImage;
window._selectedNodeId = null;
