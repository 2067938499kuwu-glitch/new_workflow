var TaskModule = (function() {
    var currentRole = 'clip';
    var currentSource = 'task';
    var currentTaskId = 1;
    var currentEpisode = 1;
    var hasAutoOpened = false;

    var roleTabs = [
        { key: 'edit', label: '编辑' },
        { key: 'produce', label: '制作' },
        { key: 'clip', label: '剪辑' },
        { key: 'manager', label: '制片' }
    ];

    var taskList = [
        {
            id: 1,
            name: '海贼王',
            role: 'clip',
            episodeRange: '1-3集',
            mergeNote: '当前剧集第1与第2集需要合并在一起',
            submitter: 'zhipian1',
            submitTime: '2026/6/11 13:20:07',
            reviewer: '审核员A',
            reviewTime: '2026/6/11 14:05:00',
            files: [
                { type: '成片', name: 'EP01_成片.mp4', status: 'ok' },
                { type: '原片', name: 'EP01_原片.mp4', status: 'ok' },
                { type: '音频', name: 'EP01_音频.mp3', status: 'ok' },
                { type: '字幕', name: 'EP01_字幕.srt', status: 'error' }
            ]
        }
    ];

    function getTask(taskId) {
        var list = taskList;
        for (var i = 0; i < list.length; i += 1) {
            if (list[i].id === taskId) return list[i];
        }
        return list[0];
    }

    function render(source) {
        currentSource = source || currentSource;
        if (Utils.byId('pageTitle')) {
            Utils.byId('pageTitle').textContent = currentSource === 'cost' ? '成本工时管理' : '任务列表';
        }
        renderRoleTabs();
        renderTaskTable();
        bindModalEvents();

        if (currentSource === 'task' && !hasAutoOpened) {
            hasAutoOpened = true;
            openClipModal(1);
        }
    }

    function renderRoleTabs() {
        var tabWrap = Utils.byId('taskRoleTabs');
        if (!tabWrap) return;
        tabWrap.innerHTML = roleTabs.map(function(tab) {
            var activeClass = tab.key === currentRole ? 'task-role-tab active' : 'task-role-tab';
            return '<button class="' + activeClass + '" onclick="TaskModule.switchRole(\'' + tab.key + '\')">' + tab.label + '</button>';
        }).join('');
    }

    function renderTaskTable() {
        var body = Utils.byId('taskTableBody');
        if (!body) return;

        var rows = taskList.filter(function(item) {
            return item.role === currentRole;
        });

        body.innerHTML = rows.map(function(item) {
            return ''
                + '<tr>'
                + '<td class="py-3 px-4 text-gray-700">' + item.id + '</td>'
                + '<td class="py-3 px-4"><button class="task-link-btn" onclick="TaskModule.openClipModal(' + item.id + ')">' + item.name + '</button></td>'
                + '<td class="py-3 px-4">'
                + '<div class="task-table-actions">'
                + '<button class="task-text-action">资产设定</button>'
                + '<button class="task-text-action">去处理</button>'
                + '<button class="task-text-action">剧本审核</button>'
                + '<button class="task-text-action task-text-action-primary" onclick="TaskModule.openClipModal(' + item.id + ')">去剪辑</button>'
                + '<button class="task-text-action">...</button>'
                + '</div>'
                + '</td>'
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

        Utils.byId('taskClipTitle').textContent = '剪辑-' + task.name;
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
            var activeClass = i === currentEpisode ? 'task-episode-pill active' : 'task-episode-pill';
            html += '<button class="' + activeClass + '" onclick="TaskModule.switchEpisode(' + i + ')">' + i + '</button>';
        }
        wrap.innerHTML = html;
    }

    function renderFileCards(task) {
        var wrap = Utils.byId('taskFileStatusList');
        if (!task || !wrap) return;

        wrap.innerHTML = task.files.map(function(file) {
            var stateClass = file.status === 'error' ? 'is-error' : 'is-ok';
            return ''
                + '<div class="task-file-card ' + stateClass + '">'
                + '<div class="task-file-type"><span class="task-file-dot"></span>' + file.type + '</div>'
                + '<div class="task-file-name">' + file.name + '</div>'
                + '<button class="task-file-link">点击预览</button>'
                + '</div>';
        }).join('');
    }

    function renderHistory(task) {
        var body = Utils.byId('taskHistoryBody');
        if (!body) return;

        body.innerHTML = ''
            + '<tr>'
            + '<td>第1次</td>'
            + '<td>' + task.submitTime + '</td>'
            + '<td>EP01_成片.mp4<div class="task-history-link">本次上传</div></td>'
            + '<td>EP01_原片.mp4<div class="task-history-link">本次上传</div></td>'
            + '<td>EP01_音频.mp3<div class="task-history-link">本次上传</div></td>'
            + '<td>EP01_字幕.srt<div class="task-history-link">本次上传</div></td>'
            + '<td>' + task.submitter + '</td>'
            + '<td>审核人：' + task.reviewer + '<br>时间：' + task.reviewTime + '</td>'
            + '</tr>';
    }

    function confirmSubmit() {
        alert('已提交剪辑交付内容（原型演示）');
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

    return {
        render: render,
        switchRole: switchRole,
        openClipModal: openClipModal,
        closeClipModal: closeClipModal,
        switchEpisode: switchEpisode,
        confirmSubmit: confirmSubmit
    };
})();
