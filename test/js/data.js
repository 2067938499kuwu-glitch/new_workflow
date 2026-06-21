/* AIGC管理后台 - 数据层 */
var AppData = (function() {
    var filmData = [
        {id:'#2314',name:'吾乃皇帝陛下',episodes:'60',category:'—',status:'待审核',statusClass:'text-orange-500 bg-orange-50 border-orange-100',deadline:'—',synced:false},
        {id:'#2315',name:'吾乃皇帝陛下',episodes:'—',category:'—',status:'待上传',statusClass:'text-gray-500 bg-gray-50 border-gray-200',deadline:'—',synced:false},
        {id:'#2316',name:'吾乃皇帝陛下',episodes:'—',category:'—',status:'待上传',statusClass:'text-gray-500 bg-gray-50 border-gray-200',deadline:'—',synced:true},
        {id:'#2317',name:'ai',episodes:'—',category:'—',status:'待上传',statusClass:'text-gray-500 bg-gray-50 border-gray-200',deadline:'—',synced:false},
        {id:'#2318',name:'zhen new6',episodes:'—',category:'—',status:'待上传',statusClass:'text-gray-500 bg-gray-50 border-gray-200',deadline:'—',synced:false},
        {id:'#2319',name:'《致命客厅》',episodes:'6',category:'—',status:'待审核',statusClass:'text-orange-500 bg-orange-50 border-orange-100',deadline:'—',synced:true},
        {id:'#2320',name:'《三日清空》',episodes:'4',category:'—',status:'待审核',statusClass:'text-orange-500 bg-orange-50 border-orange-100',deadline:'—',synced:false},
        {id:'#2321',name:'测试项目1',episodes:'7',category:'—',status:'待审核',statusClass:'text-orange-500 bg-orange-50 border-orange-100',deadline:'—',synced:true}
    ];

    var canvasProjects = [
        {id:'#2314',name:'吾乃皇帝陛下',type:'短剧',episodes:'60集',desc:'古风宫廷短剧项目'},
        {id:'#2319',name:'《致命客厅》',type:'悬疑',episodes:'6集',desc:'悬疑推理类短剧'},
        {id:'#2320',name:'《三日清空》',type:'都市',episodes:'4集',desc:'都市情感类短剧'},
        {id:'#2321',name:'测试项目1',type:'测试',episodes:'7集',desc:'功能测试项目'},
        {id:'#2301',name:'《星辰大海》',type:'科幻',episodes:'12集',desc:'科幻冒险类短剧'},
        {id:'#2302',name:'《人间烟火》',type:'生活',episodes:'20集',desc:'现实主义题材短剧'},
        {id:'#2303',name:'《剑侠风云》',type:'武侠',episodes:'30集',desc:'武侠动作类短剧'},
        {id:'#2304',name:'《深海迷踪》',type:'探险',episodes:'8集',desc:'海洋探险类短剧'},
        {id:'#2305',name:'《时光旅人》',type:'奇幻',episodes:'15集',desc:'时间穿越奇幻短剧'}
    ];

    var pageTitles = {
        dashboard:'数据大盘', resource:'资源中心', project:'项目管理', topic:'选题库',
        approval:'项目立项', task:'任务列表', cost:'成本工时管理', delivery:'交付中心',
        filmlibrary:'成片库', canvas:'画布'
    };

    var nextIdCounter = 2322;

    return {
        filmData: filmData,
        canvasProjects: canvasProjects,
        pageTitles: pageTitles,
        nextIdCounter: nextIdCounter
    };
})();
