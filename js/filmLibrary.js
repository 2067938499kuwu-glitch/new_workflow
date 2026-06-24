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
        var container = Utils.byId('filmEpisodeCheckboxList');
        if (!container) return;

        var total = parseInt(item.episodes, 10) || 0;
        if (!total || total < 1) total = 60;

        var html = '';
        for (var i = 1; i <= total; i++) {
            html += '<label class="episode-badge" onclick="FilmLibrary.toggleEpisodeBadge(this, ' + i + ')">'
                + '<input type="checkbox" class="episode-checkbox" value="' + i + '">'
                + i
                + '</label>';
        }
        container.innerHTML = html;
        updateEpisodeCount();
    }

    function toggleEpisodeBadge(labelEl, idx) {
        var cb = labelEl.querySelector('input');
        cb.checked = !cb.checked;
        labelEl.classList.toggle('is-active', cb.checked);
        onSelectionChange();
    }

    function toggleSelectAllEpisodes() {
        var badges = document.querySelectorAll('#filmEpisodeCheckboxList .episode-badge');
        var allChecked = true;
        badges.forEach(function(b) {
            if (!b.querySelector('input').checked) allChecked = false;
        });

        var shouldCheck = !allChecked;
        badges.forEach(function(b) {
            b.querySelector('input').checked = shouldCheck;
            b.classList.toggle('is-active', shouldCheck);
        });
        onSelectionChange();
    }

    function updateEpisodeCount() {
        var countEl = Utils.byId('filmEpisodeCount');
        var selectAllBtn = Utils.byId('filmEpisodeSelectAll');
        if (!countEl) return;

        var checked = document.querySelectorAll('#filmEpisodeCheckboxList .episode-checkbox:checked');
        var total = document.querySelectorAll('#filmEpisodeCheckboxList .episode-checkbox').length;
        countEl.textContent = '已选 ' + checked.length + ' 集';
        countEl.classList.toggle('has-selection', checked.length > 0);

        if (selectAllBtn) {
            var isAll = checked.length === total && total > 0;
            selectAllBtn.textContent = isAll ? '取消全选' : '全选';
            selectAllBtn.classList.toggle('is-all', isAll);
        }
    }

    function fillTrailerOptions() {
        var container = Utils.byId('filmTrailerCheckboxList');
        if (!container) return;

        var html = '';
        for (var i = 1; i <= 3; i++) {
            html += '<label class="checkbox-item">'
                + '<input type="checkbox" class="trailer-checkbox" value="预告片 ' + i + '" onchange="FilmLibrary.onSelectionChange()">'
                + '<span>预告片 ' + i + '</span>'
                + '</label>';
        }
        container.innerHTML = html;
    }

    function onSelectionChange() {
        var typeSelect = Utils.byId('filmReuploadType');
        var imagesContainer = Utils.byId('filmSelectionImagesContainer');
        var imagesField = Utils.byId('filmSelectionImages');
        if (!typeSelect || !imagesContainer || !imagesField) return;

        var type = typeSelect.value;
        var checkboxes;
        if (type === 'video') {
            updateEpisodeCount();
            checkboxes = document.querySelectorAll('#filmEpisodeCheckboxList .episode-checkbox:checked');
        } else if (type === 'trailer') {
            checkboxes = document.querySelectorAll('#filmTrailerCheckboxList .trailer-checkbox:checked');
        } else {
            imagesField.classList.add('hidden');
            return;
        }

        if (checkboxes.length === 0) {
            imagesField.classList.add('hidden');
            return;
        }

        imagesField.classList.remove('hidden');

        var html = '';
        checkboxes.forEach(function(cb) {
            var label = cb.value;
            var displayLabel = type === 'video' ? '第 ' + label + ' 集' : label;
            var imgId = 'sel_img_' + label.replace(/[\s\u4e00-\u9fa5]/g, '_');
            html += '<div class="selection-image-card">'
                + '<div class="selection-image-label">' + displayLabel + '</div>'
                + '<div class="selection-image-upload" id="' + imgId + '_wrap" onclick="document.getElementById(\'' + imgId + '_input\').click()">'
                + '<i class="fa-solid fa-image"></i>'
                + '<span>点击上传图片</span>'
                + '</div>'
                + '<input type="file" accept="image/*" id="' + imgId + '_input" class="hidden" onchange="FilmLibrary.handleImageUpload(this, \'' + imgId + '\')">'
                + '<div class="selection-image-preview hidden" id="' + imgId + '_preview">'
                + '<img id="' + imgId + '_img">'
                + '<button type="button" class="selection-image-remove" onclick="FilmLibrary.removeImage(\'' + imgId + '\')">&times;</button>'
                + '</div>'
                + '</div>';
        });
        imagesContainer.innerHTML = html;
    }

    function handleImageUpload(input, imgId) {
        var file = input.files && input.files[0];
        if (!file) return;

        var reader = new FileReader();
        reader.onload = function(e) {
            var wrap = Utils.byId(imgId + '_wrap');
            var preview = Utils.byId(imgId + '_preview');
            var img = Utils.byId(imgId + '_img');
            if (wrap) wrap.classList.add('hidden');
            if (preview) preview.classList.remove('hidden');
            if (img) img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    function removeImage(imgId) {
        var wrap = Utils.byId(imgId + '_wrap');
        var preview = Utils.byId(imgId + '_preview');
        var input = Utils.byId(imgId + '_input');
        if (wrap) wrap.classList.remove('hidden');
        if (preview) preview.classList.add('hidden');
        if (input) input.value = '';
    }

    function handleReuploadTypeChange() {
        var typeSelect = Utils.byId('filmReuploadType');
        var trailerField = Utils.byId('filmTrailerField');
        var episodeField = Utils.byId('filmEpisodeField');
        var imagesField = Utils.byId('filmSelectionImages');
        if (!typeSelect || !trailerField || !episodeField || !imagesField) return;

        var isTrailer = typeSelect.value === 'trailer';
        var isVideo = typeSelect.value === 'video';

        trailerField.classList.toggle('hidden', !isTrailer);
        episodeField.classList.toggle('hidden', !isVideo);
        imagesField.classList.add('hidden');

        if (isTrailer) fillTrailerOptions();
        if (isVideo) {
            var item = AppData.filmData[currentReuploadIdx];
            if (item) fillEpisodeOptions(item);
        }
    }

    function getSelectedLabels() {
        var typeSelect = Utils.byId('filmReuploadType');
        if (!typeSelect) return [];

        var type = typeSelect.value;
        var selector = type === 'video'
            ? '#filmEpisodeCheckboxList .episode-checkbox:checked'
            : type === 'trailer'
                ? '#filmTrailerCheckboxList .trailer-checkbox:checked'
                : '';
        if (!selector) return [];

        var checked = document.querySelectorAll(selector);
        return Array.from(checked).map(function(cb) { return cb.value; });
    }

    function confirmReupload() {
        var item = AppData.filmData[currentReuploadIdx];
        var typeSelect = Utils.byId('filmReuploadType');
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
        var selectedLabels = getSelectedLabels();
        var extra = selectedLabels.length > 0 ? selectedLabels.join('、') : '—';

        // 收集每个选中项的图片数据
        var selections = [];
        selectedLabels.forEach(function(label) {
            var imgId = 'sel_img_' + label.replace(/[\s\u4e00-\u9fa5]/g, '_');
            var img = Utils.byId(imgId + '_img');
            selections.push({
                label: label,
                imageSrc: img ? (img.src || '') : ''
            });
        });

        AppData.deliveryReuploadRequests.unshift({
            projectId: item.id,
            projectName: item.name,
            type: target,
            extra: extra,
            selections: selections,
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
        openDeliveryRequests: openDeliveryRequests,
        onSelectionChange: onSelectionChange,
        handleImageUpload: handleImageUpload,
        removeImage: removeImage,
        toggleEpisodeBadge: toggleEpisodeBadge,
        toggleSelectAllEpisodes: toggleSelectAllEpisodes
    };
})();
