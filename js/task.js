var TaskModule = (function() {
    var currentRole = 'clip';
    var currentSource = 'task';
    var currentTaskId = 1;
    var currentEpisode = 1;

    function getTask(taskId) {
        return AppData.taskList.filter(function(item) { return item.id === taskId; })[0] || AppData.taskList[0];
    }

    function render(source) {
        currentSource = source || currentSource;
        Utils.pageTitle(currentSource === 'cost' ? '成本工时管理' : '任务列表');
        renderRoleTabs();
        renderTaskTable();
    }

    function renderRoleTabs() {
        var wrap = Utils.byId('taskRoleTabs');
        if (!wrap) return;

        wrap.innerHTML = AppData.taskRoleTabs.map(function(tab) {
            return '<button class="task-role-tab' + (tab.key === currentRole ? ' active' : '') + '" onclick="TaskModule.switchRole(\'' + tab.key + '\')">' + Utils.escapeHtml(tab.label) + '</button>';
        }).join('');
    }

    function renderTaskTable() {
        var body = Utils.byId('taskTableBody');
        if (!body) return;

        var rows = AppData.taskList.filter(function(item) {
            return item.role === currentRole;
        });

        if (!rows.length) {
            body.innerHTML = '<tr><td colspan="9">' + Utils.renderEmptyState('当前角色暂无任务', '切换角色或稍后刷新任务列表。') + '</td></tr>';
            return;
        }

        body.innerHTML = rows.map(function(item) {
            var badgeClass = item.status === '进行中' ? 'task-status-pill is-running' : 'task-status-pill';
            var progressClass = item.progress === '0/10' ? 'task-progress-pill' : 'task-progress-pill is-active';
            var pendingDot = item.pendingCount > 0 ? '<span class="task-op-dot">' + item.pendingCount + '</span>' : '';

            return '<tr>'
                + '<td><span class="table-number">' + item.id + '</span></td>'
                + '<td><button class="task-link-btn" onclick="TaskModule.openClipModal(' + item.id + ')">' + Utils.escapeHtml(item.name) + '</button></td>'
                + '<td><span class="' + badgeClass + '">' + Utils.escapeHtml(item.status) + '</span></td>'
                + '<td><span class="task-genre-text">' + Utils.escapeHtml(item.projectType) + '</span></td>'
                + '<td><span class="task-episode-pill">' + Utils.escapeHtml(item.episodeCount) + '</span></td>'
                + '<td><span class="task-date-text">' + Utils.escapeHtml(item.plannedAt) + '</span></td>'
                + '<td><span class="task-date-text task-date-text--muted">' + Utils.escapeHtml(item.actualAt) + '</span></td>'
                + '<td><span class="' + progressClass + '">' + Utils.escapeHtml(item.progress) + '</span></td>'
                + '<td><div class="task-actions-inline">'
                + '<button class="task-text-action">资产设定</button>'
                + '<button class="task-text-action task-text-action-primary" onclick="TaskModule.openClipModal(' + item.id + ')">去处理</button>'
                + '<button class="task-text-action">成片审核</button>'
                + '<button class="task-text-action task-more-action">...' + pendingDot + '</button>'
                + '</div></td>'
                + '</tr>';
        }).join('');
    }

    function switchRole(role) {
        currentRole = role;
        render(currentSource);
    }

    function openClipModal(taskId) {
        currentTaskId = taskId;
        currentEpisode = 1;

        var task = getTask(taskId);
        var modal = Utils.byId('taskClipModal');
        if (!task || !modal) return;

        Utils.byId('taskClipTitle').textContent = '剪辑任务 - ' + task.name;
        Utils.byId('taskClipMergeNote').textContent = task.mergeNote;
        Utils.byId('taskClipSelect').value = task.episodeRange;

        renderEpisodeTabs();
        renderFileCards(task);
        renderHistory(task);

        modal.classList.add('is-visible');
    }

    function closeClipModal() {
        var modal = Utils.byId('taskClipModal');
        if (modal) modal.classList.remove('is-visible');
    }

    function switchEpisode(episode) {
        currentEpisode = episode;
        renderEpisodeTabs();
    }

    function renderEpisodeTabs() {
        var wrap = Utils.byId('taskEpisodeTabs');
        if (!wrap) return;

        var html = '';
        for (var i = 1; i <= 3; i += 1) {
            html += '<button class="task-episode-pill' + (i === currentEpisode ? ' active' : '') + '" onclick="TaskModule.switchEpisode(' + i + ')">' + i + '</button>';
        }
        wrap.innerHTML = html;
    }

    function renderFileCards(task) {
        var wrap = Utils.byId('taskFileStatusList');
        if (!wrap) return;

        wrap.innerHTML = task.files.map(function(file) {
            var stateClass = file.status === 'error' ? 'is-error' : 'is-ok';
            var note = file.status === 'error' ? '需重新提交' : '可继续流转';
            return '<div class="task-file-card ' + stateClass + '">'
                + '<div class="task-file-type"><span class="task-file-dot"></span>' + Utils.escapeHtml(file.type) + '</div>'
                + '<div class="task-file-name">' + Utils.escapeHtml(file.name) + '</div>'
                + '<button class="task-file-link">' + note + '</button>'
                + '</div>';
        }).join('');
    }

    function renderHistory(task) {
        var body = Utils.byId('taskHistoryBody');
        if (!body) return;

        body.innerHTML = '<tr>'
            + '<td>第 1 批</td>'
            + '<td>' + Utils.escapeHtml(task.submitTime) + '</td>'
            + '<td>EP01_成片.mp4<div class="task-history-link">本次提交</div></td>'
            + '<td>EP01_海报.png<div class="task-history-link">本次提交</div></td>'
            + '<td>EP01_BGM.mp3<div class="task-history-link">本次提交</div></td>'
            + '<td>EP01_字幕.srt<div class="task-history-link">本次提交</div></td>'
            + '<td>' + Utils.escapeHtml(task.submitter) + '</td>'
            + '<td>审核人：' + Utils.escapeHtml(task.reviewer) + '<br>时间：' + Utils.escapeHtml(task.reviewTime) + '</td>'
            + '</tr>';
    }

    function confirmSubmit() {
        alert('已提交当前剪辑任务。');
        closeClipModal();
    }

    function bindModalEvents() {
        var modal = Utils.byId('taskClipModal');
        if (!modal || modal.dataset.bound === '1') return;
        modal.dataset.bound = '1';
        modal.addEventListener('click', function(event) {
            if (event.target === modal) closeClipModal();
        });
    }

    document.addEventListener('DOMContentLoaded', bindModalEvents);

    return {
        render: render,
        switchRole: switchRole,
        openClipModal: openClipModal,
        closeClipModal: closeClipModal,
        switchEpisode: switchEpisode,
        confirmSubmit: confirmSubmit
    };
})();
