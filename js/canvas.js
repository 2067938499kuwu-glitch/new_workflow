var CanvasModule = (function() {
    var canvasSize = '1024脳1024';
    var canvasStyle = '写实';
    var genCounter = 0;
    var nodeCounter = 0;
    var dragState = null;
    var editorState = {
        imageUrl: '',
        nodeId: ''
    };

    function renderProjectList() {
        var tbody = Utils.byId('canvasProjectTableBody');
        var countEl = Utils.byId('canvasProjectCount');
        var totalEl = Utils.byId('canvasProjectTotal');
        if (!tbody) return;

        tbody.innerHTML = AppData.canvasProjects.map(function(project) {
            return '<tr>'
                + '<td><span class="table-id">' + Utils.escapeHtml(project.id) + '</span></td>'
                + '<td><span class="table-title">' + Utils.escapeHtml(project.name) + '</span></td>'
                + '<td><span class="table-pill table-pill-category">' + Utils.escapeHtml(project.type) + '</span></td>'
                + '<td><span class="table-number table-muted">' + Utils.escapeHtml(project.episodes) + '</span></td>'
                + '<td class="table-muted">' + Utils.escapeHtml(project.desc) + '</td>'
                + '<td class="text-center"><div class="table-action-group"><button class="table-action-link is-accent" onclick="CanvasModule.enterProject(\'' + project.id + '\',\'' + project.name.replace(/'/g, "\\'") + '\')">进入创作</button></div></td>'
                + '</tr>';
        }).join('');

        var count = AppData.canvasProjects.length;
        if (countEl) countEl.textContent = '共 ' + count + ' 个项目';
        if (totalEl) totalEl.textContent = '共 ' + count + ' 条';
    }

    function showCreateProjectModal() {
        removeModal('modal-create-project');
        var overlay = document.createElement('div');
        overlay.id = 'modal-create-project';
        overlay.className = 'modal-overlay is-visible';
        overlay.style.display = 'flex';
        overlay.innerHTML = '<div class="dialog-card dialog-card--small" onclick="event.stopPropagation()">'
            + '<div class="dialog-card__header"><h3>新建图片生成项目</h3><button class="detail-close" onclick="document.getElementById(\'modal-create-project\').remove()">&times;</button></div>'
            + '<div class="dialog-card__body stack-list">'
            + '<label class="field"><span>项目名称</span><input id="newProjectName" type="text" placeholder="请输入项目名称"></label>'
            + '<label class="field"><span>项目题材</span><select id="newProjectType"><option>都市</option><option>民国</option><option>玄幻</option><option>悬疑</option></select></label>'
            + '<label class="field"><span>项目说明</span><textarea id="newProjectDesc" rows="3" placeholder="描述项目用途与视觉方向"></textarea></label>'
            + '<div class="flex-inline" style="justify-content:flex-end"><button class="secondary-btn" onclick="document.getElementById(\'modal-create-project\').remove()">取消</button><button class="primary-btn" onclick="CanvasModule.createProject()">创建项目</button></div>'
            + '</div></div>';
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) overlay.remove();
        });
        document.body.appendChild(overlay);
    }

    function createProject() {
        var name = (Utils.byId('newProjectName').value || '').trim();
        if (!name) {
            alert('请输入项目名称');
            return;
        }
        var type = Utils.byId('newProjectType').value;
        var desc = (Utils.byId('newProjectDesc').value || '').trim() || '新的视觉生成项目';
        AppData.canvasProjects.unshift({
            id: '#' + AppData.nextIdCounter++,
            name: name,
            type: type,
            episodes: '待定',
            desc: desc
        });
        removeModal('modal-create-project');
        renderProjectList();
    }

    function enterProject(id, name) {
        Utils.byId('canvasProjectName').textContent = id + ' - ' + name;
        Utils.pageTitle('图片生成 - ' + name);
        Utils.byId('mainContent').style.display = 'none';
        Utils.byId('workspace-canvas').classList.remove('hidden');
    }

    function setSize(btn, value) {
        Utils.qsa('.size-btn').forEach(function(item) { item.classList.remove('active'); });
        btn.classList.add('active');
        canvasSize = value;
    }

    function setStyle(btn, value) {
        Utils.qsa('.style-btn').forEach(function(item) { item.classList.remove('active'); });
        btn.classList.add('active');
        canvasStyle = value;
    }

    function clearWorkspace() {
        Utils.byId('canvasCardsArea').innerHTML = '';
        Utils.byId('generateHistory').innerHTML = '';
        Utils.byId('canvasEmpty').style.display = '';
        updateHistoryCount();
    }

    function addTextNode() {
        var text = prompt('请输入文本节点内容', '在这里记录镜头说明、角色描述或补充备注。');
        if (text === null) return;
        addNode({
            title: '文本节点',
            bodyHtml: '<div class="node-body" style="padding:16px;color:#dce1eb;line-height:1.7;">' + Utils.escapeHtml(text || '空文本') + '</div>',
            footer: '文本备注'
        });
    }

    function uploadLocalImage() {
        var input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.style.display = 'none';
        input.onchange = function() {
            var file = input.files[0];
            if (!file) return;
            var reader = new FileReader();
            reader.onload = function(e) {
                addImageNode(e.target.result, file.name);
            };
            reader.readAsDataURL(file);
        };
        document.body.appendChild(input);
        input.click();
        setTimeout(function() {
            if (input.parentNode) input.parentNode.removeChild(input);
        }, 500);
    }

    function generateImage() {
        var promptText = (Utils.byId('promptPositive').value || '').trim();
        if (!promptText) {
            alert('请先输入正面提示词');
            return;
        }

        genCounter += 1;
        var palette = ['1d4ed8', '0369a1', '7c3aed', 'db2777', '0f766e', 'ca8a04'];
        var color = palette[(genCounter - 1) % palette.length];
        var imgUrl = 'https://placehold.co/1024x1024/' + color + '/ffffff?text=' + encodeURIComponent(promptText.slice(0, 18));

        addImageNode(imgUrl, 'AI生成-' + genCounter, canvasSize + ' / ' + canvasStyle);
        addHistoryThumb(imgUrl, promptText);
        Utils.byId('canvasEmpty').style.display = 'none';
    }

    function addImageNode(imageUrl, title, meta) {
        addNode({
            title: title || '图片节点',
            bodyHtml: '<div class="node-image" style="height:200px;cursor:pointer" onclick="CanvasModule.previewImage(\'' + imageUrl + '\')"><img src="' + imageUrl + '" alt="generated image" style="width:100%;height:100%;object-fit:cover"></div>',
            footer: meta || '图片资源',
            actions: '<button class="table-action-link" onclick="event.stopPropagation();CanvasModule.showSaveModal(\'' + imageUrl + '\')">保存</button>'
                + '<button class="table-action-link" onclick="event.stopPropagation();CanvasModule.editImage(\'' + imageUrl + '\',\'' + ('node-' + (nodeCounter + 1)) + '\')">编辑</button>'
                + '<button class="table-action-link is-warn" onclick="event.stopPropagation();CanvasModule.downloadImg(\'' + imageUrl + '\')">下载</button>'
        });
    }

    function addNode(config) {
        nodeCounter += 1;
        var nodeId = 'node-' + nodeCounter;
        var node = document.createElement('div');
        node.id = nodeId;
        node.className = 'canvas-node';
        node.style.position = 'absolute';
        node.style.left = (48 + nodeCounter * 24) + 'px';
        node.style.top = (48 + nodeCounter * 24) + 'px';
        node.style.width = '300px';
        node.innerHTML = '<div class="node-header"><span>' + Utils.escapeHtml(config.title || '节点') + '</span><i class="fa-solid fa-xmark" style="cursor:pointer" onclick="document.getElementById(\'' + nodeId + '\').remove()"></i></div>'
            + config.bodyHtml
            + '<div class="node-footer" style="padding:10px 12px;display:flex;justify-content:space-between;align-items:center;gap:12px">'
            + '<span>' + Utils.escapeHtml(config.footer || '') + '</span>'
            + '<div class="table-action-group">' + (config.actions || '') + '</div>'
            + '</div>';

        Utils.byId('canvasCardsArea').appendChild(node);
        Utils.byId('canvasEmpty').style.display = 'none';
        makeDraggable(node);
    }

    function addHistoryThumb(url, title) {
        var item = document.createElement('button');
        item.className = 'history-thumb';
        item.title = title;
        item.innerHTML = '<img src="' + url + '" alt="history" style="width:100%;height:100%;object-fit:cover">';
        item.onclick = function() {
            previewImage(url);
        };
        Utils.byId('generateHistory').prepend(item);
        updateHistoryCount();
    }

    function updateHistoryCount() {
        var count = Utils.qsa('.history-thumb', Utils.byId('generateHistory')).length;
        Utils.byId('historyCount').textContent = count + ' 张';
    }

    function previewImage(url) {
        removeModal('image-preview-overlay');
        var overlay = document.createElement('div');
        overlay.id = 'image-preview-overlay';
        overlay.className = 'modal-overlay is-visible';
        overlay.style.display = 'flex';
        overlay.innerHTML = '<div style="max-width:92vw;max-height:92vh"><img src="' + url + '" alt="preview" style="max-width:100%;max-height:92vh;border-radius:20px;box-shadow:0 30px 80px rgba(0,0,0,0.45)"></div>';
        overlay.addEventListener('click', function() { overlay.remove(); });
        document.body.appendChild(overlay);
    }

    function downloadImg(url) {
        var a = document.createElement('a');
        a.href = url;
        a.download = 'canvas-' + Date.now() + '.png';
        a.click();
    }

    function showSaveModal(imgUrl) {
        removeModal('modal-save-image');
        var overlay = document.createElement('div');
        overlay.id = 'modal-save-image';
        overlay.className = 'modal-overlay is-visible';
        overlay.style.display = 'flex';
        overlay.innerHTML = '<div class="dialog-card dialog-card--small" onclick="event.stopPropagation()">'
            + '<div class="dialog-card__header"><h3>保存图片</h3><button class="detail-close" onclick="document.getElementById(\'modal-save-image\').remove()">&times;</button></div>'
            + '<div class="dialog-card__body stack-list">'
            + '<button class="download-option" onclick="CanvasModule.showProjectSaveForm(\'' + imgUrl + '\')"><span>保存到项目图库</span><i class="fa-solid fa-chevron-right"></i></button>'
            + '<button class="download-option" onclick="CanvasModule.showMaterialSaveForm(\'' + imgUrl + '\')"><span>保存到素材库</span><i class="fa-solid fa-chevron-right"></i></button>'
            + '<button class="download-option" onclick="CanvasModule.saveToLocal(\'' + imgUrl + '\')"><span>直接下载到本地</span><i class="fa-solid fa-chevron-right"></i></button>'
            + '</div></div>';
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) overlay.remove();
        });
        document.body.appendChild(overlay);
    }

    function showProjectSaveForm(imgUrl) {
        var name = prompt('请输入项目图库名称', '新视觉资产');
        if (name === null) return;
        AppData.projectImages.unshift({ name: name, url: imgUrl, createdAt: new Date().toISOString() });
        removeModal('modal-save-image');
        showToast('已保存到项目图库');
    }

    function doProjectSave() {}

    function showMaterialSaveForm(imgUrl) {
        var name = prompt('请输入素材名称', '通用视觉素材');
        if (name === null) return;
        AppData.materialImages.unshift({ name: name, url: imgUrl, createdAt: new Date().toISOString() });
        removeModal('modal-save-image');
        showToast('已保存到素材库');
    }

    function doMaterialSave() {}

    function saveToLocal(imgUrl) {
        downloadImg(imgUrl);
        removeModal('modal-save-image');
    }

    function editImage(imgUrl, nodeId) {
        editorState.imageUrl = imgUrl;
        editorState.nodeId = nodeId || '';
        removeModal('image-editor-modal');

        var overlay = document.createElement('div');
        overlay.id = 'image-editor-modal';
        overlay.className = 'modal-overlay is-visible';
        overlay.style.display = 'flex';
        overlay.innerHTML = '<div class="detail-modal" onclick="event.stopPropagation()">'
            + '<div class="detail-topbar"><h3 class="detail-title">图片编辑</h3><button class="detail-close" onclick="CanvasModule.closeEditor()">&times;</button></div>'
            + '<div class="detail-body detail-body--column">'
            + '<p class="detail-copy">当前重构版本先保留轻量编辑入口。你可以继续预览、下载，后续再把复杂编辑器拆成独立模块接回。</p>'
            + '<div style="display:flex;justify-content:center"><img src="' + imgUrl + '" alt="editor preview" style="max-width:100%;max-height:60vh;border-radius:18px"></div>'
            + '</div>'
            + '<div class="detail-footer"><button class="secondary-btn" onclick="CanvasModule.downloadEditedImage()">下载当前图片</button><button class="primary-btn" onclick="CanvasModule.saveEditedImage()">作为新版本保存</button></div>'
            + '</div>';
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) overlay.remove();
        });
        document.body.appendChild(overlay);
    }

    function setEditorTool() {}
    function undoEditor() {}
    function clearEditorDrawings() {}

    function downloadEditedImage() {
        if (editorState.imageUrl) downloadImg(editorState.imageUrl);
    }

    function saveEditedImage() {
        if (editorState.imageUrl) {
            AppData.projectImages.unshift({ name: '编辑后图片', url: editorState.imageUrl, createdAt: new Date().toISOString() });
            showToast('已作为新版本保存');
        }
        closeEditor();
    }

    function closeEditor() {
        removeModal('image-editor-modal');
    }

    function initCanvasEvents() {
        var board = Utils.byId('canvasWorkspace');
        if (!board || board.dataset.bound === '1') return;
        board.dataset.bound = '1';
        board.addEventListener('mousemove', function(e) {
            var coord = Utils.byId('canvasCoord');
            if (coord) coord.textContent = 'X:' + Math.round(e.offsetX) + ' Y:' + Math.round(e.offsetY);
        });
        board.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            showContextMenu(e.clientX, e.clientY);
        });
        document.addEventListener('mouseup', stopDragging);
        document.addEventListener('mousemove', onDragging);
    }

    function initCoordTracker() {
        initCanvasEvents();
    }

    function makeDraggable(node) {
        node.addEventListener('mousedown', function(e) {
            if (e.target.closest('button') || e.target.closest('i')) return;
            dragState = {
                node: node,
                startX: e.clientX,
                startY: e.clientY,
                left: parseInt(node.style.left, 10) || 0,
                top: parseInt(node.style.top, 10) || 0
            };
        });
    }

    function onDragging(e) {
        if (!dragState) return;
        dragState.node.style.left = dragState.left + (e.clientX - dragState.startX) + 'px';
        dragState.node.style.top = dragState.top + (e.clientY - dragState.startY) + 'px';
    }

    function stopDragging() {
        dragState = null;
    }

    function showContextMenu(x, y) {
        removeModal('canvas-context-menu');
        var menu = document.createElement('div');
        menu.id = 'canvas-context-menu';
        menu.style.cssText = 'position:fixed;left:' + x + 'px;top:' + y + 'px;z-index:1200;background:#1f2430;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:8px;box-shadow:0 20px 50px rgba(0,0,0,0.35)';
        menu.innerHTML = '<button class="secondary-btn" style="width:100%;justify-content:flex-start;margin-bottom:6px" onclick="CanvasModule.addTextNode();document.getElementById(\'canvas-context-menu\').remove()">添加文本节点</button>'
            + '<button class="secondary-btn" style="width:100%;justify-content:flex-start" onclick="CanvasModule.uploadLocalImage();document.getElementById(\'canvas-context-menu\').remove()">上传本地图片</button>';
        document.body.appendChild(menu);
        setTimeout(function() {
            document.addEventListener('click', handleContextMenuOutside, { once: true });
        }, 0);
    }

    function handleContextMenuOutside() {
        removeModal('canvas-context-menu');
    }

    function removeModal(id) {
        var el = Utils.byId(id);
        if (el) el.remove();
    }

    function showToast(message) {
        removeModal('canvas-toast');
        var toast = document.createElement('div');
        toast.id = 'canvas-toast';
        toast.style.cssText = 'position:fixed;left:50%;bottom:36px;transform:translateX(-50%);z-index:1300;padding:12px 18px;border-radius:999px;background:#111a2d;color:#fff;box-shadow:0 20px 50px rgba(0,0,0,0.25)';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(function() {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 1800);
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
        initCoordTracker: initCoordTracker
    };
})();

window.setCanvasSize = CanvasModule.setSize;
window.setCanvasStyle = CanvasModule.setStyle;
window.clearCanvasWorkspace = CanvasModule.clearWorkspace;
window.generateCanvasImage = CanvasModule.generateImage;
