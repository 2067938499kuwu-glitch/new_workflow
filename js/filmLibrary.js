var FilmLibrary = (function() {
    var currentReuploadIdx = null;

    function render() {
        var tbody = Utils.byId('filmTableBody');
        if (!tbody) return;

        var count = AppData.filmData.length;
        var listCount = Utils.byId('filmListCount');
        var paginationTotal = Utils.byId('filmPaginationTotal');
        if (listCount) listCount.textContent = '共 ' + count + ' 项';
        if (paginationTotal) paginationTotal.textContent = '共 ' + count + ' 条';
        renderRequestBadge();

        tbody.innerHTML = AppData.filmData.map(function(item, idx) {
            var uploaded = parseInt(item.uploaded, 10) || 0;
            var uploadedClass = item.synced ? 'film-complete-count' : '';

            return '<tr>'
                + '<td><span class="table-id">' + Utils.escapeHtml(item.id) + '</span></td>'
                + '<td><span class="film-project-name">' + Utils.escapeHtml(item.name) + '</span></td>'
                + '<td>' + Utils.escapeHtml(item.episodes) + '</td>'
                + '<td>' + Utils.escapeHtml(item.category || '—') + '</td>'
                + '<td><span class="' + uploadedClass + '">' + Utils.escapeHtml(uploaded) + '</span></td>'
                + '<td>' + Utils.escapeHtml(item.deadline || '—') + '</td>'
                + '<td>' + renderSyncStatus(item.synced) + '</td>'
                + '<td><div class="film-action-group">'
                + '<button class="table-action-link is-accent"><i class="fa-regular fa-eye"></i> 查看</button>'
                + renderDownloadAction(item, idx)
                + '<button class="table-action-link film-reupload-action" onclick="FilmLibrary.showReuploadModal(' + idx + ')">修改建议</button>'
                + '</div></td>'
                + '</tr>';
        }).join('');
    }

    function renderSyncStatus(synced) {
        return '<span class="film-sync-status ' + (synced ? 'is-synced' : '') + '">'
            + '<i></i>' + (synced ? '已同步' : '未同步') + '</span>';
    }

    function renderDownloadAction(item, idx) {
        if (item.downloadStatus === 'none') {
            return '<button class="table-action-link" onclick="FilmLibrary.applyDownload(' + idx + ')">申请下载</button>';
        }
        if (item.downloadStatus === 'applying') {
            return '<button class="table-action-link" disabled>申请中</button>';
        }
        return '<button class="table-action-link" onclick="FilmLibrary.showDownloadModal(' + idx + ')">下载</button>';
    }

    function applyDownload(idx) {
        AppData.filmData[idx].downloadStatus = 'applying';
        render();
        setTimeout(function() {
            AppData.filmData[idx].downloadStatus = 'approved';
            render();
        }, 1200);
    }

    function showDownloadModal(idx) {
        var modal = Utils.byId('downloadModal');
        if (!modal) return;
        modal._projectIdx = idx;
        modal.classList.add('is-visible');
    }

    function closeDownloadModal() {
        var modal = Utils.byId('downloadModal');
        if (modal) modal.classList.remove('is-visible');
    }

    function confirmDownload(type) {
        var map = {
            none: '无水印',
            visible: '明水印',
            invisible: '暗水印'
        };
        alert('开始下载，模式：' + map[type]);
        closeDownloadModal();
    }

    function showReuploadModal(idx) {
        var modal = Utils.byId('filmReuploadModal');
        var projectLabel = Utils.byId('filmReuploadProject');
        var note = Utils.byId('filmReuploadNote');
        if (!modal) return;

        currentReuploadIdx = idx;
        var item = AppData.filmData[idx];
        if (projectLabel) projectLabel.textContent = item.id + ' / ' + item.name;
        if (note) note.value = '';
        clearBatchUpload();
        modal.classList.add('is-visible');
    }

    function closeReuploadModal() {
        var modal = Utils.byId('filmReuploadModal');
        if (modal) modal.classList.remove('is-visible');
    }

    // 批量上传
    var batchImages = [];

    function handleBatchUpload(input) {
        var files = input.files;
        if (!files || files.length === 0) return;

        for (var i = 0; i < files.length; i++) {
            (function(file) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    batchImages.push(e.target.result);
                    renderBatchPreview();
                };
                reader.readAsDataURL(file);
            })(files[i]);
        }
        input.value = '';
    }

    function removeBatchImage(idx) {
        batchImages.splice(idx, 1);
        renderBatchPreview();
    }

    function clearBatchUpload() {
        batchImages = [];
        var preview = Utils.byId('filmBatchPreview');
        if (preview) {
            preview.classList.add('hidden');
            preview.innerHTML = '';
        }
        var input = Utils.byId('filmBatchInput');
        if (input) input.value = '';
    }

    function renderBatchPreview() {
        var preview = Utils.byId('filmBatchPreview');
        if (!preview) return;

        if (batchImages.length === 0) {
            preview.classList.add('hidden');
            preview.innerHTML = '';
            return;
        }
        preview.classList.remove('hidden');

        var html = '';
        batchImages.forEach(function(src, idx) {
            html += '<div class="batch-preview-item">'
                + '<img src="' + src + '">'
                + '<button type="button" class="batch-preview-remove" onclick="FilmLibrary.removeBatchImage(' + idx + ')">&times;</button>'
                + '</div>';
        });
        preview.innerHTML = html;
    }

    function confirmReupload() {
        var item = AppData.filmData[currentReuploadIdx];
        var note = Utils.byId('filmReuploadNote');
        if (!item) return;

        AppData.deliveryReuploadRequests.unshift({
            projectId: item.id,
            projectName: item.name,
            type: '修改建议',
            extra: '—',
            selections: [],
            batchImages: batchImages.slice(),
            note: (note && note.value.trim()) || '无',
            status: '待处理',
            episodes: item.episodes || '--',
            createdAt: formatNow()
        });

        renderRequestBadge();
        closeReuploadModal();
        if (window.switchView) switchView('delivery');
        if (window.DeliveryModule && DeliveryModule.render) DeliveryModule.render();
    }

    function renderRequestBadge() {
        var badge = Utils.byId('filmApplyBadge');
        if (badge) badge.textContent = AppData.deliveryReuploadRequests.length;
    }

    function openDeliveryRequests() {
        if (window.switchView) switchView('delivery');
        if (window.DeliveryModule && DeliveryModule.render) DeliveryModule.render();
    }

    function formatNow() {
        var d = new Date();
        function pad(n) { return String(n).padStart(2, '0'); }
        return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate())
            + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
    }

    function init() {
        var modal = Utils.byId('filmReuploadModal');
        if (modal) {
            modal.addEventListener('click', function(event) {
                if (event.target === modal) closeReuploadModal();
            });
        }
    }

    init();

    return {
        render: render,
        applyDownload: applyDownload,
        showDownloadModal: showDownloadModal,
        closeDownloadModal: closeDownloadModal,
        confirmDownload: confirmDownload,
        showReuploadModal: showReuploadModal,
        closeReuploadModal: closeReuploadModal,
        confirmReupload: confirmReupload,
        openDeliveryRequests: openDeliveryRequests,
        handleBatchUpload: handleBatchUpload,
        removeBatchImage: removeBatchImage
    };
})();
