var AppData = (function() {
    var pageTitles = {
        dashboard: '数据总览',
        resource: '资源中心',
        topic: '选题库',
        approval: '项目立项',
        task: '任务列表',
        cost: '成本工时管理',
        delivery: '交付中心',
        filmlibrary: '成片库',
        canvas: '图片生成'
    };

    var dashboardStats = [
        { label: '进行中项目', value: '28', note: '较上周 +4' },
        { label: '待审核任务', value: '136', note: '剪辑与交付高峰' },
        { label: '本周交付', value: '62', note: '完成率 91%' },
        { label: '素材入库', value: '1,248', note: '近 7 天新增 183' }
    ];

    var dashboardFlows = [
        { title: '项目立项', desc: '统一录入预算、排期、负责人，减少重复沟通。', status: '稳定' },
        { title: '任务分发', desc: '按角色切分待办，明确脚本、剪辑、交付责任链。', status: '待优化' },
        { title: '交付审核', desc: '把待审、驳回、通过统一到同一套流程视图。', status: '稳定' },
        { title: '成片沉淀', desc: '项目成片、素材和下载申请统一归档。', status: '待优化' }
    ];

    var resourceCards = [
        { title: '脚本素材库', desc: '统一维护脚本、分镜、角色设定与通用模板。', meta: '842 份文件' },
        { title: '视觉素材库', desc: '图片、封面、剧照和可复用视觉资产的归档中心。', meta: '1,126 张图片' },
        { title: '交付规范', desc: '输出格式、命名规则、审核标准与返工约定。', meta: '12 条规范' }
    ];

    var topicIdeas = [
        { name: '都市情感反转短剧', type: '都市', owner: '内容策划组', stage: '待评审' },
        { name: '轻悬疑高概念系列', type: '悬疑', owner: '内容策划组', stage: '创意打磨中' },
        { name: '女性成长古风故事线', type: '古风', owner: 'IP 编剧组', stage: '可立项' }
    ];

    var approvalQueue = [
        { name: '《春夜失控》', owner: 'zhijian', budget: '¥120,000', deadline: '2026-07-08', status: '待审批' },
        { name: '《镜中来信》', owner: 'kim', budget: '¥68,000', deadline: '2026-07-15', status: '预算复核中' }
    ];

    var filmData = [
        { id: '#2314', name: '吾乃皇帝逆子', episodes: '60', category: '—', deadline: '—', synced: false, uploaded: 30, downloadStatus: 'none' },
        { id: '#2315', name: '吾乃皇帝逆子', episodes: '—', category: '—', deadline: '—', synced: false, uploaded: 0, downloadStatus: 'approved' },
        { id: '#2316', name: '吾乃皇帝逆子', episodes: '—', category: '—', deadline: '—', synced: true, uploaded: 0, downloadStatus: 'approved' },
        { id: '#2317', name: 'ai', episodes: '—', category: '—', deadline: '—', synced: false, uploaded: 0, downloadStatus: 'applying' },
        { id: '#2318', name: 'zhen new6', episodes: '—', category: '—', deadline: '—', synced: false, uploaded: 0, downloadStatus: 'none' },
        { id: '#2319', name: '《致命客户》', episodes: '6', category: '—', deadline: '—', synced: true, uploaded: 6, downloadStatus: 'none' },
        { id: '#2320', name: '《三目清空》', episodes: '4', category: '—', deadline: '—', synced: false, uploaded: 3, downloadStatus: 'none' },
        { id: '#2321', name: '测试项目1', episodes: '7', category: '—', deadline: '—', synced: true, uploaded: 7, downloadStatus: 'none' }
    ];

    var canvasProjects = [
        { id: '#615', name: 'test-615', type: '民国', episodes: '9 集', desc: '民国题材人物与场景生成项目' },
        { id: '#701', name: '一只虾换千亿江山', type: '都市', episodes: '61 集', desc: '都市轻喜剧视觉资产快速出图' },
        { id: '#702', name: '全村通我挖果树', type: '都市', episodes: '72 集', desc: '乡村题材短剧封面与角色设定' },
        { id: '#703', name: '测试项目', type: '玄幻', episodes: '60 集', desc: '用于验证图片生成流程与素材归档' }
    ];

    var deliveryData = [
        { name: '挖果树', episodes: '0', category: '—', status: '待审核', statusClass: 'delivery-status-pending', deadline: '—', pending: 0, rejected: 0, approved: 0 },
        { name: '韭卓', episodes: '0', category: '—', status: '待审核', statusClass: 'delivery-status-pending', deadline: '—', pending: 0, rejected: 0, approved: 0 },
        { name: '新引擎', episodes: '0', category: '—', status: '待上传', statusClass: 'delivery-status-upload', deadline: '—', pending: 0, rejected: 0, approved: 0 },
        { name: '测试1', episodes: '0', category: '—', status: '已完成', statusClass: 'delivery-status-done', deadline: '—', pending: 0, rejected: 0, approved: 0 },
        { name: 'ztest', episodes: '0', category: '—', status: '待上传', statusClass: 'delivery-status-upload', deadline: '—', pending: 0, rejected: 0, approved: 0 },
        { name: '《政企部门》', episodes: '4', category: '—', status: '已完成', statusClass: 'delivery-status-done', deadline: '—', pending: 4, rejected: 4, approved: 0 },
        { name: '《三江学院》', episodes: '4', category: '—', status: '审核驳回', statusClass: 'delivery-status-reject', deadline: '—', pending: 4, rejected: 4, approved: 0 },
        { name: '测试引擎1', episodes: '7', category: '—', status: '待审核', statusClass: 'delivery-status-pending', deadline: '—', pending: 2, rejected: 0, approved: 2 }
    ];

    var deliveryHistoryData = [
        { action: '全部通过', type: '--', operator: '江晚', time: '2026-06-22 14:16:04', remark: '全部通过' },
        { action: '通过', type: '分集图片', operator: '披萨', time: '2026-06-22 09:18:02', remark: '分集图片通过' },
        { action: '通过', type: '分集图片', operator: '披萨', time: '2026-06-22 09:18:01', remark: '分集图片通过' },
        { action: '通过', type: '分集图片', operator: '披萨', time: '2026-06-22 09:17:59', remark: '分集图片通过' },
        { action: '通过', type: '分集图片', operator: '披萨', time: '2026-06-22 09:17:42', remark: '分集图片通过' },
        { action: '通过', type: '完整成片', operator: '披萨', time: '2026-06-17 14:37:07', remark: '完整成片通过' }
    ];

    var taskRoleTabs = [
        { key: 'writer', label: '编剧' },
        { key: 'produce', label: '制作' },
        { key: 'clip', label: '剪辑' },
        { key: 'manager', label: '制片' }
    ];

    var taskList = [
        {
            id: 1,
            name: 'test-615',
            projectType: '民国',
            role: 'clip',
            status: '进行中',
            episodeCount: '9 集',
            plannedAt: '2026-06-30',
            actualAt: '未完成',
            progress: '1/5',
            pendingCount: 1,
            episodeRange: '1-3 集',
            mergeNote: '当前第 1 集与第 2 集需要合并处理，请先完成统一导出后再提交审核。',
            submitter: 'zhipian1',
            submitTime: '2026-06-11 13:20:07',
            reviewer: '审核员A',
            reviewTime: '2026-06-11 14:05:00',
            files: [
                { type: '成片', name: 'EP01_成片.mp4', status: 'ok' },
                { type: '图片', name: 'EP01_海报.png', status: 'ok' },
                { type: '音频', name: 'EP01_BGM.mp3', status: 'ok' },
                { type: '字幕', name: 'EP01_字幕.srt', status: 'error' }
            ]
        },
        {
            id: 2,
            name: '测试-6-15',
            projectType: '玄幻',
            role: 'clip',
            status: '进行中',
            episodeCount: '10 集',
            plannedAt: '2026-06-17',
            actualAt: '未完成',
            progress: '0/10',
            pendingCount: 0,
            episodeRange: '4-6 集',
            mergeNote: '本批次不需要合并，请按单集提交。',
            submitter: 'kim',
            submitTime: '2026-06-18 09:42:10',
            reviewer: '审核员B',
            reviewTime: '2026-06-18 10:10:03',
            files: [
                { type: '成片', name: 'EP04_成片.mp4', status: 'ok' },
                { type: '图片', name: 'EP04_海报.png', status: 'ok' },
                { type: '音频', name: 'EP04_BGM.mp3', status: 'error' },
                { type: '字幕', name: 'EP04_字幕.srt', status: 'ok' }
            ]
        }
    ];

    var projectImages = [];
    var materialImages = [];
    var deliveryReuploadRequests = [];
    var nextIdCounter = 704;

    return {
        pageTitles: pageTitles,
        dashboardStats: dashboardStats,
        dashboardFlows: dashboardFlows,
        resourceCards: resourceCards,
        topicIdeas: topicIdeas,
        approvalQueue: approvalQueue,
        filmData: filmData,
        canvasProjects: canvasProjects,
        deliveryData: deliveryData,
        deliveryHistoryData: deliveryHistoryData,
        taskRoleTabs: taskRoleTabs,
        taskList: taskList,
        deliveryReuploadRequests: deliveryReuploadRequests,
        projectImages: projectImages,
        materialImages: materialImages,
        nextIdCounter: nextIdCounter
    };
})();
