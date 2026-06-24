var CanvasModule = (function() {
    var state = {
        currentProject: null,
        readonly: false,
        sharedOwner: '',
        nodeCounter: 0,
        frameCounter: 0,
        lineCounter: 0,
        nodes: {},
        frames: {},
        lines: [],
        selectedNodeId: '',
        clipboardNode: null,
        drag: null,
        lineDrag: null,
        defaults: { model: 'GPT', ratio: '16:9 · 2K', quality: '高清' },
        seededProjects: {},
        sharedCanvases: [
            { id: 'share-a', owner: '同组成员 A', title: '角色设定共享画布' },
            { id: 'share-b', owner: '同组成员 B', title: '场景参考共享画布' }
        ]
    };

    var modelOptions = ['GPT', 'LibNano', 'Seedream 5.0', 'Midjourney V7', 'Niji 7'];
    var ratioOptions = ['1:1 · 1K', '16:9 · 2K', '9:16 · 2K', '4:3 · 2K', '3:4 · 2K'];
    var qualityOptions = ['标准', '高清', '超清', '4K'];
    var frameColors = ['#3b82f6', '#f59e0b', '#10b981', '#a855f7', '#ef4444'];

    function renderProjectList() {
        var tbody = Utils.byId('canvasProjectTableBody');
        var countEl = Utils.byId('canvasProjectCount');
        var totalEl = Utils.byId('canvasProjectTotal');
        if (!tbody) return;
        tbody.innerHTML = '';
        AppData.canvasProjects.forEach(function(project) {
            var tr = document.createElement('tr');
            tr.innerHTML = '<td><span class="table-id"></span></td><td><span class="table-title"></span></td><td><span class="table-pill table-pill-category"></span></td><td><span class="table-number table-muted"></span></td><td class="table-muted"></td><td class="text-center"><div class="table-action-group"></div></td>';
            tr.querySelector('.table-id').textContent = project.id;
            tr.querySelector('.table-title').textContent = project.name;
            tr.querySelector('.table-pill').textContent = project.type;
            tr.querySelector('.table-number').textContent = project.episodes;
            tr.children[4].textContent = project.desc;
            var btn = document.createElement('button');
            btn.className = 'table-action-link is-accent';
            btn.textContent = '进入创作';
            btn.addEventListener('click', function() { enterProject(project.id, project.name); });
            tr.querySelector('.table-action-group').appendChild(btn);
            tbody.appendChild(tr);
        });
        var count = AppData.canvasProjects.length;
        if (countEl) countEl.textContent = '共 ' + count + ' 个项目';
        if (totalEl) totalEl.textContent = '共 ' + count + ' 条';
    }

    function showCreateProjectModal() {
        removeModal('modal-create-project');
        var overlay = createOverlay('modal-create-project');
        overlay.innerHTML = '<div class="dialog-card dialog-card--small" data-card><div class="dialog-card__header"><h3>新建图片生成项目</h3><button class="detail-close" data-close>&times;</button></div><div class="dialog-card__body stack-list"><label class="field"><span>项目名称</span><input id="newProjectName" type="text" placeholder="请输入项目名称"></label><label class="field"><span>项目题材</span><select id="newProjectType"><option>都市</option><option>民国</option><option>玄幻</option><option>悬疑</option></select></label><label class="field"><span>项目说明</span><textarea id="newProjectDesc" rows="3" placeholder="描述项目用途与视觉方向"></textarea></label><div class="flex-inline" style="justify-content:flex-end"><button class="secondary-btn" data-close>取消</button><button class="primary-btn" data-create>创建项目</button></div></div></div>';
        bindOverlay(overlay);
        overlay.querySelector('[data-create]').addEventListener('click', createProject);
        document.body.appendChild(overlay);
    }

    function createProject() {
        var name = (Utils.byId('newProjectName').value || '').trim();
        if (!name) { alert('请输入项目名称'); return; }
        AppData.canvasProjects.unshift({
            id: '#' + AppData.nextIdCounter++,
            name: name,
            type: Utils.byId('newProjectType').value,
            episodes: '待定',
            desc: (Utils.byId('newProjectDesc').value || '').trim() || '新的视觉生成项目'
        });
        removeModal('modal-create-project');
        renderProjectList();
    }

    function enterProject(id, name) {
        state.currentProject = { id: id, name: name };
        state.readonly = false;
        state.sharedOwner = '';
        setWorkspaceTitle(name || id);
        Utils.pageTitle('图片生成 - ' + (name || id));
        Utils.byId('mainContent').style.display = 'none';
        Utils.byId('workspace-canvas').classList.remove('hidden');
        setReadonly(false);
        initCanvasEvents();
        if (!state.seededProjects[id]) {
            clearWorkspace(false);
            addPromptNode({ x: 250, y: 180, name: '主视觉提示词' });
            addImageNode(sampleImageUrl('古风女子提灯穿过雪夜街巷'), '图片节点 4', '示例生成图', { x: 250, y: 420, prompt: '古风女子提灯穿过雪夜街巷' });
            addPromptNode({ x: 720, y: 330, text: '描述你想要生成的画面内容，按序导出指令，@引用素材', wide: true, name: '场景扩展' });
            addImagePlaceholder('图片节点 6', { x: 780, y: 180 });
            state.seededProjects[id] = true;
        }
    }

    function openSharePanel() {
        removeModal('canvas-share-panel');
        var overlay = createOverlay('canvas-share-panel');
        overlay.innerHTML = '<div class="dialog-card dialog-card--small" data-card><div class="dialog-card__header"><h3>共享画布</h3><button class="detail-close" data-close>&times;</button></div><div class="dialog-card__body stack-list"><button class="download-option" data-own><span>我的当前画布</span><i class="fa-solid fa-chevron-right"></i></button><div class="canvas-share-list"></div><button class="secondary-btn" data-request><i class="fa-regular fa-pen-to-square"></i> 申请共享画布修改权限</button></div></div>';
        bindOverlay(overlay);
        var list = overlay.querySelector('.canvas-share-list');
        state.sharedCanvases.forEach(function(item) {
            var btn = document.createElement('button');
            btn.className = 'download-option';
            btn.innerHTML = '<span>' + escapeText(item.owner + ' · ' + item.title) + '</span><i class="fa-solid fa-eye"></i>';
            btn.addEventListener('click', function() { overlay.remove(); loadSharedCanvas(item); });
            list.appendChild(btn);
        });
        overlay.querySelector('[data-own]').addEventListener('click', function() { overlay.remove(); enterProject(state.currentProject ? state.currentProject.id : '#local', state.currentProject ? state.currentProject.name : '我的画布'); });
        overlay.querySelector('[data-request]').addEventListener('click', function() { showToast('已提交修改权限申请'); });
        document.body.appendChild(overlay);
    }

    function loadSharedCanvas(item) {
        clearWorkspace(false);
        state.currentProject = { id: item.id, name: item.title };
        state.sharedOwner = item.owner;
        setWorkspaceTitle(item.title + '（只读）');
        setReadonly(false);
        addPromptNode({ x: 260, y: 180, name: item.owner + ' 提示词', text: '共享画布提示词：古风街巷，冷暖对比，角色看向镜头。' });
        addImageNode(sampleImageUrl(item.title), item.owner + ' 生成图', '共享图片', { x: 630, y: 170, prompt: '共享画布提示词：古风街巷，冷暖对比，角色看向镜头。', readonly: true });
        addFrameBox({ x: 220, y: 130, width: 780, height: 360, title: '共享参考区', color: '#3b82f6', readonly: true });
        setReadonly(true);
    }

    function setWorkspaceTitle(text) {
        var el = Utils.byId('canvasProjectName');
        if (el) el.textContent = text;
    }

    function setReadonly(readonly) {
        state.readonly = readonly;
        var workspace = Utils.byId('workspace-canvas');
        if (workspace) workspace.classList.toggle('canvas-readonly', readonly);
        Utils.qsa('.canvas-icon-btn, .canvas-create-btn').forEach(function(btn) {
            var title = btn.getAttribute('title') || '';
            if (title.indexOf('共享') !== -1 || title.indexOf('全局') !== -1) return;
            btn.disabled = readonly;
        });
        if (readonly) showToast('正在查看共享画布：仅允许复制和下载');
    }

    function clearWorkspace(showEmpty) {
        var area = Utils.byId('canvasCardsArea');
        if (area) area.innerHTML = '';
        var svg = Utils.byId('canvasConnections');
        if (svg) svg.innerHTML = '';
        state.nodes = {};
        state.frames = {};
        state.lines = [];
        state.nodeCounter = 0;
        state.frameCounter = 0;
        state.lineCounter = 0;
        state.selectedNodeId = '';
        if (showEmpty !== false) setEmptyVisible(true);
    }

    function openGlobalSettings() {
        removeModal('canvas-global-settings');
        var overlay = createOverlay('canvas-global-settings');
        overlay.innerHTML = '<div class="dialog-card dialog-card--small" data-card><div class="dialog-card__header"><h3>全局设定</h3><button class="detail-close" data-close>&times;</button></div><div class="dialog-card__body stack-list"><label class="field"><span>默认模型</span><select data-model></select></label><label class="field"><span>默认比例</span><select data-ratio></select></label><label class="field"><span>默认画质</span><select data-quality></select></label><div class="flex-inline" style="justify-content:flex-end"><button class="secondary-btn" data-close>取消</button><button class="primary-btn" data-save>应用到全部生成节点</button></div></div></div>';
        bindOverlay(overlay);
        fillSelect(overlay.querySelector('[data-model]'), modelOptions, state.defaults.model);
        fillSelect(overlay.querySelector('[data-ratio]'), ratioOptions, state.defaults.ratio);
        fillSelect(overlay.querySelector('[data-quality]'), qualityOptions, state.defaults.quality);
        overlay.querySelector('[data-save]').addEventListener('click', function() {
            state.defaults.model = overlay.querySelector('[data-model]').value;
            state.defaults.ratio = overlay.querySelector('[data-ratio]').value;
            state.defaults.quality = overlay.querySelector('[data-quality]').value;
            Utils.qsa('.canvas-node--prompt').forEach(function(node) { applyDefaultsToPromptNode(node); });
            overlay.remove();
            showToast('全局设定已应用');
        });
        document.body.appendChild(overlay);
    }

    function addTextNode(text, position) {
        if (state.readonly) return requestEditPermission();
        if (typeof text !== 'string') text = prompt('请输入文本节点内容', '在这里记录镜头说明、角色描述或补充备注。');
        if (text === null) return;
        var body = document.createElement('div');
        body.className = 'node-body canvas-text-node';
        body.textContent = text || '空文本';
        addNode({ type: 'text', title: '文本节点', body: body, footer: '文本备注', x: position && position.x, y: position && position.y, prompt: text || '' });
    }

    function addPromptNode(options) {
        if (state.readonly) return requestEditPermission();
        options = options || {};
        var id = nextNodeId();
        var body = document.createElement('div');
        body.className = 'canvas-prompt-node' + (options.wide ? ' canvas-prompt-node--wide' : '');
        body.innerHTML = '<label class="canvas-node-name"><input placeholder="节点命名"></label><div class="prompt-tools"><button type="button" data-copy><i class="fa-regular fa-copy"></i><span>复制</span></button><button type="button" data-history><i class="fa-regular fa-clock"></i><span>历史</span></button></div><textarea placeholder="描述你想要生成的画面内容，@引用素材"></textarea><div class="prompt-footer"></div>';
        body.querySelector('.canvas-node-name input').value = options.name || '生成节点';
        body.querySelector('textarea').value = options.text || '写下你的画面描述，模型会自动补全。例如：一个水墨风格的古代女子，在街市提着竹篮。';
        var footer = body.querySelector('.prompt-footer');
        footer.appendChild(createSelect(modelOptions, state.defaults.model, function(value) { state.defaults.model = value; }));
        footer.appendChild(createSelect(ratioOptions, state.defaults.ratio, function(value) { state.defaults.ratio = value; }));
        footer.appendChild(createSelect(qualityOptions, state.defaults.quality, function(value) { state.defaults.quality = value; }));
        var cost = document.createElement('span');
        cost.className = 'prompt-cost';
        cost.textContent = '¥ 14';
        footer.appendChild(cost);
        var send = document.createElement('button');
        send.className = 'prompt-send';
        send.title = '生成图片';
        send.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
        send.addEventListener('click', function() { generateImageFromNode(id); });
        footer.appendChild(send);
        body.querySelector('[data-copy]').addEventListener('click', function() { copyNode(id); });
        body.querySelector('[data-history]').addEventListener('click', function() { showNodeHistory(id); });
        addNode({ id: id, type: 'prompt', title: options.name || '生成节点', body: body, chromeless: true, x: options.x, y: options.y, width: options.wide ? 430 : 340, prompt: body.querySelector('textarea').value });
    }

    function addImagePlaceholder(title, position) {
        if (state.readonly) return requestEditPermission();
        var body = document.createElement('div');
        body.className = 'canvas-image-placeholder';
        body.innerHTML = '<i class="fa-regular fa-image"></i>';
        addNode({ type: 'image', title: title || '图片节点', body: body, footer: '待生成', x: position && position.x, y: position && position.y, width: 320 });
    }

    function addImageNode(imageUrl, title, meta, options) {
        options = options || {};
        var wrap = document.createElement('div');
        wrap.className = 'node-image-wrap';
        var image = document.createElement('div');
        image.className = 'node-image';
        image.innerHTML = '<img alt="generated image">';
        image.querySelector('img').src = imageUrl;
        image.addEventListener('click', function(e) { e.stopPropagation(); selectNode(image.closest('.canvas-node').id); });
        image.addEventListener('dblclick', function(e) { e.stopPropagation(); previewImage(imageUrl); });
        wrap.appendChild(image);
        var actions = document.createElement('div');
        actions.className = 'image-hover-actions';
        var actionList = (state.readonly || options.readonly) ? [
            ['放大', function() { previewImage(imageUrl); }],
            ['下载', function() { downloadImg(imageUrl); }],
            ['复制', function(btn) { copyNode(btn.closest('.canvas-node').id); }],
            ['申请修改', requestEditPermission]
        ] : [
            ['放大', function() { previewImage(imageUrl); }],
            ['历史', function(btn) { showNodeHistory(btn.closest('.canvas-node').id); }],
            ['保存', function() { showSaveModal(imageUrl); }],
            ['删除', function(btn) { deleteNode(btn); }]
        ];
        actionList.forEach(function(item) {
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.textContent = item[0];
            btn.addEventListener('click', function(e) { e.stopPropagation(); item[1](btn); });
            actions.appendChild(btn);
        });
        wrap.appendChild(actions);
        addNode({ type: 'image', title: title || '图片节点', body: wrap, footer: meta || '图片资源', x: options.x, y: options.y, width: 320, imageUrl: imageUrl, prompt: options.prompt || '' });
    }

    function addNode(config) {
        var id = config.id || nextNodeId();
        var node = document.createElement('div');
        node.id = id;
        node.className = 'canvas-node canvas-node--' + (config.type || 'default') + (config.chromeless ? ' canvas-node--chromeless' : '');
        node.dataset.type = config.type || 'default';
        node.dataset.prompt = config.prompt || '';
        node.dataset.imageUrl = config.imageUrl || '';
        node.dataset.title = config.title || '节点';
        node.style.position = 'absolute';
        node.style.left = (Number.isFinite(config.x) ? config.x : 260 + state.nodeCounter * 28) + 'px';
        node.style.top = (Number.isFinite(config.y) ? config.y : 150 + state.nodeCounter * 28) + 'px';
        node.style.width = (config.width || 320) + 'px';
        if (config.chromeless) {
            node.appendChild(config.body);
        } else {
            var header = document.createElement('div');
            header.className = 'node-header';
            header.innerHTML = '<span><i class="fa-regular fa-image"></i> </span><button title="删除"><i class="fa-solid fa-xmark"></i></button>';
            header.querySelector('span').appendChild(document.createTextNode(config.title || '节点'));
            header.querySelector('button').addEventListener('click', function() { removeNode(id); });
            node.appendChild(header);
            node.appendChild(config.body);
            var footer = document.createElement('div');
            footer.className = 'node-footer';
            footer.innerHTML = '<span></span>';
            footer.querySelector('span').textContent = config.footer || '';
            node.appendChild(footer);
        }
        addConnectHandle(node);
        Utils.byId('canvasCardsArea').appendChild(node);
        state.nodes[id] = { id: id, type: config.type || 'default', history: [], createdAt: Date.now() };
        setEmptyVisible(false);
        makeDraggable(node);
        node.addEventListener('click', function(e) { if (!e.target.closest('button,select,textarea,input')) selectNode(id); });
        return node;
    }

    function addConnectHandle(node) {
        var handle = document.createElement('button');
        handle.type = 'button';
        handle.className = 'canvas-connect-handle';
        handle.title = '拖拽连线';
        handle.innerHTML = '<i class="fa-solid fa-plus"></i>';
        handle.addEventListener('mousedown', startLineDrag);
        node.appendChild(handle);
    }

    function generateImageFromNode(id) {
        if (state.readonly) return requestEditPermission();
        var node = Utils.byId(id);
        if (!node) return;
        var textarea = node.querySelector('textarea');
        var prompt = textarea ? textarea.value.trim() : '';
        if (!prompt) { alert('请先输入画面描述'); return; }
        var selects = node.querySelectorAll('.prompt-footer select');
        var meta = (selects[0] ? selects[0].value : state.defaults.model) + ' / ' + (selects[1] ? selects[1].value : state.defaults.ratio) + ' / ' + (selects[2] ? selects[2].value : state.defaults.quality);
        var imgUrl = sampleImageUrl(prompt);
        var pos = nodePosition(node);
        addImageNode(imgUrl, '生成图 ' + (state.nodes[id].history.length + 1), meta, { x: pos.x + 70, y: pos.y + 230, prompt: prompt });
        state.nodes[id].history.unshift({ url: imgUrl, prompt: prompt, meta: meta, time: new Date().toLocaleString() });
        showToast('生成完成，历史已记录');
    }

    function showNodeHistory(id) {
        var node = Utils.byId(id);
        if (!node) return;
        var record = state.nodes[id] || { history: [] };
        removeModal('canvas-history-modal');
        var overlay = createOverlay('canvas-history-modal');
        overlay.innerHTML = '<div class="dialog-card" data-card><div class="dialog-card__header"><h3>节点历史生成图片</h3><button class="detail-close" data-close>&times;</button></div><div class="dialog-card__body"><div class="canvas-history-grid"></div></div></div>';
        bindOverlay(overlay);
        var grid = overlay.querySelector('.canvas-history-grid');
        if (!record.history.length && node.dataset.imageUrl) record.history = [{ url: node.dataset.imageUrl, prompt: node.dataset.prompt || node.dataset.title, meta: '当前图片', time: '当前版本' }];
        if (!record.history.length) grid.innerHTML = '<div class="canvas-empty-history">暂无历史生成图片</div>';
        record.history.forEach(function(item) {
            var card = document.createElement('div');
            card.className = 'canvas-history-card';
            card.innerHTML = '<img alt="history"><strong></strong><p></p><div><button class="secondary-btn" data-preview>放大</button><button class="secondary-btn" data-copy>复制提示词</button></div>';
            card.querySelector('img').src = item.url;
            card.querySelector('strong').textContent = item.time;
            card.querySelector('p').textContent = item.prompt;
            card.querySelector('[data-preview]').addEventListener('click', function() { previewImage(item.url); });
            card.querySelector('[data-copy]').addEventListener('click', function() { copyText(item.prompt); });
            grid.appendChild(card);
        });
        document.body.appendChild(overlay);
    }

    function addFrameBox(options) {
        if (state.readonly && !(options && options.readonly)) return requestEditPermission();
        options = options || {};
        var id = 'frame-' + (++state.frameCounter);
        var frame = document.createElement('div');
        frame.id = id;
        frame.className = 'canvas-frame-box';
        frame.dataset.color = options.color || frameColors[state.frameCounter % frameColors.length];
        frame.style.left = (options.x || 180) + 'px';
        frame.style.top = (options.y || 120) + 'px';
        frame.style.width = (options.width || 560) + 'px';
        frame.style.height = (options.height || 360) + 'px';
        frame.style.setProperty('--frame-color', frame.dataset.color);
        frame.innerHTML = '<div class="canvas-frame-head"><input value="' + escapeText(options.title || '分组大框') + '"><select></select><button title="取消大框">×</button></div>';
        fillSelect(frame.querySelector('select'), frameColors, frame.dataset.color);
        frame.querySelector('select').addEventListener('change', function(e) { frame.dataset.color = e.target.value; frame.style.setProperty('--frame-color', e.target.value); });
        frame.querySelector('button').addEventListener('click', function() { removeFrame(id); });
        Utils.byId('canvasCardsArea').prepend(frame);
        state.frames[id] = { id: id };
        makeFrameDraggable(frame);
        return frame;
    }

    function makeFrameDraggable(frame) {
        frame.querySelector('.canvas-frame-head').addEventListener('mousedown', function(e) {
            if (e.target.closest('button,select,input')) return;
            var start = { x: e.clientX, y: e.clientY, left: parseInt(frame.style.left, 10), top: parseInt(frame.style.top, 10), nodes: nodesInsideFrame(frame).map(function(node) { return { node: node, left: parseInt(node.style.left, 10), top: parseInt(node.style.top, 10) }; }) };
            state.drag = { type: 'frame', frame: frame, start: start };
        });
    }

    function nodesInsideFrame(frame) {
        var f = rectFromStyle(frame);
        return Array.prototype.filter.call(Utils.qsa('.canvas-node'), function(node) {
            var n = rectFromStyle(node);
            return n.x >= f.x && n.y >= f.y && n.x + n.width <= f.x + f.width && n.y + n.height <= f.y + f.height;
        });
    }

    function removeFrame(id) {
        var frame = Utils.byId(id);
        if (frame) frame.remove();
        delete state.frames[id];
    }

    function startLineDrag(e) {
        e.preventDefault();
        e.stopPropagation();
        if (state.readonly) return requestEditPermission();
        var source = e.currentTarget.closest('.canvas-node');
        state.lineDrag = { sourceId: source.id, x: e.clientX, y: e.clientY };
        drawTempLine(e.clientX, e.clientY);
    }

    function finishLineDrag(e) {
        if (!state.lineDrag) return;
        var point = boardPoint(e);
        var target = e.target.closest ? e.target.closest('.canvas-node') : null;
        if (!target || target.id === state.lineDrag.sourceId) {
            addPromptNode({ x: point.x, y: point.y, name: '连接生成节点' });
            target = Utils.qs('.canvas-node:last-child', Utils.byId('canvasCardsArea'));
        }
        if (target) addConnection(state.lineDrag.sourceId, target.id);
        state.lineDrag = null;
        renderConnections();
    }

    function addConnection(from, to) {
        if (!from || !to || from === to) return;
        state.lines.push({ id: 'line-' + (++state.lineCounter), from: from, to: to });
        renderConnections();
    }

    function renderConnections() {
        var svg = Utils.byId('canvasConnections');
        if (!svg) return;
        svg.innerHTML = '';
        state.lines.forEach(function(line) {
            var from = Utils.byId(line.from);
            var to = Utils.byId(line.to);
            if (!from || !to) return;
            var a = centerOf(from);
            var b = centerOf(to);
            var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            var mid = Math.max(60, Math.abs(b.x - a.x) / 2);
            path.setAttribute('d', 'M ' + a.x + ' ' + a.y + ' C ' + (a.x + mid) + ' ' + a.y + ', ' + (b.x - mid) + ' ' + b.y + ', ' + b.x + ' ' + b.y);
            path.setAttribute('class', 'canvas-link-line');
            svg.appendChild(path);
        });
    }

    function drawTempLine(clientX, clientY) {
        renderConnections();
        var svg = Utils.byId('canvasConnections');
        var source = Utils.byId(state.lineDrag.sourceId);
        if (!svg || !source) return;
        var a = centerOf(source);
        var p = clientToBoard(clientX, clientY);
        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('class', 'canvas-link-line is-temp');
        path.setAttribute('d', 'M ' + a.x + ' ' + a.y + ' C ' + (a.x + 80) + ' ' + a.y + ', ' + (p.x - 80) + ' ' + p.y + ', ' + p.x + ' ' + p.y);
        svg.appendChild(path);
    }

    function selectNode(id) {
        state.selectedNodeId = id;
        Utils.qsa('.canvas-node.is-selected').forEach(function(item) { item.classList.remove('is-selected'); });
        var node = Utils.byId(id);
        if (node) node.classList.add('is-selected');
    }

    function copyNode(id) {
        var node = Utils.byId(id || state.selectedNodeId);
        if (!node) return;
        state.clipboardNode = serializeNode(node);
        copyText(state.clipboardNode.prompt || state.clipboardNode.title || '');
        showToast('节点和提示词已复制');
    }

    function pasteNode(position) {
        if (!state.clipboardNode) return;
        if (state.readonly) return requestEditPermission();
        var data = JSON.parse(JSON.stringify(state.clipboardNode));
        var pos = position || { x: data.x + 36, y: data.y + 36 };
        if (data.type === 'prompt') addPromptNode({ x: pos.x, y: pos.y, text: data.prompt, name: data.title, wide: data.width > 380 });
        else if (data.type === 'image') addImageNode(data.imageUrl || sampleImageUrl(data.prompt || data.title), data.title + ' 副本', data.footer || '复制节点', { x: pos.x, y: pos.y, prompt: data.prompt });
        else addTextNode(data.prompt || data.title, pos);
    }

    function serializeNode(node) {
        var textarea = node.querySelector('textarea');
        var nameInput = node.querySelector('.canvas-node-name input');
        return {
            type: node.dataset.type,
            title: nameInput ? nameInput.value : node.dataset.title,
            prompt: textarea ? textarea.value : node.dataset.prompt,
            imageUrl: node.dataset.imageUrl,
            x: parseInt(node.style.left, 10) || 0,
            y: parseInt(node.style.top, 10) || 0,
            width: parseInt(node.style.width, 10) || 320
        };
    }

    function searchNodes(keyword) {
        keyword = String(keyword || '').trim().toLowerCase();
        Utils.qsa('.canvas-node').forEach(function(node) {
            var text = (node.textContent + ' ' + node.dataset.prompt + ' ' + node.dataset.title).toLowerCase();
            var hit = !keyword || text.indexOf(keyword) !== -1;
            node.classList.toggle('is-search-dim', !hit);
            node.classList.toggle('is-search-hit', !!keyword && hit);
        });
    }

    function previewImage(url) {
        removeModal('image-preview-overlay');
        var overlay = createOverlay('image-preview-overlay');
        overlay.className += ' canvas-preview-overlay';
        overlay.innerHTML = '<div class="canvas-preview" data-card><button class="detail-close" data-close>&times;</button><img alt="preview"><div class="canvas-preview-tools"><button class="secondary-btn" data-minus>缩小</button><button class="secondary-btn" data-plus>放大</button><button class="secondary-btn" data-download>下载</button></div></div>';
        bindOverlay(overlay);
        var img = overlay.querySelector('img');
        var scale = 1;
        img.src = url;
        function applyScale() { img.style.transform = 'scale(' + scale + ')'; }
        overlay.querySelector('[data-plus]').addEventListener('click', function() { scale = Math.min(3, scale + 0.25); applyScale(); });
        overlay.querySelector('[data-minus]').addEventListener('click', function() { scale = Math.max(0.5, scale - 0.25); applyScale(); });
        overlay.querySelector('[data-download]').addEventListener('click', function() { downloadImg(url); });
        document.body.appendChild(overlay);
    }

    function showSaveModal(imgUrl) {
        removeModal('modal-save-image');
        var overlay = createOverlay('modal-save-image');
        overlay.innerHTML = '<div class="dialog-card dialog-card--small" data-card><div class="dialog-card__header"><h3>保存图片</h3><button class="detail-close" data-close>&times;</button></div><div class="dialog-card__body stack-list"><button class="download-option" data-project><span>保存到当前项目</span><i class="fa-solid fa-chevron-right"></i></button><button class="download-option" data-material><span>添加到素材库</span><i class="fa-solid fa-chevron-right"></i></button><button class="download-option" data-local><span>下载到本地</span><i class="fa-solid fa-chevron-right"></i></button></div></div>';
        bindOverlay(overlay);
        overlay.querySelector('[data-project]').addEventListener('click', function() { showProjectSaveForm(imgUrl); });
        overlay.querySelector('[data-material]').addEventListener('click', function() { showMaterialSaveForm(imgUrl); });
        overlay.querySelector('[data-local]').addEventListener('click', function() { saveToLocal(imgUrl); });
        document.body.appendChild(overlay);
    }

    function showProjectSaveForm(imgUrl) {
        var defaultName = state.currentProject ? state.currentProject.name + ' 生成图' : '项目生成图';
        var name = prompt('请输入项目图库名称', defaultName);
        if (name === null) return;
        AppData.projectImages.unshift({ name: name, projectId: state.currentProject && state.currentProject.id, url: imgUrl, createdAt: new Date().toISOString() });
        removeModal('modal-save-image');
        showToast('已保存到项目');
    }

    function showMaterialSaveForm(imgUrl) {
        var name = prompt('请输入素材名称', '通用视觉素材');
        if (name === null) return;
        AppData.materialImages.unshift({ name: name, url: imgUrl, createdAt: new Date().toISOString() });
        removeModal('modal-save-image');
        showToast('已添加到素材库');
    }

    function saveToLocal(imgUrl) { downloadImg(imgUrl); removeModal('modal-save-image'); }
    function downloadImg(url) { var a = document.createElement('a'); a.href = url; a.download = 'canvas-' + Date.now() + '.png'; a.click(); }
    function editImage(imgUrl) { previewImage(imgUrl); }
    function setEditorTool() {}
    function undoEditor() {}
    function clearEditorDrawings() {}
    function downloadEditedImage() {}
    function saveEditedImage() {}
    function closeEditor() { removeModal('image-editor-modal'); }
    function doProjectSave() {}
    function doMaterialSave() {}

    function initCanvasEvents() {
        var board = Utils.byId('canvasWorkspace');
        if (!board || board.dataset.bound === '1') return;
        board.dataset.bound = '1';
        board.addEventListener('mousemove', function(e) {
            var coord = Utils.byId('canvasCoord');
            var point = boardPoint(e);
            if (coord) coord.textContent = 'X:' + Math.round(point.x) + ' Y:' + Math.round(point.y);
            if (state.lineDrag) drawTempLine(e.clientX, e.clientY);
        });
        board.addEventListener('mouseup', finishLineDrag);
        board.addEventListener('contextmenu', function(e) { e.preventDefault(); showContextMenu(e.clientX, e.clientY, boardPoint(e)); });
        board.addEventListener('click', function(e) { if (e.target === board || e.target.id === 'canvasCardsArea') clearSelection(); });
        document.addEventListener('mouseup', stopDragging);
        document.addEventListener('mousemove', onDragging);
        document.addEventListener('keydown', handleKeydown);
    }

    function initCoordTracker() { initCanvasEvents(); }

    function makeDraggable(node) {
        node.addEventListener('mousedown', function(e) {
            if (e.target.closest('button,select,textarea,input')) return;
            if (state.readonly) return;
            selectNode(node.id);
            if (e.altKey) {
                copyNode(node.id);
                pasteNode({ x: parseInt(node.style.left, 10) + 36, y: parseInt(node.style.top, 10) + 36 });
                return;
            }
            state.drag = { type: 'node', node: node, startX: e.clientX, startY: e.clientY, left: parseInt(node.style.left, 10) || 0, top: parseInt(node.style.top, 10) || 0 };
            node.classList.add('is-dragging');
        });
    }

    function onDragging(e) {
        if (!state.drag) return;
        if (state.drag.type === 'node') {
            state.drag.node.style.left = Math.max(20, state.drag.left + (e.clientX - state.drag.startX)) + 'px';
            state.drag.node.style.top = Math.max(20, state.drag.top + (e.clientY - state.drag.startY)) + 'px';
        }
        if (state.drag.type === 'frame') {
            var dx = e.clientX - state.drag.start.x;
            var dy = e.clientY - state.drag.start.y;
            state.drag.frame.style.left = state.drag.start.left + dx + 'px';
            state.drag.frame.style.top = state.drag.start.top + dy + 'px';
            state.drag.start.nodes.forEach(function(item) {
                item.node.style.left = item.left + dx + 'px';
                item.node.style.top = item.top + dy + 'px';
            });
        }
        renderConnections();
    }

    function stopDragging() {
        Utils.qsa('.canvas-node.is-dragging').forEach(function(node) { node.classList.remove('is-dragging'); });
        state.drag = null;
        renderConnections();
    }

    function handleKeydown(e) {
        var active = document.activeElement;
        if (active && /INPUT|TEXTAREA|SELECT/.test(active.tagName)) return;
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c') { e.preventDefault(); copyNode(state.selectedNodeId); }
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v') { e.preventDefault(); pasteNode(); }
        if ((e.key === 'Delete' || e.key === 'Backspace') && state.selectedNodeId && !state.readonly) removeNode(state.selectedNodeId);
    }

    function showContextMenu(x, y, point) {
        removeModal('canvas-context-menu');
        var menu = document.createElement('div');
        menu.id = 'canvas-context-menu';
        menu.className = 'canvas-context-menu';
        menu.style.left = x + 'px';
        menu.style.top = y + 'px';
        menu.innerHTML = state.readonly ? '<button data-action="copy"><i class="fa-regular fa-copy"></i> 复制选中节点</button><button data-action="request"><i class="fa-regular fa-pen-to-square"></i> 申请修改权限</button>' : '<button data-action="text"><i class="fa-solid fa-font"></i> 添加文本节点</button><button data-action="prompt"><i class="fa-solid fa-wand-magic-sparkles"></i> 添加生成节点</button><button data-action="upload"><i class="fa-regular fa-image"></i> 上传本地图片</button><button data-action="frame"><i class="fa-regular fa-square-plus"></i> 添加大框</button><button data-action="paste"><i class="fa-regular fa-paste"></i> 粘贴节点</button>';
        document.body.appendChild(menu);
        bindMenu(menu, point);
        setTimeout(function() { document.addEventListener('click', handleContextMenuOutside, { once: true }); }, 0);
    }

    function bindMenu(menu, point) {
        var actions = {
            text: function() { addTextAt(point.x, point.y); },
            prompt: function() { addPromptAt(point.x, point.y); },
            upload: function() { uploadAt(point.x, point.y); },
            frame: function() { removeModal('canvas-context-menu'); addFrameBox({ x: point.x, y: point.y }); },
            paste: function() { removeModal('canvas-context-menu'); pasteNode(point); },
            copy: function() { removeModal('canvas-context-menu'); copyNode(state.selectedNodeId); },
            request: function() { removeModal('canvas-context-menu'); requestEditPermission(); }
        };
        Utils.qsa('button', menu).forEach(function(btn) { btn.addEventListener('click', actions[btn.dataset.action]); });
    }

    function addTextAt(x, y) { removeModal('canvas-context-menu'); addTextNode('', { x: x, y: y }); }
    function addPromptAt(x, y) { removeModal('canvas-context-menu'); addPromptNode({ x: x, y: y }); }
    function uploadAt(x, y) { removeModal('canvas-context-menu'); uploadLocalImage({ x: x, y: y }); }
    function uploadLocalImage(position) {
        if (state.readonly) return requestEditPermission();
        var input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.style.display = 'none';
        input.onchange = function() {
            var file = input.files[0];
            if (!file) return;
            var reader = new FileReader();
            reader.onload = function(e) { addImageNode(e.target.result, file.name, '本地上传', { x: position && position.x, y: position && position.y }); };
            reader.readAsDataURL(file);
        };
        document.body.appendChild(input);
        input.click();
        setTimeout(function() { if (input.parentNode) input.parentNode.removeChild(input); }, 500);
    }

    function removeNode(id) {
        var node = Utils.byId(id);
        if (node) node.remove();
        delete state.nodes[id];
        state.lines = state.lines.filter(function(line) { return line.from !== id && line.to !== id; });
        state.selectedNodeId = '';
        renderConnections();
        setEmptyVisible(Utils.qsa('.canvas-node', Utils.byId('canvasCardsArea')).length === 0);
    }

    function deleteNode(btn) { var node = btn && btn.closest('.canvas-node'); if (node) removeNode(node.id); }
    function clearSelection() { state.selectedNodeId = ''; Utils.qsa('.canvas-node.is-selected').forEach(function(item) { item.classList.remove('is-selected'); }); }
    function handleContextMenuOutside() { removeModal('canvas-context-menu'); }
    function requestEditPermission() { showToast('共享画布只读，已为你提交修改权限申请'); }

    function createSelect(options, selected, onChange) {
        var select = document.createElement('select');
        fillSelect(select, options, selected);
        select.addEventListener('change', function() { onChange(select.value); });
        return select;
    }

    function fillSelect(select, options, selected) {
        select.innerHTML = '';
        options.forEach(function(item) {
            var option = document.createElement('option');
            option.value = item;
            option.textContent = item;
            option.selected = item === selected;
            select.appendChild(option);
        });
    }

    function applyDefaultsToPromptNode(node) {
        var selects = node.querySelectorAll('.prompt-footer select');
        if (selects[0]) selects[0].value = state.defaults.model;
        if (selects[1]) selects[1].value = state.defaults.ratio;
        if (selects[2]) selects[2].value = state.defaults.quality;
    }

    function boardPoint(e) {
        var board = Utils.byId('canvasWorkspace');
        var rect = board.getBoundingClientRect();
        return { x: e.clientX - rect.left + board.scrollLeft, y: e.clientY - rect.top + board.scrollTop };
    }

    function clientToBoard(x, y) {
        var board = Utils.byId('canvasWorkspace');
        var rect = board.getBoundingClientRect();
        return { x: x - rect.left + board.scrollLeft, y: y - rect.top + board.scrollTop };
    }

    function nodePosition(node) { return { x: parseInt(node.style.left, 10) || 0, y: parseInt(node.style.top, 10) || 0 }; }
    function rectFromStyle(el) { return { x: parseInt(el.style.left, 10) || 0, y: parseInt(el.style.top, 10) || 0, width: parseInt(el.style.width, 10) || el.offsetWidth, height: parseInt(el.style.height, 10) || el.offsetHeight }; }
    function centerOf(node) { var r = rectFromStyle(node); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; }
    function nextNodeId() { state.nodeCounter += 1; return 'node-' + state.nodeCounter; }
    function sampleImageUrl(promptText) { var palette = ['22324a', '314f6f', '5c476a', '3f5f59', '6d5a3a', '3e4866']; var color = palette[(state.nodeCounter + state.lineCounter) % palette.length]; return 'https://placehold.co/720x420/' + color + '/ffffff?text=' + encodeURIComponent(String(promptText || 'AI Image').slice(0, 18)); }
    function setEmptyVisible(visible) { var empty = Utils.byId('canvasEmpty'); if (empty) empty.style.display = visible ? '' : 'none'; }
    function removeModal(id) { var el = Utils.byId(id); if (el) el.remove(); }
    function createOverlay(id) { var overlay = document.createElement('div'); overlay.id = id; overlay.className = 'modal-overlay is-visible'; overlay.style.display = 'flex'; return overlay; }
    function bindOverlay(overlay) { overlay.querySelectorAll('[data-close]').forEach(function(btn) { btn.addEventListener('click', function() { overlay.remove(); }); }); overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); }); var card = overlay.querySelector('[data-card]'); if (card) card.addEventListener('click', function(e) { e.stopPropagation(); }); }
    function escapeText(value) { return String(value || '').replace(/[&<>"]/g, function(ch) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch]; }); }
    function copyText(text) { if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text || '').catch(function() {}); }
    function showToast(message) { removeModal('canvas-toast'); var toast = document.createElement('div'); toast.id = 'canvas-toast'; toast.className = 'canvas-toast'; toast.textContent = message; document.body.appendChild(toast); setTimeout(function() { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 1800); }

    return {
        renderProjectList: renderProjectList,
        refreshProjectList: renderProjectList,
        showCreateProjectModal: showCreateProjectModal,
        createProject: createProject,
        enterProject: enterProject,
        openSharePanel: openSharePanel,
        openGlobalSettings: openGlobalSettings,
        addFrameBox: addFrameBox,
        searchNodes: searchNodes,
        clearWorkspace: clearWorkspace,
        generateImage: function() { addPromptNode(); },
        generateImageFromNode: generateImageFromNode,
        addPromptNode: addPromptNode,
        addTextNode: addTextNode,
        addTextAt: addTextAt,
        addPromptAt: addPromptAt,
        uploadAt: uploadAt,
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
        removeNode: removeNode,
        deleteNode: deleteNode,
        copyNode: copyNode,
        pasteNode: pasteNode,
        initCanvasEvents: initCanvasEvents,
        initCoordTracker: initCoordTracker
    };
})();

window.setCanvasSize = function(btn, value) { CanvasModule.openGlobalSettings(); };
window.setCanvasStyle = function(btn, value) { CanvasModule.openGlobalSettings(); };
window.clearCanvasWorkspace = CanvasModule.clearWorkspace;
window.generateCanvasImage = CanvasModule.generateImage;
