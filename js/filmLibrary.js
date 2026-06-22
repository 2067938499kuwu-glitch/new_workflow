/* AIGC管理后台 - 成片库模块 */
var FilmLibrary = (function() {

    function render() {
        var tbody = Utils.byId('filmTableBody');
        tbody.innerHTML = AppData.filmData.map(function(r, idx) {
            var total = r.episodes === '—' ? '?' : r.episodes;
            var uploaded = r.uploaded !== undefined ? r.uploaded : 0;
            var progressText = uploaded + '/' + total + ' 集';
            var isComplete = r.episodes !== '—' && uploaded == parseInt(r.episodes);
            var countClass = 'episode-count' + (isComplete ? ' complete' : '');
            var syncClass = r.synced ? 'sync-done' : 'sync-pending';
            var syncText = r.synced ? '已同步' : '未同步';

            // 下载按钮
            var downloadBtnHtml = '';
            if (r.downloadStatus === 'none') {
                downloadBtnHtml = '<button class="action-btn download-btn" onclick="FilmLibrary.applyDownload(' + idx + ')"><i class="fa-regular fa-circle-down mr-1"></i>申请下载</button>';
            } else if (r.downloadStatus === 'applying') {
                downloadBtnHtml = '<button class="action-btn download-btn-applying" disabled><i class="fa-regular fa-hourglass mr-1"></i>申请中</button>';
            } else if (r.downloadStatus === 'approved') {
                downloadBtnHtml = '<button class="action-btn download-btn-ready" onclick="FilmLibrary.showDownloadModal(' + idx + ')"><i class="fa-solid fa-download mr-1"></i>下载</button>';
            }

            return '<tr>'
                + '<td><span class="project-id">' + r.id + '</span></td>'
                + '<td class="text-gray-900 font-medium">' + r.name + '</td>'
                + '<td class="text-gray-500">' + r.episodes + '</td>'
                + '<td class="text-gray-400">' + r.category + '</td>'
                + '<td><span class="' + countClass + '">' + progressText + '</span></td>'
                + '<td class="text-gray-400">' + r.deadline + '</td>'
                + '<td><span class="' + syncClass + '">' + syncText + '</span></td>'
                + '<td><div class="flex items-center justify-center gap-1">'
                + '<button class="action-btn"><i class="fa-regular fa-eye mr-1"></i>查看</button>'
                + downloadBtnHtml
                + '</div></td>'
                + '</tr>';
        }).join('');
    }

    // 申请下载
    function applyDownload(idx) {
        AppData.filmData[idx].downloadStatus = 'applying';
        render();

        // 模拟 2 秒后审核通过
        setTimeout(function() {
            AppData.filmData[idx].downloadStatus = 'approved';
            render();
        }, 2000);
    }

    // 显示水印选择弹窗
    function showDownloadModal(idx) {
        var modal = Utils.byId('downloadModal');
        if (!modal) return;
        modal.classList.add('is-visible');
        modal._projectIdx = idx;
    }

    // 关闭下载弹窗
    function closeDownloadModal() {
        var modal = Utils.byId('downloadModal');
        if (modal) modal.classList.remove('is-visible');
    }

    // 确认下载（模拟）
    function confirmDownload(watermarkType) {
        var modal = Utils.byId('downloadModal');
        var idx = modal ? modal._projectIdx : -1;
        var projectName = idx >= 0 ? AppData.filmData[idx].name : '';

        var watermarkText = '';
        if (watermarkType === 'none') watermarkText = '无水印';
        else if (watermarkType === 'visible') watermarkText = '明水印';
        else if (watermarkType === 'invisible') watermarkText = '暗水印';

        alert('开始下载「' + projectName + '」，水印类型：' + watermarkText + '\n（模拟下载流程）');
        closeDownloadModal();
    }

    return {
        render: render,
        applyDownload: applyDownload,
        showDownloadModal: showDownloadModal,
        closeDownloadModal: closeDownloadModal,
        confirmDownload: confirmDownload
    };
})();
