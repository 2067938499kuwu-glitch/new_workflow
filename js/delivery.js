var DeliveryModule = (function() {
    var uploadPanels = null;
    var uploadTitles = null;

    function render() {
        var tbody = Utils.byId('deliveryTableBody');
        var totalEl = Utils.byId('deliveryPaginationTotal');
        if (!tbody) return;

        var rows = buildDeliveryRows();
        tbody.innerHTML = '';
        rows.forEach(function(row) {
            var item = row.item;
            var suggestion = row.suggestion;
            var tr = document.createElement('tr');
            if (suggestion) tr.className = 'delivery-row-has-suggestion';
            tr.innerHTML = '<td><span class="table-title"></span></td>'
                + '<td><span class="table-number table-muted"></span></td>'
                + '<td><span class="table-pill table-pill-category"></span></td>'
                + '<td class="delivery-category-cell"></td>'
                + '<td class="delivery-detail-cell"></td>'
                + '<td><span class="tag"></span></td>'
                + '<td class="table-muted"></td>'
                + '<td><span class="table-number"></span></td>'
                + '<td><span class="table-number"></span></td>'
                + '<td><span class="table-number"></span></td>'
                + '<td><div class="table-action-group"></div></td>';

            tr.querySelector('.table-title').textContent = item.name;
            tr.querySelector('.table-number.table-muted').textContent = item.episodes || '--';
            tr.querySelector('.table-pill').textContent = item.category || '--';
            tr.querySelector('.delivery-category-cell').innerHTML = suggestion
                ? '<span class="delivery-suggestion-pill">' + Utils.escapeHtml(suggestion.type || '修改建议') + '</span>'
                : '<span class="table-muted">--</span>';
            tr.querySelector('.delivery-detail-cell').innerHTML = suggestion
                ? '<div class="delivery-suggestion-summary">' + Utils.escapeHtml(suggestion.note || '暂无详细说明') + '</div>'
                : '<span class="table-muted">--</span>';
            var status = tr.querySelector('.tag');
            status.className = 'tag ' + (suggestion ? 'delivery-status-suggestion' : Utils.escapeHtml(item.statusClass || ''));
            status.textContent = suggestion ? '' : (item.status || '--');
            tr.children[6].textContent = item.deadline || '--';
            tr.children[7].querySelector('span').textContent = item.pending || 0;
            tr.children[8].querySelector('span').textContent = suggestion ? Math.max(Number(item.rejected || 0), 1) : (item.rejected || 0);
            tr.children[9].querySelector('span').textContent = item.approved || 0;

            var actions = tr.querySelector('.table-action-group');
            var uploadBtn = createActionButton('上传', 'is-warn', showUploadModal);
            var reviewBtn = createActionButton('审核', 'is-accent', function() { showDetailModal(item.name); });
            actions.appendChild(uploadBtn);
            actions.appendChild(reviewBtn);
            if (suggestion) {
                actions.appendChild(createActionButton('详情', 'is-danger', function() { showSuggestionDetail(suggestion); }));
            }
            tbody.appendChild(tr);
        });

        if (totalEl) totalEl.textContent = '共 ' + rows.length + ' 条';
        renderReuploadRequests();
    }

    function buildDeliveryRows() {
        var suggestions = AppData.deliveryReuploadRequests || [];
        var used = {};
        var rows = (AppData.deliveryData || []).map(function(item) {
            var suggestion = findSuggestionForItem(item, suggestions);
            if (suggestion) used[suggestion.projectId + '|' + suggestion.projectName] = true;
            return { item: item, suggestion: suggestion };
        });

        suggestions.forEach(function(suggestion) {
            var key = suggestion.projectId + '|' + suggestion.projectName;
            if (used[key]) return;
            rows.unshift({
                item: {
                    name: suggestion.projectName,
                    episodes: suggestion.episodes || '--',
                    category: suggestion.projectId || '--',
                    status: '待处理',
                    statusClass: 'delivery-status-pending',
                    deadline: '--',
                    pending: 1,
                    rejected: 1,
                    approved: 0
                },
                suggestion: suggestion
            });
        });
        return rows;
    }

    function findSuggestionForItem(item, suggestions) {
        for (var i = 0; i < suggestions.length; i++) {
            var s = suggestions[i];
            if (s.projectName === item.name || s.projectId === item.id) return s;
        }
        return null;
    }

    function createActionButton(text, extraClass, handler) {
        var btn = document.createElement('button');
        btn.className = 'table-action-link ' + (extraClass || '');
        btn.textContent = text;
        btn.addEventListener('click', handler);
        return btn;
    }

    function renderReuploadRequests() {
        var center = Utils.byId('deliveryReuploadRequests');
        if (center) center.remove();
    }

    function showSuggestionDetail(suggestion) {
        removeModal('deliverySuggestionDetailModal');
        var overlay = document.createElement('div');
        overlay.id = 'deliverySuggestionDetailModal';
        overlay.className = 'detail-overlay is-visible';
        overlay.innerHTML = '<div class="delivery-suggestion-dialog" onclick="event.stopPropagation()">'
            + '<div class="dialog-card__header"><div><h3>修改建议详情</h3><p></p></div><button class="detail-close" data-close>&times;</button></div>'
            + '<div class="delivery-suggestion-body">'
            + '<div class="delivery-suggestion-info"><span>分类</span><strong data-type></strong></div>'
            + '<div class="delivery-suggestion-info"><span>提交时间</span><strong data-time></strong></div>'
            + '<div class="delivery-suggestion-info"><span>补充选择</span><strong data-extra></strong></div>'
            + '<label class="delivery-suggestion-note"><span>详细说明</span><textarea readonly></textarea></label>'
            + '<div class="delivery-suggestion-images"></div>'
            + '</div>'
            + '<div class="detail-footer"><button class="primary-btn" data-close>我知道了</button></div>'
            + '</div>';
        overlay.querySelector('p').textContent = (suggestion.projectId || '--') + ' / ' + (suggestion.projectName || '--');
        overlay.querySelector('[data-type]').textContent = suggestion.type || '--';
        overlay.querySelector('[data-time]').textContent = suggestion.createdAt || '--';
        overlay.querySelector('[data-extra]').textContent = suggestion.extra || '--';
        overlay.querySelector('textarea').value = suggestion.note || '';
        renderSuggestionImages(overlay.querySelector('.delivery-suggestion-images'), suggestion);
        overlay.querySelectorAll('[data-close]').forEach(function(btn) { btn.addEventListener('click', function() { overlay.remove(); }); });
        overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });
        document.body.appendChild(overlay);
    }

    function renderSuggestionImages(container, suggestion) {
        var selections = suggestion.selections || [];
        var batchImages = suggestion.batchImages || [];

        if (!selections.length && !batchImages.length) {
            container.innerHTML = '<div class="delivery-suggestion-empty">未上传补充图片</div>';
            return;
        }
        container.innerHTML = '';

        if (selections.length) {
            container.innerHTML += '<div class="delivery-suggestion-image-title">剧集图片</div>';
            var grid = document.createElement('div');
            grid.className = 'delivery-suggestion-image-grid';
            selections.forEach(function(sel) {
                var item = document.createElement('div');
                item.className = 'delivery-suggestion-image-item';
                item.innerHTML = '<strong></strong><div></div>';
                item.querySelector('strong').textContent = sel.label || '--';
                var box = item.querySelector('div');
                if (sel.imageSrc) {
                    var img = document.createElement('img');
                    img.src = sel.imageSrc;
                    img.alt = sel.label || '';
                    box.appendChild(img);
                } else {
                    box.innerHTML = '<i class="fa-regular fa-image"></i><span>未上传图片</span>';
                }
                grid.appendChild(item);
            });
            container.appendChild(grid);
        }

        if (batchImages.length) {
            container.innerHTML += '<div class="delivery-suggestion-image-title" style="margin-top:16px">附件图片 (' + batchImages.length + ' 张)</div>';
            var batchGrid = document.createElement('div');
            batchGrid.className = 'delivery-suggestion-image-grid';
            batchImages.forEach(function(src, idx) {
                var item = document.createElement('div');
                item.className = 'delivery-suggestion-image-item';
                item.innerHTML = '<strong>附件 ' + (idx + 1) + '</strong><div></div>';
                var box = item.querySelector('div');
                var img = document.createElement('img');
                img.src = src;
                img.alt = '附件 ' + (idx + 1);
                box.appendChild(img);
                batchGrid.appendChild(item);
            });
            container.appendChild(batchGrid);
        }
    }

    function handleReuploadRequest(idx) {
        var request = (AppData.deliveryReuploadRequests || [])[idx];
        if (request) showSuggestionDetail(request);
    }

    function handleReuploadReview(idx) {
        var request = (AppData.deliveryReuploadRequests || [])[idx];
        if (request) showSuggestionDetail(request);
    }

    function initUploadTabs() {
        Utils.qsa('.upload-tab-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                Utils.qsa('.upload-tab-btn').forEach(function(tab) { tab.classList.remove('upload-tab-active'); });
                Utils.qsa('.upload-content-panel').forEach(function(panel) { panel.classList.add('hidden'); });
                btn.classList.add('upload-tab-active');
                var panel = Utils.byId('upload-' + btn.getAttribute('data-tab') + '-content');
                if (panel) panel.classList.remove('hidden');
            });
        });
    }

    function initUploadSidebarTabs() {
        var modal = Utils.byId('uploadFileModal');
        if (!modal) return;
        var main = modal.querySelector('.delivery-upload-main');
        if (!main) return;
        uploadPanels = main.querySelectorAll('[data-content]');
        uploadTitles = main.querySelectorAll('[data-section-title]');
        var activeBtn = modal.querySelector('.delivery-upload-type.active') || modal.querySelector('.delivery-upload-type');
        if (activeBtn) switchSidebarTab(activeBtn, activeBtn.getAttribute('data-type'));
    }

    function switchSidebarTab(btn, type) {
        if (!btn || !type) return;
        var sidebar = btn.closest('.delivery-upload-types');
        if (sidebar) sidebar.querySelectorAll('.delivery-upload-type').forEach(function(item) { item.classList.remove('active'); });
        btn.classList.add('active');
        if (!uploadTitles || !uploadPanels) return;
        uploadTitles.forEach(function(title) {
            var panel = title.nextElementSibling;
            var titleType = title.getAttribute('data-section-title') || (panel && panel.getAttribute('data-content'));
            title.classList.toggle('hidden', titleType !== type);
        });
        uploadPanels.forEach(function(panel) { panel.classList.toggle('hidden', panel.getAttribute('data-content') !== type); });
    }

    function showDetailModal(name) {
        var modal = Utils.byId('detailModal');
        var title = Utils.qs('.detail-title', modal);
        if (!modal) return;
        if (title) title.textContent = '交付详情 - ' + name;
        modal.classList.add('is-visible');
    }

    function initDetailModal() {
        var modal = Utils.byId('detailModal');
        if (!modal) return;
        var closeBtn = Utils.byId('closeDetail');
        if (closeBtn) closeBtn.addEventListener('click', function() { modal.classList.remove('is-visible'); });
        modal.addEventListener('click', function(event) { if (event.target === modal) modal.classList.remove('is-visible'); });
    }

    function showUploadModal() {
        var modal = Utils.byId('uploadFileModal');
        if (modal) modal.classList.add('is-visible');
    }

    function closeUploadModal() {
        var modal = Utils.byId('uploadFileModal');
        if (modal) modal.classList.remove('is-visible');
    }

    function initUploadModal() {
        var modal = Utils.byId('uploadFileModal');
        if (!modal) return;
        modal.addEventListener('click', function(event) { if (event.target === modal) closeUploadModal(); });
    }

    function removeModal(id) {
        var el = Utils.byId(id);
        if (el) el.remove();
    }

    function init() {
        initUploadTabs();
        initUploadSidebarTabs();
        initDetailModal();
        initUploadModal();
    }

    init();

    return {
        render: render,
        showDetailModal: showDetailModal,
        showUploadModal: showUploadModal,
        closeUploadModal: closeUploadModal,
        switchSidebarTab: switchSidebarTab,
        renderReuploadRequests: renderReuploadRequests,
        handleReuploadRequest: handleReuploadRequest,
        handleReuploadReview: handleReuploadReview,
        showSuggestionDetail: showSuggestionDetail
    };
})();
