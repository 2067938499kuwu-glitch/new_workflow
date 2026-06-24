var DeliveryModule = (function() {
    var uploadPanels = null;
    var uploadTitles = null;

    function render() {
        var tbody = Utils.byId('deliveryTableBody');
        if (!tbody) return;
        normalizeDeliveryPage();

        var paginationTotal = Utils.byId('deliveryPaginationTotal');
        if (paginationTotal) paginationTotal.textContent = '共 ' + AppData.deliveryData.length + ' 条';

        tbody.innerHTML = AppData.deliveryData.map(function(item, idx) {
            return '<tr>'
                + '<td>' + Utils.escapeHtml(item.name) + '</td>'
                + '<td>' + Utils.escapeHtml(item.episodes) + '</td>'
                + '<td>' + Utils.escapeHtml(item.category) + '</td>'
                + '<td><span class="delivery-status ' + Utils.escapeHtml(item.statusClass) + '">' + Utils.escapeHtml(item.status) + '</span></td>'
                + '<td>' + Utils.escapeHtml(item.deadline) + '</td>'
                + '<td>' + Utils.escapeHtml(item.pending) + '</td>'
                + '<td>' + Utils.escapeHtml(item.rejected) + '</td>'
                + '<td>' + Utils.escapeHtml(item.approved) + '</td>'
                + '<td><div class="delivery-action-group">'
                + '<button class="delivery-action-upload" onclick="DeliveryModule.showUploadModal()">上传</button>'
                + '<button class="delivery-action-review" onclick="DeliveryModule.showDetailModal(\'' + Utils.escapeHtml(item.name) + '\')">审核</button>'
                + '<button class="delivery-action-history" onclick="DeliveryModule.showHistoryModal(' + idx + ')">历史记录</button>'
                + '</div></td>'
                + '</tr>';
        }).join('');
        renderReuploadRequests();
    }

    function normalizeDeliveryPage() {
        var filter = Utils.qs('#view-delivery .filter-grid');
        if (filter && filter.dataset.normalized !== '1') {
            filter.dataset.normalized = '1';
            filter.innerHTML = '<label class="field"><span>项目名称</span><input type="text" placeholder="请输入项目名称"></label>'
                + '<label class="field delivery-date-field"><span>时间</span><input type="text" placeholder="开始时间"><em>-</em><input type="text" placeholder="结束时间"></label>'
                + '<div class="field field--actions"><button class="primary-btn">搜索</button><button class="secondary-btn">重置</button></div>';
        }

        var headRow = Utils.qs('#deliveryTableBody');
        var table = headRow && headRow.closest('table');
        var theadRow = table && table.querySelector('thead tr');
        if (theadRow) {
            theadRow.innerHTML = '<th>项目名称</th><th>项目总剧集</th><th>项目分类</th><th>项目状态</th><th>项目截止时间</th><th>待审核数量</th><th>驳回数量</th><th>已通过数量</th><th>操作</th>';
        }
    }

    function renderReuploadRequests() {
        var body = Utils.byId('deliveryRequestBody');
        var empty = Utils.byId('deliveryRequestEmpty');
        var tableWrap = Utils.byId('deliveryRequestTableWrap');
        var count = Utils.byId('deliveryRequestCount');
        var card = Utils.byId('deliveryReuploadRequests');
        if (!body || !empty || !tableWrap) return;

        var requests = AppData.deliveryReuploadRequests || [];
        var total = requests.length;
        if (card) card.classList.toggle('hidden', total === 0);
        if (count) count.textContent = total ? '共 ' + total + ' 条申请' : '暂无申请';
        empty.classList.toggle('hidden', total > 0);
        tableWrap.classList.toggle('hidden', total === 0);

        body.innerHTML = requests.map(function(item, idx) {
            return '<tr>'
                + '<td><span class="table-title">' + Utils.escapeHtml(item.projectName) + '</span><div class="table-muted">' + Utils.escapeHtml(item.projectId) + '</div></td>'
                + '<td>' + Utils.escapeHtml(item.type) + '</td>'
                + '<td>' + Utils.escapeHtml(item.extra) + '</td>'
                + '<td class="delivery-request-note">' + Utils.escapeHtml(item.note) + '</td>'
                + '<td><span class="tag tag-orange">' + Utils.escapeHtml(item.status) + '</span></td>'
                + '<td class="table-muted">' + Utils.escapeHtml(item.createdAt) + '</td>'
                + '<td><div class="table-action-group">'
                + '<button class="table-action-link is-warn" onclick="DeliveryModule.handleReuploadRequest(' + idx + ')">去上传</button>'
                + '<button class="table-action-link is-accent" onclick="DeliveryModule.handleReuploadReview(' + idx + ')">审核</button>'
                + '</div></td>'
                + '</tr>';
        }).join('');
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
        showDetailModal(request.projectName);
    }

    function showHistoryModal() {
        var modal = Utils.byId('deliveryHistoryModal');
        var body = Utils.byId('deliveryHistoryBody');
        if (!modal || !body) return;

        body.innerHTML = AppData.deliveryHistoryData.map(function(item) {
            return '<tr>'
                + '<td>' + Utils.escapeHtml(item.action) + '</td>'
                + '<td>' + Utils.escapeHtml(item.type) + '</td>'
                + '<td>' + Utils.escapeHtml(item.operator) + '</td>'
                + '<td>' + Utils.escapeHtml(item.time) + '</td>'
                + '<td>' + Utils.escapeHtml(item.remark) + '</td>'
                + '</tr>';
        }).join('');
        modal.classList.add('is-visible');
    }

    function closeHistoryModal() {
        var modal = Utils.byId('deliveryHistoryModal');
        if (modal) modal.classList.remove('is-visible');
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

        if (!uploadTitles || !uploadPanels) return;

        uploadTitles.forEach(function(title) {
            var panel = title.nextElementSibling;
            var titleType = title.getAttribute('data-section-title') || (panel && panel.getAttribute('data-content'));
            title.classList.toggle('hidden', titleType !== type);
        });
        uploadPanels.forEach(function(panel) {
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

    function initHistoryModal() {
        var modal = Utils.byId('deliveryHistoryModal');
        if (!modal) return;
        modal.addEventListener('click', function(event) {
            if (event.target === modal) closeHistoryModal();
        });
    }

    function init() {
        initUploadTabs();
        initUploadSidebarTabs();
        initDetailModal();
        initUploadModal();
        initHistoryModal();
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
        showHistoryModal: showHistoryModal,
        closeHistoryModal: closeHistoryModal
    };
})();
