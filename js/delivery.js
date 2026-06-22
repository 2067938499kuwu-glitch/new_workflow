/* AIGC管理后台 - 交付中心 & 上传模块 */
var DeliveryModule = (function() {

    // ===== 交付中心表格渲染 =====
    function render() {
        var tbody = Utils.byId('deliveryTableBody');
        if (!tbody) return;
        tbody.innerHTML = AppData.deliveryData.map(function(r) {
            return '<tr class="hover:bg-gray-50/50">'
                + '<td class="py-3 px-4 text-gray-800 font-medium">' + r.name + '</td>'
                + '<td class="py-3 px-4 text-gray-600">' + r.episodes + '</td>'
                + '<td class="py-3 px-4 text-gray-400">' + r.category + '</td>'
                + '<td class="py-3 px-4"><span class="tag ' + r.statusClass + '">' + r.status + '</span></td>'
                + '<td class="py-3 px-4 text-gray-400">' + r.deadline + '</td>'
                + '<td class="py-3 px-4">' + r.pending + '</td>'
                + '<td class="py-3 px-4">' + r.rejected + '</td>'
                + '<td class="py-3 px-4">' + r.approved + '</td>'
                + '<td class="py-3 px-4">'
                + '<button class="text-orange-500 hover:underline text-xs mr-2" onclick="DeliveryModule.showUploadModal()">上传</button>'
                + '<button class="text-green-500 hover:underline text-xs">审核</button>'
                + '</td>'
                + '</tr>';
        }).join('');
    }

    // ===== 上传文件标签切换 =====
    function initUploadTabs() {
        var tabs = document.querySelectorAll('.upload-tab-btn');
        if (!tabs.length) return;

        tabs.forEach(function(btn) {
            btn.addEventListener('click', function() {
                tabs.forEach(function(b) { b.classList.remove('upload-tab-active'); });
                btn.classList.add('upload-tab-active');

                var tabId = btn.getAttribute('data-tab');
                document.querySelectorAll('.upload-content-panel').forEach(function(p) {
                    p.classList.add('hidden');
                });
                var panel = document.getElementById('upload-' + tabId + '-content');
                if (panel) panel.classList.remove('hidden');
            });
        });
    }

    // ===== 剧集详情弹窗 =====
    function showDetailModal(episodeName) {
        var modal = Utils.byId('detailModal');
        if (!modal) return;
        modal.classList.add('is-visible');

        // 更新弹窗标题
        var titleEl = modal.querySelector('.detail-topbar .detail-title');
        if (titleEl) titleEl.textContent = '剧集详情 - ' + episodeName;
    }

    function initDetailModal() {
        var modal = Utils.byId('detailModal');
        if (!modal) return;

        // 关闭按钮
        var closeBtn = Utils.byId('closeDetail');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.classList.remove('is-visible');
            });
        }

        // 点击遮罩关闭
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('is-visible');
            }
        });

        // Tab 切换
        modal.querySelectorAll('.detail-tab-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                modal.querySelectorAll('.detail-tab-btn').forEach(function(b) { b.classList.remove('active'); });
                btn.classList.add('active');
            });
        });
    }

    // ===== 初始化 =====
    function init() {
        initUploadTabs();
        initDetailModal();
        initUploadModal();
    }

    // ===== 上传文件弹窗 =====
    function showUploadModal() {
        var modal = Utils.byId('uploadFileModal');
        if (!modal) return;
        modal.classList.add('is-visible');
    }

    function closeUploadModal() {
        var modal = Utils.byId('uploadFileModal');
        if (!modal) return;
        modal.classList.remove('is-visible');
    }

    function initUploadModal() {
        var modal = Utils.byId('uploadFileModal');
        if (!modal) return;
        // 点击遮罩关闭
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeUploadModal();
        });
    }

    // 页面加载后初始化
    document.addEventListener('DOMContentLoaded', init);

    return {
        render: render,
        initUploadTabs: initUploadTabs,
        showDetailModal: showDetailModal,
        showUploadModal: showUploadModal,
        closeUploadModal: closeUploadModal
    };
})();
