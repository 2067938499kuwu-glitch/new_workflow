/* AIGC管理后台 - 视图切换 */
var ViewRouter = (function() {
    var currentView = 'filmlibrary';

    function switchView(view) {
        // 离开图片生成工作区
        Utils.byId('mainContent').style.display = '';
        Utils.byId('workspace-canvas').classList.add('hidden');

        currentView = view;

        // 导航高亮
        Utils.qsa('.nav-item').forEach(function(el) { el.classList.remove('active'); });
        Utils.qsa('.nav-item').forEach(function(el) {
            var span = el.querySelector('span:last-child');
            if (span && AppData.pageTitles[view] && span.textContent === AppData.pageTitles[view]) {
                el.classList.add('active');
            }
        });
        if (['topic','approval','task','cost'].indexOf(view) !== -1) {
            Utils.qsa('.nav-item').forEach(function(el) {
                var s = el.querySelector('span:last-child');
                if (s && s.textContent === '项目管理') el.classList.add('active');
            });
        }

        Utils.pageTitle(AppData.pageTitles[view] || view);

        // 切换面板
        Utils.qsa('.view-panel').forEach(function(p) { p.classList.remove('active'); });
        if (view === 'canvas') {
            Utils.byId('view-canvas-projects').classList.add('active');
            CanvasModule.refreshProjectList();
        } else if (view === 'delivery') {
            Utils.byId('view-delivery').classList.add('active');
            DeliveryModule.render();
        } else {
            Utils.byId('view-filmlibrary').classList.add('active');
            if (view === 'filmlibrary') FilmLibrary.render();
        }
    }

    function backToCanvasProjects() {
        Utils.byId('mainContent').style.display = '';
        Utils.byId('workspace-canvas').classList.add('hidden');
        switchView('canvas');
    }

    return {
        switchView: switchView,
        backToCanvasProjects: backToCanvasProjects,
        getCurrentView: function() { return currentView; }
    };
})();

window.switchView = ViewRouter.switchView;
window.backToCanvasProjects = ViewRouter.backToCanvasProjects;
