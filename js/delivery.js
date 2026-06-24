var DeliveryModule = (function() {
    var uploadPanels = null;
    var uploadTitles = null;

    function render() {
        var tbody = Utils.byId('deliveryTableBody');
        if (!tbody) return;

        tbody.innerHTML = AppData.deliveryData.map(function(item) {
            return '<tr>'
                + '<td><span class="table-title">' + Utils.escapeHtml(item.name) + '</span></td>'
                + '<td><span class="table-number table-muted">' + Utils.escapeHtml(item.episodes) + '</span></td>'
                + '<td><span class="table-pill table-pill-category">' + Utils.escapeHtml(item.category) + '</span></td>'
                + '<td><span class="tag ' + Utils.escapeHtml(item.statusClass) + '">' + Utils.escapeHtml(item.status) + '</span></td>'
                + '<td class="table-muted">' + Utils.escapeHtml(item.deadline) + '</td>'
                + '<td><span class="table-number">' + Utils.escapeHtml(item.pending) + '</span></td>'
                + '<td><span class="table-number">' + Utils.escapeHtml(item.rejected) + '</span></td>'
                + '<td><span class="table-number">' + Utils.escapeHtml(item.approved) + '</span></td>'
                + '<td><div class="table-action-group">'
                + '<button class="table-action-link is-warn" onclick="DeliveryModule.showUploadModal()">上传</button>'
                + '<button class="table-action-link is-accent" onclick="DeliveryModule.showDetailModal(\'' + Utils.escapeHtml(item.name) + '\')">审核</button>'
                + '</div></td>'
                + '</tr>';
        }).join('');
        renderReuploadRequests();
    }

    function renderReuploadRequests() {
        var body = Utils.byId('deliveryRequestBody');
        var empty = Utils.byId('deliveryRequestEmpty');
        var tableWrap = Utils.byId('deliveryRequestTableWrap');
        var cardGrid = Utils.byId('deliveryRequestCardGrid');
        var count = Utils.byId('deliveryRequestCount');
        if (!body || !empty || !tableWrap || !cardGrid) return;

        var requests = AppData.deliveryReuploadRequests || [];
        var total = requests.length;
        if (count) count.textContent = total ? '共 ' + total + ' 条申请' : '暂无申请';
        empty.classList.toggle('hidden', total > 0);

        // 渲染卡片视图
        cardGrid.innerHTML = requests.map(function(item, idx) {
            var hasSelections = item.selections && item.selections.length > 0;
            var typeIcon = '';
            switch (item.type) {
                case '视频': typeIcon = 'fa-video'; break;
                case '预告片': typeIcon = 'fa-film'; break;
                case '分集图片': typeIcon = 'fa-images'; break;
                case '封面': typeIcon = 'fa-image'; break;
                case '资产': typeIcon = 'fa-box'; break;
                default: typeIcon = 'fa-file'; break;
            }

            var selectionsHtml = '';
            if (hasSelections) {
                selectionsHtml = '<div class="req-card-selections">';
                item.selections.forEach(function(sel) {
                    selectionsHtml += '<div class="req-card-selection-item">'
                        + '<span class="req-card-selection-label">' + Utils.escapeHtml(sel.label) + '</span>';
                    if (sel.imageSrc) {
                        selectionsHtml += '<div class="req-card-selection-img"><img src="' + sel.imageSrc + '" alt=""></div>';
                    } else {
                        selectionsHtml += '<div class="req-card-selection-placeholder"><i class="fa-regular fa-image"></i></div>';
                    }
                    selectionsHtml += '</div>';
                });
                selectionsHtml += '</div>';
            } else {
                selectionsHtml = '<span class="table-muted">' + Utils.escapeHtml(item.extra) + '</span>';
            }

            return '<div class="reupload-request-card">'
                + '<div class="req-card-header">'
                +   '<div class="req-card-type"><i class="fa-solid ' + typeIcon + '"></i> ' + Utils.escapeHtml(item.type) + '</div>'
                +   '<span class="tag tag-orange">' + Utils.escapeHtml(item.status) + '</span>'
                + '</div>'
                + '<div class="req-card-body">'
                +   '<div class="req-card-project"><strong>' + Utils.escapeHtml(item.projectName) + '</strong><small>' + Utils.escapeHtml(item.projectId) + '</small></div>'
                +   selectionsHtml
                +   '<div class="req-card-note">' + Utils.escapeHtml(item.note) + '</div>'
                + '</div>'
                + '<div class="req-card-footer">'
                +   '<span class="req-card-time"><i class="fa-regular fa-clock"></i> ' + Utils.escapeHtml(item.createdAt) + '</span>'
                +   '<div class="table-action-group">'
                +     '<button class="table-action-link is-warn" onclick="DeliveryModule.handleReuploadRequest(' + idx + ')">去上传</button>'
                +     '<button class="table-action-link is-accent" onclick="DeliveryModule.handleReuploadReview(' + idx + ')">审核</button>'
                +   '</div>'
                + '</div>'
                + '</div>';
        }).join('');
        cardGrid.classList.toggle('hidden', total === 0);

        // 表格式兼容旧数据（无图片的简单请求）
        tableWrap.classList.add('hidden');
        body.innerHTML = '';
    }

    function handleReuploadRequest(idx) {
        var request = (AppData.deliveryReuploadRequests || [])[idx];
        showUploadModal();
        if (!request) return;

        var typeMap = {
            '分集图片': 'image',
            '封面': 'cover',
            '预告片': 'trailer',
            '资产': 'asset',
            '视频': 'video'
        };
        var type = typeMap[request.type] || 'video';
        var btn = Utils.qs('.delivery-upload-type[data-type="' + type + '"]', Utils.byId('uploadFileModal'));
        if (btn) switchSidebarTab(btn, type);
    }

    function handleReuploadReview(idx) {
        var request = (AppData.deliveryReuploadRequests || [])[idx];
        if (!request) return;
        DeliveryModule.showDetailModal(request.projectName);
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
        if (activeBtn) {
            switchSidebarTab(activeBtn, activeBtn.getAttribute('data-type'));
        }
    }

    function switchSidebarTab(btn, type) {
        if (!btn || !type) return;

        var sidebar = btn.closest('.delivery-upload-types');
        if (sidebar) {
            sidebar.querySelectorAll('.delivery-upload-type').forEach(function(item) {
                item.classList.remove('active');
            });
        }
        btn.classList.add('active');

        var allTitles = uploadTitles;
        var allPanels = uploadPanels;
        if (!allTitles || !allPanels) return;

        allTitles.forEach(function(title) {
            var panel = title.nextElementSibling;
            var titleType = title.getAttribute('data-section-title') || (panel && panel.getAttribute('data-content'));
            title.classList.toggle('hidden', titleType !== type);
        });
        allPanels.forEach(function(panel) {
            panel.classList.toggle('hidden', panel.getAttribute('data-content') !== type);
        });
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
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.classList.remove('is-visible');
            });
        }

        modal.addEventListener('click', function(event) {
            if (event.target === modal) modal.classList.remove('is-visible');
        });
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
        modal.addEventListener('click', function(event) {
            if (event.target === modal) closeUploadModal();
        });
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
        handleReuploadReview: handleReuploadReview
    };
})();
