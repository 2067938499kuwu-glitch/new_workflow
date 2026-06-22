/* AIGC管理后台 - 数据层 */
var AppData = (function() {
    var filmData = [
        {id:'#2314',name:'吾乃皇帝陛下',episodes:'60',category:'—',status:'待审核',statusClass:'text-orange-500 bg-orange-50 border-orange-100',deadline:'—',synced:false,uploaded:30,downloadStatus:'none'},
        {id:'#2315',name:'吾乃皇帝陛下',episodes:'—',category:'—',status:'待上传',statusClass:'text-gray-500 bg-gray-50 border-gray-200',deadline:'—',synced:false,uploaded:0,downloadStatus:'none'},
        {id:'#2316',name:'吾乃皇帝陛下',episodes:'—',category:'—',status:'待上传',statusClass:'text-gray-500 bg-gray-50 border-gray-200',deadline:'—',synced:true,uploaded:0,downloadStatus:'none'},
        {id:'#2317',name:'ai',episodes:'—',category:'—',status:'待上传',statusClass:'text-gray-500 bg-gray-50 border-gray-200',deadline:'—',synced:false,uploaded:0,downloadStatus:'none'},
        {id:'#2318',name:'zhen new6',episodes:'—',category:'—',status:'待上传',statusClass:'text-gray-500 bg-gray-50 border-gray-200',deadline:'—',synced:false,uploaded:0,downloadStatus:'none'},
        {id:'#2319',name:'《致命客厅》',episodes:'6',category:'—',status:'待审核',statusClass:'text-orange-500 bg-orange-50 border-orange-100',deadline:'—',synced:true,uploaded:6,downloadStatus:'none'},
        {id:'#2320',name:'《三日清空》',episodes:'4',category:'—',status:'待审核',statusClass:'text-orange-500 bg-orange-50 border-orange-100',deadline:'—',synced:false,uploaded:3,downloadStatus:'none'},
        {id:'#2321',name:'测试项目1',episodes:'7',category:'—',status:'待审核',statusClass:'text-orange-500 bg-orange-50 border-orange-100',deadline:'—',synced:true,uploaded:7,downloadStatus:'approved'}
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

    // 交付中心数据
    var deliveryData = [
        {name:'挖果树',episodes:'0',category:'—',status:'待审核',statusClass:'tag-orange',deadline:'—',pending:0,rejected:0,approved:0},
        {name:'董卓',episodes:'0',category:'—',status:'待审核',statusClass:'tag-orange',deadline:'—',pending:0,rejected:0,approved:0},
        {name:'新引擎',episodes:'0',category:'—',status:'待上传',statusClass:'tag-gray',deadline:'—',pending:0,rejected:0,approved:0},
        {name:'测试1',episodes:'0',category:'—',status:'已完成',statusClass:'tag-green',deadline:'—',pending:0,rejected:0,approved:0},
        {name:'ztest',episodes:'0',category:'—',status:'待上传',statusClass:'tag-gray',deadline:'—',pending:0,rejected:0,approved:0},
        {name:'《政企部门》',episodes:'4',category:'—',status:'已完成',statusClass:'tag-green',deadline:'—',pending:4,rejected:4,approved:0},
        {name:'《三江学院》',episodes:'4',category:'—',status:'审核驳回',statusClass:'tag-red',deadline:'—',pending:4,rejected:4,approved:0},
        {name:'测试引擎1',episodes:'7',category:'—',status:'待审核',statusClass:'tag-orange',deadline:'—',pending:2,rejected:0,approved:2}
    ];



    var taskRoleTabs = [
        { key: 'edit', label: '编辑' },
        { key: 'produce', label: '制作' },
        { key: 'clip', label: '剪辑' },
        { key: 'manager', label: '制片' }
    ];

    var taskList = [
        {
            id: 1,
            name: '海贼王',
            projectType: '全部题材',
            role: 'clip',
            currentStep: '任务分发',
            episodeRange: '1-3集',
            mergeNote: '当前剧集第1与第2集需要合并在一起',
            submitter: 'zhipian1',
            submitTime: '2026/6/11 13:20:07',
            reviewer: '审核人A',
            reviewTime: '2026/6/11 14:05:00',
            operationText: '资产设定 去分镜 剧本审核',
            files: [
                { type: '成片', name: 'EP01 成片.mp4', status: 'ok' },
                { type: '图片', name: 'EP01 图片.mp4', status: 'ok' },
                { type: '音频', name: 'EP01 音频.mp3', status: 'ok' },
                { type: '字幕', name: 'EP01 字幕.srt', status: 'error' }
            ]
        }
    ];

    var pageTitles = {
        dashboard:'数据大盘', resource:'资源中心', project:'项目管理', topic:'选题库',
        approval:'项目立项', task:'任务列表', cost:'成本工时管理', delivery:'交付中心',
        filmlibrary:'成片库', canvas:'图片生成'
    };

    // 已保存的图片数据
    var projectImages = [];   // 项目库
    var materialImages = [];  // 素材库
    var nextIdCounter = 2322;

    return {
        filmData: filmData,
        canvasProjects: canvasProjects,
        deliveryData: deliveryData,
        taskRoleTabs: taskRoleTabs,
        taskList: taskList,
        pageTitles: pageTitles,
        projectImages: projectImages,
        materialImages: materialImages,
        nextIdCounter: nextIdCounter
    };
})();
