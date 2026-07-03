var DeliveryModule = (function() {
    var uploadPanels = null;
    var uploadTitles = null;
    var currentFrameProjectName = '';
    var skipFrameConfigAutoClose = false;
    var reviewTypes = ['成片', '原片', '音频', '字幕', '分集图片', '预告片'];
    var reviewState = {
        projectName: '',
        activeEpisode: 1,
        activeType: '成片',
        feedback: '',
        feedbackType: ''
    };

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
            var frameBtn = createActionButton('提帧配置', '', function(event) { showFrameConfigPopover(event.currentTarget, item.name); });
            frameBtn.setAttribute('data-frame-config-trigger', 'table');
            actions.appendChild(uploadBtn);
            actions.appendChild(reviewBtn);
            actions.appendChild(frameBtn);
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

    function getDeliveryItemByName(projectName) {
        var items = AppData.deliveryData || [];
        for (var i = 0; i < items.length; i++) {
            if (items[i].name === projectName) return items[i];
        }
        return null;
    }

    function buildDefaultReviewSession(item) {
        var episodes = [1, 2, 3];
        var commentsByKey = {};
        reviewTypes.forEach(function(type) {
            episodes.forEach(function(episode) {
                commentsByKey[episode + '|' + type] = [{
                    id: 1,
                    time: '00:01',
                    frame: '49帧',
                    content: ''
                }];
            });
        });
        return {
            episodeRange: '1-3集',
            statusLabel: item && item.status === '已完成' ? '已通过' : '审核中',
            commentsByKey: commentsByKey
        };
    }

    function ensureReviewSession(item) {
        if (!item) return null;
        if (!item.reviewSession) item.reviewSession = buildDefaultReviewSession(item);
        return item.reviewSession;
    }

    function getCurrentReviewItem() {
        return getDeliveryItemByName(reviewState.projectName);
    }

    function getReviewCommentsByEpisodeAndType(episode, type) {
        var item = getCurrentReviewItem();
        var session = ensureReviewSession(item);
        var key = episode + '|' + type;
        if (!session.commentsByKey[key]) session.commentsByKey[key] = [];
        return session.commentsByKey[key];
    }

    function getCurrentReviewComments() {
        return getReviewCommentsByEpisodeAndType(reviewState.activeEpisode, reviewState.activeType);
    }

    function renderReviewEpisodes() {
        return [1, 2, 3].map(function(episode) {
            var classes = ['delivery-review-episode-tab'];
            if (episode === reviewState.activeEpisode) classes.push('is-active');
            if (episode === 3) classes.push('is-complete');
            return '<button type="button" class="' + classes.join(' ') + '" data-review-episode="' + episode + '">' + episode + '</button>';
        }).join('');
    }

    function renderReviewComments(episode, type) {
        var comments = getReviewCommentsByEpisodeAndType(episode, type);
        if (!comments.length) {
            return '<div class="delivery-review-comment-item"><div class="delivery-review-comment-head"><strong>\u6682\u65e0\u6279\u6ce8</strong></div></div>';
        }
        return comments.map(function(note, index) {
            return '<div class="delivery-review-comment-item">'
                + '<div class="delivery-review-comment-head"><strong>\u6279\u6ce8 ' + (index + 1) + '</strong><button type="button" class="delivery-review-comment-remove" data-review-remove-note="' + note.id + '" data-review-remove-episode="' + episode + '" data-review-remove-type="' + Utils.escapeHtml(type) + '">\u79fb\u9664</button></div>'
                + '<div class="delivery-review-comment-meta"><span>' + Utils.escapeHtml(note.time) + '</span><span>' + Utils.escapeHtml(note.frame) + '</span></div>'
                + '<label class="delivery-review-comment-field"><span>* \u6279\u6ce8\u5185\u5bb9</span><textarea data-note-input="' + note.id + '" data-note-episode="' + episode + '" data-note-type="' + Utils.escapeHtml(type) + '" placeholder="\u8bf7\u8f93\u5165\u6279\u6ce8\u5185\u5bb9\uff08\u5fc5\u586b\uff09">' + Utils.escapeHtml(note.content || '') + '</textarea></label>'
                + '</div>';
        }).join('');
    }

    function getReviewTypePanelSummary(comments) {
        if (!comments.length) return '\u6682\u65e0\u6279\u6ce8';
        var filledCount = comments.filter(function(note) { return (note.content || '').trim(); }).length;
        if (!filledCount) return comments.length + ' \u6761\u5f85\u8865\u5145\u6279\u6ce8';
        return filledCount + '/' + comments.length + ' \u6761\u5df2\u586b\u5199\u6279\u6ce8';
    }

    function renderReviewTypePanels() {
        var episode = reviewState.activeEpisode;
        return reviewTypes.map(function(type) {
            var comments = getReviewCommentsByEpisodeAndType(episode, type);
            return '<section class="delivery-review-type-panel">'
                + '<div class="delivery-review-type-panel-head">'
                + '<div><h5>' + Utils.escapeHtml(type) + '</h5><p>\u7b2c ' + episode + ' \u96c6</p></div>'
                + '<span class="delivery-review-type-panel-status">' + Utils.escapeHtml(getReviewTypePanelSummary(comments)) + '</span>'
                + '</div>'
                + '<div class="delivery-review-type-panel-notes">' + renderReviewComments(episode, type) + '</div>'
                + '</section>';
        }).join('');
    }

    function renderReviewModal() {
        var item = getCurrentReviewItem();
        var modal = Utils.byId('detailModal');
        if (!item || !modal) return;
        var session = ensureReviewSession(item);
        var title = Utils.byId('deliveryReviewProjectTitle');
        var episodeTabs = Utils.byId('deliveryReviewEpisodeTabs');
        var range = Utils.byId('deliveryReviewEpisodeRange');
        var currentEpisode = Utils.byId('deliveryReviewCurrentEpisode');
        var statusText = Utils.byId('deliveryReviewStatusText');
        var notice = Utils.byId('deliveryReviewFrameNotice');
        var noticeText = Utils.byId('deliveryReviewFrameNoticeText');
        var feedback = Utils.byId('deliveryReviewFeedback');
        var typePanels = Utils.byId('deliveryReviewTypePanels');

        if (title) title.textContent = item.name;
        if (episodeTabs) episodeTabs.innerHTML = renderReviewEpisodes();
        if (range) range.value = session.episodeRange || '1-3\u96c6';
        if (currentEpisode) currentEpisode.textContent = '\u7b2c' + reviewState.activeEpisode + '\u96c6';
        if (statusText) statusText.textContent = session.statusLabel || '\u5ba1\u6838\u4e2d';
        if (typePanels) typePanels.innerHTML = renderReviewTypePanels();

        if (notice && noticeText) {
            noticeText.textContent = item.frameConfigConfigured
                ? '当前项目提帧配置已完成，可以继续审核。'
                : '当前项目尚未完成提帧配置，建议先配置后再执行全部通过。';
            notice.classList.toggle('hidden', !!item.frameConfigConfigured);
        }

        if (feedback) {
            feedback.className = 'delivery-review-feedback' + (reviewState.feedback ? '' : ' hidden');
            if (reviewState.feedbackType) feedback.classList.add('is-' + reviewState.feedbackType);
            feedback.textContent = reviewState.feedback || '';
        }
    }

    function showDetailModal(name) {
        var modal = Utils.byId('detailModal');
        var item = getDeliveryItemByName(name);
        if (!modal || !item) return;
        reviewState.projectName = name;
        reviewState.activeEpisode = 1;
        reviewState.activeType = '成片';
        reviewState.feedback = '';
        reviewState.feedbackType = '';
        ensureReviewSession(item);
        renderReviewModal();
        modal.classList.add('is-visible');
    }

    function closeDetailModal() {
        var modal = Utils.byId('detailModal');
        if (!modal) return;
        modal.classList.remove('is-visible');
        reviewState.feedback = '';
        reviewState.feedbackType = '';
    }

    function updateReviewNote(noteId, value, episode, type) {
        var comments = getReviewCommentsByEpisodeAndType(episode, type);
        for (var i = 0; i < comments.length; i++) {
            if (String(comments[i].id) === String(noteId)) {
                comments[i].content = value;
                break;
            }
        }
        renderReviewModal();
    }

    function removeReviewNote(noteId, episode, type) {
        var comments = getReviewCommentsByEpisodeAndType(episode, type);
        var next = comments.filter(function(note) { return String(note.id) !== String(noteId); });
        var item = getCurrentReviewItem();
        var session = ensureReviewSession(item);
        session.commentsByKey[episode + '|' + type] = next;
        renderReviewModal();
    }

    function updateReviewStatus(statusLabel, feedback, feedbackType) {
        var item = getCurrentReviewItem();
        var session = ensureReviewSession(item);
        if (!item || !session) return;
        session.statusLabel = statusLabel;
        reviewState.feedback = feedback || '';
        reviewState.feedbackType = feedbackType || '';
        render();
        renderReviewModal();
    }

    function handleApproveReview(triggerBtn) {
        var item = getCurrentReviewItem();
        if (!item) return;
        if (!item.frameConfigConfigured) {
            reviewState.feedback = '请先完成提帧配置，再执行全部通过。';
            reviewState.feedbackType = 'danger';
            renderReviewModal();
            return;
        }
        item.status = '已完成';
        item.statusClass = 'delivery-status-done';
        item.approved = Number(item.approved || 0) + Math.max(Number(item.pending || 0), 1);
        item.pending = 0;
        updateReviewStatus('已通过', '当前批次已全部通过，可继续切换集数复核。', 'success');
    }

    function handleRejectReview() {
        var item = getCurrentReviewItem();
        if (!item) return;
        item.status = '审核驳回';
        item.statusClass = 'delivery-status-reject';
        item.rejected = Number(item.rejected || 0) + 1;
        updateReviewStatus('已驳回', '已驳回当前批次，请补充批注后通知上传方修正。', 'danger');
    }

    function showFrameConfigPopover(triggerBtn, projectName) {
        var popover = Utils.byId('deliveryFrameConfigPopover');
        var ratio = Utils.byId('deliveryFrameRatio');
        var fps = Utils.byId('deliveryFrameFps');
        var item = getDeliveryItemByName(projectName);
        var config = item && item.frameConfig ? item.frameConfig : { ratio: '1920（宽屏）', fps: '30' };
        if (!popover || !ratio || !fps || !triggerBtn) return;

        currentFrameProjectName = projectName || '';
        ratio.value = config.ratio || '1920（宽屏）';
        fps.value = config.fps || '30';
        skipFrameConfigAutoClose = true;
        window.setTimeout(function() {
            skipFrameConfigAutoClose = false;
        }, 0);

        var rect = triggerBtn.getBoundingClientRect();
        popover.style.top = (rect.bottom + window.scrollY + 8) + 'px';
        popover.style.left = Math.max(12, rect.left + window.scrollX - 40) + 'px';
        popover.classList.remove('hidden');
    }

    function hideFrameConfigPopover() {
        var popover = Utils.byId('deliveryFrameConfigPopover');
        if (!popover) return;
        popover.classList.add('hidden');
        currentFrameProjectName = '';
    }

    function saveFrameConfig() {
        var ratio = Utils.byId('deliveryFrameRatio');
        var fps = Utils.byId('deliveryFrameFps');
        var item = getDeliveryItemByName(currentFrameProjectName);
        if (!ratio || !fps || !item) return;

        item.frameConfig = {
            ratio: ratio.value,
            fps: fps.value
        };
        item.frameConfigConfigured = true;
        if (reviewState.projectName === item.name) {
            reviewState.feedback = '提帧配置已保存，可以继续完成审核。';
            reviewState.feedbackType = 'success';
            renderReviewModal();
        }
        hideFrameConfigPopover();
    }

    function initDetailModal() {
        var modal = Utils.byId('detailModal');
        if (!modal) return;
        var closeBtn = Utils.byId('closeDetail');
        if (closeBtn) closeBtn.addEventListener('click', closeDetailModal);
        modal.addEventListener('click', function(event) {
            if (event.target === modal) closeDetailModal();
        });
        modal.addEventListener('click', function(event) {
            var episodeBtn = event.target.closest('[data-review-episode]');
            var removeBtn = event.target.closest('[data-review-remove-note]');
            var configBtn = event.target.closest('[data-frame-config-trigger="review"]');
            if (episodeBtn) {
                reviewState.activeEpisode = Number(episodeBtn.getAttribute('data-review-episode'));
                renderReviewModal();
                return;
            }
            if (removeBtn) {
                removeReviewNote(
                    removeBtn.getAttribute('data-review-remove-note'),
                    Number(removeBtn.getAttribute('data-review-remove-episode')),
                    removeBtn.getAttribute('data-review-remove-type')
                );
                return;
            }
            if (configBtn) {
                showFrameConfigPopover(configBtn, reviewState.projectName);
                return;
            }
            if (event.target.closest('#deliveryReviewApproveBtn')) {
                handleApproveReview(event.target.closest('#deliveryReviewApproveBtn'));
                return;
            }
            if (event.target.closest('#deliveryReviewRejectBtn')) {
                handleRejectReview();
            }
        });
        modal.addEventListener('input', function(event) {
            if (!event.target.matches('[data-note-input]')) return;
            updateReviewNote(
                event.target.getAttribute('data-note-input'),
                event.target.value,
                Number(event.target.getAttribute('data-note-episode')),
                event.target.getAttribute('data-note-type')
            );
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
        modal.addEventListener('click', function(event) { if (event.target === modal) closeUploadModal(); });
    }

    function initFrameConfigPopover() {
        var popover = Utils.byId('deliveryFrameConfigPopover');
        var confirmBtn = Utils.byId('deliveryFrameConfigConfirmBtn');
        if (!popover) return;
        document.addEventListener('click', function(event) {
            if (popover.classList.contains('hidden')) return;
            if (skipFrameConfigAutoClose) return;
            if (popover.contains(event.target)) return;
            if (event.target.closest('[data-frame-config-trigger]')) return;
            hideFrameConfigPopover();
        });
        if (confirmBtn) confirmBtn.addEventListener('click', saveFrameConfig);
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
        initFrameConfigPopover();
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
