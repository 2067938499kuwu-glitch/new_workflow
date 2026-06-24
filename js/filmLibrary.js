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
                + '<button class="table-action-link film-reupload-action" onclick="FilmLibrary.showReuploadModal(' + idx + ')">重新上传</button>'
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
        var typeSelect = Utils.byId('filmReuploadType');
        var note = Utils.byId('filmReuploadNote');
        if (!modal) return;

        currentReuploadIdx = idx;
        var item = AppData.filmData[idx];
        if (projectLabel) projectLabel.textContent = item.id + ' / ' + item.name;
        if (typeSelect) typeSelect.value = 'image';
        if (note) note.value = '';
        fillEpisodeOptions(item);
        handleReuploadTypeChange();
        modal.classList.add('is-visible');
    }

    function closeReuploadModal() {
        var modal = Utils.byId('filmReuploadModal');
        if (modal) modal.classList.remove('is-visible');
    }

    function fillEpisodeOptions(item) {
        var episodeSelect = Utils.byId('filmEpisodeSelect');
        if (!episodeSelect) return;

        var total = parseInt(item.episodes, 10);
        if (!total || total < 1) total = Math.max(parseInt(item.uploaded, 10) || 1, 1);

        var html = '';
        for (var i = 1; i <= total; i++) {
            html += '<option value="' + i + '">第 ' + i + ' 集</option>';
        }
        episodeSelect.innerHTML = html;
    }

    function handleReuploadTypeChange() {
        var typeSelect = Utils.byId('filmReuploadType');
        var trailerField = Utils.byId('filmTrailerField');
        var episodeField = Utils.byId('filmEpisodeField');
        if (!typeSelect || !trailerField || !episodeField) return;

        trailerField.classList.toggle('hidden', typeSelect.value !== 'trailer');
        episodeField.classList.toggle('hidden', typeSelect.value !== 'video');
    }

    function confirmReupload() {
        var item = AppData.filmData[currentReuploadIdx];
        var typeSelect = Utils.byId('filmReuploadType');
        var trailerSelect = Utils.byId('filmTrailerSelect');
        var episodeSelect = Utils.byId('filmEpisodeSelect');
        var note = Utils.byId('filmReuploadNote');
        if (!item || !typeSelect) return;

        var typeMap = {
            image: '分集图片',
            cover: '封面',
            trailer: '预告片',
            asset: '资产',
            video: '视频'
        };
        var target = typeMap[typeSelect.value];
        var extra = '—';
        if (typeSelect.value === 'trailer' && trailerSelect) extra = selectedText(trailerSelect);
        if (typeSelect.value === 'video' && episodeSelect) extra = selectedText(episodeSelect);

        AppData.deliveryReuploadRequests.unshift({
            projectId: item.id,
            projectName: item.name,
            type: target,
            extra: extra,
            note: (note && note.value.trim()) || '无',
            status: '待重新上传',
            createdAt: formatNow()
        });

        renderRequestBadge();
        if (window.DeliveryModule && DeliveryModule.renderReuploadRequests) {
            DeliveryModule.renderReuploadRequests();
        }
        closeReuploadModal();
        openDeliveryRequests();
    }

    function renderRequestBadge() {
        var badge = Utils.byId('filmApplyBadge');
        if (badge) badge.textContent = AppData.deliveryReuploadRequests.length;
    }

    function openDeliveryRequests() {
        if (window.switchView) switchView('delivery');
        if (window.DeliveryModule && DeliveryModule.renderReuploadRequests) {
            DeliveryModule.renderReuploadRequests();
        }
        setTimeout(function() {
            var center = Utils.byId('deliveryReuploadRequests');
            if (center) center.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 0);
    }

    function formatNow() {
        var d = new Date();
        function pad(n) { return String(n).padStart(2, '0'); }
        return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate())
            + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
    }

    function selectedText(select) {
        if (!select || !select.selectedOptions || !select.selectedOptions.length) return '—';
        return select.selectedOptions[0].textContent;
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
        handleReuploadTypeChange: handleReuploadTypeChange,
        confirmReupload: confirmReupload,
        openDeliveryRequests: openDeliveryRequests
    };
})();
