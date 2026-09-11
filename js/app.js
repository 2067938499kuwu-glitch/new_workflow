(() => {
  "use strict";

  const pageMeta = {
    dashboard: { label: "数据大盘", group: "数据大盘", icon: "chart" },
    agents: { label: "智能体管理", group: "智能体管理", icon: "nodes" },
    resources: { label: "资源中心", group: "资源中心", icon: "folder" },
    "ip-characters": { label: "IP人物库", group: "IP人物库", icon: "ip" },
    ips: { label: "IP库", group: "编剧", icon: "ip" },
    topics: { label: "选题策划库", group: "编剧", icon: "topic" },
    scripts: { label: "剧本库", group: "编剧", icon: "book" },
    production: { label: "制作工作台", group: "制作", icon: "image" },
    editing: { label: "剪辑工作台", group: "剪辑", icon: "clapper" },
    projects: { label: "项目立项", group: "制片", icon: "project" },
    delivery: { label: "交付中心", group: "制片", icon: "delivery" },
    works: { label: "作品库", group: "作品库", icon: "clapper" },
    costs: { label: "成本工时管理", group: "成本工时管理", icon: "list" },
    "image-generate": { label: "AI自由创作", group: "AI自由创作", icon: "wand" }
  };

  const iconPaths = {
    chart: '<path d="M4 19V9m6 10V4m6 15v-7m5 7H1"/>',
    nodes: '<circle cx="5" cy="12" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="12" cy="19" r="2"/><path d="m6.5 10.5 4-4m3 0 4 4m0 3-4 4m-3 0-4-4"/>',
    folder: '<path d="M3 6h6l2 2h10v10H3z"/>',
    project: '<path d="M4 7h16v12H4z"/><path d="M8 7V4h8v3m-5 4h2"/>',
    briefcase: '<path d="M4 7h16v12H4z"/><path d="M9 7V4h6v3m-3 3v5"/>',
    topic: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="m9 15 2-2 2 2 3-4"/><circle cx="10" cy="8" r="1"/>',
    ip: '<path d="M12 3 4.5 7v10L12 21l7.5-4V7z"/><path d="m4.5 7 7.5 4 7.5-4M12 11v10"/><path d="m8.5 5.1 7.5 4"/>',
    list: '<path d="M9 6h11M9 12h11M9 18h11M4 6l1 1 2-2m-3 7 1 1 2-2m-3 7 1 1 2-2"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m4 17 5-5 4 4 2-2 5 4"/>',
    bookmark: '<path d="M6 3h12v18l-6-4-6 4z"/>',
    clapper: '<rect x="3" y="8" width="18" height="12" rx="2"/><path d="m4 8 3-5h4L8 8m4 0 3-5h4l-3 5"/>',
    delivery: '<path d="M4 8h5l2 3h9v8H8a5 5 0 0 1-4-2l-2-3 2-2m8-8 3 3-3 3"/>',
    book: '<path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v17H7.5A3.5 3.5 0 0 0 4 22zM20 5.5A3.5 3.5 0 0 0 16.5 2H13v17h3.5A3.5 3.5 0 0 1 20 22z"/>',
    wand: '<path d="m4 20 11-11m-2-4 1-3 1 3 3 1-3 1-1 3-1-3-3-1zm6 9 1-2 1 2 2 1-2 1-1 2-1-2-2-1z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3m3 0-1 14H7L6 7m4 4v6m4-6v6"/>',
    upload: '<path d="M12 16V5m0 0-4 4m4-4 4 4"/><path d="M6.5 19H5a3 3 0 0 1-.7-5.92A5.5 5.5 0 0 1 15 10.5h.5a3.5 3.5 0 0 1 .5 6.96"/>'
  };

  const projects = [
    ["新的", "已完成", "玄幻", 10, "zhizuo1", 100, "2026-09-09", false],
    ["测试上传9-8", "进行中", "玄幻", 10, "cyp-a", 100, "2026-09-09", false],
    ["测试123333", "进行中", "玄幻", 10, "zhizuo1", 11111, "2026-09-19", true],
    ["测试9-07", "进行中", "玄幻", 11, "zhizuo1", 1000, "2026-09-09", true],
    ["海外-oss--☀️", "已完成", "热血", 5, "陈颖鹏", 2, "2026-09-17", true],
    ["海外-aws--🌙", "已完成", "热血", 5, "陈颖鹏", 2, "2026-09-17", true],
    ["测试上传", "进行中", "热血", 11, "zhizuo1", 20, "2026-09-30", false],
    ["国内-oss--☀️", "进行中", "热血", 5, "陈颖鹏", 2, "2026-09-17", false],
    ["国内，aws的💡", "已完成", "热血", 5, "陈颖鹏", 2, "2026-09-17", false],
    ["测试交付上传", "进行中", "玄幻", 13, "杰尼龟", 1, "2026-09-14", false],
    ["海外项目", "进行中", "热血", 5, "陈颖鹏", 2, "2026-09-17", false],
    ["测试1", "进行中", "玄幻", 13, "陈颖鹏", 1111, "2026-08-22", false],
    ["a总好", "进行中", "热血", 5, "zhipian1", 2, "2026-08-30", false],
    ["大波2波", "进行中", "热血", 5, "zhipian1", 2, "2026-08-29", false],
    ["大波波", "进行中", "热血", 5, "zhipian1", 2, "2026-08-29", false],
    ["稻米节", "进行中", "玄幻", 5, "陈颖鹏", 2, "2026-08-20", false],
    ["asdf", "进行中", "热血", 11, "陈颖鹏", 2, "2026-08-15", false],
    ["猪蹄子", "进行中", "都市", 12, "陈颖鹏", 2, "2026-08-21", false],
    ["大明(大夏)", "进行中", "热血", 11, "zhipian1", 10000, "2026-08-15", false],
    ["打虎", "进行中", "玄幻", 13, "zhipian1", 10000, "2026-08-15", false],
    ["遍地黄金4", "进行中", "玄幻", 10, "zhipian1", 1000, "2026-08-15", false],
    ["帝皇星", "进行中", "资产库", 13, "陈颖鹏", 23, "2026-08-12", false],
    ["铠甲勇士", "已完成", "都市", 13, "陈颖鹏", 22, "2026-08-12", false],
    ["大侠", "已完成", "玄幻", 111, "陈颖鹏", 111111, "2026-08-06", false],
    ["cyp-as", "进行中", "都市", 3, "陈颖鹏", 2, "2026-08-12", false],
    ["废后她2", "进行中", "都市", 11, "方耀飞", 2, "2026-06-19", false],
    ["cyp-tt", "进行中", "热血", 13, "陈颖鹏", 23, "2026-06-16", false],
    ["废后她只想退休", "进行中", "穿越", 60, "453", 5000, "2026-06-11", false],
    ["一只虾换千亿江山，前夫你赚大了", "进行中", "都市", 60, "453", 5000, "2026-06-11", false]
  ].map((item, index) => ({
    id: index + 1,
    name: item[0], status: item[1], genre: item[2], episodes: item[3], owner: item[4],
    budget: item[5], due: item[6], overseas: item[7]
  }));

  projects.push(
    { name: "星轨计划", status: "进行中", genre: "科幻", episodes: 24, owner: "方耀飞", budget: 128000, due: "2026-10-18", overseas: false, productionMode: "partner", partnerCompany: "星云动画制作", producerReviewer: "方耀飞" },
    { name: "山海异闻录", status: "进行中", genre: "玄幻", episodes: 16, owner: "cyp", budget: 96000, due: "2026-10-06", overseas: false, productionMode: "partner", partnerCompany: "漫境数字科技", producerReviewer: "cyp" },
    { name: "雾都来信", status: "已完成", genre: "悬疑", episodes: 12, owner: "zhipian1", budget: 68000, due: "2026-09-05", overseas: false, productionMode: "partner", partnerCompany: "光盒影业", producerReviewer: "zhipian1" },
    { name: "长安夜话", status: "进行中", genre: "古装", episodes: 20, owner: "方耀飞", budget: 115000, due: "2026-10-25", overseas: false, productionMode: "partner", partnerCompany: "漫境数字科技", producerReviewer: "方耀飞" },
    { name: "重启人生", status: "已完成", genre: "都市", episodes: 10, owner: "cyp", budget: 52000, due: "2026-09-08", overseas: false, productionMode: "partner", partnerCompany: "星云动画制作", producerReviewer: "cyp" }
  );
  projects.forEach((item, index) => { item.id = index + 1; });

  const taskRoles = ["writer", "producer", "editor", "manager"];
  const taskRoleLabels = { writer: "编剧", producer: "制作", editor: "剪辑", manager: "制片" };
  const taskReviewLabels = { writer: "剧本审核", producer: "制作审核", editor: "成片审核", manager: "交付审核" };
  const taskStateLabels = {
    locked: "等待前序",
    pending: "待处理",
    processing: "处理中",
    pending_review: "待审核",
    rejected: "已驳回",
    completed: "已完成"
  };
  const taskAssignees = {
    writer: ["bianju1", "陈颖鹏", "大牛"],
    producer: ["zhizuo1", "杰尼龟", "陈颖鹏"],
    editor: ["jianji1", "cyp", "zhizuo1"],
    manager: ["zhipian1", "cyp", "方耀飞"]
  };

  function buildTaskWorkflow(task, index) {
    const [doneText, totalText] = String(task.progress).split("/");
    const total = Math.max(1, Number(totalText) || task.episodes);
    const sourceDone = Math.min(total, Number(doneText) || 0);
    const isFinished = task.status === "已完成";
    const currentIndex = index % taskRoles.length;
    const activeStates = ["processing", "pending_review", "rejected", "pending"];
    const activeState = activeStates[Math.floor(index / taskRoles.length) % activeStates.length];
    const workflow = {};

    taskRoles.forEach((role, roleIndex) => {
      const completed = isFinished || roleIndex < currentIndex;
      const stageState = completed ? "completed" : roleIndex === currentIndex ? activeState : "locked";
      const stageDone = completed ? total : roleIndex === currentIndex ? sourceDone : 0;
      const assignee = taskAssignees[role][index % taskAssignees[role].length];
      const history = [];
      if (completed) history.push({ time: task.actual === "未完成" ? "2026-09-07 16:30" : `${task.actual} 16:30`, action: `${taskRoleLabels[role]}任务已完成`, detail: `${stageDone}/${total} 集已审核通过`, actor: assignee });
      if (!completed && roleIndex === currentIndex) {
        const actionMap = { pending: "任务已分配", processing: "任务已领取", pending_review: "已提交审核", rejected: "审核已驳回" };
        history.push({ time: "2026-09-08 10:20", action: actionMap[stageState], detail: stageState === "rejected" ? "请完善内容后重新提交" : `当前进度 ${stageDone}/${total} 集`, actor: assignee });
      }
      workflow[role] = {
        state: stageState,
        completed: stageDone,
        total,
        assignee,
        workNote: stageDone ? `已完成 ${stageDone} 集内容，相关成果已整理。` : "",
        reviewNote: stageState === "rejected" ? "部分内容与项目设定不一致，请修改后重新提交。" : "",
        completedAt: completed ? (task.actual === "未完成" ? "2026-09-07" : task.actual) : "",
        history
      };
    });
    return workflow;
  }

  const taskSeed = [
    ["asdf", "进行中", "热血", 11, "2026-08-15", "未完成", "1/2", "成片审核"],
    ["海外-aws--🌙", "已完成", "热血", 5, "2026-09-17", "2026-09-07", "10/10", "成片审核"],
    ["海外-oss--☀️", "已完成", "热血", 5, "2026-09-17", "2026-09-07", "10/10", "成片审核"],
    ["国内-oss--☀️", "已完成", "热血", 5, "2026-09-17", "2026-09-04", "10/10", "成片审核"],
    ["国内，aws的💡", "已完成", "热血", 5, "2026-09-17", "2026-09-03", "10/10", "成片审核"],
    ["测试交付上传", "进行中", "玄幻", 13, "2026-09-14", "未完成", "10/20", "成片审核"],
    ["海外项目", "进行中", "热血", 5, "2026-09-17", "未完成", "5/10", "成片审核"],
    ["废后她2", "进行中", "都市", 11, "2026-06-19", "未完成", "6/12", "成片审核"],
    ["猪蹄子", "进行中", "都市", 12, "2026-08-21", "未完成", "7/14", "成片审核"],
    ["铠甲勇士", "已完成", "都市", 13, "2026-08-12", "2026-08-27", "24/24", "成片审核"],
    ["帝皇星", "进行中", "资产库", 13, "2026-08-12", "未完成", "12/24", "成片审核"],
    ["cyp-as", "进行中", "都市", 3, "2026-08-12", "未完成", "1/2", "成片审核"],
    ["大侠", "已完成", "玄幻", 111, "2026-08-06", "2026-08-27", "20/20", "成片审核"],
    ["cyp-tt", "进行中", "热血", 13, "2026-06-16", "未完成", "15/26", "剧本审核"]
  ].map((item, index) => {
    const task = { id: index + 1, name: item[0], status: item[1], genre: item[2], episodes: item[3], due: item[4], actual: item[5], progress: item[6], review: item[7] };
    task.workflow = buildTaskWorkflow(task, index);
    task.assets = { style: "", character: "", scene: "", remark: "" };
    return task;
  });

  const taskStorageKey = "aigc-task-workflow-v1";

  function restoreTaskState() {
    try {
      const savedTasks = JSON.parse(localStorage.getItem(taskStorageKey) || "[]");
      savedTasks.forEach(saved => {
        const task = taskSeed.find(item => item.id === saved.id);
        if (!task || !saved.workflow || !taskRoles.every(role => saved.workflow[role])) return;
        task.status = saved.status || task.status;
        task.actual = saved.actual || task.actual;
        task.progress = saved.progress || task.progress;
        task.workflow = saved.workflow;
        task.assets = { ...task.assets, ...(saved.assets || {}) };
      });
    } catch {
      localStorage.removeItem(taskStorageKey);
    }
  }

  function persistTaskState() {
    const payload = taskSeed.map(({ id, status: taskStatus, actual, progress, workflow, assets }) => ({ id, status: taskStatus, actual, progress, workflow, assets }));
    localStorage.setItem(taskStorageKey, JSON.stringify(payload));
  }

  restoreTaskState();

  const works = [
    ["IPRJ-20260908-74442", "新的", 4, "玄幻", 4, "7分20秒", "2026-09-09", "已完成"],
    ["IPRJ-20260814-57072", "asdf", 5, "热血", 3, "8秒", "2026-08-15", "进行中"],
    ["IPRJ-20260904-88414", "海外-aws--🌙", 5, "热血", 8, "12秒", "2026-09-17", "已完成"],
    ["IPRJ-20260904-56629", "海外-oss--☀️", 5, "热血", 7, "12秒", "2026-09-17", "已完成"],
    ["IPRJ-20260904-03315", "测试上传", 4, "热血", 4, "5分30秒", "2026-09-30", "进行中"],
    ["IPRJ-20260903-73608", "国内-oss--☀️", 5, "热血", 3, "20秒", "2026-09-17", "进行中"],
    ["IPRJ-20260903-23061", "国内，aws的💡", 5, "热血", 4, "25秒", "2026-09-17", "已完成"],
    ["IPRJ-20260817-90991", "夏天", 6, "热血", 2, "4分39秒", "2026-08-20", "进行中"],
    ["IPRJ-20260807-64660", "铠甲勇士", 5, "都市", 1, "15秒", "2026-08-12", "已完成"],
    ["IPRJ-20260811-84847", "大明(大夏)", 6, "热血", 5, "9分18秒", "2026-08-15", "进行中"],
    ["IPRJ-20260811-68823", "遍地黄金4", 6, "玄幻", 4, "9分18秒", "2026-08-15", "进行中"],
    ["IPRJ-20260805-70168", "大侠", 6, "玄幻", 4, "9分18秒", "2026-08-06", "已完成"],
    ["IPRJ-20260805-0001", "cyp-as", 5, "都市", 1, "15秒", "2026-08-12", "进行中"]
  ].map(item => ({ code: item[0], name: item[1], total: item[2], genre: item[3], done: item[4], duration: item[5], due: item[6], status: item[7] }));

  const deliveries = [
    ["新的", 4, "7分20秒", "已通过", "已设置", "cyp", 0, 0, 4],
    ["测试上传9-8", 4, "7分20秒", "已驳回", "已设置", "zhiyinAdmin", 0, 4, 0],
    ["测试123333", 7, "6分43秒", "已驳回", "已设置", "cyp", 6, 1, 0],
    ["测试9-07", 0, "0秒", "未提交", "未设置", "zhiyinAdmin", 0, 0, 0],
    ["海外-oss--☀️", 9, "12秒", "待审核", "已设置", "cyp", 2, 0, 7],
    ["海外-aws--🌙", 9, "12秒", "待审核", "已设置", "cyp", 1, 0, 8],
    ["测试上传", 4, "6分50秒", "需要修改", "已设置", "zhiyinAdmin", 1, 0, 3],
    ["国内-oss--☀️", 9, "25秒", "待审核", "已设置", "cyp", 6, 0, 3],
    ["国内，aws的💡", 9, "25秒", "待审核", "已设置", "cyp", 5, 0, 4],
    ["测试交付上传", 4, "0秒", "待审核", "已设置", "cyp", 4, 0, 0],
    ["海外项目", 0, "0秒", "未提交", "未设置", "cyp", 0, 0, 0],
    ["测试1", 4, "10秒", "待审核", "未设置", "zhipian1", 4, 0, 0],
    ["a总好", 0, "0秒", "未提交", "未设置", "zhipian1", 0, 0, 0],
    ["大波2波", 0, "0秒", "未提交", "未设置", "zhipian1", 0, 0, 0],
    ["大波波", 0, "0秒", "未提交", "未设置", "zhipian1", 0, 0, 0],
    ["春天", 0, "0秒", "未提交", "未设置", "daniu", 0, 0, 0],
    ["稻米节", 0, "0秒", "未提交", "已设置", "zhipian1", 0, 0, 0],
    ["夏天", 7, "13分56秒", "需要修改", "已设置", "daniu", 4, 1, 2],
    ["十月革命", 0, "0秒", "未提交", "已设置", "奥普店里", 0, 0, 0],
    ["打老虎", 0, "0秒", "未提交", "未设置", "顿里斯", 0, 0, 0],
    ["asdf", 9, "12秒", "需要修改", "已设置", "cyp", 6, 0, 3],
    ["废后她2", 0, "0秒", "未提交", "未设置", "cyp", 0, 0, 0],
    ["猪蹄子", 0, "0秒", "未提交", "未设置", "cyp", 0, 0, 0],
    ["奥林匹克 23", 0, "0秒", "未提交", "未设置", "cyp", 0, 0, 0],
    ["大明(大夏)", 7, "13分56秒", "需要修改", "已设置", "zhipian1", 3, 0, 4],
    ["打虎", 0, "0秒", "未提交", "未设置", "zhipian1", 0, 0, 0],
    ["遍地黄金4", 7, "13分56秒", "待审核", "已设置", "zhipian1", 3, 0, 4],
    ["兰陵王", 0, "0秒", "未提交", "未设置", "cyp", 0, 0, 0],
    ["帝皇星", 0, "0秒", "未提交", "已设置", "cyp", 0, 0, 0],
    ["铠甲勇士", 9, "25秒", "待审核", "已设置", "cyp", 8, 0, 1],
    ["大侠", 12, "9分38秒", "已通过", "已设置", "cyp", 0, 0, 12],
    ["cyp-as", 9, "25秒", "待审核", "已设置", "zhiyinAdmin", 9, 0, 0]
  ].map((item, index) => ({
    name: item[0], total: item[1], duration: item[2], status: item[3], frame: item[4], owner: item[5],
    pending: item[6], rejected: item[7], passed: item[8], date: projects.find(project => project.name === item[0])?.due || "2026-09-08",
    channel: /海外|oss|aws/i.test(item[0]) || item[5] === "zhiyinAdmin" || index % 7 === 6 ? "partner" : "internal"
  }));

  const scripts = [
    ["夏天", "热血", "大牛", 5, "V1", "已立项", "夏天、稻米节、春天、大波波、大波2波、a总好、海外项目、国内，aws的💡", "2026-09-04 13:55:36", false],
    ["惊奇队长", "科学", "奥普店里", 10, "V1", "已立项", "十月革命", "2026-08-17 17:41:39", false],
    ["神盾局", "玄幻", "顿里斯", 10, "V1", "待立项", "暂未关联项目", "2026-08-17 17:35:12", false],
    ["奥体中心", "玄幻", "陈颖鹏", 9, "V6", "已立项", "猪蹄子", "2026-09-02 16:48:14", true],
    ["空间", "热血", "zhipian1", 13, "V2", "已立项", "测试1、测试交付上传", "2026-09-02 18:03:37", true],
    ["大夏", "玄幻", "bianju1", 11, "V4", "已立项", "大明(大夏)、猪蹄子、废后她2、asdf、测试9-07", "2026-09-07 09:49:08", false],
    ["打虫子", "玄幻", "bianju1", 10, "V1", "已立项", "测试123333、测试上传9-8、新的", "2026-09-08 15:49:10", false],
    ["遍地黄金1", "热血", "zhipian1", 12, "V5", "已立项", "遍地黄金4、猪蹄子", "2026-08-11 17:22:46", false],
    ["遍地黄金", "玄幻", "陈颖鹏", 4, "V5", "待立项", "暂未关联项目", "2026-08-10 18:44:37", false],
    ["李逵喝酒", "资产库", "bianju1", 5, "V1", "待立项", "暂未关联项目", "2026-08-10 11:20:11", true],
    ["打老虎", "都市", "陈颖鹏", 13, "V12", "已立项", "铠甲勇士、帝皇星、打虎", "2026-08-11 17:05:11", true],
    ["杀威棒", "穿越", "陈颖鹏", 11, "V2", "已立项", "测试上传", "2026-09-04 09:53:00", true]
  ].map((item, index) => ({
    name: item[0], genre: item[1], uploader: item[2], episodes: item[3], version: item[4], status: item[5], projects: item[6], updated: item[7], shared: item[8],
    assignedAt: new Date(new Date(item[7].replace(" ", "T")).getTime() - ((index % 4) + 1) * 8 * 60 * 60 * 1000).toISOString().slice(0, 19).replace("T", " "),
    rating: [9.2, 8.7, null, 9.5, 8.9, 8.3, null, 9.0, 7.8, null, 9.3, 8.6][index]
  }));

  const ipWorks = [
    ["庆余年", "网络文学", "古装权谋", "已入库", "阅文集团", "庆余年原著剧本.docx", "大牛", "已分配", "2026-09-09 10:30", "第一集：京都来客\n儋州海岸，晨雾未散。少年范闲在崖边练功，一封来自京都的密信打破了小城的平静。五竹提醒他，真正的危险并不在信中，而在来送信的人。"],
    ["长相思", "网络文学", "古装情感", "已入库", "桐华工作室", "长相思人物小传.pdf", "陈颖鹏", "已分配", "2026-09-08 16:12", "人物小传：小夭\n她以玟小六的身份在清水镇生活多年，看似随性，实则始终在寻找能够安放自己的归处。本次改编重点保留人物的独立选择与情感张力。"],
    ["吞噬星空", "网络文学", "科幻热血", "已入库", "版权合作方", "吞噬星空基地市篇.docx", "bianju1", "已立项", "2026-09-08 11:05", "第一集：觉醒前夜\n怪兽围城后的基地市灯火通明，罗峰结束一天训练回到家中。一次意外测试让他发现自己的精神念力正在觉醒，命运由此转向。"],
    ["大唐诡事录", "影视作品", "悬疑探案", "已入库", "平台自有", "大唐诡事录二创底稿.docx", "--", "待分配", "2026-09-07 14:40", "故事梗概\n长安红茶案后，新的诡案从西市蔓延。夜半更鼓响起，失踪多日的商旅却同时出现在城门内外，两位主角循着一枚残缺铜钱展开追查。"],
    ["山海异闻", "原创设定", "东方幻想", "已入库", "内容中心", "山海异闻世界观V2.pdf", "--", "待分配", "2026-09-06 09:18", "世界观设定\n山海关外，异兽与人族以契约共存。每一份契约都会带走签订者的一段记忆，守关人必须在力量与自我之间做出选择。"]
  ].map((item, index) => ({
    id: index + 1, name: item[0], type: item[1], genre: item[2], status: item[3], owner: item[4], file: item[5], assignee: item[6], taskStatus: item[7], updated: item[8], content: item[9],
    summary: [
      "围绕范闲的身世与成长展开，在庙堂权谋和家国抉择中呈现少年如何寻找自我道路。",
      "以小夭的成长和情感选择为核心，保留原作人物关系与克制细腻的情绪张力。",
      "讲述罗峰在怪兽威胁下觉醒精神念力，从普通少年成长为守护基地市强者的热血故事。",
      "以长安奇案为主线，通过双主角协作探案串联朝堂、民间与诡谲传说。",
      "构建异兽与人族以契约共存的东方幻想世界，探讨力量、记忆与自我选择。"
    ][index],
    versions: [
      ...(index % 2 === 0 ? [{ version: "V1", file: item[5].replace(/(\.[^.]+)$/, "-初版$1"), uploadedAt: new Date(new Date(item[8].replace(" ", "T")).getTime() - 24 * 60 * 60 * 1000).toISOString().slice(0, 16).replace("T", " "), uploader: item[4], note: "初始入库版本", content: item[9] }] : []),
      { version: index % 2 === 0 ? "V2" : "V1", file: item[5], uploadedAt: item[8], uploader: item[4], note: index % 2 === 0 ? "内容修订并更新文件" : "初始入库版本", content: item[9] }
    ]
  }));

  const ipVersionStorageKey = "aigc-ip-version-history-v2";

  function saveIpVersionHistory() {
    const payload = Object.fromEntries(ipWorks.map(item => [item.id, { file: item.file, updated: item.updated, versions: item.versions }]));
    try { localStorage.setItem(ipVersionStorageKey, JSON.stringify(payload)); } catch {}
  }

  function restoreIpVersionHistory() {
    try {
      const saved = JSON.parse(localStorage.getItem(ipVersionStorageKey) || "{}");
      ipWorks.forEach(item => {
        const record = saved[item.id];
        if (!record?.versions?.length) return;
        item.file = record.file || item.file;
        item.updated = record.updated || item.updated;
        item.versions = record.versions;
      });
    } catch {}
  }

  restoreIpVersionHistory();

  const scriptTasks = [
    { id: 1, ipId: 1, ipName: "庆余年", name: "庆余年·范闲少年线二创", genre: "古装权谋", assignee: "大牛", due: "2026-09-18", status: "创作中", requirement: "围绕范闲少年成长线，完成 12 集竖屏短剧改编，每集约 2 分钟。", createdAt: "2026-09-09 10:35", updatedAt: "2026-09-10 09:20" },
    { id: 2, ipId: 2, ipName: "长相思", name: "长相思·小夭人物向二创", genre: "古装情感", assignee: "陈颖鹏", due: "2026-09-16", status: "待接收", requirement: "保留原人物关系，突出小夭成长与选择，先提交 8 集大纲。", createdAt: "2026-09-08 16:20", updatedAt: "2026-09-08 16:20" },
    { id: 3, ipId: 3, ipName: "吞噬星空", name: "吞噬星空·基地市篇", genre: "科幻热血", assignee: "bianju1", due: "2026-09-15", status: "已提交", requirement: "完成基地市篇 10 集短剧剧本，强化升级节奏与集尾钩子。", createdAt: "2026-09-08 11:12", updatedAt: "2026-09-09 17:40", submission: "吞噬星空-基地市篇-V1.docx", rating: 8.8 },
    { id: 4, topicId: 1, sourceTopic: "1223", ipId: null, ipName: "选题策划库", name: "1223·剧本创作", genre: "玄幻", assignee: "bianju1", due: "2026-09-22", status: "待接收", requirement: "基于《1223》选题设定完成 60 集短剧剧本，突出成长线、身份谜团与集尾悬念。", createdAt: "2026-09-10 10:00", updatedAt: "2026-09-10 10:00" }
  ];

  const scriptRatingStorageKey = "aigc-script-ratings-v1";

  function scriptRatingKey(type, item) {
    return type === "task" ? `task:${item.id}` : `script:${item.name}`;
  }

  function restoreScriptRatings() {
    try {
      const saved = JSON.parse(localStorage.getItem(scriptRatingStorageKey) || "{}");
      scriptTasks.forEach(item => Object.assign(item, saved[scriptRatingKey("task", item)] || {}));
      scripts.forEach(item => Object.assign(item, saved[scriptRatingKey("script", item)] || {}));
    } catch {}
  }

  function saveScriptRatings() {
    const payload = {};
    scriptTasks.forEach(item => { if (item.rating) payload[scriptRatingKey("task", item)] = { rating: item.rating, ratingNote: item.ratingNote || "" }; });
    scripts.forEach(item => { if (item.rating) payload[scriptRatingKey("script", item)] = { rating: item.rating, ratingNote: item.ratingNote || "" }; });
    try { localStorage.setItem(scriptRatingStorageKey, JSON.stringify(payload)); } catch {}
  }

  restoreScriptRatings();

  const topics = [
    { id: 1, name: "1223", genre: "玄幻", episodes: 60, created: "2026-09-09", updated: "2026-09-10", owner: "zhipian1", reviewers: "zhipian1", status: "通过", assignmentStatus: "已分配", assignee: "bianju1", content: "东方玄幻成长题材，围绕主角逆境成长与身份谜团展开。" },
    { id: 2, name: "111", genre: "玄幻", episodes: 60, created: "2026-09-09", updated: "2026-09-09", owner: "陈颖鹏", reviewers: "yy", status: "未评估", assignmentStatus: "未分配", assignee: "", content: "以宗门试炼为主线的玄幻短剧选题，强调高密度冲突和集尾钩子。" }
  ];

  const workflowProjects = [
    {
      id: 1, name: "海外项目", genre: "热血", script: "夏天", scriptVersion: "V1", writer: "大牛", episodes: 5,
      productionAssignee: "zhizuo1", editorAssignee: "jianji1", managerAssignee: "zhipian1", stage: "剪辑中",
      productionAssignments: ["zhizuo1", "zhizuo1", "zhizuo1", "杰尼龙", "杰尼龙"],
      editingAssignments: ["jianji1", "jianji1", "cyp", "cyp", "cyp"],
      storyboards: [
        { id: "01", title: "街口初遇", file: "01-街口初遇.zip", version: 2, updated: true, downloaded: false, updatedAt: "09-09 10:24" },
        { id: "02", title: "追逐转场", file: "02-追逐转场.zip", version: 1, updated: false, downloaded: true, updatedAt: "09-08 18:10" },
        { id: "03", title: "屋顶对峙", file: "03-屋顶对峙.zip", version: 3, updated: true, downloaded: false, updatedAt: "09-09 09:42" },
        { id: "04", title: "片尾镜头", file: "04-片尾镜头.zip", version: 1, updated: false, downloaded: true, updatedAt: "09-08 17:30" }
      ]
    },
    {
      id: 2, name: "测试交付上传", genre: "玄幻", script: "空间", scriptVersion: "V2", writer: "bianju1", episodes: 13,
      productionAssignee: "杰尼龙", editorAssignee: "cyp", managerAssignee: "zhipian1", stage: "待剪辑",
      productionAssignments: Array.from({ length: 13 }, (_, index) => index < 7 ? "杰尼龙" : "陈颖鹏"),
      editingAssignments: Array.from({ length: 13 }, (_, index) => index < 6 ? "cyp" : "jianji1"),
      storyboards: [
        { id: "01", title: "序章", file: "01-序章.zip", version: 1, updated: false, downloaded: false, updatedAt: "09-09 08:20" },
        { id: "02", title: "空间开启", file: "02-空间开启.zip", version: 2, updated: true, downloaded: false, updatedAt: "09-09 11:12" },
        { id: "03", title: "角色入场", file: "03-角色入场.zip", version: 1, updated: false, downloaded: false, updatedAt: "09-09 08:20" }
      ]
    },
    {
      id: 3, name: "遍地黄金4", genre: "玄幻", script: "遍地黄金1", scriptVersion: "V5", writer: "zhipian1", episodes: 10,
      productionAssignee: "陈颖鹏", editorAssignee: "待负责人分配", managerAssignee: "zhipian1", stage: "制作中",
      productionAssignments: Array.from({ length: 10 }, () => "陈颖鹏"),
      editingAssignments: Array.from({ length: 10 }, () => ""),
      storyboards: [
        { id: "01", title: "金矿远景", file: "01-金矿远景.zip", version: 1, updated: false, downloaded: false, updatedAt: "09-08 16:18" },
        { id: "02", title: "人物近景", file: "02-人物近景.zip", version: 1, updated: false, downloaded: false, updatedAt: "09-08 16:25" }
      ]
    },
    {
      id: 4, name: "测试9-07", genre: "玄幻", script: "大夏", scriptVersion: "V4", writer: "bianju1", episodes: 11,
      productionAssignee: "待负责人分配", editorAssignee: "待负责人分配", managerAssignee: "cyp", stage: "待部门分配",
      productionAssignments: Array.from({ length: 11 }, () => ""),
      editingAssignments: Array.from({ length: 11 }, () => ""), storyboards: []
    }
  ];

  const characterIpCatalog = [
    { id: "IP-CHAR-1001", name: "夏禾", source: "《夏天》", version: "标准形象 V3" },
    { id: "IP-CHAR-1002", name: "周野", source: "《夏天》", version: "标准形象 V2" },
    { id: "IP-CHAR-1003", name: "林叔", source: "《夏天》", version: "标准形象 V1" },
    { id: "IP-CHAR-2001", name: "林夏", source: "《空间》", version: "标准形象 V4" },
    { id: "IP-CHAR-2002", name: "顾北辰", source: "《空间》", version: "标准形象 V2" },
    { id: "IP-CHAR-2003", name: "空间引导者", source: "《空间》", version: "标准形象 V1" },
    { id: "IP-CHAR-3001", name: "沈金", source: "《遍地黄金1》", version: "标准形象 V5" },
    { id: "IP-CHAR-3002", name: "阿满", source: "《遍地黄金1》", version: "标准形象 V2" },
    { id: "IP-CHAR-3003", name: "铁算盘", source: "《遍地黄金1》", version: "标准形象 V2" },
    { id: "IP-CHAR-9001", name: "项目男主", source: "通用角色库", version: "标准形象 V1" },
    { id: "IP-CHAR-9002", name: "项目女主", source: "通用角色库", version: "标准形象 V1" },
    { id: "IP-CHAR-9003", name: "核心配角", source: "通用角色库", version: "标准形象 V1" }
  ];

  const scriptCharacterPresets = {
    "夏天": [
      { roleName: "夏禾", roleType: "女主角", ipId: "IP-CHAR-1001" },
      { roleName: "周野", roleType: "男主角", ipId: "IP-CHAR-1002" },
      { roleName: "林叔", roleType: "核心配角", ipId: "IP-CHAR-1003" }
    ],
    "空间": [
      { roleName: "林夏", roleType: "女主角", ipId: "IP-CHAR-2001" },
      { roleName: "顾北辰", roleType: "男主角", ipId: "IP-CHAR-2002" },
      { roleName: "空间引导者", roleType: "核心配角", ipId: "IP-CHAR-2003" }
    ],
    "遍地黄金1": [
      { roleName: "沈金", roleType: "男主角", ipId: "IP-CHAR-3001" },
      { roleName: "阿满", roleType: "女主角", ipId: "IP-CHAR-3002" },
      { roleName: "铁算盘", roleType: "核心配角", ipId: "IP-CHAR-3003" }
    ]
  };

  function deliveryScriptName(projectName) {
    const workflowProject = workflowProjects.find(project => project.name === projectName);
    if (workflowProject) return workflowProject.script;
    return scripts.find(script => String(script.projects || "").split("、").includes(projectName))?.name || "";
  }

  function getCharacterIpBindings(item) {
    if (Array.isArray(item.roleIpBindings) && item.roleIpBindings.length) return item.roleIpBindings;
    const preset = scriptCharacterPresets[deliveryScriptName(item.name)] || [
      { roleName: "男主角", roleType: "主要角色", ipId: "IP-CHAR-9001" },
      { roleName: "女主角", roleType: "主要角色", ipId: "IP-CHAR-9002" },
      { roleName: "核心配角", roleType: "重要配角", ipId: "IP-CHAR-9003" }
    ];
    item.roleIpBindings = preset.map(binding => ({ ...binding }));
    return item.roleIpBindings;
  }

  function characterPortraitFor(binding) {
    const descriptor = `${binding.roleName}${binding.roleType}`;
    if (descriptor.includes("女")) return "assets/characters/female-lead.svg";
    if (descriptor.includes("男")) return "assets/characters/male-lead.svg";
    return "assets/characters/supporting-role.svg";
  }

  function ipPortraitFor(ip, index) {
    const femaleNames = ["夏禾", "林夏", "阿满", "项目女主"];
    if (femaleNames.includes(ip.name)) return "assets/characters/female-lead.svg";
    if (index % 3 === 1) return "assets/characters/male-lead.svg";
    if (index % 3 === 2) return "assets/characters/supporting-role.svg";
    return "assets/characters/male-lead.svg";
  }

  function refreshIpBindingUi(form) {
    const cards = [...form.querySelectorAll("[data-ip-binding-card]")];
    const selectedCards = cards.filter(card => card.querySelector("[data-ip-card-select]")?.checked);
    const boundCards = cards.filter(card => card.classList.contains("is-bound"));
    const count = form.querySelector("[data-ip-binding-count]");
    const selection = form.querySelector("[data-ip-selection-count]");
    const batchButton = form.querySelector("[data-action='open-ip-picker']");
    const selectAll = form.querySelector("[data-ip-select-all]");
    if (count) count.textContent = `${boundCards.length}/${cards.length} 已绑定`;
    if (selection) selection.textContent = `已选择 ${selectedCards.length} 个角色`;
    if (batchButton) {
      batchButton.disabled = selectedCards.length === 0;
      batchButton.textContent = selectedCards.length === 1 ? "选择 IP 形象" : selectedCards.length ? `批量绑定（${selectedCards.length}）` : "批量绑定";
    }
    if (selectAll) {
      selectAll.checked = selectedCards.length === cards.length;
      selectAll.indeterminate = selectedCards.length > 0 && selectedCards.length < cards.length;
    }
  }

  function getEpisodeAssignments(item, role) {
    const key = role === "production" ? "productionAssignments" : "editingAssignments";
    const legacyKey = role === "production" ? "productionAssignee" : "editorAssignee";
    if (!Array.isArray(item[key]) || item[key].length !== item.episodes) {
      const fallback = item[legacyKey] === "待负责人分配" ? "" : item[legacyKey];
      item[key] = Array.from({ length: item.episodes }, (_, index) => item[key]?.[index] || fallback);
    }
    return item[key];
  }

  function getAssignmentInfo(item, role) {
    const assignments = getEpisodeAssignments(item, role);
    const names = [...new Set(assignments.filter(Boolean))];
    return { assignments, names, assigned: assignments.filter(Boolean).length, total: item.episodes };
  }

  function rolePlanKey(role) {
    return role === "production" ? "productionPlans" : "editingPlans";
  }

  function roleCompletionKey(role) {
    return role === "production" ? "productionCompletedAt" : "editingCompletedAt";
  }

  function roleStartedAtKey(role) {
    return role === "production" ? "productionStartedAt" : "editingStartedAt";
  }

  function normalizePlans(item, role, defaultDurations = []) {
    const key = rolePlanKey(role);
    const source = item[key]?.length ? item[key] : assignmentsToPlans(getEpisodeAssignments(item, role));
    item[key] = source.map((plan, index) => ({
      ...plan,
      duration: Number(plan.duration) || defaultDurations[index] || defaultDurations.at(-1) || 4,
      episodes: parseEpisodeRange(plan.range, item.episodes)
    }));
    return item[key];
  }

  function seedWorkflowTracking() {
    const startDates = {
      1: { production: "2026-09-05 09:30", editing: "2026-09-08 10:00" },
      2: { production: "2026-09-04 14:00", editing: "2026-09-10 09:20" },
      3: { production: "2026-09-08 11:00", editing: "" },
      4: { production: "", editing: "" }
    };
    const durations = {
      1: { production: [3, 5], editing: [4, 6] },
      2: { production: [4, 6], editing: [4, 6] },
      3: { production: [7], editing: [] },
      4: { production: [], editing: [] }
    };
    workflowProjects.forEach(item => {
      item.productionStartedAt ||= startDates[item.id]?.production || "";
      item.editingStartedAt ||= startDates[item.id]?.editing || "";
      normalizePlans(item, "production", durations[item.id]?.production || [4]);
      normalizePlans(item, "editing", durations[item.id]?.editing || [4]);
      item.productionCompletedAt ||= {};
      item.editingCompletedAt ||= {};
      item.productionDrafts ||= {};
      item.deliveryBatches ||= [];

      const productionSeedCount = item.id <= 2 ? item.episodes : item.id === 3 ? Math.min(2, item.episodes) : 0;
      for (let episode = 1; episode <= productionSeedCount; episode += 1) {
        item.productionCompletedAt[episode] ||= `2026-09-${String(7 + Math.min(episode, 2)).padStart(2, "0")} 16:20`;
      }
      if (item.id === 1) {
        item.editingCompletedAt[1] ||= "2026-09-10 14:10";
        item.editingCompletedAt[2] ||= "2026-09-10 14:10";
      }
    });
  }

  seedWorkflowTracking();

  deliveries.forEach((item, index) => {
    item.fileName = item.status === "未提交" ? "" : `${item.name}-完整成片-v${index % 3 + 1}.mp4`;
    item.version = index % 3 + 1;
    item.pacing = item.status === "未提交" ? "--" : `${[1, 1.1, 1.25, 1.5][index % 4]}x`;
    item.submittedAt = item.status === "未提交" ? "--" : `2026-09-${String(Math.max(1, 9 - index % 8)).padStart(2, "0")} ${String(9 + index % 8).padStart(2, "0")}:20`;
    item.auditNote = item.status === "已驳回" ? "节奏偏慢，部分镜头衔接不顺，请重新剪辑后提交。" : "";
    item.operationNote = item.status === "需要修改" ? "运营反馈：片尾品牌信息需要更新，请替换第 12 秒后的片尾内容。" : "";
    getCharacterIpBindings(item);
  });

  works.forEach((item, index) => {
    item.version = `V${index % 3 + 1}`;
    item.status = index === 1 || index === 9 ? "需要修改" : "已完成";
    item.pacing = deliveries.find(delivery => delivery.name === item.name)?.pacing || "--";
  });

  const state = {
    activePage: "projects",
    openPages: ["projects"],
    sectionTabs: { ips: "all", topics: "all", projects: "all", scripts: "tasks", production: "all", editing: "all" },
    modes: { projects: "internal", works: "internal", delivery: "internal" },
    filters: {},
    pages: {},
    pageSizes: {},
    pendingDelete: null,
    taskContext: null,
    workflowContext: null,
    deliveryContext: null,
    workContext: null,
    shareContext: null,
    ipContext: null,
    topicContext: null,
    scriptTaskContext: null,
    scriptWorkspaceContext: null,
    scriptRatingContext: null,
    scriptFilePreview: null
  };

  const accountStorageKey = "aigc-current-account";
  let currentAccount = "管理员";
  try {
    currentAccount = localStorage.getItem(accountStorageKey) || currentAccount;
  } catch {}

  const app = document.getElementById("app");
  const breadcrumb = document.getElementById("breadcrumb");
  const pageTabs = document.getElementById("pageTabs");
  const pageCanvas = document.getElementById("pageContent");
  const modalLayer = document.getElementById("modalLayer");
  const toastLayer = document.getElementById("toastLayer");

  function icon(name) {
    return `<svg viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name] || iconPaths.folder}</svg>`;
  }

  function hydrateIcons(scope = document) {
    scope.querySelectorAll("[data-icon]").forEach(node => {
      node.innerHTML = icon(node.dataset.icon);
    });
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function money(value) {
    return `¥${Number(value).toLocaleString("zh-CN")}`;
  }

  function statusClass(value) {
    if (["已完成", "已通过", "通过", "已立项", "可立项", "已设置", "已完成分配", "已入库", "已提交"].includes(value)) return "status--success";
    if (["进行中", "待审核", "处理中", "制作中", "剪辑中", "创作中", "二创中", "已分配"].includes(value)) return "status--primary";
    if (["需要修改", "待立项", "待确认", "待开放立项", "待上传", "未设置", "未评估", "未分配", "待处理", "待部门分配", "待负责人分配", "部分已分配", "待剪辑", "待分配", "待接收", "待更新", "审核中", "待流转", "草稿"].includes(value)) return "status--warning";
    if (["驳回", "已驳回", "暂不可立项"].includes(value)) return "status--danger";
    return "status--plain";
  }

  function status(value) {
    return `<span class="status ${statusClass(value)}">${escapeHtml(value)}</span>`;
  }

  function scriptHasVersion(type, item) {
    return type === "task" ? item.status === "已提交" : versionNumber(item.version) > 0;
  }

  function scriptLifecycleStatus(type, item) {
    if (type === "script" && item.status === "已立项") return "已立项";
    if (!scriptHasVersion(type, item)) return "待上传";
    if (item.launchDecision === "approved") return "可立项";
    if (item.launchDecision === "blocked") return "暂不可立项";
    return "待开放立项";
  }

  function scriptEligibilityAction(type, item) {
    const lifecycle = scriptLifecycleStatus(type, item);
    if (!scriptHasVersion(type, item)) return '<button class="link-btn" type="button" disabled title="上传首个版本后才可开放立项">允许立项</button>';
    if (lifecycle === "已立项") return '<button class="link-btn" type="button" disabled title="该剧本已经立项">已立项</button>';
    if (item.launchDecision === "approved") return '<button class="link-btn link-btn--danger" type="button" data-action="confirm-script-project" title="点击后该剧本将不可进行立项">取消立项</button>';
    return '<button class="link-btn link-btn--strong" type="button" data-action="confirm-script-project" title="点击后该剧本才可以进行立项">允许立项</button>';
  }

  function workflowProjectStatus(item) {
    return projects.find(project => project.name === item.name)?.status || "进行中";
  }

  function latestStoryboardSubmission(item) {
    return item.storyboards.map(board => board.updatedAt).filter(Boolean).sort().at(-1) || "--";
  }

  function formatEpisodeRange(episodes) {
    const values = [...new Set(episodes.map(Number).filter(Boolean))].sort((left, right) => left - right);
    if (!values.length) return "--";
    const groups = [];
    let start = values[0];
    let end = values[0];
    values.slice(1).forEach(value => {
      if (value === end + 1) end = value;
      else {
        groups.push(start === end ? `${start}` : `${start}-${end}`);
        start = value;
        end = value;
      }
    });
    groups.push(start === end ? `${start}` : `${start}-${end}`);
    return `第${groups.join("、")}集`;
  }

  function scopedEpisodes(item, role) {
    const assignments = getEpisodeAssignments(item, role);
    const ownEpisodes = assignments.map((member, index) => member === currentAccount ? index + 1 : 0).filter(Boolean);
    if (ownEpisodes.length) return ownEpisodes;
    return assignments.map((member, index) => member ? index + 1 : 0).filter(Boolean);
  }

  function scopedPlans(item, role) {
    const plans = normalizePlans(item, role);
    const ownPlans = plans.filter(plan => plan.member === currentAccount);
    return ownPlans.length ? ownPlans : plans;
  }

  function roleProgress(item, role) {
    const completedAt = item[roleCompletionKey(role)] || {};
    const completed = Object.keys(completedAt).map(Number).filter(episode => episode >= 1 && episode <= item.episodes).length;
    const values = Object.values(completedAt).filter(Boolean).sort();
    return { completed, total: item.episodes, completedAt: completed === item.episodes ? values.at(-1) || "" : "" };
  }

  function roleStatusCell(item, role) {
    const progress = roleProgress(item, role);
    if (progress.completed === progress.total) {
      const delivery = role === "editing" ? deliveries.find(entry => entry.name === item.name) : null;
      const auxiliary = delivery && ["待审核", "已驳回", "需要修改"].includes(delivery.status)
        ? `<small>${delivery.status === "待审核" ? "交付待审核" : "交付需修改"}</small>`
        : `<small>完成于 ${escapeHtml(progress.completedAt.slice(0, 10))}</small>`;
      return `<div class="workflow-status-cell">${status("已完成")}${auxiliary}</div>`;
    }
    const startedAt = item[roleStartedAtKey(role)];
    const label = startedAt ? (role === "production" ? "制作中" : "剪辑中") : "待流转";
    return `<div class="workflow-status-cell">${status(label)}<small>已完成 ${progress.completed}/${progress.total}集</small></div>`;
  }

  function addDurationDate(startedAt, duration) {
    if (!startedAt || !Number(duration)) return "";
    const date = new Date(String(startedAt).replace(" ", "T"));
    if (Number.isNaN(date.getTime())) return "";
    date.setDate(date.getDate() + Number(duration));
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function deadlineRecords(item, role) {
    const startedAt = item[roleStartedAtKey(role)];
    return scopedPlans(item, role).filter(plan => plan.member && plan.episodes?.length).map(plan => ({
      member: plan.member,
      episodes: plan.episodes,
      range: formatEpisodeRange(plan.episodes),
      duration: Number(plan.duration) || 0,
      date: addDurationDate(startedAt, plan.duration)
    })).sort((left, right) => (left.date || "9999").localeCompare(right.date || "9999"));
  }

  function deadlineCell(item, role) {
    const records = deadlineRecords(item, role);
    if (!records.length) return '<div class="deadline-cell deadline-cell--muted"><strong>待分配</strong><small>设置人员与工期后生成</small></div>';
    if (!item[roleStartedAtKey(role)]) {
      const durations = [...new Set(records.map(record => record.duration).filter(Boolean))];
      return `<div class="deadline-cell deadline-cell--muted"><strong>待流转后生成</strong><small>${durations.length === 1 ? `工期${durations[0]}天` : `${durations.length}个工期`}</small></div>`;
    }
    const dates = [...new Set(records.map(record => record.date).filter(Boolean))];
    if (dates.length === 1) {
      return `<div class="deadline-cell"><strong>${dates[0]}</strong><small>负责${formatEpisodeRange(records.flatMap(record => record.episodes)).replace(/^第/, "第")}</small></div>`;
    }
    return `<div class="deadline-cell"><strong>最早 ${dates[0]}</strong><button class="deadline-cell__action" type="button" data-action="view-deadlines" data-role="${role}">${dates.length}个截止日期 · 查看全部</button></div>`;
  }

  function linkedProjectSummary(script) {
    const names = !script.projects || script.projects === "暂未关联项目"
      ? []
      : script.projects.split("、").map(name => name.trim()).filter(Boolean);
    const details = names.map(name => {
      const project = projects.find(item => item.name === name);
      return {
        name,
        status: project?.status || "进行中",
        completedAt: project?.status === "已完成" ? project.completedAt || project.due || "--" : "--"
      };
    });
    const counts = details.reduce((result, project) => {
      result[project.status] = (result[project.status] || 0) + 1;
      return result;
    }, {});
    return { details, counts };
  }

  function renderLinkedProjects(script) {
    const summary = linkedProjectSummary(script);
    if (!summary.details.length) return '<span class="linked-project-empty">暂无关联项目</span>';
    if (summary.details.length === 1) {
      const project = summary.details[0];
      return `<div class="linked-project linked-project--single" title="${escapeHtml(project.name)}">
        <span class="linked-project__name">${escapeHtml(project.name)}</span>${status(project.status)}
      </div>`;
    }
    const order = ["进行中", "已完成", "待启动", "已暂停"];
    const labels = Object.entries(summary.counts)
      .sort(([left], [right]) => {
        const leftIndex = order.indexOf(left);
        const rightIndex = order.indexOf(right);
        return (leftIndex < 0 ? order.length : leftIndex) - (rightIndex < 0 ? order.length : rightIndex);
      })
      .map(([projectStatus, count]) => `<span class="status ${statusClass(projectStatus)}">${escapeHtml(projectStatus)} ${count}</span>`)
      .join("");
    return `<button class="linked-project linked-project--multiple" type="button" data-action="related-project" aria-label="查看《${escapeHtml(script.name)}》关联的 ${summary.details.length} 个项目">
      <strong>关联 ${summary.details.length} 个项目</strong><span class="linked-project__summary">${labels}</span><span class="linked-project__view">查看</span>
    </button>`;
  }

  function watermark() {
    return `<div class="watermark-layer" aria-hidden="true">${Array.from({ length: 42 }, () => "<span>CYP\n2026-09-08</span>").join("")}</div>`;
  }

  function shell(content) {
    return `${watermark()}<div class="page-content page-enter">${content}</div>`;
  }

  function pagination(total, options = {}) {
    const pageSize = state.pageSizes[state.activePage] || 20;
    const totalPages = options.pages || Math.max(1, Math.ceil(total / pageSize));
    const current = Math.min(totalPages, Math.max(1, state.pages[state.activePage] || 1));
    state.pages[state.activePage] = current;
    const pages = [];
    for (let index = 1; index <= Math.min(totalPages, 6); index += 1) {
      pages.push(`<button class="page-number ${index === current ? "is-active" : ""}" type="button" data-page-number="${index}">${index}</button>`);
    }
    if (totalPages > 7) pages.push('<button class="page-number" type="button" aria-label="更多页">•••</button>');
    if (totalPages > 6) pages.push(`<button class="page-number ${current === totalPages ? "is-active" : ""}" type="button" data-page-number="${totalPages}">${totalPages}</button>`);
    return `<div class="pagination-bar ${options.sticky ? "pagination-bar--bottom" : ""}">
      <span>共 ${total} 条</span>
      <select class="page-size" aria-label="每页条数"><option value="20" ${pageSize === 20 ? "selected" : ""}>20条/页</option><option value="50" ${pageSize === 50 ? "selected" : ""}>50条/页</option></select>
      <button class="page-arrow" type="button" data-page-prev aria-label="上一页" ${current === 1 ? "disabled" : ""}>‹</button>
      ${pages.join("")}
      <button class="page-arrow" type="button" data-page-next aria-label="下一页" ${current >= totalPages ? "disabled" : ""}>›</button>
      <span>前往</span><input class="page-jump" data-page-jump type="number" min="1" max="${totalPages}" value="${current}" aria-label="页码"><span>页</span>
    </div>`;
  }

  function pageItems(items, page = state.activePage) {
    const pageSize = state.pageSizes[page] || 20;
    const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
    const current = Math.min(totalPages, Math.max(1, state.pages[page] || 1));
    state.pages[page] = current;
    const start = (current - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }

  function fieldValue(page, key) {
    return escapeHtml(state.filters[page]?.[key] || "");
  }

  function filterCard(content) {
    return `<form class="filter-card" data-filter-form>${content}</form>`;
  }

  function contentCard(content, full = false) {
    return `<section class="content-card ${full ? "content-card--full" : ""}">${content}</section>`;
  }

  function renderModulePlaceholder(page, description) {
    const meta = pageMeta[page];
    return shell(`${workspaceHero("工作台", meta.label, description, [
      { value: "--", label: "待配置" },
      { value: "0", label: "当前任务" }
    ])}${contentCard('<div class="table-empty">当前目录入口已就绪，页面内容待配置</div>', true)}`);
  }

  function tabLine(page, tabs, action = "") {
    const current = state.sectionTabs[page];
    return `<div class="card-toolbar"><div class="tabs-line" role="tablist">
      ${tabs.map(tab => `<button class="tabs-line__tab ${current === tab.key ? "is-active" : ""}" type="button" data-section-tab="${tab.key}">${tab.label}</button>`).join("")}
    </div><div class="card-toolbar__actions">${action}</div></div>`;
  }

  function table(headers, rows, minWidth = 1120, emptyText = "暂无数据") {
    return `<div class="table-wrap"><table class="data-table" style="min-width:${minWidth}px"><thead><tr>
      ${headers.map(item => `<th style="width:${item.width || "auto"}">${item.label}</th>`).join("")}
    </tr></thead><tbody>${rows.join("")}</tbody></table>${rows.length ? "" : `<div class="table-empty">${emptyText}</div>`}</div>`;
  }

  function renderIps() {
    const filter = state.filters.ips || {};
    const tab = state.sectionTabs.ips;
    const filtered = ipWorks.filter(item => {
      const keywordOk = !filter.keyword || `${item.name} ${item.genre} ${item.owner}`.toLowerCase().includes(filter.keyword.toLowerCase());
      const tabOk = tab === "all" || (tab === "unassigned" && item.taskStatus === "待分配") || (tab === "assigned" && item.taskStatus === "已分配") || (tab === "launched" && item.taskStatus === "已立项");
      return keywordOk && tabOk;
    });
    const rows = pageItems(filtered, "ips").map(item => `<tr data-record-type="ip" data-record-id="${item.id}">
      <td><strong>${escapeHtml(item.name)}</strong></td>
      <td><span class="pill pill--genre">${escapeHtml(item.genre)}</span></td><td>${escapeHtml(item.owner)}</td><td>${escapeHtml(item.assignee)}</td>
      <td>${status(item.taskStatus)}</td><td>${escapeHtml(item.updated)}</td>
      <td><div class="action-row"><button class="link-btn link-btn--strong" data-action="assign-ip-person">分配人员</button><button class="link-btn" data-action="replace-ip-file">上传新版本</button><button class="link-btn" data-action="ip-version-history">历史记录</button><button class="link-btn link-btn--danger" data-action="delete-demo">删除</button></div></td>
    </tr>`);
    return shell(`${filterCard(`<div class="filter-row"><input class="input input--wide" name="keyword" value="${fieldValue("ips", "keyword")}" placeholder="搜索 IP 名称、题材或版权方"><button class="btn btn--primary" type="submit">查询</button><button class="btn" type="reset">重置</button></div>`)}
      ${contentCard(`${tabLine("ips", [
        { key: "all", label: `全部 (${ipWorks.length})` }, { key: "unassigned", label: `待分配 (${ipWorks.filter(item => item.taskStatus === "待分配").length})` }, { key: "assigned", label: `已分配 (${ipWorks.filter(item => item.taskStatus === "已分配").length})` }, { key: "launched", label: `已立项 (${ipWorks.filter(item => item.taskStatus === "已立项").length})` }
      ], '<button class="btn btn--primary" type="button" data-modal="create-ip-project">创建 IP 项目</button>')}${table([
        { label: "IP 名称", width: "235px" }, { label: "题材", width: "135px" }, { label: "版权 / 来源", width: "155px" },
        { label: "分配人员", width: "145px" }, { label: "任务状态", width: "125px" }, { label: "更新时间", width: "175px" }, { label: "操作", width: "390px" }
      ], rows, 1405)}${pagination(filtered.length)}`, true)}`);
  }

  function renderTopics() {
    const filter = state.filters.topics || {};
    const filtered = topics.filter(item => {
      const textOk = !filter.keyword || `${item.name} ${item.owner} ${item.reviewers}`.toLowerCase().includes(filter.keyword.toLowerCase());
      const genreOk = !filter.genre || item.genre === filter.genre;
      const tab = state.sectionTabs.topics;
      const tabOk = tab === "all"
        || (tab === "evaluated" && item.status === "通过")
        || (tab === "pending" && item.status === "未评估")
        || (tab === "rejected" && item.status === "驳回")
        || (tab === "assigned" && item.assignmentStatus === "已分配");
      return textOk && genreOk && tabOk;
    });
    const rows = pageItems(filtered, "topics").map(item => {
      const canAssign = item.status === "通过" && item.assignmentStatus !== "已分配";
      const assignAction = item.assignmentStatus === "已分配"
        ? '<button class="link-btn" type="button" disabled title="该选题已完成分配">已分配</button>'
        : `<button class="link-btn link-btn--strong" type="button" data-action="topic-assign" ${canAssign ? "" : 'disabled title="评估通过后可分配人员"'}>分配</button>`;
      return `<tr data-record-type="topic" data-record-id="${item.id}" data-record-name="${escapeHtml(item.name)}">
        <td>${escapeHtml(item.name)}</td><td>${escapeHtml(item.genre)}</td><td>${item.episodes}</td>
        <td>${item.created}</td><td>${item.updated}</td><td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.reviewers)}</td><td>${status(item.status)}</td><td><div class="topic-assignment-cell">${status(item.assignmentStatus)}${item.assignee ? `<small>${escapeHtml(item.assignee)}</small>` : ""}</div></td>
        <td><div class="action-row"><button class="link-btn" type="button" data-action="topic-edit">编辑</button><button class="link-btn" type="button" data-action="topic-evaluate" ${item.assignmentStatus === "已分配" ? 'disabled title="已分配选题不可重新评估"' : ""}>评估</button>${assignAction}</div></td>
      </tr>`;
    });
    return shell(`${filterCard(`<div class="filter-row">
      <label class="filter-field"><span class="filter-label">关键词</span><input class="input input--wide" name="keyword" value="${fieldValue("topics", "keyword")}" placeholder="请输入选题名 / 提交人"></label>
      <label class="filter-field"><span class="filter-label">题材</span><select class="select input--wide" name="genre"><option value="">请选择方向</option><option ${filter.genre === "玄幻" ? "selected" : ""}>玄幻</option><option ${filter.genre === "热血" ? "selected" : ""}>热血</option><option ${filter.genre === "都市" ? "selected" : ""}>都市</option><option ${filter.genre === "穿越" ? "selected" : ""}>穿越</option></select></label>
      <button class="btn btn--primary" type="submit">查询</button><button class="btn" type="reset">重置</button>
    </div>`)}${contentCard(`${tabLine("topics", [
      { key: "all", label: `全部(${topics.length})` }, { key: "evaluated", label: `已评估(${topics.filter(x => x.status === "通过").length})` },
      { key: "pending", label: `未评估(${topics.filter(x => x.status === "未评估").length})` }, { key: "rejected", label: `驳回(${topics.filter(x => x.status === "驳回").length})` },
      { key: "assigned", label: `已分配(${topics.filter(x => x.assignmentStatus === "已分配").length})` }
    ], '<button class="btn btn--primary" type="button" data-modal="add-topic">新增选题</button><button class="btn btn--primary" type="button" data-action="assignment-switch">分配切换（2026-09）</button>')}
      ${table([
        { label: "候选选题", width: "120px" }, { label: "题材", width: "110px" }, { label: "预计集数", width: "110px" },
        { label: "创建时间", width: "125px" }, { label: "修改时间", width: "125px" }, { label: "负责人", width: "110px" },
        { label: "评估相关人", width: "180px" }, { label: "评估状态", width: "125px" }, { label: "分配状态", width: "120px" }, { label: "操作", width: "180px" }
      ], rows, 1310)}${pagination(filtered.length)}`)}`);
  }

  function renderProjects() {
    const filter = state.filters.projects || {};
    const tab = state.sectionTabs.projects;
    const mode = state.modes.projects || "internal";
    const modeProjects = projects.filter(item => (item.productionMode || "internal") === mode);
    const filtered = modeProjects.filter(item => {
      const keywordOk = !filter.keyword || `${item.name} ${item.genre} ${item.owner} ${item.partnerCompany || ""} ${item.producerReviewer || ""}`.toLowerCase().includes(filter.keyword.toLowerCase());
      const genreOk = !filter.genre || item.genre === filter.genre;
      const tabOk = tab === "all" || (tab === "doing" && item.status === "进行中") || (tab === "done" && item.status === "已完成");
      return keywordOk && genreOk && tabOk;
    });
    const rows = pageItems(filtered, "projects").map((item, index) => mode === "partner"
      ? `<tr data-record-type="project" data-record-id="${item.id}" data-record-name="${escapeHtml(item.name)}">
        <td>${index + 1}</td><td title="${escapeHtml(item.name)}">${escapeHtml(item.name)}</td><td>${status(item.status)}</td>
        <td><span class="pill">${item.episodes} 集</span></td><td>${escapeHtml(item.producerReviewer || item.owner)}</td>
        <td>${money(item.budget)}</td><td>${escapeHtml(item.due)}</td>
        <td><div class="action-row"><button class="link-btn" data-action="project-detail">详情</button><button class="link-btn link-btn--danger" data-action="delete-demo">删除</button></div></td>
      </tr>`
      : `<tr data-record-type="project" data-record-id="${item.id}" data-record-name="${escapeHtml(item.name)}">
        <td>${index + 1}</td><td title="${escapeHtml(item.name)}">${escapeHtml(item.name)}</td><td>${status(item.status)}</td>
        <td><span class="pill pill--genre">${escapeHtml(item.genre)}</span></td><td><span class="pill">${item.episodes} 集</span></td>
        <td>${escapeHtml(item.owner)}</td><td>${money(item.budget)}</td><td>${escapeHtml(item.due)}</td>
        <td><label class="region-toggle"><span class="switch"><input type="checkbox" data-region-switch data-project-id="${item.id}" ${item.overseas ? "checked" : ""}><span></span></span><span>${item.overseas ? "海外" : "国内"}</span></label></td>
        <td><div class="action-row"><button class="link-btn" data-action="project-detail">详情</button><button class="link-btn" data-action="hours">工时</button><button class="link-btn link-btn--danger" data-action="delete-demo">删除</button></div></td>
      </tr>`);
    return shell(`${filterCard(`<div class="filter-row">
      <div class="segmented" role="radiogroup" aria-label="项目制作分类"><button class="${mode === "internal" ? "is-active" : ""}" type="button" data-segment="internal">内部</button><button class="${mode === "partner" ? "is-active" : ""}" type="button" data-segment="partner">承制方</button></div>
      <input class="input input--wide" name="keyword" value="${fieldValue("projects", "keyword")}" placeholder="搜索项目名 / 题材 / 创建人 / 参与人">
      <select class="select" name="genre"><option value="">全部题材</option><option ${filter.genre === "玄幻" ? "selected" : ""}>玄幻</option><option ${filter.genre === "热血" ? "selected" : ""}>热血</option><option ${filter.genre === "都市" ? "selected" : ""}>都市</option></select>
      <button class="btn btn--primary" type="submit">查询</button><button class="btn" type="reset">重置</button>
    </div>`)}${contentCard(`${tabLine("projects", [
      { key: "all", label: `全部 (${modeProjects.length})` }, { key: "doing", label: `进行中 (${modeProjects.filter(item => item.status === "进行中").length})` }, { key: "done", label: `已完成 (${modeProjects.filter(item => item.status === "已完成").length})` }
    ], '<button class="btn btn--primary" type="button" data-modal="add-project">新建</button>')}
      ${mode === "partner" ? table([
        { label: "序号", width: "90px" }, { label: "项目名称", width: "260px" }, { label: "状态", width: "130px" },
        { label: "集数", width: "110px" }, { label: "制片负责人", width: "160px" }, { label: "预算", width: "140px" },
        { label: "完成时间", width: "170px" }, { label: "操作", width: "170px" }
      ], rows, 1230) : table([
        { label: "序号", width: "80px" }, { label: "项目名称", width: "210px" }, { label: "状态", width: "115px" },
        { label: "题材", width: "110px" }, { label: "集数", width: "105px" }, { label: "制片负责人", width: "130px" },
        { label: "算力预算", width: "130px" }, { label: "完成时间", width: "150px" }, { label: "资源区域", width: "120px" }, { label: "操作", width: "185px" }
      ], rows, 1350)}${pagination(filtered.length)}`)}`);
  }

  function renderTasks() {
    const filter = state.filters.tasks || {};
    const role = state.sectionTabs.tasks;
    const filtered = taskSeed.filter(item => {
      const keywordOk = !filter.keyword || item.name.toLowerCase().includes(filter.keyword.toLowerCase());
      const genreOk = !filter.genre || item.genre === filter.genre;
      return keywordOk && genreOk;
    });
    const rows = pageItems(filtered, "tasks").map(item => {
      const stage = item.workflow[role];
      const stageLabel = taskStateLabels[stage.state];
      const processLabel = stage.state === "completed" ? "查看成果" : stage.state === "pending_review" ? "审核中" : stage.state === "locked" ? "等待前序" : "去处理";
      const reviewLabel = stage.state === "pending_review" ? taskReviewLabels[role] : "查看详情";
      const actual = stage.completedAt || "未完成";
      return `<tr data-task-id="${item.id}">
        <td>${item.id}</td><td><strong>${escapeHtml(item.name)}</strong><span class="task-assignee">负责人：${escapeHtml(stage.assignee)}</span></td><td>${status(stageLabel)}</td><td>${escapeHtml(item.genre)}</td>
        <td><span class="pill">${item.episodes} 集</span></td><td><strong>${item.due}</strong></td><td><strong>${actual}</strong></td>
        <td><span class="pill pill--genre">${stage.completed}/${stage.total}</span></td>
        <td><div class="action-row"><button class="link-btn" data-action="task-assets" data-task-id="${item.id}">资产设定</button><button class="link-btn" data-action="task-process" data-task-id="${item.id}" ${["locked", "pending_review"].includes(stage.state) ? "disabled" : ""}>${processLabel}</button><button class="link-btn ${stage.state === "pending_review" ? "link-btn--strong" : ""}" data-action="task-review" data-task-id="${item.id}">${reviewLabel}</button><button class="link-btn" data-action="more" data-menu="task" data-task-id="${item.id}" aria-label="更多操作">•••</button></div></td>
      </tr>`;
    });
    return shell(`${filterCard(`<div class="filter-row">
      <label class="filter-field"><span class="filter-label">项目名称</span><input class="input" name="keyword" value="${fieldValue("tasks", "keyword")}" placeholder="请输入"></label>
      <label class="filter-field"><span class="filter-label">题材</span><select class="select" name="genre"><option value="">全部题材</option><option ${filter.genre === "玄幻" ? "selected" : ""}>玄幻</option><option ${filter.genre === "热血" ? "selected" : ""}>热血</option><option ${filter.genre === "都市" ? "selected" : ""}>都市</option></select></label>
      <button class="btn btn--primary" type="submit">查询</button><button class="btn" type="reset">重置</button>
    </div>`)}${contentCard(`${tabLine("tasks", [
      { key: "writer", label: "编剧" }, { key: "producer", label: "制作" }, { key: "editor", label: "剪辑" }, { key: "manager", label: "制片" }
    ])}${table([
      { label: "序号", width: "85px" }, { label: "项目名称", width: "210px" }, { label: "状态", width: "110px" },
      { label: "题材", width: "125px" }, { label: "集", width: "90px" }, { label: "完成时间", width: "140px" },
      { label: "实际完成", width: "145px" }, { label: "完成进度", width: "125px" }, { label: "操作", width: "285px" }
    ], rows, 1315)}${pagination(filtered.length)}`)}`);
  }

  function workspaceHero(kicker, title, description, stats, action = "") {
    return `<section class="workspace-hero"><div><span class="workspace-hero__kicker">${escapeHtml(kicker)}</span><h1>${escapeHtml(title)}</h1><p>${escapeHtml(description)}</p></div>
      <div class="workspace-hero__side"><div class="workspace-stats">${stats.map(item => `<div><strong>${item.value}</strong><span>${escapeHtml(item.label)}</span></div>`).join("")}</div>${action}</div></section>`;
  }

  function renderProduction() {
    const filter = state.filters.production || {};
    const filtered = workflowProjects.filter(item => !filter.keyword || `${item.name} ${item.script} ${getAssignmentInfo(item, "production").names.join(" ")}`.toLowerCase().includes(filter.keyword.toLowerCase()));
    const rows = pageItems(filtered, "production").map(item => {
      const assignment = getAssignmentInfo(item, "production");
      const waiting = assignment.assigned === 0;
      return `<tr data-workflow-id="${item.id}"><td><strong>${escapeHtml(item.name)}</strong></td><td>${escapeHtml(item.genre)}</td>
        <td><strong>${assignment.assigned} / ${assignment.total} 集</strong></td><td>${roleStatusCell(item, "production")}</td><td>${deadlineCell(item, "production")}</td><td>${latestStoryboardSubmission(item)}</td>
        <td><div class="action-row"><button class="link-btn" data-action="assign-member" data-role="production">人员分配</button><button class="link-btn" data-action="workflow-assets">资产设定</button><button class="link-btn link-btn--strong" data-action="open-production" ${waiting ? "disabled" : ""}>去制作</button><button class="link-btn" data-action="workflow-detail">查看详情</button></div></td></tr>`;
    });
    return shell(`${filterCard(`<div class="filter-row"><input class="input input--wide" name="keyword" value="${fieldValue("production", "keyword")}" placeholder="搜索项目名"><button class="btn btn--primary" type="submit">查询</button><button class="btn" type="reset">重置</button></div>`)}
      ${contentCard(`${table([
        { label: "项目名", width: "205px" }, { label: "类型", width: "105px" }, { label: "分配集数", width: "145px" },
        { label: "当前状态", width: "145px" }, { label: "截止时间", width: "205px" }, { label: "最新提交时间", width: "155px" }, { label: "操作", width: "315px" }
      ], rows, 1275)}${pagination(filtered.length)}`, true)}`);
  }

  function renderEditing() {
    const filter = state.filters.editing || {};
    const filtered = workflowProjects.filter(item => !filter.keyword || `${item.name} ${getAssignmentInfo(item, "editing").names.join(" ")}`.toLowerCase().includes(filter.keyword.toLowerCase()));
    const rows = pageItems(filtered, "editing").map(item => {
      const assignment = getAssignmentInfo(item, "editing");
      const waiting = assignment.assigned === 0;
      const materialReady = item.storyboards.length > 0;
      const latestSubmission = deliveries.find(delivery => delivery.name === item.name)?.submittedAt || "--";
      return `<tr data-workflow-id="${item.id}"><td><strong>${escapeHtml(item.name)}</strong></td><td>${escapeHtml(item.genre)}</td>
        <td><strong>${assignment.assigned} / ${assignment.total} 集</strong></td><td>${roleStatusCell(item, "editing")}</td><td>${deadlineCell(item, "editing")}</td><td>${latestSubmission}</td>
        <td><div class="action-row"><button class="link-btn" data-action="assign-member" data-role="editing">人员分配</button><button class="link-btn link-btn--strong" data-action="open-materials" ${!materialReady || waiting ? "disabled" : ""}>下载素材</button><button class="link-btn" data-action="workflow-detail" data-role="editing">查看详情</button></div></td></tr>`;
    });
    return shell(`${filterCard(`<div class="filter-row"><input class="input input--wide" name="keyword" value="${fieldValue("editing", "keyword")}" placeholder="搜索项目名"><button class="btn btn--primary" type="submit">查询</button><button class="btn" type="reset">重置</button></div>`)}
      ${contentCard(`${table([
        { label: "项目名", width: "205px" }, { label: "类型", width: "105px" }, { label: "分配集数", width: "145px" },
        { label: "当前状态", width: "145px" }, { label: "截止时间", width: "205px" }, { label: "最新提交时间", width: "155px" }, { label: "操作", width: "315px" }
      ], rows, 1275)}${pagination(filtered.length)}`, true)}`);
  }

  function renderWorks() {
    const filter = state.filters.works || {};
    const mode = state.modes.works;
    let filtered = works.filter(item => {
      const codeOk = !filter.code || item.code.toLowerCase().includes(filter.code.toLowerCase());
      const nameOk = !filter.keyword || item.name.toLowerCase().includes(filter.keyword.toLowerCase());
      return codeOk && nameOk;
    });
    if (mode === "partner") filtered = filtered.slice(2, 8);
    const rows = pageItems(filtered, "works").map(item => {
      const internalEditingAction = item.status === "已完成"
        ? '<button class="link-btn" data-action="work-editing-download">剪辑下载</button>'
        : '<button class="link-btn" data-action="work-editing-apply">剪辑申请下载</button>';
      const operationApply = '<button class="link-btn" data-action="work-operation-apply">运营申请下载</button>';
      const packageDownload = '<button class="link-btn" data-action="work-package">生成全部下载包</button>';
      const sharedCount = activeSharedMemberCount(item);
      const shareAction = `<button class="link-btn ${sharedCount ? "link-btn--green" : ""}" data-action="open-share" data-share-type="work" title="${sharedCount ? `已有 ${sharedCount} 人共享中，点击继续添加` : "选择共享人员和有效时间"}">${sharedCount ? "已分享" : "共享"}</button>`;
      const actions = mode === "internal"
        ? `<button class="link-btn link-btn--green link-btn--with-icon" data-action="work-upload">${icon("upload")}<span>上传</span></button>${operationApply}${internalEditingAction}${packageDownload}${shareAction}<button class="link-btn" data-action="more" data-menu="works">更多</button>`
        : `${operationApply}<button class="link-btn" data-action="work-editing-apply">剪辑申请下载</button>${packageDownload}${shareAction}<button class="link-btn" data-action="view-film">查看</button><button class="link-btn link-btn--warning" data-action="request-change">修改意见</button>`;
      return `<tr data-work-code="${escapeHtml(item.code)}" data-work-name="${escapeHtml(item.name)}">
      <td title="${item.code}">${item.code}</td><td><strong>${escapeHtml(item.name)}</strong><span class="task-assignee">完整成片 ${item.version}</span></td><td>${item.total}</td><td>${item.genre}</td>
      <td>${item.done}</td><td>${item.duration}</td><td><strong>${escapeHtml(item.pacing)}</strong></td><td>${item.due}</td><td>${status(item.status)}</td>
      <td class="work-actions-cell"><div class="action-row action-row--works">${actions}</div></td>
    </tr>`;
    });
    return shell(`${filterCard(`<div class="filter-row">
      <div class="segmented" role="radiogroup"><button class="${mode === "internal" ? "is-active" : ""}" type="button" data-segment="internal">内部</button><button class="${mode === "partner" ? "is-active" : ""}" type="button" data-segment="partner">承制方</button></div>
      <label class="filter-field"><span class="filter-label">项目编号</span><input class="input" name="code" value="${fieldValue("works", "code")}" placeholder="请输入项目编号"></label>
      <label class="filter-field"><span class="filter-label">项目名称</span><input class="input" name="keyword" value="${fieldValue("works", "keyword")}" placeholder="请输入项目名称"></label>
      <button class="btn btn--primary" type="submit">查询</button><button class="btn" type="reset">重置</button>
    </div>`)}${contentCard(`${table([
      { label: "项目编号", width: "145px" }, { label: "项目名称", width: "150px" }, { label: "项目总剧集", width: "110px" },
      { label: "项目分类", width: "110px" }, { label: "已完成剧集", width: "110px" }, { label: "总时长", width: "110px" },
      { label: "视频配速", width: "105px" }, { label: "项目完成时间", width: "145px" }, { label: "状态", width: "115px" }, { label: "操作", width: "485px" }
    ], rows, 1585)}<div class="footer-actions"><button class="btn btn--ghost-blue" type="button" data-action="version-records">全部版本记录</button>${pagination(filtered.length)}</div>`, true)}`);
  }

  function renderDelivery() {
    const filter = state.filters.delivery || {};
    const mode = state.modes.delivery;
    const modeDeliveries = deliveries.filter(item => item.channel === mode);
    const filtered = modeDeliveries.filter(item => {
      const nameOk = !filter.keyword || item.name.toLowerCase().includes(filter.keyword.toLowerCase());
      const ownerOk = !filter.owner || item.owner.toLowerCase().includes(filter.owner.toLowerCase());
      const dateOk = (!filter.start || item.date >= filter.start) && (!filter.end || item.date <= filter.end);
      return nameOk && ownerOk && dateOk;
    });
    const rows = pageItems(filtered, "delivery").map(item => {
      const canConfirm = item.status === "已通过";
      const confirmLabel = item.status === "已完成" ? "已交付" : "确认交付";
      const sharedCount = activeSharedMemberCount(item);
      const workflowProject = workflowProjects.find(project => project.name === item.name);
      const editingProgress = workflowProject ? roleProgress(workflowProject, "editing") : null;
      return `<tr data-delivery-name="${escapeHtml(item.name)}">
      <td>${escapeHtml(item.name)}</td><td><strong>${item.total}</strong><small class="table-cell-note">个实际目录</small></td><td>${editingProgress ? `<strong>${editingProgress.completed}/${editingProgress.total}集</strong><small class="table-cell-note">按计划集统计</small>` : "--"}</td><td>${item.duration}</td><td><strong>${escapeHtml(item.pacing)}</strong></td><td>${status(item.status)}</td><td>${status(item.frame)}</td>
      <td>${escapeHtml(item.owner)}</td><td>${item.pending}</td><td>${item.rejected}</td><td>${item.passed}</td>
      <td><div class="action-row"><button class="link-btn link-btn--strong" data-action="delivery-audit">审核</button><button class="link-btn" data-action="delivery-view">查看</button><button class="link-btn ${sharedCount ? "link-btn--green" : ""}" data-action="open-share" data-share-type="delivery" title="${sharedCount ? `已有 ${sharedCount} 人共享中，点击继续添加` : "选择共享人员和有效时间"}">${sharedCount ? "已分享" : "共享"}</button><button class="link-btn" data-action="delivery-frame-config">提帧配置</button><button class="link-btn link-btn--green" data-action="confirm-delivery" ${canConfirm ? "" : "disabled"} title="${canConfirm ? "填写备注并绑定角色 IP" : item.status === "已完成" ? "项目已完成交付" : "审核通过后可确认交付"}">${confirmLabel}</button><button class="link-btn" data-action="delivery-history">历史记录</button>${mode === "internal" ? '<button class="link-btn" data-action="delivery-upload">上传</button>' : ""}<button class="link-btn link-btn--warning" data-action="delivery-change">修改意见</button></div></td></tr>`;
    });
    return shell(`${filterCard(`<div class="filter-row">
      <div class="segmented" role="radiogroup" aria-label="交付项目类型"><button class="${mode === "internal" ? "is-active" : ""}" type="button" data-segment="internal">内部</button><button class="${mode === "partner" ? "is-active" : ""}" type="button" data-segment="partner">承制方</button></div>
      <label class="filter-field"><span class="filter-label">名称</span><input class="input" name="keyword" value="${fieldValue("delivery", "keyword")}" placeholder="请输入项目名称"></label>
      <label class="filter-field"><span class="filter-label">负责人</span><input class="input" name="owner" value="${fieldValue("delivery", "owner")}" placeholder="请输入负责人用户名"></label>
      <label class="filter-field filter-field--grow"><span class="filter-label">时间</span><span class="date-range"><input type="text" name="start" value="${fieldValue("delivery", "start")}" placeholder="开始时间"><span>–</span><input type="text" name="end" value="${fieldValue("delivery", "end")}" placeholder="结束时间"></span></label>
      <button class="btn btn--primary" type="submit">查询</button><button class="btn" type="reset">重置</button>
    </div>`)}${contentCard(`${table([
      { label: "项目名称", width: "175px" }, { label: "实际交付目录", width: "120px" }, { label: "计划完成进度", width: "125px" }, { label: "总时长", width: "100px" }, { label: "视频配速", width: "100px" },
      { label: "项目状态", width: "115px" }, { label: "提帧状态", width: "110px" }, { label: "负责人", width: "130px" },
      { label: "待审核数量", width: "105px" }, { label: "驳回数量", width: "100px" }, { label: "已通过数量", width: "105px" }, { label: "操作", width: "545px" }
    ], rows, 1825)}${pagination(filtered.length)}`, true)}`);
  }

  function renderScripts() {
    const filter = state.filters.scripts || {};
    const keyword = (filter.keyword || "").toLowerCase();
    const openTasks = scriptTasks.filter(task => !scripts.some(script => script.sourceTaskId === task.id));
    const combinedItems = [
      ...openTasks.map(item => ({ type: "task", item })),
      ...scripts.map(item => ({ type: "script", item }))
    ];
    const filteredItems = combinedItems.filter(({ type, item }) => {
      const searchText = type === "task"
        ? `${item.name} ${item.ipName} ${item.genre} ${item.assignee}`
        : `${item.name} ${item.genre} ${item.uploader}`;
      return !keyword || searchText.toLowerCase().includes(keyword);
    });
    const ratingTag = item => {
      const rating = Number(item.rating);
      const hasRating = Number.isFinite(rating) && rating > 0;
      return hasRating ? `<span class="script-rating-tag" title="剧本评分 ${rating.toFixed(1)} 分">${rating.toFixed(1)}</span>` : "";
    };
    const workHoursCell = (type, item) => {
      const sourceTask = type === "script" && item.sourceTaskId ? scriptTasks.find(task => task.id === item.sourceTaskId) : null;
      const startedAt = type === "task" ? item.createdAt : sourceTask?.createdAt || item.assignedAt || item.createdAt || item.updated;
      const updatedAt = type === "task" ? item.updatedAt || item.createdAt : item.updated;
      const start = new Date(String(startedAt).replace(" ", "T"));
      const end = new Date(String(updatedAt).replace(" ", "T"));
      const hours = Math.max(0, (end - start) / 3600000);
      const display = hours < 1 ? `${Math.max(0, Math.round(hours * 60))} 分钟` : `${hours.toFixed(hours >= 100 ? 0 : 1)} 小时`;
      return `<div class="script-work-hours" title="下发：${escapeHtml(startedAt)}&#10;最后更新：${escapeHtml(updatedAt)}"><strong>${display}</strong><small>${escapeHtml(String(startedAt).slice(5, 16))} → ${escapeHtml(String(updatedAt).slice(5, 16))}</small></div>`;
    };
    const rows = pageItems(filteredItems, "scripts").map(({ type, item }) => {
      if (type === "script") {
        const lifecycle = scriptLifecycleStatus(type, item);
        return `<tr data-record-type="script" data-record-name="${escapeHtml(item.name)}">
          <td><div class="script-name-cell"><strong>${escapeHtml(item.name)}</strong>${ratingTag(item)}</div></td><td>${escapeHtml(item.genre)}</td><td>${escapeHtml(item.uploader)}</td><td>${item.episodes} 集</td>
          <td><strong>${item.version}</strong></td><td>${status(lifecycle)}</td><td class="linked-project-cell">${renderLinkedProjects(item)}</td>
          <td>${workHoursCell(type, item)}</td><td>${item.updated}</td><td><div class="action-row"><button class="link-btn link-btn--strong" data-action="script-library-detail">详情</button><button class="link-btn" data-action="versions">查看版本</button><button class="link-btn" data-action="update-script">更新 / 上传</button>${scriptEligibilityAction(type, item)}<button class="link-btn link-btn--green" data-action="share">${item.shared ? "取消共享" : "共享"}</button><button class="link-btn" data-action="rate-script">评分</button><button class="link-btn link-btn--danger" data-action="delete-demo">删除</button></div></td>
        </tr>`;
      }
      const submitted = item.status === "已提交";
      const lifecycle = scriptLifecycleStatus(type, item);
      return `<tr data-record-type="script-task" data-record-id="${item.id}" data-record-name="${escapeHtml(item.name)}" data-script-task-id="${item.id}">
        <td><div class="script-name-cell"><strong>${escapeHtml(item.name)}</strong>${ratingTag(item)}</div></td><td>${escapeHtml(item.genre)}</td><td>${escapeHtml(item.assignee)}</td><td>${submitted ? taskEpisodeCount(item) : 0} 集</td>
        <td><strong>${submitted ? "V1" : "--"}</strong></td><td>${status(lifecycle)}</td><td class="linked-project-cell"><span class="linked-project-empty">暂未关联项目</span></td>
        <td>${workHoursCell(type, item)}</td><td>${escapeHtml(item.updatedAt || item.createdAt)}</td><td><div class="action-row"><button class="link-btn link-btn--strong" data-action="script-library-detail">详情</button><button class="link-btn" data-action="task-submission-detail" ${submitted ? "" : 'disabled title="上传首个版本后可查看"'}>查看版本</button><button class="link-btn" data-action="create-task-script">更新 / 上传</button>${scriptEligibilityAction(type, item)}<button class="link-btn link-btn--green" data-action="share-script-task" ${submitted ? "" : 'disabled title="上传首个版本后可共享"'}>${item.shared ? "取消共享" : "共享"}</button><button class="link-btn" data-action="rate-script">评分</button><button class="link-btn link-btn--danger" data-action="delete-demo">删除</button></div></td>
      </tr>`;
    });
    const tableContent = table([
      { label: "剧本", width: "205px" }, { label: "题材", width: "130px" }, { label: "编剧", width: "125px" }, { label: "上传集数", width: "115px" },
      { label: "最新版本", width: "115px" }, { label: "剧本状态", width: "115px" }, { label: "关联项目", width: "300px" }, { label: "当前工时", width: "145px" }, { label: "最后更新时间", width: "185px" }, { label: "操作", width: "430px" }
    ], rows, 1885);
    return shell(`${filterCard(`<div class="filter-row"><input class="input input--wide" name="keyword" value="${fieldValue("scripts", "keyword")}" placeholder="输入剧本、来源 IP 或编剧"><button class="btn btn--primary" type="submit">查询</button><button class="btn" type="reset">重置</button></div>`)}
      ${contentCard(`<div class="card-toolbar"><strong>剧本列表（${combinedItems.length}）</strong><div class="card-toolbar__actions"><button class="btn" type="button" data-modal="add-script">新增剧本</button></div></div>${tableContent}${pagination(filteredItems.length)}`, true)}`);
  }

  function renderPage() {
    document.querySelectorAll(".nav-item[data-page]").forEach(item => item.classList.toggle("is-active", item.dataset.page === state.activePage));
    const meta = pageMeta[state.activePage] || pageMeta.projects;
    breadcrumb.innerHTML = `<span class="breadcrumb__item">${icon(meta.icon)}${meta.group}</span><span class="breadcrumb__divider">/</span><span class="breadcrumb__item">${icon(meta.icon)}${meta.label}</span>`;
    document.title = meta.label;
    pageTabs.innerHTML = state.openPages.map(page => `<button class="page-tab ${page === state.activePage ? "is-active" : ""}" type="button" data-tab-page="${page}"><span>${pageMeta[page].label}</span><span class="page-tab__close" data-close-tab="${page}" aria-label="关闭${pageMeta[page].label}">×</span></button>`).join("");
    const renderers = {
      dashboard: () => renderModulePlaceholder("dashboard", "集中查看项目、内容与生产进度数据。"),
      agents: () => renderModulePlaceholder("agents", "统一管理创作与生产环节的智能体。"),
      resources: () => renderModulePlaceholder("resources", "统一查看和管理创作所需资源。"),
      "ip-characters": () => renderModulePlaceholder("ip-characters", "统一沉淀和管理 IP 人物资产。"),
      ips: renderIps,
      topics: renderTopics,
      scripts: renderScripts,
      production: renderProduction,
      editing: renderEditing,
      projects: renderProjects,
      delivery: renderDelivery,
      works: renderWorks,
      costs: () => renderModulePlaceholder("costs", "汇总查看项目成本与成员工时。"),
      "image-generate": () => renderModulePlaceholder("image-generate", "自由发起 AI 图片与创意内容生成。")
    };
    pageCanvas.innerHTML = (renderers[state.activePage] || renderProjects)();
    hydrateIcons(pageCanvas);
  }

  function navigate(page) {
    if (!pageMeta[page]) {
      showToast("该模块不在本次复刻范围内");
      return;
    }
    if (modalLayer.innerHTML) closeModal();
    state.activePage = page;
    if (!state.openPages.includes(page)) state.openPages.push(page);
    if (location.hash !== `#${page}`) history.replaceState(null, "", `#${page}`);
    renderPage();
  }

  function closeTab(page) {
    const index = state.openPages.indexOf(page);
    if (index < 0) return;
    state.openPages.splice(index, 1);
    if (!state.openPages.length) state.openPages.push("projects");
    if (state.activePage === page) state.activePage = state.openPages[Math.max(0, index - 1)] || "projects";
    history.replaceState(null, "", `#${state.activePage}`);
    renderPage();
  }

  function showToast(message, tone = "info") {
    const toast = document.createElement("div");
    toast.className = `toast ${tone === "success" ? "toast--success" : ""}`;
    toast.textContent = message;
    toastLayer.append(toast);
    window.setTimeout(() => toast.remove(), 2300);
  }

  const allocationRoleMeta = {
    production: { label: "制作", icon: "image" },
    editing: { label: "剪辑", icon: "clapper" },
    manager: { label: "制片", icon: "briefcase" }
  };

  const organizationDepartments = [
    { id: "content-production", role: "production", label: "内容中心 / 制作部", members: ["zhizuo1", "杰尼龙", "陈颖鹏"] },
    { id: "overseas-production", role: "production", label: "海外内容中心 / 制作组", members: ["杰尼龙", "陈颖鹏"] },
    { id: "post-editing", role: "editing", label: "后期中心 / 剪辑部", members: ["jianji1", "cyp", "zhizuo1"] },
    { id: "short-editing", role: "editing", label: "短剧中心 / 剪辑组", members: ["cyp", "jianji1"] },
    { id: "project-production", role: "manager", label: "项目中心 / 制片部", members: ["zhipian1", "cyp", "方耀飞"] },
    { id: "overseas-manager", role: "manager", label: "海外事业部 / 制片组", members: ["cyp", "方耀飞"] }
  ];

  const organizationHierarchy = [
    { name: "Aigc创作一组", members: [{ name: "zhizuo1", role: "production" }] },
    { name: "Aigc创作二组", members: [{ name: "杰尼龙", role: "production" }] },
    { name: "Aigc创作三组", members: [{ name: "陈颖鹏", role: "production" }] },
    { name: "内容中心", members: [{ name: "大牛", role: "writer" }, { name: "bianju1", role: "writer" }] },
    { name: "制片中心", members: [{ name: "zhipian1", role: "manager" }, { name: "方耀飞", role: "manager" }] },
    { name: "剪辑中心", members: [{ name: "jianji1", role: "editing" }, { name: "cyp", role: "editing" }] },
    { name: "运营增长中心", members: [] }
  ];

  function departmentsForRole(role) {
    return organizationDepartments.filter(department => department.role === role);
  }

  function projectDepartment(item, role) {
    const key = role === "production" ? "productionDepartment" : role === "editing" ? "editingDepartment" : "managerDepartment";
    const options = departmentsForRole(role);
    const department = options.find(option => option.id === item?.[key]) || options[0];
    if (item && !item[key]) item[key] = department.id;
    return department;
  }

  function departmentIdForMember(role, member) {
    return departmentsForRole(role).find(department => department.members.includes(member))?.id || departmentsForRole(role)[0].id;
  }

  function organizationPersonControl(role, current = "") {
    const meta = allocationRoleMeta[role];
    const tree = organizationHierarchy.map(department => {
      const members = department.members.filter(member => member.role === role);
      return `<div class="org-tree-branch"><div class="org-tree-node ${members.length ? "" : "org-tree-node--muted"}"><span class="org-tree-indent"></span><span class="org-tree-box"></span><span>${escapeHtml(department.name)}</span></div>${members.length ? `<div class="org-tree-members">${members.map(member => `<button type="button" class="org-person-option ${member.name === current ? "is-selected" : ""}" data-action="select-org-person" data-person="${escapeHtml(member.name)}"><span>${escapeHtml(member.name.slice(0, 1))}</span><em>${escapeHtml(member.name)}</em><i>✓</i></button>`).join("")}</div>` : ""}</div>`;
    }).join("");
    return `<div class="org-person-select" data-org-person-select><input type="hidden" name="${role}_member" value="${escapeHtml(current)}"><button class="org-person-trigger" type="button" data-action="toggle-org-picker" aria-expanded="false"><span data-org-person-label>${escapeHtml(current || "选择人员")}</span><i>⌄</i></button><div class="org-person-picker" data-org-person-picker hidden><div class="org-picker-title"><span class="org-tree-chevron">⌄</span><span class="org-tree-box"></span><strong>AI制作中心</strong><small>${meta.label}人员</small></div><div class="org-tree-list">${tree}</div></div></div>`;
  }

  function organizationDepartmentControl(role, current = "") {
    const meta = allocationRoleMeta[role];
    const departments = departmentsForRole(role);
    return `<select class="select" name="${role}_member" aria-label="${meta.label}执行部门" required><option value="">选择执行部门</option>${departments.map(department => `<option value="${escapeHtml(department.id)}" ${department.id === current ? "selected" : ""}>${escapeHtml(department.label)}</option>`).join("")}</select>`;
  }

  function allocationRow(role, value = {}, members = departmentsForRole(role)[0].members, targetType = "member") {
    const meta = allocationRoleMeta[role];
    const targetControl = targetType === "department"
      ? organizationDepartmentControl(role, value.member)
      : targetType === "person"
        ? organizationPersonControl(role, value.member)
        : `<select class="select" name="${role}_member" aria-label="${meta.label}人员"><option value="">选择人员</option>${members.map(name => `<option value="${escapeHtml(name)}" ${name === value.member ? "selected" : ""}>${escapeHtml(name)}</option>`).join("")}</select>`;
    return `<div class="role-card__row" data-role-allocation-row>
      ${targetControl}
      <input class="input" name="${role}_range" value="${escapeHtml(value.range || "")}" placeholder="请选择范围，如 1-5" aria-label="${meta.label}负责集数">
      <input class="input" name="${role}_duration" type="number" min="1" value="${escapeHtml(value.duration || "")}" placeholder="工期/天" aria-label="${meta.label}工期">
      <div class="allocation-actions"><button class="allocation-action allocation-action--add" type="button" data-action="role-add" aria-label="新增${meta.label}分配">${icon("plus")}</button><button class="allocation-action allocation-action--remove" type="button" data-action="role-remove" aria-label="删除${meta.label}分配">${icon("trash")}</button></div>
    </div>`;
  }

  function allocationCard(role, values = [{}], members = departmentsForRole(role)[0].members, targetType = "member") {
    const meta = allocationRoleMeta[role];
    const rows = values.length ? values : [{}];
    const targetLabel = targetType === "department" ? "执行部门" : targetType === "person" ? "制片人员" : "人员";
    const ruleLabel = targetType === "department" ? "按部门分配" : targetType === "person" ? "指定到人" : "";
    return `<section class="role-card allocation-card" data-allocation-role="${role}" data-target-type="${targetType}"><h4 class="allocation-card__title"><span>${meta.label}</span>${ruleLabel ? `<small>${ruleLabel}</small>` : ""}</h4><div class="allocation-card__table"><div class="allocation-card__head"><span>${targetLabel}</span><span>负责集数</span><span>工期</span><span>操作</span></div><div class="allocation-card__rows">${rows.map(value => allocationRow(role, value, members, targetType)).join("")}</div></div></section>`;
  }

  function roleCards() {
    return ["production", "editing", "manager"].map(role => allocationCard(role, [{}], [], role === "manager" ? "person" : "department")).join("");
  }

  function syncProjectProductionMode(form) {
    if (!form?.matches("[data-project-form]")) return;
    const isPartner = form.querySelector('[name="productionMode"]:checked')?.value === "partner";
    const partnerFields = form.querySelector("[data-partner-production-fields]");
    const internalAllocation = form.querySelector("[data-internal-allocation]");
    const scriptSelect = form.querySelector('select[name="script"]');
    const scriptLabel = form.querySelector("[data-project-script-label]");
    const scriptPreview = form.querySelector("[data-script-preview]");
    if (scriptSelect) scriptSelect.required = !isPartner;
    if (scriptLabel) {
      scriptLabel.classList.toggle("required", !isPartner);
      scriptLabel.textContent = isPartner ? "关联剧本（可选）：" : "关联剧本：";
    }
    if (scriptPreview && !scriptSelect?.value) {
      scriptPreview.innerHTML = isPartner
        ? `<span class="script-link-preview__icon">${icon("book")}</span><div><strong>剧本资料可选</strong><p>可以关联已有剧本、单独上传文件，也可以暂不提供。</p></div>`
        : `<span class="script-link-preview__icon">${icon("book")}</span><div><strong>关联剧本后自动建立内容关系</strong><p>编剧人员、剧本版本与内容摘要将在这里展示，立项时不再重复分配编剧。</p></div>`;
    }
    if (partnerFields) {
      partnerFields.hidden = !isPartner;
      partnerFields.querySelectorAll("select, input").forEach(control => { control.disabled = !isPartner; });
      partnerFields.querySelectorAll("[data-partner-required]").forEach(control => { control.required = isPartner; });
    }
    if (internalAllocation) {
      internalAllocation.hidden = isPartner;
      internalAllocation.querySelectorAll("select, input, button").forEach(control => { control.disabled = isPartner; });
    }
  }

  function assignmentsToPlans(assignments) {
    const plans = [];
    assignments.forEach((member, index) => {
      if (!member) return;
      const last = plans[plans.length - 1];
      if (last && last.member === member && last.end === index) last.end = index + 1;
      else plans.push({ member, start: index + 1, end: index + 1 });
    });
    return plans.map(plan => ({ member: plan.member, range: plan.start === plan.end ? String(plan.start) : `${plan.start}-${plan.end}`, duration: "" }));
  }

  function parseEpisodeRange(value, total) {
    const episodes = new Set();
    String(value || "").replaceAll("至", "-").replaceAll("~", "-").replaceAll("—", "-").split(/[,，、]/).forEach(part => {
      const numbers = part.match(/\d+/g)?.map(Number) || [];
      if (!numbers.length) return;
      const start = Math.max(1, Math.min(total, numbers[0]));
      const end = Math.max(1, Math.min(total, numbers[1] || numbers[0]));
      for (let episode = Math.min(start, end); episode <= Math.max(start, end); episode += 1) episodes.add(episode);
    });
    return [...episodes];
  }

  function collectAllocationPlans(form, role, total) {
    return [...form.querySelectorAll(`[data-allocation-role="${role}"] [data-role-allocation-row]`)].map(row => ({
      member: row.querySelector(`[name="${role}_member"]`)?.value || "",
      range: row.querySelector(`[name="${role}_range"]`)?.value.trim() || "",
      duration: row.querySelector(`[name="${role}_duration"]`)?.value || ""
    })).filter(plan => plan.member || plan.range || plan.duration).map(plan => ({ ...plan, episodes: parseEpisodeRange(plan.range, total) }));
  }

  function plansToAssignments(plans, total) {
    const assignments = Array.from({ length: total }, () => "");
    plans.forEach(plan => {
      if (!plan.member) return;
      plan.episodes.forEach(episode => { assignments[episode - 1] = plan.member; });
    });
    return assignments;
  }

  function estimateDeliveryDirectories(files) {
    const directoryKeys = new Set();
    [...files].forEach((file, index) => {
      const baseName = file.name.replace(/\.[^.]+$/, "");
      const episodeMatch = baseName.match(/第?\s*(\d{1,3})\s*集/i) || baseName.match(/^(\d{1,3})(?:[-_\s]|$)/);
      directoryKeys.add(episodeMatch ? `episode-${Number(episodeMatch[1])}` : `file-${index}-${baseName}`);
    });
    return directoryKeys.size;
  }

  function parseCompletionRange(value, total) {
    const episodes = new Set();
    let invalid = false;
    String(value || "").replaceAll("至", "-").replaceAll("~", "-").replaceAll("—", "-").split(/[,，、]/).forEach(part => {
      const numbers = part.match(/\d+/g)?.map(Number) || [];
      if (!numbers.length || numbers.length > 2) {
        if (part.trim()) invalid = true;
        return;
      }
      const start = numbers[0];
      const end = numbers[1] || numbers[0];
      if (start < 1 || end < 1 || start > total || end > total || start > end) {
        invalid = true;
        return;
      }
      for (let episode = start; episode <= end; episode += 1) episodes.add(episode);
    });
    return { episodes: [...episodes], invalid };
  }

  function refreshAllocationCounter(form) {
    const counter = form?.querySelector("[data-assignment-count]");
    const card = form?.querySelector("[data-allocation-role]");
    const item = workflowProjects.find(project => project.id === Number(state.workflowContext?.id));
    if (!counter || !card || !item) return;
    const plans = collectAllocationPlans(form, card.dataset.allocationRole, item.episodes);
    const assigned = plansToAssignments(plans, item.episodes).filter(Boolean).length;
    counter.textContent = `${assigned}/${item.episodes} 集已分配`;
  }

  function modalTemplate(title, body, footer, size = "") {
    return `<section class="modal ${size}" role="dialog" aria-modal="true" aria-label="${escapeHtml(title)}">
      <header class="modal__header"><span>${escapeHtml(title)}</span><button class="modal__close" type="button" data-modal-close aria-label="关闭">×</button></header>
      <div class="modal__body">${body}</div><footer class="modal__footer">${footer}</footer>
    </section>`;
  }

  function versionNumber(version) {
    const parsed = Number(String(version || "V0").replace(/\D/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function taskEpisodeCount(task) {
    const matched = String(task?.requirement || "").match(/(\d+)\s*集/);
    return Math.max(1, Number(matched?.[1]) || 10);
  }

  function scriptEpisodeDraft(name, index, sourceName = "") {
    const titles = ["初入沉家", "意外来客", "暗线浮现", "首次交锋", "选择与代价", "风暴将至", "旧事重提", "真相一角", "局势逆转", "新的起点"];
    const title = `第${index}集 ${titles[(index - 1) % titles.length]}`;
    const sourceHint = sourceName ? `本集根据《${sourceName}》原内容进行二创，请保留核心人物关系与世界观设定。\n\n` : "";
    const content = index === 1
      ? `${sourceHint}苏挽云被父亲安排嫁入沉家。刚踏进沉家院门，便发现院中气氛异常冷清。\n\n刘翠兰站在门口，冷眼打量着她。\n\n刘翠兰（冷声）：既然进了沉家的门，就得守沉家的规矩。`
      : `${sourceHint}${name}第 ${index} 集内容待继续完善。可在此直接编辑本集标题与正文，或通过“上传剧本”更新完整版本。`;
    return { title, content };
  }

  function scriptWorkspace(task, script) {
    const isAdaptation = Boolean(task);
    const ip = isAdaptation ? ipWorks.find(item => item.id === task.ipId) : null;
    const isTopicTask = Boolean(task?.sourceTopic);
    const sourceName = ip?.name || task?.sourceTopic || task?.ipName || "";
    const name = task?.name || script?.name || "未命名剧本";
    const episodes = Math.max(1, Number(script?.episodes || (task ? taskEpisodeCount(task) : 10)));
    const version = script?.version || "V0";
    const currentDraft = scriptEpisodeDraft(name, 1, sourceName);
    const episodeTabs = Array.from({ length: episodes }, (_, index) => {
      const draft = scriptEpisodeDraft(name, index + 1, sourceName);
      return `<button class="script-episode-tab ${index === 0 ? "is-active" : ""}" type="button" data-action="switch-script-episode" data-episode="${index + 1}" data-episode-title="${encodeURIComponent(draft.title)}" data-episode-content="${encodeURIComponent(draft.content)}" aria-label="查看第 ${index + 1} 集">${index + 1}</button>`;
    }).join("");
    const sourcePanel = isAdaptation ? `<section class="script-source-panel">
      <div class="script-source-panel__summary">
        <span class="script-source-panel__icon">${icon(isTopicTask ? "topic" : "ip")}</span>
        <div><span>${isTopicTask ? "来源选题" : "二创原内容"}</span><strong>《${escapeHtml(sourceName)}》</strong><small>${escapeHtml(ip?.file || (isTopicTask ? "选题策划内容" : "原内容文件"))} · 下发内容只读</small></div>
        <button class="btn script-source-panel__toggle" type="button" data-action="toggle-source-content" aria-expanded="false">查看原内容</button>
      </div>
      <div class="script-source-panel__content" data-source-content hidden>
        <div class="script-source-panel__requirement"><span>创作要求</span><p>${escapeHtml(task.requirement)}</p></div>
        <div class="script-source-panel__document"><span>${isTopicTask ? "选题内容" : "原内容预览"}</span><h3>${escapeHtml(sourceName)}</h3><p>${escapeHtml(ip?.content || topics.find(item => item.id === task.topicId)?.content || "暂无可预览内容。").replaceAll("\n", "<br>")}</p></div>
      </div>
    </section>` : "";
    const currentVersion = script ? `<section class="script-version-card">
      <header><strong>当前最新版本</strong>${status("正在使用")}</header>
      <div class="script-version-card__grid"><div><span>版本号</span><strong>${escapeHtml(version)}</strong></div><div><span>更新时间</span><strong class="is-primary">${escapeHtml(script.updated)}</strong></div><div><span>上传集数</span><strong>${episodes} 集</strong></div><div><span>上传人</span><strong>${escapeHtml(script.uploader)}</strong></div></div>
    </section>` : `<section class="script-version-card script-version-card--empty">
      <header><div><strong>尚未提交首个版本</strong><small>完成内容编辑或上传文件后，将生成 V1 版本。</small></div>${status("创作中")}</header>
    </section>`;
    return `<form id="modalForm" data-modal-submit="script-workspace" data-workspace-type="${isAdaptation ? "task" : "script"}">
      <section class="script-workspace-title"><span>${icon("book")}</span><div><strong>《${escapeHtml(name)}》</strong><small>${isAdaptation ? `${isTopicTask ? "来源选题" : "来源 IP"}：${escapeHtml(sourceName)} · 截止 ${escapeHtml(task.due)}` : `剧本更新 · 当前 ${escapeHtml(version)}`}</small></div>${isAdaptation ? `<span class="script-workspace-title__tag">${isTopicTask ? "选题任务" : "二创任务"}</span>` : ""}</section>
      ${sourcePanel}${currentVersion}
      <section class="script-content-card">
        <header class="script-content-card__head"><div><strong>剧本内容</strong><small data-script-upload-state>可逐集编辑，也可上传完整剧本文件</small></div><button class="btn btn--primary" type="button" data-action="choose-script-file">上传剧本</button><input class="sr-only" name="file" value="${escapeHtml(`${name}-${versionNumber(version) ? `V${versionNumber(version) + 1}` : "V1"}.docx`)}"></header>
        <div class="script-episode-tabs" role="tablist" aria-label="剧本分集">${episodeTabs}</div>
        <div class="script-episode-editor"><label><span>标题</span><input class="input" name="episodeTitle" value="${escapeHtml(currentDraft.title)}"></label><button class="script-editor-expand" type="button" data-action="toggle-script-editor" aria-label="展开编辑区">⛶</button><label><span>内容</span><textarea class="textarea" name="episodeContent">${escapeHtml(currentDraft.content)}</textarea></label></div>
      </section>
      <input type="hidden" name="name" value="${escapeHtml(name)}"><input type="hidden" name="episodes" value="${episodes}">
    </form>`;
  }

  function openScriptWorkspace({ taskId = null, scriptName = "" } = {}) {
    const task = taskId ? scriptTasks.find(item => item.id === Number(taskId)) : null;
    const taskScript = task ? scripts.find(item => item.sourceTaskId === task.id) : null;
    const submittedTaskScript = task && task.status === "已提交" && !taskScript ? {
      name: task.name, episodes: taskEpisodeCount(task), version: "V1", updated: task.updatedAt || task.createdAt, uploader: task.assignee
    } : null;
    const script = scriptName ? scripts.find(item => item.name === scriptName) : taskScript || submittedTaskScript;
    if (!task && !script) return;
    state.scriptWorkspaceContext = task ? { type: "task", id: task.id } : { type: "script", name: script.name };
    modalLayer.innerHTML = modalTemplate("上传与管理剧本", scriptWorkspace(task, script), '<button class="btn" type="button" data-modal-close>关闭</button><button class="btn btn--primary" type="submit" form="modalForm">确认</button>', "modal--script-workspace");
    hydrateIcons(modalLayer);
  }

  function openModal(type) {
    let html = "";
    if (type === "account-settings") {
      html = modalTemplate("修改账号密码", `<form id="modalForm" data-modal-submit="account-settings"><div class="assignment-note assignment-note--blue"><span class="account-avatar-preview">${escapeHtml(currentAccount.slice(0, 1).toUpperCase())}</span><div><strong>账号安全设置</strong><p>修改登录账号与密码。为保护账号安全，请先输入当前密码。</p></div></div><div class="form-grid">
        <label class="form-field form-field--full"><span class="form-label required">登录账号</span><input class="input" name="account" value="${escapeHtml(currentAccount)}" maxlength="40" autocomplete="username" placeholder="请输入登录账号" required></label>
        <label class="form-field form-field--full"><span class="form-label required">当前密码</span><input class="input" name="currentPassword" type="password" autocomplete="current-password" placeholder="请输入当前密码" required></label>
        <label class="form-field"><span class="form-label required">新密码</span><input class="input" name="newPassword" type="password" minlength="6" autocomplete="new-password" placeholder="至少 6 位字符" required></label>
        <label class="form-field"><span class="form-label required">确认新密码</span><input class="input" name="confirmPassword" type="password" minlength="6" autocomplete="new-password" placeholder="请再次输入新密码" required></label>
      </div></form>`, '<button class="btn" type="button" data-modal-close>取消</button><button class="btn btn--primary" type="submit" form="modalForm">确认修改</button>', "modal--small");
    } else if (["add-ip", "create-ip-project"].includes(type)) {
      const ipModalTitle = type === "create-ip-project" ? "创建 IP 项目" : "新建 / 上传 IP";
      const ipModalAction = type === "create-ip-project" ? "确认创建" : "确认入库";
      html = modalTemplate(ipModalTitle, `<form id="modalForm" data-modal-submit="add-ip"><div class="form-grid">
        <label class="form-field"><span class="form-label required">IP 名称</span><input class="input" name="name" maxlength="80" placeholder="请输入 IP 名称" required></label>
        <label class="form-field"><span class="form-label required">题材方向</span><input class="input" name="genre" placeholder="如：古装权谋、科幻热血" required></label>
        <label class="form-field"><span class="form-label required">版权 / 来源</span><input class="input" name="owner" placeholder="请输入版权方或内容来源" required></label>
        <label class="form-field form-field--full"><span class="form-label">IP 简介</span><textarea class="textarea" name="summary" placeholder="填写核心设定、主要人物与二创边界"></textarea></label>
        <div class="form-field form-field--full"><span class="form-label required">IP 剧本</span><div class="upload-box"><button class="btn btn--primary" type="button" data-action="choose-file">选择剧本</button><span class="upload-box__hint" data-file-hint>支持 DOC、DOCX、PDF，上传后可在详情中查看内容</span><input class="sr-only" name="file" value="IP剧本.docx" required></div></div>
      </div></form>`, `<button class="btn" type="button" data-modal-close>取消</button><button class="btn btn--primary" type="submit" form="modalForm">${ipModalAction}</button>`, "modal--small");
    } else if (type === "assign-ip-person") {
      const selectedIp = ipWorks.find(item => item.id === Number(state.ipContext?.id));
      if (!selectedIp) return;
      html = modalTemplate("分配人员", `<form id="modalForm" data-modal-submit="assign-ip-person"><div class="ip-assign-current"><span>当前 IP</span><strong>${escapeHtml(selectedIp.name)}</strong></div><input type="hidden" name="ipId" value="${selectedIp.id}"><label class="form-field"><span class="form-label required">分配人员</span><select class="select" name="writer" required><option value="">请选择编剧</option><option>bianju1</option><option>大牛</option><option>陈颖鹏</option></select></label></form>`, '<button class="btn" type="button" data-modal-close>取消</button><button class="btn btn--primary" type="submit" form="modalForm">确认分配</button>', "modal--small");
    } else if (type === "upload-ip-version") {
      const item = ipWorks.find(entry => entry.id === Number(state.ipContext?.id));
      if (!item) return;
      const nextVersion = (item.versions?.length || 0) + 1;
      html = modalTemplate("上传新版本", `<form id="modalForm" data-modal-submit="upload-ip-version"><div class="ip-version-upload-head"><div><span>当前 IP</span><strong>${escapeHtml(item.name)}</strong></div><span>V${nextVersion}</span></div><div class="form-grid"><div class="form-field form-field--full"><span class="form-label required">剧本文件</span><div class="upload-box"><button class="btn btn--primary" type="button" data-action="choose-file" data-demo-file="${escapeHtml(item.name)}-V${nextVersion}.docx">选择文件</button><span class="upload-box__hint" data-file-hint>支持 DOC、DOCX、PDF，上传后自动保存为新版本</span><input class="sr-only" name="file" data-upload-value value="" required></div></div><label class="form-field form-field--full"><span class="form-label">版本说明</span><textarea class="textarea" name="note" maxlength="300" placeholder="填写本次更新内容"></textarea></label></div></form>`, '<button class="btn" type="button" data-modal-close>取消</button><button class="btn btn--primary" type="submit" form="modalForm">确认上传</button>', "modal--small");
    } else if (type === "create-task-script") {
      return openScriptWorkspace({ taskId: state.scriptTaskContext?.id });
    } else if (type === "add-topic") {
      html = modalTemplate("新增选题", `<form id="modalForm" data-modal-submit="add-topic"><div class="form-grid">
        <label class="form-field"><span class="form-label required">选题名称</span><input class="input" name="name" placeholder="请输入选题名称" required></label>
        <label class="form-field"><span class="form-label required">题材</span><select class="select" name="genre" required><option value="">请选择题材</option><option>玄幻</option><option>热血</option><option>都市</option><option>穿越</option></select></label>
        <label class="form-field"><span class="form-label required">预计集数</span><span class="number-input"><input name="episodes" type="number" min="1" value="60" required><span class="number-input__steps"><button type="button" data-number-step="1">▲</button><button type="button" data-number-step="-1">▼</button></span></span></label>
        <label class="form-field"><span class="form-label required">评估参与人</span><select class="select" name="reviewers" required><option value="">请选择评估人</option><option>陈颖鹏</option><option>cyp</option><option>zhipian1</option><option>yy</option></select></label>
        <label class="form-field form-field--full"><span class="form-label">选题内容</span><textarea class="textarea" name="content" placeholder="输入选题核心设定、受众方向、主要爽点、人物关系或参考案例"></textarea></label>
      </div></form>`, '<button class="btn" type="button" data-modal-close>取消</button><button class="btn btn--primary" type="submit" form="modalForm">确认新增</button>', "modal--small");
    } else if (type === "topic-edit") {
      const topic = topics.find(item => item.id === Number(state.topicContext?.id));
      if (!topic) return;
      html = modalTemplate("编辑选题", `<form id="modalForm" data-modal-submit="topic-edit"><div class="form-grid">
        <label class="form-field"><span class="form-label required">选题名称</span><input class="input" name="name" value="${escapeHtml(topic.name)}" required></label>
        <label class="form-field"><span class="form-label required">题材</span><select class="select" name="genre" required><option ${topic.genre === "玄幻" ? "selected" : ""}>玄幻</option><option ${topic.genre === "热血" ? "selected" : ""}>热血</option><option ${topic.genre === "都市" ? "selected" : ""}>都市</option><option ${topic.genre === "穿越" ? "selected" : ""}>穿越</option></select></label>
        <label class="form-field"><span class="form-label required">预计集数</span><input class="input" type="number" name="episodes" min="1" value="${topic.episodes}" required></label>
        <label class="form-field"><span class="form-label required">评估参与人</span><input class="input" name="reviewers" value="${escapeHtml(topic.reviewers)}" required></label>
        <label class="form-field form-field--full"><span class="form-label">选题内容</span><textarea class="textarea" name="content">${escapeHtml(topic.content || "")}</textarea></label>
      </div></form>`, '<button class="btn" type="button" data-modal-close>取消</button><button class="btn btn--primary" type="submit" form="modalForm">保存修改</button>', "modal--small");
    } else if (type === "topic-evaluate") {
      const topic = topics.find(item => item.id === Number(state.topicContext?.id));
      if (!topic) return;
      html = modalTemplate("选题评估", `<form id="modalForm" data-modal-submit="topic-evaluate"><div class="assignment-note assignment-note--blue"><span>${icon("topic")}</span><div><strong>${escapeHtml(topic.name)} · ${escapeHtml(topic.genre)}</strong><p>${escapeHtml(topic.content || "暂无选题说明")}</p></div></div><div class="form-grid">
        <label class="form-field"><span class="form-label">预计集数</span><input class="input" value="${topic.episodes} 集" readonly></label>
        <label class="form-field"><span class="form-label">评估人</span><input class="input" value="${escapeHtml(currentAccount)}" readonly></label>
        <label class="form-field form-field--full"><span class="form-label required">评估结果</span><select class="select" name="result" required><option value="通过" ${topic.status === "通过" ? "selected" : ""}>通过</option><option value="驳回" ${topic.status === "驳回" ? "selected" : ""}>驳回</option></select></label>
        <label class="form-field form-field--full"><span class="form-label">评估意见</span><textarea class="textarea" name="note" placeholder="填写选题亮点、调整方向或驳回原因">${escapeHtml(topic.reviewNote || "")}</textarea></label>
      </div></form>`, '<button class="btn" type="button" data-modal-close>取消</button><button class="btn btn--primary" type="submit" form="modalForm">确认评估</button>', "modal--small");
    } else if (type === "topic-assign") {
      const topic = topics.find(item => item.id === Number(state.topicContext?.id));
      if (!topic || topic.status !== "通过" || topic.assignmentStatus === "已分配") return;
      html = modalTemplate("分配编剧人员", `<form id="modalForm" data-modal-submit="topic-assign"><div class="assignment-note"><span>${icon("book")}</span><div><strong>${escapeHtml(topic.name)} · 评估已通过</strong><p>选择编剧后，将在剧本库生成一条待接收的创作任务。</p></div></div><div class="form-grid">
        <label class="form-field"><span class="form-label required">分配人员</span><select class="select" name="writer" required><option value="">请选择编剧</option><option>bianju1</option><option>大牛</option><option>陈颖鹏</option></select></label>
        <label class="form-field"><span class="form-label required">截止时间</span><input class="date-input" type="date" name="due" value="2026-09-20" required></label>
        <label class="form-field form-field--full"><span class="form-label">创作要求</span><textarea class="textarea" name="requirement" placeholder="填写剧本创作重点和交付要求">基于《${escapeHtml(topic.name)}》完成 ${topic.episodes} 集剧本创作，保留评估确认的核心方向。</textarea></label>
      </div></form>`, '<button class="btn" type="button" data-modal-close>取消</button><button class="btn btn--primary" type="submit" form="modalForm">确认分配</button>', "modal--small");
    } else if (type === "add-project") {
      const producerReviewers = [...new Set(departmentsForRole("manager").flatMap(department => department.members))];
      html = modalTemplate("新建项目立项", `<form id="modalForm" data-modal-submit="add-project" data-project-form><div class="form-grid">
        <label class="form-field"><span class="form-label required">项目名称：</span><input class="input" name="name" maxlength="80" placeholder="请输入项目名称" required></label>
        <label class="form-field"><span class="form-label required" data-project-script-label>关联剧本：</span><select class="select" name="script" required><option value="">请选择已创建剧本</option>${scripts.map(item => `<option value="${escapeHtml(item.name)}">${escapeHtml(item.name)} · ${item.version}</option>`).join("")}</select></label>
        <label class="form-field"><span class="form-label required">题材：</span><input class="input" name="genre" data-script-genre readonly placeholder="关联剧本后自动带入"></label>
        <label class="form-field"><span class="form-label required">集数：</span><input class="input" name="episodes" data-script-episodes type="number" readonly placeholder="关联剧本后自动带入"></label>
        <label class="form-field"><span class="form-label required">算力预算：</span><input class="input" name="budget" type="number" min="0" placeholder="请输入算力预算" required></label>
        <label class="form-field"><span class="form-label">每集预算：</span><input class="input" value="-" readonly></label>
        <label class="form-field"><span class="form-label">制片负责人：</span><input class="input" name="owner" value="${escapeHtml(currentAccount)}" readonly></label>
        <label class="form-field"><span class="form-label required">预计开始时间：</span><input class="date-input" name="start" type="date" required></label>
        <div class="form-field form-field--full"><div class="script-link-preview" data-script-preview><span class="script-link-preview__icon">${icon("book")}</span><div><strong>关联剧本后自动建立内容关系</strong><p>编剧人员、剧本版本与内容摘要将在这里展示，立项时不再重复分配编剧。</p></div></div></div>
        <fieldset class="form-field form-field--full project-production-mode"><legend class="form-label required">制作方式：</legend><div class="task-radio-group">
          <label class="task-radio"><input type="radio" name="productionMode" value="internal" checked required><span><strong>内部制作</strong><small>由内部制作、剪辑部门和制片负责人完成任务分配</small></span></label>
          <label class="task-radio"><input type="radio" name="productionMode" value="partner" required><span><strong>承制方制作</strong><small>由指定承制方公司执行，并由制片审核人负责验收</small></span></label>
        </div></fieldset>
        <div class="form-field form-field--full partner-production-fields" data-partner-production-fields hidden>
          <label class="form-field"><span class="form-label required">承制方公司：</span><select class="select" name="partnerCompany" data-partner-required disabled><option value="">请选择承制方公司</option><option>漫境数字科技</option><option>星云动画制作</option><option>光盒影业</option></select></label>
          <label class="form-field"><span class="form-label required">制片审核人：</span><select class="select" name="producerReviewer" data-partner-required disabled><option value="">请选择制片审核人</option>${producerReviewers.map(name => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join("")}</select></label>
          <div class="form-field form-field--full"><span class="form-label">单独上传剧本文件（可选）：</span><div class="upload-box"><button class="btn btn--primary" type="button" data-action="choose-file" data-demo-file="承制方剧本文件.docx">选择文件</button><span class="upload-box__hint" data-file-hint>支持 DOC、DOCX、PDF 文件；可与关联剧本同时为空</span><input class="sr-only" name="scriptFile" data-upload-value value="" disabled></div></div>
          <p class="partner-production-fields__note">关联已有剧本与上传文件均为可选项；承制方提交制作成果后，将流转给所选制片审核人审核。</p>
        </div>
      </div><div data-internal-allocation><div class="allocation-section-heading"><div><h3 class="section-heading">项目任务分配</h3><p class="section-description">制作、剪辑任务分配到执行部门；制片任务必须指定具体负责人。</p></div><span>部门任务 + 制片负责人</span></div><div class="allocation-stack">${roleCards()}</div></div></form>`, '<button class="btn" type="button" data-modal-close>取消</button><button class="btn btn--primary" type="submit" form="modalForm">确认立项</button>', "modal--large");
    } else if (type === "add-script") {
      html = modalTemplate("自主创建剧本", `<form id="modalForm" data-modal-submit="add-script"><div class="form-grid">
        <label class="form-field"><span class="form-label required">剧本名称</span><input class="input" name="name" maxlength="80" placeholder="请输入剧本名称" required></label>
        <label class="form-field"><span class="form-label required">题材</span><select class="select" name="genre" required><option value="">请选择题材</option><option>玄幻</option><option>热血</option><option>都市</option><option>穿越</option></select></label>
        <label class="form-field"><span class="form-label required">负责编剧</span><select class="select" name="writer" required><option value="">请选择编剧</option><option>bianju1</option><option>大牛</option><option>陈颖鹏</option></select></label>
        <label class="form-field"><span class="form-label required">剧本集数</span><input class="input" name="episodes" type="number" min="1" value="1" required></label>
        <label class="form-field form-field--full"><span class="form-label">创作内容</span><textarea class="textarea" name="content" placeholder="可直接填写故事梗概、分集大纲或创作说明"></textarea></label>
        <div class="form-field form-field--full"><span class="form-label">剧本文件</span><div class="upload-box"><button class="btn btn--primary" type="button" data-action="choose-file">上传剧本</button><span class="upload-box__hint" data-file-hint>支持 DOC、DOCX、PDF 文件，单次上传一个版本</span></div></div>
      </div></form>`, '<button class="btn" type="button" data-modal-close>取消</button><button class="btn btn--primary" type="submit" form="modalForm">确认新增</button>', "modal--small");
    } else if (type === "script-rating") {
      const context = state.scriptRatingContext;
      const item = context?.type === "task"
        ? scriptTasks.find(entry => entry.id === Number(context.id))
        : scripts.find(entry => entry.name === context?.name);
      if (!item) return;
      html = modalTemplate("剧本评分", `<form id="modalForm" data-modal-submit="script-rating"><div class="rating-summary"><span class="rating-summary__icon">★</span><div><strong>《${escapeHtml(item.name)}》</strong><p>请结合故事完成度、节奏与可制作性给出综合评分。</p></div></div><div class="rating-input-wrap"><label for="scriptRating">综合评分</label><div><input id="scriptRating" class="input" name="rating" type="number" min="0" max="10" step="0.1" value="${item.rating || ""}" placeholder="0.0" required><span>/ 10</span></div><small>支持 0.1 分精度，保存后展示在剧本名右上角。</small></div><label class="form-field"><span class="form-label">评分备注</span><textarea class="textarea" name="ratingNote" maxlength="300" placeholder="填写亮点或需要改进的内容">${escapeHtml(item.ratingNote || "")}</textarea></label></form>`, '<button class="btn" type="button" data-modal-close>取消</button><button class="btn btn--primary" type="submit" form="modalForm">保存评分</button>', "modal--small");
    } else if (type === "writer-assignment") {
      html = modalTemplate("编剧人员安排", `<form id="modalForm" data-modal-submit="writer-assignment"><div class="assignment-note"><span>${icon("book")}</span><div><strong>由编剧部门负责人统一安排</strong><p>安排完成后，编剧可在剧本库创建内容；后续立项将直接继承该编剧关系。</p></div></div><div class="form-grid">
        <label class="form-field"><span class="form-label required">编剧人员</span><select class="select" name="writer" required><option>bianju1</option><option>大牛</option><option>陈颖鹏</option></select></label>
        <label class="form-field"><span class="form-label required">创作方向</span><select class="select" name="direction" required><option>新剧本创作</option><option>已有剧本改编</option><option>剧本修订</option></select></label>
        <label class="form-field form-field--full"><span class="form-label">安排说明</span><textarea class="textarea" name="note" placeholder="填写题材方向或创作要求"></textarea></label>
      </div></form>`, '<button class="btn" type="button" data-modal-close>取消</button><button class="btn btn--primary" type="submit" form="modalForm">确认安排</button>', "modal--small");
    } else if (type === "frame-config") {
      html = modalTemplate("提帧配置", `<form id="modalForm" data-modal-submit="frame-config"><div class="form-grid">
        <label class="form-field"><span class="form-label">比例：</span><select class="select" name="ratio"><option>2560（宽屏）</option><option>1920（横屏）</option><option>1080（竖屏）</option></select></label>
        <label class="form-field"><span class="form-label">帧率：</span><select class="select" name="fps"><option>30</option><option>25</option><option>24</option></select></label>
        <div class="form-field form-field--full"><button class="link-btn" type="button" data-action="frame-help">查看提帧配置建议</button></div>
      </div></form>`, '<button class="btn" type="button" data-modal-close>取消</button><button class="btn btn--primary" type="submit" form="modalForm">确定</button>', "modal--small");
    } else if (type === "info") {
      html = modalTemplate("详情", '<div style="padding:16px 4px;color:#68717c;line-height:1.9">此交互已按参考系统保留。当前复刻为纯前端演示，不会向原系统提交或修改任何数据。</div>', '<button class="btn btn--primary" type="button" data-modal-close>知道了</button>', "modal--small");
    } else if (type === "delete") {
      html = modalTemplate("提示", '<div style="padding:18px 4px;color:#4f5863">确认删除当前条目吗？该操作只影响本地演示数据。</div>', '<button class="btn" type="button" data-modal-close>取消</button><button class="btn btn--primary" type="button" data-confirm-delete>确认</button>', "modal--small");
    }
    modalLayer.innerHTML = html;
    const firstInput = modalLayer.querySelector("input:not([readonly]), select, textarea");
    window.setTimeout(() => firstInput?.focus(), 80);
  }

  function openIpDetail(id) {
    return openIpVersionHistory(id);
  }

  function renderIpVersionDetail(item, index) {
    const version = item.versions?.[index];
    if (!version) return '<div class="table-empty">暂无版本记录</div>';
    return `<div class="ip-version-detail__head"><span>${escapeHtml(version.version)}</span><strong>${escapeHtml(version.file)}</strong></div><dl><div><dt>上传时间</dt><dd>${escapeHtml(version.uploadedAt)}</dd></div><div><dt>上传人</dt><dd>${escapeHtml(version.uploader)}</dd></div><div><dt>版本说明</dt><dd>${escapeHtml(version.note || "未填写")}</dd></div></dl><button class="btn btn--primary" type="button" data-action="view-ip-file" data-version-index="${index}">查看原文件</button>`;
  }

  function openIpVersionHistory(id) {
    const item = ipWorks.find(ip => ip.id === Number(id));
    if (!item) return;
    const selectedIndex = Math.max(0, (item.versions?.length || 1) - 1);
    state.ipContext = { id: item.id, versionIndex: selectedIndex };
    const currentVersion = item.versions?.[selectedIndex] || { version: "V1", file: item.file, uploadedAt: item.updated, uploader: item.owner };
    const versionRows = [...(item.versions || [])].map((version, index) => ({ version, index })).reverse().map(({ version, index }) => `<button class="ip-version-record ${index === selectedIndex ? "is-active" : ""}" type="button" data-action="select-ip-version" data-version-index="${index}"><span>${escapeHtml(version.version)}</span><div><strong>${escapeHtml(version.file)}</strong><small>${escapeHtml(version.uploadedAt)} · ${escapeHtml(version.uploader)}</small></div></button>`).join("");
    modalLayer.innerHTML = modalTemplate("IP 详情与历史记录", `<div class="ip-history-heading"><div><span>当前 IP</span><strong>${escapeHtml(item.name)}</strong></div><em>${item.versions?.length || 0} 个版本</em></div><section class="ip-history-overview"><div class="script-task-brief"><div><span>IP 名称</span><strong>${escapeHtml(item.name)}</strong></div><div><span>题材方向</span><strong>${escapeHtml(item.genre)}</strong></div><div><span>版权 / 来源</span><strong>${escapeHtml(item.owner)}</strong></div><div><span>分配人员</span><strong>${escapeHtml(item.assignee)}</strong></div></div><section class="ip-detail-summary"><span>IP 简介</span><p>${escapeHtml(item.summary || "暂未填写 IP 简介。").replaceAll("\n", "<br>")}</p></section><section class="ip-current-file"><span class="document-preview__icon">${icon("book")}</span><div><strong>${escapeHtml(currentVersion.file)}</strong><small>当前版本 ${escapeHtml(currentVersion.version)} · ${escapeHtml(currentVersion.uploadedAt)} · ${escapeHtml(currentVersion.uploader)}</small></div><button class="btn" type="button" data-action="view-ip-file" data-version-index="${selectedIndex}">查看原文件</button></section></section><div class="ip-history-section-title"><div><strong>版本历史</strong><small>选择左侧记录切换查看版本信息</small></div><span>${item.versions?.length || 0} 条记录</span></div><div class="ip-version-history"><nav>${versionRows || '<div class="table-empty">暂无版本记录</div>'}</nav><article class="ip-version-detail" data-ip-version-detail>${renderIpVersionDetail(item, selectedIndex)}</article></div>`, '<button class="btn btn--primary" type="button" data-modal-close>关闭</button>', "modal--large");
  }

  function openIpOriginalFile(item, versionIndex) {
    const version = item?.versions?.[versionIndex] || item?.versions?.at(-1);
    if (!item || !version) return;
    const content = escapeHtml(version.content || item.content || "该版本暂未提取到可查看的文件正文。").replaceAll("\n", "<br>");
    modalLayer.innerHTML = modalTemplate("原文件查看", `<section class="document-preview"><header class="document-preview__head"><span class="document-preview__icon">${icon("book")}</span><div><strong>${escapeHtml(version.file)}</strong><small>${escapeHtml(version.version)} · ${escapeHtml(version.uploadedAt)} · 原文件只读</small></div></header><div class="document-preview__paper"><span class="document-preview__label">原文件内容</span><h3>${escapeHtml(item.name)}</h3><p>${content}</p></div></section>`, '<button class="btn btn--primary" type="button" data-modal-close>关闭</button>', "modal--large");
  }

  function openScriptTaskDetail(id, submission = false) {
    const task = scriptTasks.find(item => item.id === Number(id));
    if (!task) return;
    const submissionBlock = submission
      ? `<div class="task-submission"><span>已提交剧本</span><p>${escapeHtml(task.submission || "剧本成果文件已提交")}</p><small>已在剧本列表生成可继续更新的版本，IP 库保留当前人员分配状态。</small></div>`
      : "";
    modalLayer.innerHTML = modalTemplate(submission ? "剧本提交信息" : "剧本创作任务", `<div class="script-task-brief"><div><span>${task.sourceTopic ? "来源选题" : "来源 IP"}</span><strong>${escapeHtml(task.sourceTopic || task.ipName)}</strong></div><div><span>任务名称</span><strong>${escapeHtml(task.name)}</strong></div><div><span>负责编剧</span><strong>${escapeHtml(task.assignee)}</strong></div><div><span>截止时间</span><strong>${escapeHtml(task.due)}</strong></div><div><span>任务状态</span>${status(task.status)}</div><div><span>下发时间</span><strong>${escapeHtml(task.createdAt)}</strong></div><p>${escapeHtml(task.requirement)}</p></div>${submissionBlock}`, '<button class="btn btn--primary" type="button" data-modal-close>关闭</button>', "modal--small");
  }

  function openScriptLibraryDetail(recordType, identifier) {
    const task = recordType === "script-task"
      ? scriptTasks.find(item => item.id === Number(identifier))
      : scriptTasks.find(item => item.id === scripts.find(script => script.name === identifier)?.sourceTaskId);
    const script = recordType === "script"
      ? scripts.find(item => item.name === identifier)
      : scripts.find(item => item.sourceTaskId === task?.id);
    const item = task || script;
    if (!item) return;

    const source = task?.sourceTopic
      ? topics.find(topic => topic.id === task.topicId)
      : task ? ipWorks.find(ip => ip.id === task.ipId) : null;
    const name = source?.name || task?.sourceTopic || task?.ipName || script?.name || task?.name;
    const genre = source?.genre || task?.genre || script?.genre || "--";
    const copyrightSource = source?.owner || "--";
    const summary = source?.summary || "--";
    const episodes = Number(source?.episodes || script?.episodes || (task ? taskEpisodeCount(task) : 0) || 0);
    const content = source?.content || script?.content || "--";
    const scriptFile = script
      ? `${script.name}-${script.version}.docx`
      : source?.file || task?.submission || "--";
    state.scriptFilePreview = { name, file: scriptFile, content };
    const detailContent = `<div class="script-main-info-grid"><div><span>名称</span><strong>${escapeHtml(name)}</strong></div><div><span>题材</span><strong>${escapeHtml(genre)}</strong></div><div><span>版权来源</span><strong>${escapeHtml(copyrightSource)}</strong></div><div><span>预计集数</span><strong>${episodes > 0 ? `${episodes} 集` : "--"}</strong></div></div><section class="script-main-content"><span>简介</span><p>${escapeHtml(summary).replaceAll("\n", "<br>")}</p></section><section class="script-main-file"><span>${icon("book")}</span><div><small>剧本</small><strong>${escapeHtml(scriptFile)}</strong></div><button class="btn script-main-file__view" type="button" data-action="view-script-file">查看</button></section><section class="script-main-content script-main-content--last"><span>内容</span><p>${escapeHtml(content).replaceAll("\n", "<br>")}</p></section>`;

    modalLayer.innerHTML = modalTemplate("详情", `<div class="script-main-detail">${detailContent}</div>`, '<button class="btn btn--primary" type="button" data-modal-close>关闭</button>', "modal--small");
  }

  function openScriptFilePreview() {
    const preview = state.scriptFilePreview;
    if (!preview) return;
    const content = escapeHtml(preview.content || "该剧本暂未提取到可查看的正文内容。").replaceAll("\n", "<br>");
    modalLayer.innerHTML = modalTemplate("剧本查看", `<section class="document-preview"><header class="document-preview__head"><span class="document-preview__icon">${icon("book")}</span><div><strong>${escapeHtml(preview.file)}</strong><small>剧本文件 · 只读预览</small></div></header><div class="document-preview__paper"><span class="document-preview__label">剧本内容</span><h3>${escapeHtml(preview.name)}</h3><p>${content}</p></div></section>`, '<button class="btn btn--primary" type="button" data-modal-close>关闭</button>', "modal--large");
  }

  function openRelatedProjects(scriptName) {
    const script = scripts.find(item => item.name === scriptName);
    if (!script) return;
    const summary = linkedProjectSummary(script);
    const rows = summary.details.map((project, index) => `<li class="related-project-list__item">
      <div class="related-project-list__identity"><span class="related-project-list__index">${index + 1}</span><div>
        <strong title="${escapeHtml(project.name)}">${escapeHtml(project.name)}</strong>
        <small>${project.completedAt === "--" ? "项目状态独立更新" : `完结时间 ${escapeHtml(project.completedAt)}`}</small>
      </div></div>${status(project.status)}
    </li>`).join("");
    modalLayer.innerHTML = modalTemplate(`关联项目（${summary.details.length}）`, `<div class="related-project-summary">
      <span>关联剧本</span><strong>《${escapeHtml(script.name)}》</strong><p>每个项目独立展示当前状态，不影响剧本自身的“${escapeHtml(script.status)}”状态。</p>
    </div><ul class="related-project-list">${rows}</ul>`, '<button class="btn btn--primary" type="button" data-modal-close>关闭</button>', "modal--small");
    window.setTimeout(() => modalLayer.querySelector("[data-modal-close]")?.focus(), 80);
  }

  function openMemberAssignment(id, role) {
    const item = workflowProjects.find(project => project.id === Number(id));
    if (!item) return;
    state.workflowContext = { id: item.id, role };
    const isProduction = role === "production";
    const assignment = getAssignmentInfo(item, role);
    const department = projectDepartment(item, role);
    const planKey = isProduction ? "productionPlans" : "editingPlans";
    const plans = item[planKey]?.length ? item[planKey] : assignmentsToPlans(assignment.assignments);
    modalLayer.innerHTML = modalTemplate(`${isProduction ? "制作" : "剪辑"}人员按集安排`, `<form id="modalForm" data-modal-submit="assign-member">
      <div class="assignment-note"><span>${icon(isProduction ? "image" : "clapper")}</span><div><strong>${escapeHtml(item.name)} · 共 ${item.episodes} 集</strong><p>负责部门：${escapeHtml(department.label)}。人员下拉仅展示该部门成员。</p></div><b data-assignment-count>${assignment.assigned}/${assignment.total} 集已分配</b></div>
      <div class="allocation-stack allocation-stack--single">${allocationCard(role, plans, department.members)}</div>
      <p class="allocation-help">负责集数支持填写单集、连续范围或组合范围，例如：3、1-5、1-3，6-8。</p>
    </form>`, '<button class="btn" type="button" data-modal-close>取消</button><button class="btn btn--primary" type="submit" form="modalForm">保存分配</button>', "modal--large");
  }

  function openDeadlineDialog(id, role) {
    const item = workflowProjects.find(project => project.id === Number(id));
    if (!item) return;
    const isProduction = role === "production";
    const records = deadlineRecords(item, role);
    const rows = records.map(record => `<tr class="${record.member === currentAccount ? "is-current-user" : ""}"><td><strong>${escapeHtml(record.member)}</strong></td><td>${escapeHtml(record.range)}</td><td>${record.duration}天</td><td><strong>${escapeHtml(record.date || "待流转后生成")}</strong></td></tr>`);
    modalLayer.innerHTML = modalTemplate(`${isProduction ? "制作" : "剪辑"}截止时间`, `<div class="deadline-dialog-summary"><div><span>项目</span><strong>${escapeHtml(item.name)}</strong></div><div><span>节点起算时间</span><strong>${escapeHtml(item[roleStartedAtKey(role)] || "尚未流转")}</strong></div></div>${table([
      { label: "人员", width: "180px" }, { label: "负责计划集数", width: "220px" }, { label: "工期", width: "120px" }, { label: "截止日期", width: "170px" }
    ], rows, 690)}`, '<button class="btn btn--primary" type="button" data-modal-close>关闭</button>', "modal--large");
  }

  function openLinkedScript(id) {
    const item = workflowProjects.find(project => project.id === Number(id));
    if (!item) return;
    modalLayer.innerHTML = modalTemplate("关联剧本", `<div class="linked-script-detail"><div class="linked-script-detail__cover">${icon("book")}</div><div><span>剧本名称</span><h3>${escapeHtml(item.script)}</h3><p>版本 ${item.scriptVersion} · 编剧 ${escapeHtml(item.writer)} · ${item.episodes} 集</p></div></div><div class="task-submission"><span>内容关系</span><p>该剧本在立项时已与项目自动关联。制作人员可据此开展分镜制作，编剧关系保持只读。</p></div>`, '<button class="btn btn--primary" type="button" data-modal-close>关闭</button>', "modal--small");
  }

  function openWorkflowAssets(id) {
    const item = workflowProjects.find(project => project.id === Number(id));
    if (!item) return;
    modalLayer.innerHTML = modalTemplate("资产设定", `<div class="production-summary"><div><span>项目名</span><strong>${escapeHtml(item.name)}</strong></div><div><span>类型</span><strong>${escapeHtml(item.genre)}</strong></div><div><span>总集数</span><strong>${item.episodes} 集</strong></div></div><div class="task-submission"><span>当前资产设定</span><p>人物、场景和道具资产已关联剧本《${escapeHtml(item.script)}》${item.scriptVersion}，制作过程中可继续补充和更新。</p></div>`, '<button class="btn btn--primary" type="button" data-modal-close>关闭</button>', "modal--small");
  }

  function openWorkflowDetail(id, role = "production") {
    const item = workflowProjects.find(project => project.id === Number(id));
    if (!item) return;
    const assignment = getAssignmentInfo(item, role);
    const roleLabel = role === "editing" ? "剪辑" : "制作";
    const latestSubmission = role === "editing" ? deliveries.find(delivery => delivery.name === item.name)?.submittedAt || "--" : latestStoryboardSubmission(item);
    const progress = roleProgress(item, role);
    modalLayer.innerHTML = modalTemplate("项目详情", `<div class="production-summary"><div><span>项目名</span><strong>${escapeHtml(item.name)}</strong></div><div><span>当前状态</span>${roleStatusCell(item, role)}</div><div><span>类型</span><strong>${escapeHtml(item.genre)}</strong></div></div><div class="task-submission"><span>任务信息</span><p>关联剧本：${escapeHtml(item.script)} ${escapeHtml(item.scriptVersion)} · ${roleLabel}已分配 ${assignment.assigned} / ${assignment.total} 集 · 已完成 ${progress.completed} / ${progress.total} 集 · 最新提交 ${escapeHtml(latestSubmission)}</p></div>`, '<button class="btn btn--primary" type="button" data-modal-close>关闭</button>', "modal--small");
  }

  function openProductionDetail(id) {
    const item = workflowProjects.find(project => project.id === Number(id));
    if (!item) return;
    state.workflowContext = { id: item.id, role: "production" };
    const assignments = getEpisodeAssignments(item, "production");
    const visibleEpisodes = scopedEpisodes(item, "production");
    const rows = visibleEpisodes.map(episode => {
      const board = item.storyboards.find(entry => Number(entry.episode || entry.id) === episode);
      const completedAt = item.productionCompletedAt?.[episode];
      const draftAt = item.productionDrafts?.[episode];
      return `<div class="storyboard-row storyboard-row--episode" data-board-id="${board?.id || String(episode).padStart(2, "0")}" data-plan-episode="${episode}"><span class="storyboard-row__id">${String(episode).padStart(2, "0")}</span><div><strong>第${episode}集制作成果</strong><small>${escapeHtml(board?.file || `第${episode}集-制作成果.zip`)}</small></div><span>${escapeHtml(assignments[episode - 1] || "--")}</span><span>${completedAt ? status("已完成") : draftAt ? status("草稿") : status("制作中")}</span><span>${escapeHtml(completedAt || draftAt || "--")}</span><div class="episode-submit-actions"><button class="btn" type="button" data-action="save-production-draft">保存草稿</button><button class="btn btn--primary" type="button" data-action="submit-production-episode">${completedAt ? "重新提交" : "正式提交"}</button></div></div>`;
    }).join("");
    const progress = roleProgress(item, "production");
    modalLayer.innerHTML = modalTemplate("制作成果提交", `<div class="production-summary"><div><span>项目</span><strong>${escapeHtml(item.name)}</strong></div><div><span>负责计划集</span><strong>${formatEpisodeRange(visibleEpisodes)}</strong></div><div><span>完成进度</span><strong>${progress.completed}/${progress.total}集</strong></div></div><div class="storyboard-list"><div class="storyboard-list__head storyboard-list__head--episode"><span>计划集</span><span>成果文件</span><span>人员</span><span>状态</span><span>首次完成时间</span><span>操作</span></div>${rows || '<div class="empty-panel">当前账号暂无负责的计划集。</div>'}</div><p class="production-submit-help">保存草稿不会计入完成；首次正式提交成功后，该计划集立即完成，后续替换不会修改首次完成时间。</p>`, '<button class="btn btn--primary" type="button" data-modal-close>关闭</button>', "modal--large");
  }

  function openMaterials(id) {
    const item = workflowProjects.find(project => project.id === Number(id));
    if (!item) return;
    state.workflowContext = { id: item.id, role: "editing" };
    const visibleEpisodes = scopedEpisodes(item, "editing");
    const visibleBoards = item.storyboards.filter(board => visibleEpisodes.includes(Number(board.episode || board.id)) && item.productionCompletedAt?.[Number(board.episode || board.id)]);
    const rows = visibleBoards.map(board => `<div class="material-row" data-board-id="${board.id}"><span class="storyboard-row__id">${board.id}</span><div><strong>${escapeHtml(board.title)}</strong><small>${escapeHtml(board.file)}</small></div><span class="version-chip">V${board.version}</span><span>${board.updated && !board.downloaded ? '<span class="update-badge"><i></i>已更新</span>' : '<span class="muted-text">无更新</span>'}</span><button class="btn" type="button" data-action="download-board">${board.downloaded ? "重新下载" : "下载"}</button></div>`).join("");
    modalLayer.innerHTML = modalTemplate("下载制作素材", `<div class="assignment-note assignment-note--blue"><span>${icon("clapper")}</span><div><strong>${escapeHtml(item.name)} · 负责 ${formatEpisodeRange(visibleEpisodes)}</strong><p>这里只显示当前账号负责计划集对应的已正式提交制作素材。</p></div></div><div class="material-list">${rows || '<div class="empty-panel">负责范围内暂无已提交的制作素材。</div>'}</div>`, '<button class="btn" type="button" data-modal-close>关闭</button><button class="btn btn--primary" type="button" data-action="download-all" data-visible-episodes="${visibleEpisodes.join(",")}" ${visibleBoards.length ? "" : "disabled"}>全部下载</button>', "modal--large");
  }

  function openDeliveryUpload(name) {
    const item = deliveries.find(delivery => delivery.name === name);
    if (!item) return;
    state.deliveryContext = { name: item.name };
    const note = item.status === "已驳回" ? item.auditNote : item.status === "需要修改" ? item.operationNote : "";
    const noteBlock = note ? `<div class="delivery-feedback ${item.status === "需要修改" ? "is-operation" : ""}"><strong>${item.status === "需要修改" ? "运营修改意见" : "制片审核意见"}</strong><p>${escapeHtml(note)}</p></div>` : "";
    const project = workflowProjects.find(projectItem => projectItem.name === item.name);
    const progress = project ? roleProgress(project, "editing") : { completed: 0, total: projects.find(entry => entry.name === item.name)?.episodes || item.total || 0 };
    const availableEpisodes = project ? scopedEpisodes(project, "editing").filter(episode => !project.editingCompletedAt?.[episode]) : [];
    const isRevision = item.status === "需要修改";
    const defaultType = availableEpisodes.length ? "complete" : "supplement";
    modalLayer.innerHTML = modalTemplate(item.status === "未提交" ? "批量上传资源" : "补充或重新上传资源", `<form id="modalForm" data-modal-submit="delivery-upload" data-available-episodes="${availableEpisodes.join(",")}">${noteBlock}<div class="production-summary"><div><span>项目名称</span><strong>${escapeHtml(item.name)}</strong></div><div><span>计划完成进度</span><strong>${progress.completed}/${progress.total}集</strong></div><div><span>实际交付目录</span><strong>${item.total || 0}个</strong></div></div><div class="form-grid">
      <fieldset class="form-field form-field--full upload-type-field"><legend class="form-label required">本批上传类型</legend><div class="task-radio-group"><label class="task-radio"><input type="radio" name="batchType" value="complete" ${defaultType === "complete" ? "checked" : ""} ${availableEpisodes.length ? "" : "disabled"}><span><strong>完成新的计划集数</strong><small>上传成功后所选计划集立即完成</small></span></label><label class="task-radio"><input type="radio" name="batchType" value="supplement" ${defaultType === "supplement" ? "checked" : ""}><span><strong>仅补充或替换资源</strong><small>不改变计划任务完成数量和首次完成时间</small></span></label></div></fieldset>
      <label class="form-field form-field--full" data-completion-range><span class="form-label required">本批完成的计划集数</span><input class="input" name="completedRange" placeholder="例如 1-3、6-10" ${defaultType === "complete" ? "required" : "disabled"}><small class="field-help">可选范围：${availableEpisodes.length ? formatEpisodeRange(availableEpisodes) : "暂无未完成计划集"}</small></label>
      <label class="form-field form-field--full"><span class="form-label required">上传文件</span><input class="input file-input" type="file" name="file" accept="video/*,audio/*,image/*,.zip,.rar" multiple required><small class="field-help" data-upload-file-summary>支持批量选择；选择后自动识别实际交付目录</small></label>
      <label class="form-field"><span class="form-label required">视频配速（倍速）</span><input class="input" type="number" name="pacing" min="0.5" max="3" step="0.05" value="${Number.parseFloat(item.pacing) || 1}" placeholder="例如 1.25" required></label>
      <label class="form-field form-field--full"><span class="form-label">上传说明</span><textarea class="textarea" name="note" placeholder="填写版本变化和本次修改内容"></textarea></label>
      <div class="delivery-directory-note form-field--full"><span>${icon("folder")}</span><p>实际交付目录将根据文件内容自动生成，无需与计划集数保持一致。</p></div>
    </div></form>`, `<button class="btn" type="button" data-modal-close>取消</button><button class="btn btn--primary" type="submit" form="modalForm">${isRevision ? "确认提交" : "确认上传"}</button>`, "modal--large");
  }

  function openDeliveryAudit(name) {
    const item = deliveries.find(delivery => delivery.name === name);
    if (!item) return;
    state.deliveryContext = { name: item.name };
    modalLayer.innerHTML = modalTemplate("审核交付内容", `<form id="modalForm" data-modal-submit="delivery-audit"><div class="delivery-file-card"><span class="delivery-file-card__icon">▶</span><div><strong>${escapeHtml(item.fileName || `${item.name}-完整成片.mp4`)}</strong><small>完整成片 · V${item.version} · ${item.duration} · 配速 ${escapeHtml(item.pacing)}</small></div><button class="btn" type="button" data-action="preview-film">预览</button></div><div class="task-radio-group"><label class="task-radio is-pass"><input type="radio" name="decision" value="approve" checked><span><strong>审核通过</strong><small>进入作品库或覆盖原作品</small></span></label><label class="task-radio is-reject"><input type="radio" name="decision" value="reject"><span><strong>驳回剪辑</strong><small>任务仅退回剪辑重新提交</small></span></label></div><label class="form-field"><span class="form-label">审核意见</span><textarea class="textarea" name="note" placeholder="驳回时请填写明确的修改意见"></textarea></label></form>`, '<button class="btn" type="button" data-modal-close>取消</button><button class="btn btn--primary" type="submit" form="modalForm">确认审核</button>', "modal--small");
  }

  function openDeliveryHistory(name) {
    const item = deliveries.find(delivery => delivery.name === name);
    if (!item) return;
    const historyEntries = [
      ["项目建立", item.date, `负责人 ${item.owner}`],
      [item.fileName ? "剪辑上传" : "等待上传", item.submittedAt, item.fileName || "尚未上传完整成片"]
    ];
    if (item.deliveryConfirmedAt) historyEntries.push(["制片确认交付", item.deliveryConfirmedAt, `${item.deliveryNote} · 已绑定 ${item.roleIpBindings?.length || 0} 个角色 IP`]);
    historyEntries.push(["当前状态", item.deliveryConfirmedAt || item.submittedAt, `状态：${item.status} · 视频配速：${item.pacing}`]);
    const rows = historyEntries.map((entry, index) => `<div class="flow-step ${index === historyEntries.length - 1 ? "is-active" : "is-completed"}"><span class="flow-step__index">${index + 1}</span><div><strong>${escapeHtml(entry[0])}</strong><small>${escapeHtml(entry[1])}</small><p>${escapeHtml(entry[2])}</p></div></div>`).join("");
    modalLayer.innerHTML = modalTemplate("交付历史记录", `<div class="assignment-note assignment-note--blue"><span>${icon("delivery")}</span><div><strong>${escapeHtml(item.name)}</strong><p>完整保留上传、审核和交付状态。</p></div></div><div class="task-flow">${rows}</div>`, '<button class="btn btn--primary" type="button" data-modal-close>关闭</button>', "modal--small");
  }

  function openDeliveryChange(name) {
    const item = deliveries.find(delivery => delivery.name === name);
    if (!item) return;
    state.deliveryContext = { name: item.name };
    modalLayer.innerHTML = modalTemplate("填写修改意见", `<form id="modalForm" data-modal-submit="delivery-change"><div class="assignment-note assignment-note--warning"><span>!</span><div><strong>${escapeHtml(item.name)} · V${item.version}</strong><p>提交后项目状态更新为“需要修改”，剪辑可查看意见并重新上传。</p></div></div><label class="form-field"><span class="form-label required">修改意见</span><textarea class="textarea" name="note" required placeholder="请填写需要调整的画面、节奏或时间点"></textarea></label></form>`, '<button class="btn" type="button" data-modal-close>取消</button><button class="btn btn--primary" type="submit" form="modalForm">提交修改意见</button>', "modal--small");
  }

  function openDeliveryConfirm(name) {
    const item = deliveries.find(delivery => delivery.name === name);
    if (!item) return;
    state.deliveryContext = { name: item.name };
    const bindings = getCharacterIpBindings(item);
    const bindingRows = bindings.map((binding, index) => {
      const isBound = Boolean(binding.confirmed);
      const currentIp = characterIpCatalog.find(ip => ip.id === binding.ipId);
      const ipOptions = characterIpCatalog.map(ip => `<option value="${escapeHtml(ip.id)}" ${ip.id === binding.ipId ? "selected" : ""}>${escapeHtml(ip.name)} · ${escapeHtml(ip.id)}</option>`).join("");
      return `<article class="ip-character-card ${isBound ? "is-bound" : ""}" data-ip-binding-card data-binding-index="${index}">
        <label class="ip-character-card__check"><input type="checkbox" data-ip-card-select checked><span>选择</span></label>
        <div class="ip-character-card__visual"><img src="${characterPortraitFor(binding)}" alt="${escapeHtml(binding.roleName)}角色形象"><span>${escapeHtml(binding.roleType)}</span></div>
        <div class="ip-character-card__body"><div class="ip-character-card__title"><div><strong>${escapeHtml(binding.roleName)}</strong><small>${escapeHtml(binding.roleType)}</small></div><span class="ip-binding-status ${isBound ? "" : "is-unbound"}" data-ip-binding-status>${isBound ? "已绑定" : "待绑定"}</span></div>
        <label class="ip-character-card__mapping"><span>绑定 IP 形象</span><select name="ip_${index}" data-ip-binding-value aria-label="为${escapeHtml(binding.roleName)}选择绑定的 IP 角色"><option value="">请选择 IP 角色</option>${ipOptions}</select><small data-ip-mapping-code>${escapeHtml(currentIp ? `${currentIp.id} · ${currentIp.version}` : "尚未绑定")}</small></label></div>
      </article>`;
    }).join("");
    const boundCount = bindings.filter(binding => binding.confirmed).length;
    modalLayer.innerHTML = modalTemplate("确认项目交付", `<form id="modalForm" data-modal-submit="confirm-delivery"><section class="ip-binding-panel"><div class="ip-binding-panel__head"><div><strong>项目角色 IP 绑定</strong><p>选择项目涉及的角色后，从 IP 形象库完成批量或单个绑定。</p></div><span data-ip-binding-count>${boundCount}/${bindings.length} 已绑定</span></div><div class="ip-binding-toolbar"><label><input type="checkbox" data-ip-select-all checked><span>全选角色</span></label><span data-ip-selection-count>已选择 ${bindings.length} 个角色</span><button class="btn btn--ghost-blue" type="button" data-action="open-ip-picker">批量绑定（${bindings.length}）</button></div><div class="ip-binding-list">${bindingRows}</div></section><label class="form-field delivery-confirm-note"><span class="form-label required">确认交付备注</span><textarea class="textarea" name="note" maxlength="300" required placeholder="请填写本次交付范围、版本说明或需要运营关注的事项">${escapeHtml(item.deliveryNote || "")}</textarea><small>该备注会记录在交付历史中，便于后续追溯。</small></label></form>`, '<button class="btn" type="button" data-modal-close>取消</button><button class="btn btn--primary" type="submit" form="modalForm">确认交付并完成绑定</button>', "modal--delivery-confirm");
    window.setTimeout(() => modalLayer.querySelector("[data-ip-select-all]")?.focus({ preventScroll: true }), 80);
  }

  function openIpImagePicker(form) {
    const selectedCards = [...form.querySelectorAll("[data-ip-binding-card]")].filter(card => card.querySelector("[data-ip-card-select]")?.checked);
    if (!selectedCards.length) return showToast("请先选择需要绑定的角色");
    const targetIndices = selectedCards.map(card => card.dataset.bindingIndex);
    const currentIds = selectedCards.map(card => card.querySelector("[data-ip-binding-value]")?.value).filter(Boolean);
    const options = characterIpCatalog.map((ip, index) => {
      const selected = currentIds.includes(ip.id);
      return `<label class="ip-image-option ${selected ? "is-selected" : ""}" data-ip-image-option><input type="checkbox" value="${ip.id}" data-ip-image-checkbox ${selected ? "checked" : ""}><span class="ip-image-option__check">✓</span><img src="${ipPortraitFor(ip, index)}" alt="${escapeHtml(ip.name)} IP 形象"><span class="ip-image-option__content"><strong>${escapeHtml(ip.name)}</strong><small>${escapeHtml(ip.source)} · ${escapeHtml(ip.version)}</small><em>${escapeHtml(ip.id)}</em></span></label>`;
    }).join("");
    modalLayer.insertAdjacentHTML("beforeend", `<div class="ip-picker-layer" data-ip-picker-layer data-target-indices="${targetIndices.join(",")}" data-selection-limit="${selectedCards.length}"><section class="ip-picker-dialog" role="dialog" aria-modal="true" aria-label="选择需要绑定的 IP 形象"><header class="ip-picker-dialog__header"><div><strong>选择需要绑定的 IP 形象</strong><p>已选择 ${selectedCards.length} 个项目角色，请选择相同数量的 IP 形象。</p></div><button type="button" data-action="close-ip-picker" aria-label="关闭 IP 形象选择">×</button></header><div class="ip-picker-dialog__body"><div class="ip-picker-role-summary">${selectedCards.map(card => `<span>${escapeHtml(card.querySelector(".ip-character-card__title strong")?.textContent || "角色")}</span>`).join("")}</div><div class="ip-image-grid">${options}</div></div><footer class="ip-picker-dialog__footer"><span data-ip-image-selected-count>已选择 ${Math.min(currentIds.length, selectedCards.length)}/${selectedCards.length} 个 IP 形象</span><button class="btn" type="button" data-action="close-ip-picker">取消</button><button class="btn btn--primary" type="button" data-action="confirm-ip-picker">确认绑定</button></footer></section></div>`);
  }

  function refreshIpPickerUi(layer) {
    const limit = Number(layer.dataset.selectionLimit || 0);
    const selected = [...layer.querySelectorAll("[data-ip-image-checkbox]:checked")];
    layer.querySelectorAll("[data-ip-image-option]").forEach(option => option.classList.toggle("is-selected", option.querySelector("[data-ip-image-checkbox]")?.checked));
    const count = layer.querySelector("[data-ip-image-selected-count]");
    const submit = layer.querySelector("[data-action='confirm-ip-picker']");
    if (count) count.textContent = `已选择 ${selected.length}/${limit} 个 IP 形象`;
    if (submit) submit.disabled = selected.length !== limit;
  }

  function openChangeRequest(code) {
    const work = works.find(item => item.code === code);
    if (!work) return;
    state.workContext = { code: work.code };
    modalLayer.innerHTML = modalTemplate("提出修改意见", `<form id="modalForm" data-modal-submit="request-change"><div class="assignment-note assignment-note--warning"><span>!</span><div><strong>${escapeHtml(work.name)} · ${work.version}</strong><p>提交后作品状态变为“需要修改”，旧版本继续保留，等待剪辑重新提交覆盖。</p></div></div><label class="form-field"><span class="form-label required">运营修改意见</span><textarea class="textarea" name="note" required placeholder="请指出需要调整的时间点、画面或内容"></textarea></label></form>`, '<button class="btn" type="button" data-modal-close>取消</button><button class="btn btn--primary" type="submit" form="modalForm">提交修改意见</button>', "modal--small");
  }

  function openFilm(code) {
    const work = works.find(item => item.code === code);
    if (!work) return;
    modalLayer.innerHTML = modalTemplate("完整成片", `<div class="film-preview"><div class="film-preview__screen"><span>▶</span><small>完整成片预览</small></div><div class="film-preview__meta"><div><span>项目名称</span><strong>${escapeHtml(work.name)}</strong></div><div><span>作品版本</span><strong>${work.version}</strong></div><div><span>审核状态</span>${status(work.status)}</div></div></div>`, '<button class="btn btn--primary" type="button" data-modal-close>关闭</button>', "modal--large");
  }

  function openDeliveryView(name) {
    const item = deliveries.find(delivery => delivery.name === name);
    if (!item) return;
    const work = works.find(entry => entry.name === item.name);
    modalLayer.innerHTML = modalTemplate("查看交付内容", `<div class="film-preview"><div class="film-preview__screen"><span>▶</span><small>${item.status === "未提交" ? "暂无可预览的交付成片" : "交付成片预览"}</small></div><div class="film-preview__meta film-preview__meta--delivery"><div><span>项目名称</span><strong>${escapeHtml(item.name)}</strong></div><div><span>交付版本</span><strong>V${item.version}</strong></div><div><span>项目状态</span>${status(item.status)}</div><div><span>总时长</span><strong>${escapeHtml(item.duration)}</strong></div><div><span>视频配速</span><strong>${escapeHtml(item.pacing)}</strong></div><div><span>负责人</span><strong>${escapeHtml(item.owner)}</strong></div></div>${work ? `<div class="share-view-note"><span>作品库记录</span><strong>${escapeHtml(work.code)} · ${escapeHtml(work.version)}</strong></div>` : ""}</div>`, `<button class="btn" type="button" data-modal-close>关闭</button><button class="btn btn--primary" type="button" data-action="preview-film" ${item.status === "未提交" ? "disabled" : ""}>预览成片</button>`, "modal--large");
  }

  function shareDateTime(daysFromNow = 0) {
    const date = new Date();
    date.setMinutes(0, 0, 0);
    date.setDate(date.getDate() + daysFromNow);
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offset).toISOString().slice(0, 16);
  }

  function shareRecords(item) {
    if (!item) return [];
    if (!Array.isArray(item.shareRecords)) item.shareRecords = [];
    if (item.shareConfig?.members?.length) {
      item.shareRecords.push(...item.shareConfig.members.map((member, index) => ({
        id: Date.now() + index,
        member,
        startAt: item.shareConfig.startAt,
        endAt: item.shareConfig.endAt
      })));
      delete item.shareConfig;
    }
    return item.shareRecords;
  }

  function shareRecordState(record) {
    const now = Date.now();
    if (record.cancelledAt) return { key: "cancelled", label: "已取消", className: "is-cancelled" };
    if (new Date(record.endAt).getTime() <= now) return { key: "expired", label: "已到期", className: "is-expired" };
    if (new Date(record.startAt).getTime() > now) return { key: "pending", label: "待生效", className: "is-pending" };
    return { key: "active", label: "生效中", className: "is-active" };
  }

  function activeSharedMemberCount(item) {
    const activeMembers = shareRecords(item)
      .filter(record => !record.cancelledAt && new Date(record.endAt).getTime() > Date.now())
      .map(record => record.member);
    return new Set(activeMembers).size;
  }

  function shareRecordList(item) {
    const records = [...shareRecords(item)].reverse();
    if (!records.length) return "";
    const rows = records.map(record => {
      const recordState = shareRecordState(record);
      const canCancel = recordState.key === "active" || recordState.key === "pending";
      return `<div class="share-record" data-share-record-id="${record.id}" data-share-record-member="${escapeHtml(record.member.toLowerCase())}" data-share-record-state="${recordState.key}"><span class="share-record__avatar">${escapeHtml(record.member.slice(0, 1))}</span><div class="share-record__info"><strong>${escapeHtml(record.member)}</strong><small>${escapeHtml(String(record.startAt).replace("T", " "))} 至 ${escapeHtml(String(record.endAt).replace("T", " "))}</small></div><span class="share-record__status ${recordState.className}">${recordState.label}</span><button class="share-record__cancel" type="button" data-action="cancel-share" data-share-record-id="${record.id}" ${canCancel ? "" : "disabled"}>${recordState.key === "cancelled" ? "已取消" : recordState.key === "expired" ? "已结束" : "取消分享"}</button></div>`;
    }).join("");
    return `<section class="share-existing" data-share-existing><div class="share-existing__head"><div><strong>已有共享记录</strong><small>新增共享不会影响之前仍在生效的人员</small></div><span data-share-active-count>${activeSharedMemberCount(item)} 人生效中</span></div><div class="share-record-toolbar"><input class="input" type="search" data-share-record-search placeholder="搜索已分享人员"><select class="select" data-share-record-filter aria-label="共享记录状态"><option value="all">全部状态</option><option value="active">生效中</option><option value="pending">待生效</option><option value="expired">已到期</option><option value="cancelled">已取消</option></select><span data-share-record-result>共 ${records.length} 条</span></div><div class="share-record-list">${rows}<div class="share-record-empty" data-share-record-empty hidden>没有符合条件的分享记录</div></div></section>`;
  }

  function refreshShareRecordFilter(section) {
    if (!section) return;
    const keyword = String(section.querySelector("[data-share-record-search]")?.value || "").trim().toLowerCase();
    const recordState = section.querySelector("[data-share-record-filter]")?.value || "all";
    const rows = [...section.querySelectorAll(".share-record")];
    let visibleCount = 0;
    rows.forEach(row => {
      const memberOk = !keyword || String(row.dataset.shareRecordMember || "").includes(keyword);
      const stateOk = recordState === "all" || row.dataset.shareRecordState === recordState;
      row.hidden = !(memberOk && stateOk);
      if (!row.hidden) visibleCount += 1;
    });
    const result = section.querySelector("[data-share-record-result]");
    if (result) result.textContent = keyword || recordState !== "all" ? `显示 ${visibleCount}/${rows.length} 条` : `共 ${rows.length} 条`;
    const empty = section.querySelector("[data-share-record-empty]");
    if (empty) empty.hidden = visibleCount > 0;
  }

  function shareOrganizationTree(selectedMembers) {
    const roleLabels = { writer: "编剧", production: "制作", editing: "剪辑", manager: "制片" };
    const person = (name, role) => ({ type: "person", name, role });
    const hierarchy = [
      { name: "内容经营中心", children: [
        { name: "AI制作中心", active: true, children: [
          { name: "Aigc创作一组", children: [person("zhizuo1", "production")] },
          { name: "Aigc创作二组", children: [person("杰尼龙", "production")] },
          { name: "Aigc创作三组", children: [person("陈颖鹏", "production")] }
        ] },
        { name: "内容中心", children: [person("大牛", "writer"), person("bianju1", "writer")] },
        { name: "制片中心", children: [person("zhipian1", "manager"), person("方耀飞", "manager")] },
        { name: "剪辑中心", children: [person("jianji1", "editing"), person("cyp", "editing")] },
        { name: "运营增长中心", children: [] }
      ] },
      { name: "平台与中台研发部", children: [] },
      { name: "综合管理中心", children: [] }
    ];

    const renderNode = (node, level = 0) => {
      if (node.type === "person") {
        const checked = selectedMembers.has(node.name);
        return `<label class="share-org-row share-org-row--person ${checked ? "is-selected" : ""}" data-tree-level="${level}"><span class="share-org-chevron is-placeholder"></span><input type="checkbox" name="shareMember" value="${escapeHtml(node.name)}" data-share-person ${checked ? "checked" : ""}><span class="share-org-person-icon">${escapeHtml(node.name.slice(0, 1))}</span><span class="share-org-row__name">${escapeHtml(node.name)}</span><small>${roleLabels[node.role] || "成员"}</small></label>`;
      }
      const children = node.children || [];
      const hasChildren = children.length > 0;
      return `<section class="share-org-node ${node.active ? "is-current" : ""}" data-share-branch><div class="share-org-row" data-tree-level="${level}">${hasChildren ? '<button class="share-org-chevron" type="button" data-action="toggle-share-branch" aria-expanded="true">⌄</button>' : '<span class="share-org-chevron is-placeholder"></span>'}<label class="share-org-row__select"><input type="checkbox" data-share-department ${hasChildren ? "" : "disabled"}><span class="share-org-row__name">${escapeHtml(node.name)}</span></label></div>${hasChildren ? `<div class="share-org-children">${children.map(child => renderNode(child, level + 1)).join("")}</div>` : ""}</section>`;
    };

    return hierarchy.map(node => renderNode(node)).join("");
  }

  function refreshShareSelectionUi(form) {
    if (!form) return;
    const options = [...form.querySelectorAll("[data-share-person]")];
    const selected = options.filter(option => option.checked);
    options.forEach(option => option.closest(".share-org-row--person")?.classList.toggle("is-selected", option.checked));
    const counter = form.querySelector("[data-share-selection-count]");
    if (counter) counter.textContent = `已选择 ${selected.length} 人`;
    const selectAll = form.querySelector("[data-share-select-all]");
    if (selectAll) {
      selectAll.checked = selected.length === options.length && options.length > 0;
      selectAll.indeterminate = selected.length > 0 && selected.length < options.length;
    }
    form.querySelectorAll("[data-share-branch]").forEach(branch => {
      const departmentOptions = [...branch.querySelectorAll("[data-share-person]")];
      const departmentSelected = departmentOptions.filter(option => option.checked);
      const departmentCheckbox = branch.querySelector("[data-share-department]");
      if (departmentCheckbox && departmentOptions.length) {
        departmentCheckbox.checked = departmentSelected.length === departmentOptions.length;
        departmentCheckbox.indeterminate = departmentSelected.length > 0 && departmentSelected.length < departmentOptions.length;
      }
      branch.classList.toggle("has-selection", departmentSelected.length > 0);
    });
  }

  function openShareDialog(type, key) {
    const item = type === "work" ? works.find(entry => entry.code === key) : deliveries.find(entry => entry.name === key);
    if (!item) return;
    state.shareContext = { type, key };
    const selectedMembers = new Set();
    const organizationTree = shareOrganizationTree(selectedMembers);
    const startAt = shareDateTime();
    const endAt = shareDateTime(7);
    modalLayer.innerHTML = modalTemplate("共享设置", `<form id="shareForm" data-modal-submit="share-config"><div class="assignment-note assignment-note--blue"><span>${icon("delivery")}</span><div><strong>${escapeHtml(item.name)}${type === "work" ? ` · ${escapeHtml(item.code)}` : ""}</strong><p>每次共享独立设置人员与时间，新增操作不会覆盖之前的共享。</p></div></div>${shareRecordList(item)}<section class="share-form__section"><div class="share-form__section-head"><div><strong>新增共享人员</strong><small data-share-selection-count>已选择 0 人</small></div><label class="share-select-all"><input type="checkbox" data-share-select-all><span>全选人员</span></label></div><div class="share-org-tree">${organizationTree}</div></section><section class="share-form__section"><div class="share-form__section-head"><div><strong>本次共享时间</strong><small>仅应用于本次选择的人员</small></div></div><div class="share-time-grid"><label class="form-field"><span class="form-label required">开始时间</span><input class="input" type="datetime-local" name="startAt" value="${escapeHtml(startAt)}" required></label><label class="form-field"><span class="form-label required">结束时间</span><input class="input" type="datetime-local" name="endAt" value="${escapeHtml(endAt)}" required></label></div><p class="share-time-hint">到期后，本次新增人员的访问权限将自动失效。</p></section></form>`, '<button class="btn" type="button" data-modal-close>取消</button><button class="btn btn--primary" type="submit" form="shareForm">新增共享</button>', "modal--share");
    refreshShareSelectionUi(modalLayer.querySelector("#shareForm"));
  }

  function confirmWorkRevision(code) {
    const work = works.find(item => item.code === code);
    if (!work || work.status !== "需要修改") return;
    work.status = "已完成";
    const delivery = deliveries.find(item => item.name === work.name);
    if (delivery) {
      delivery.status = "已完成";
      delivery.operationNote = "";
      delivery.submittedAt = "2026-09-09 16:20";
      delivery.pending = 0;
      delivery.rejected = 0;
      delivery.passed = delivery.total || 1;
    }
    const project = projects.find(item => item.name === work.name);
    if (project) {
      project.status = "已完成";
      project.completedAt = "2026-09-09 16:20";
    }
    renderPage();
    showToast("修改内容已确认提交，作品状态已完成", "success");
  }

  function getTask(id) {
    return taskSeed.find(item => item.id === Number(id));
  }

  function taskTime() {
    const now = new Date();
    const pad = value => String(value).padStart(2, "0");
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
  }

  function addTaskLog(task, role, action, detail, actor = "当前用户") {
    task.workflow[role].history.push({ time: taskTime(), action, detail, actor });
  }

  function taskFlowSteps(task, activeRole) {
    return `<div class="task-flow">${taskRoles.map((role, index) => {
      const stage = task.workflow[role];
      const classes = [stage.state === "completed" ? "is-completed" : "", role === activeRole ? "is-active" : "", stage.state === "locked" ? "is-locked" : "", stage.state === "rejected" ? "is-rejected" : ""].filter(Boolean).join(" ");
      return `<div class="flow-step ${classes}">
        <span class="flow-step__index">${stage.state === "completed" ? "✓" : index + 1}</span>
        <div><strong>${taskRoleLabels[role]}</strong><span>${taskStateLabels[stage.state]}</span><small>${escapeHtml(stage.assignee)}</small></div>
      </div>`;
    }).join("")}</div>`;
  }

  function taskModalHead(task, role) {
    const stage = task.workflow[role];
    return `<div class="task-modal-summary">
      <div><span>项目名称</span><strong>${escapeHtml(task.name)}</strong></div>
      <div><span>当前岗位</span><strong>${taskRoleLabels[role]}</strong></div>
      <div><span>任务状态</span>${status(taskStateLabels[stage.state])}</div>
      <div><span>计划完成</span><strong>${task.due}</strong></div>
    </div>${taskFlowSteps(task, role)}`;
  }

  function mountTaskModal(html) {
    modalLayer.innerHTML = html;
    const firstInput = modalLayer.querySelector("input:not([readonly]), select, textarea");
    window.setTimeout(() => firstInput?.focus(), 80);
  }

  function openTaskProcess(id) {
    const task = getTask(id);
    const role = state.sectionTabs.tasks;
    if (!task) return;
    const stage = task.workflow[role];
    if (stage.state === "locked") return showToast("前序岗位尚未完成，当前任务暂不可处理");
    if (stage.state === "pending_review") return showToast("任务已提交审核，可在审核入口处理或先撤回");
    if (stage.state === "completed") return openTaskDetails(id);
    if (stage.state === "pending") {
      stage.state = "processing";
      addTaskLog(task, role, "任务已领取", `由${stage.assignee}开始处理`, stage.assignee);
      persistTaskState();
      renderPage();
    }
    state.taskContext = { id: task.id, role };
    const rejectNote = stage.state === "rejected" ? `<div class="task-alert"><strong>审核意见</strong><span>${escapeHtml(stage.reviewNote || "请修改后重新提交")}</span></div>` : "";
    mountTaskModal(modalTemplate(`${taskRoleLabels[role]}任务处理`, `<form id="taskProcessForm" data-task-process>
      ${taskModalHead(task, role)}${rejectNote}
      <div class="task-form-section"><h3>本次处理</h3><div class="form-grid">
        <label class="form-field"><span class="form-label required">完成进度</span><div class="task-progress-input"><input class="input" name="completed" type="number" min="0" max="${stage.total}" value="${stage.completed}"><span>/ ${stage.total} 集</span></div></label>
        <label class="form-field"><span class="form-label">当前负责人</span><input class="input" value="${escapeHtml(stage.assignee)}" readonly></label>
        <label class="form-field form-field--full"><span class="form-label required">处理说明</span><textarea class="textarea" name="note" placeholder="填写本次完成内容、待协同事项或版本说明">${escapeHtml(stage.workNote)}</textarea></label>
        <div class="form-field form-field--full"><span class="form-label">成果附件</span><div class="upload-box task-upload"><button class="btn" type="button" data-action="task-attach">选择文件</button><span class="upload-box__hint" data-task-file>支持文档、图片、音视频，当前为本地交互演示</span></div></div>
      </div></div></form>`, '<button class="btn" type="button" data-modal-close>取消</button><button class="btn" type="button" data-action="task-save-draft">保存草稿</button><button class="btn btn--primary" type="submit" form="taskProcessForm">提交审核</button>', "modal--large"));
  }

  function openTaskReview(id) {
    const task = getTask(id);
    const role = state.sectionTabs.tasks;
    if (!task) return;
    const stage = task.workflow[role];
    if (stage.state !== "pending_review") return openTaskDetails(id);
    state.taskContext = { id: task.id, role };
    mountTaskModal(modalTemplate(taskReviewLabels[role], `<form id="taskReviewForm" data-task-review>
      ${taskModalHead(task, role)}
      <div class="task-submission"><span>提交说明</span><p>${escapeHtml(stage.workNote || "未填写说明")}</p><small>提交进度：${stage.completed}/${stage.total} 集</small></div>
      <div class="task-form-section"><h3>审核结论</h3>
        <div class="task-radio-group"><label class="task-radio is-pass"><input type="radio" name="decision" value="approve" checked><span><strong>审核通过</strong><small>${role === "manager" ? "完成项目流转" : `自动流转至${taskRoleLabels[taskRoles[taskRoles.indexOf(role) + 1]]}`}</small></span></label><label class="task-radio is-reject"><input type="radio" name="decision" value="reject"><span><strong>驳回修改</strong><small>退回当前岗位重新处理</small></span></label></div>
        <label class="form-field form-field--full"><span class="form-label">审核意见</span><textarea class="textarea" name="note" placeholder="通过时可选填；驳回时必须填写修改意见"></textarea></label>
      </div></form>`, '<button class="btn" type="button" data-modal-close>取消</button><button class="btn btn--primary" type="submit" form="taskReviewForm">确认审核</button>', "modal--large"));
  }

  function openTaskDetails(id) {
    const task = getTask(id);
    const role = state.sectionTabs.tasks;
    if (!task) return;
    const stage = task.workflow[role];
    state.taskContext = { id: task.id, role };
    mountTaskModal(modalTemplate("任务详情", `${taskModalHead(task, role)}<div class="task-detail-grid">
      <div><span>负责人</span><strong>${escapeHtml(stage.assignee)}</strong></div><div><span>完成进度</span><strong>${stage.completed}/${stage.total} 集</strong></div>
      <div><span>实际完成</span><strong>${stage.completedAt || "未完成"}</strong></div><div><span>项目题材</span><strong>${escapeHtml(task.genre)}</strong></div>
    </div><div class="task-submission"><span>最近处理说明</span><p>${escapeHtml(stage.workNote || "暂无处理说明")}</p>${stage.reviewNote ? `<small>审核意见：${escapeHtml(stage.reviewNote)}</small>` : ""}</div>`, '<button class="btn" type="button" data-action="task-history">查看流转记录</button><button class="btn btn--primary" type="button" data-modal-close>关闭</button>', "modal--large"));
  }

  function openTaskHistory(id) {
    const task = getTask(id ?? state.taskContext?.id);
    const role = state.taskContext?.role || state.sectionTabs.tasks;
    if (!task) return;
    state.taskContext = { id: task.id, role };
    const logs = taskRoles.flatMap(itemRole => task.workflow[itemRole].history.map(log => ({ ...log, role: itemRole }))).sort((a, b) => b.time.localeCompare(a.time));
    const timeline = logs.length ? logs.map(log => `<div class="timeline__item"><span class="timeline__dot"></span><div class="timeline__head"><strong>${escapeHtml(log.action)}</strong><time>${escapeHtml(log.time)}</time></div><p>${escapeHtml(log.detail)}</p><small>${taskRoleLabels[log.role]} · ${escapeHtml(log.actor)}</small></div>`).join("") : '<div class="empty-state">暂无流转记录</div>';
    mountTaskModal(modalTemplate("任务流转记录", `${taskModalHead(task, role)}<div class="timeline">${timeline}</div>`, '<button class="btn btn--primary" type="button" data-modal-close>关闭</button>', "modal--large"));
  }

  function openTaskTransfer(id) {
    const task = getTask(id);
    const role = state.sectionTabs.tasks;
    if (!task) return;
    const stage = task.workflow[role];
    if (["locked", "completed"].includes(stage.state)) return showToast("当前状态不可转交");
    state.taskContext = { id: task.id, role };
    const options = taskAssignees[role].map(name => `<option ${name === stage.assignee ? "selected" : ""}>${escapeHtml(name)}</option>`).join("");
    mountTaskModal(modalTemplate("转交任务", `<form id="taskTransferForm" data-task-transfer>${taskModalHead(task, role)}<div class="task-form-section"><div class="form-grid">
      <label class="form-field"><span class="form-label required">转交给</span><select class="select" name="assignee" required>${options}</select></label>
      <label class="form-field form-field--full"><span class="form-label required">转交说明</span><textarea class="textarea" name="reason" required placeholder="请填写转交原因"></textarea></label>
    </div></div></form>`, '<button class="btn" type="button" data-modal-close>取消</button><button class="btn btn--primary" type="submit" form="taskTransferForm">确认转交</button>', "modal--large"));
  }

  function openTaskAssets(id) {
    const task = getTask(id);
    const role = state.sectionTabs.tasks;
    if (!task) return;
    state.taskContext = { id: task.id, role };
    mountTaskModal(modalTemplate("资产设定", `<form id="taskAssetsForm" data-task-assets>${taskModalHead(task, role)}<div class="task-form-section"><div class="form-grid">
      <label class="form-field"><span class="form-label required">视觉风格</span><select class="select" name="style" required><option value="">请选择</option><option ${task.assets.style === "国风写实" ? "selected" : ""}>国风写实</option><option ${task.assets.style === "二维动漫" ? "selected" : ""}>二维动漫</option><option ${task.assets.style === "电影质感" ? "selected" : ""}>电影质感</option></select></label>
      <label class="form-field"><span class="form-label">人物资产</span><input class="input" name="character" value="${escapeHtml(task.assets.character)}" placeholder="填写或关联人物资产"></label>
      <label class="form-field"><span class="form-label">场景资产</span><input class="input" name="scene" value="${escapeHtml(task.assets.scene)}" placeholder="填写或关联场景资产"></label>
      <label class="form-field form-field--full"><span class="form-label">补充说明</span><textarea class="textarea" name="remark" placeholder="补充服装、道具、色彩等约束">${escapeHtml(task.assets.remark)}</textarea></label>
    </div></div></form>`, '<button class="btn" type="button" data-modal-close>取消</button><button class="btn btn--primary" type="submit" form="taskAssetsForm">保存设定</button>', "modal--large"));
  }

  function closeModal() {
    modalLayer.innerHTML = "";
    state.pendingDelete = null;
    state.taskContext = null;
    state.workflowContext = null;
    state.deliveryContext = null;
    state.workContext = null;
    state.shareContext = null;
    state.ipContext = null;
    state.topicContext = null;
    state.scriptTaskContext = null;
    state.scriptWorkspaceContext = null;
    state.scriptRatingContext = null;
    state.scriptFilePreview = null;
  }

  function showDropdown(button, type) {
    document.querySelector(".dropdown")?.remove();
    const rect = button.getBoundingClientRect();
    const menu = document.createElement("div");
    menu.className = "dropdown";
    const task = type === "task" ? getTask(button.dataset.taskId) : null;
    const role = state.sectionTabs.tasks;
    const canWithdraw = task?.workflow[role]?.state === "pending_review";
    menu.style.top = `${Math.min(window.innerHeight - (type === "task" ? 132 : 94), rect.bottom + 4)}px`;
    menu.style.left = `${Math.min(window.innerWidth - 150, rect.left)}px`;
    if (type === "works") {
      menu.dataset.workCode = button.closest("[data-work-code]")?.dataset.workCode || "";
      menu.innerHTML = '<button type="button" data-action="view-film">查看</button><button type="button" data-action="request-change">修改意见</button>';
    }
    else if (type === "task") menu.innerHTML = `<button type="button" data-action="task-history" data-task-id="${button.dataset.taskId}">流转记录</button><button type="button" data-action="task-transfer" data-task-id="${button.dataset.taskId}">转交任务</button><button type="button" data-action="task-withdraw" data-task-id="${button.dataset.taskId}" ${canWithdraw ? "" : "disabled"}>撤回提交</button>`;
    else menu.innerHTML = '<button type="button" data-action="view">查看详情</button><button type="button" data-action="history">流转记录</button>';
    document.body.append(menu);
  }

  function handleModalSubmit(form) {
    const data = Object.fromEntries(new FormData(form));
    if (form.dataset.modalSubmit === "share-config") {
      const context = state.shareContext;
      const item = context?.type === "work" ? works.find(entry => entry.code === context.key) : deliveries.find(entry => entry.name === context?.key);
      const members = [...form.querySelectorAll("[data-share-person]:checked")].map(checkbox => checkbox.value);
      if (!members.length) {
        form.querySelector("[data-share-person]")?.focus();
        return showToast("请至少选择一名共享人员", "warning");
      }
      if (!data.startAt || !data.endAt || new Date(data.endAt) <= new Date(data.startAt)) {
        form.querySelector("[name='endAt']")?.focus();
        return showToast("结束时间需晚于开始时间", "warning");
      }
      if (item) {
        const records = shareRecords(item);
        const batchId = Date.now();
        members.forEach((member, index) => records.push({ id: batchId + index, member, startAt: data.startAt, endAt: data.endAt }));
      }
      closeModal();
      renderPage();
      showToast(`已新增 ${members.length} 人共享`, "success");
    } else if (form.dataset.modalSubmit === "account-settings") {
      if (data.newPassword !== data.confirmPassword) {
        showToast("两次输入的新密码不一致", "warning");
        form.elements.confirmPassword.focus();
        form.elements.confirmPassword.select();
        return;
      }
      currentAccount = data.account.trim();
      try {
        localStorage.setItem(accountStorageKey, currentAccount);
      } catch {}
      updateProfileDisplay();
      closeModal();
      showToast("账号密码修改成功", "success");
    } else if (form.dataset.modalSubmit === "add-ip") {
      const uploadedAt = taskTime();
      const file = data.file || "IP剧本.docx";
      ipWorks.unshift({ id: Date.now(), name: data.name, type: "未分类", genre: data.genre, status: "已入库", owner: data.owner, file, assignee: "--", taskStatus: "待分配", updated: uploadedAt, summary: data.summary || "暂未填写 IP 简介。", content: "该 IP 原文件已上传，当前为初始入库版本。", versions: [{ version: "V1", file, uploadedAt, uploader: currentAccount, note: "初始入库版本", content: "该 IP 原文件已上传，当前为初始入库版本。" }] });
      saveIpVersionHistory();
      closeModal();
      renderPage();
      showToast("IP 已保存，可继续分配人员", "success");
    } else if (form.dataset.modalSubmit === "upload-ip-version") {
      const item = ipWorks.find(ip => ip.id === Number(state.ipContext?.id));
      if (!item) return;
      const uploadedAt = taskTime();
      const version = `V${(item.versions?.length || 0) + 1}`;
      const record = { version, file: data.file, uploadedAt, uploader: currentAccount, note: data.note.trim() || "未填写版本说明", content: `《${item.name}》${version} 原文件已上传，文件名：${data.file}` };
      item.versions = [...(item.versions || []), record];
      item.file = record.file;
      item.updated = uploadedAt;
      saveIpVersionHistory();
      closeModal();
      renderPage();
      showToast(`${item.name} 已更新至 ${version}`, "success");
    } else if (form.dataset.modalSubmit === "assign-ip-person") {
      const ip = ipWorks.find(item => item.id === Number(data.ipId));
      if (!ip) return showToast("请选择来源 IP", "warning");
      const existingTask = scriptTasks.find(item => item.ipId === ip.id && item.status !== "已提交");
      if (existingTask) {
        existingTask.assignee = data.writer;
        existingTask.status = "待接收";
        existingTask.requirement = data.note || existingTask.requirement;
        existingTask.updatedAt = taskTime();
      } else {
        scriptTasks.unshift({ id: Date.now(), ipId: ip.id, ipName: ip.name, name: `${ip.name}·剧本创作`, genre: ip.genre, assignee: data.writer, due: "2026-09-20", status: "待接收", requirement: data.note || `根据《${ip.name}》已上传剧本内容完成二创。`, createdAt: taskTime(), updatedAt: taskTime() });
      }
      ip.assignee = data.writer;
      if (ip.taskStatus !== "已立项") ip.taskStatus = "已分配";
      ip.updated = taskTime();
      closeModal();
      renderPage();
      showToast(`已将 ${ip.name} 分配给 ${data.writer}`, "success");
    } else if (form.dataset.modalSubmit === "script-workspace") {
      const context = state.scriptWorkspaceContext;
      if (context?.type === "task") {
        const task = scriptTasks.find(item => item.id === Number(context.id));
        if (!task) return;
        const existingScript = scripts.find(item => item.sourceTaskId === task.id);
        const nextVersion = existingScript ? versionNumber(existingScript.version) + 1 : task.status === "已提交" ? 2 : 1;
        task.status = "已提交";
        task.submission = data.file || `${data.name}-V${nextVersion}.docx`;
        if (existingScript) {
          existingScript.version = `V${nextVersion}`;
          existingScript.updated = taskTime();
          existingScript.content = data.episodeContent;
          existingScript.launchDecision = "";
          existingScript.launchNote = "";
        } else {
          scripts.unshift({ name: data.name, genre: task.genre, uploader: task.assignee, episodes: Number(data.episodes), version: `V${nextVersion}`, status: "待立项", projects: "暂未关联项目", assignedAt: task.createdAt, updated: taskTime(), shared: Boolean(task.shared), sourceIp: task.ipName, sourceTaskId: task.id, content: data.episodeContent, rating: task.rating, ratingNote: task.ratingNote });
        }
        task.updatedAt = taskTime();
        const ip = ipWorks.find(item => item.id === task.ipId);
        if (ip) {
          if (ip.taskStatus !== "已立项") ip.taskStatus = "已分配";
          ip.updated = "2026-09-09 17:40";
        }
        closeModal();
        renderPage();
        showToast("剧本已提交，列表版本已更新", "success");
      } else if (context?.type === "script") {
        const script = scripts.find(item => item.name === context.name);
        if (!script) return;
        script.version = `V${versionNumber(script.version) + 1}`;
        script.updated = taskTime();
        script.content = data.episodeContent;
        script.launchDecision = "";
        script.launchNote = "";
        closeModal();
        renderPage();
        showToast(`《${script.name}》已更新至 ${script.version}`, "success");
      }
    } else if (form.dataset.modalSubmit === "add-topic") {
      topics.unshift({ id: Date.now(), name: data.name, genre: data.genre, episodes: Number(data.episodes || 60), created: "2026-09-10", updated: "2026-09-10", owner: currentAccount, reviewers: data.reviewers || "--", status: "未评估", assignmentStatus: "未分配", assignee: "", content: data.content || "" });
      closeModal();
      renderPage();
      showToast("新增选题成功", "success");
    } else if (form.dataset.modalSubmit === "topic-edit") {
      const topic = topics.find(item => item.id === Number(state.topicContext?.id));
      if (!topic) return;
      topic.name = data.name;
      topic.genre = data.genre;
      topic.episodes = Number(data.episodes || topic.episodes);
      topic.reviewers = data.reviewers;
      topic.content = data.content || "";
      topic.updated = "2026-09-10";
      closeModal();
      renderPage();
      showToast("选题信息已更新", "success");
    } else if (form.dataset.modalSubmit === "topic-evaluate") {
      const topic = topics.find(item => item.id === Number(state.topicContext?.id));
      if (!topic) return;
      topic.status = data.result;
      topic.reviewers = currentAccount;
      topic.reviewNote = data.note || "";
      topic.updated = "2026-09-10";
      closeModal();
      renderPage();
      showToast(data.result === "通过" ? "评估已通过，现在可以分配人员" : "选题已驳回", data.result === "通过" ? "success" : "warning");
    } else if (form.dataset.modalSubmit === "topic-assign") {
      const topic = topics.find(item => item.id === Number(state.topicContext?.id));
      if (!topic || topic.status !== "通过") return showToast("仅评估通过的选题可以分配人员", "warning");
      const existingTask = scriptTasks.find(item => item.topicId === topic.id);
      if (existingTask) {
        existingTask.assignee = data.writer;
        existingTask.due = data.due;
        existingTask.status = "待接收";
        existingTask.requirement = data.requirement || existingTask.requirement;
        existingTask.updatedAt = taskTime();
      } else {
        scriptTasks.unshift({
          id: Date.now(), topicId: topic.id, sourceTopic: topic.name, ipId: null, ipName: "选题策划库",
          name: `${topic.name}·剧本创作`, genre: topic.genre, assignee: data.writer, due: data.due,
          status: "待接收", requirement: data.requirement || `基于《${topic.name}》完成 ${topic.episodes} 集剧本创作。`,
          createdAt: taskTime(), updatedAt: taskTime()
        });
      }
      topic.assignmentStatus = "已分配";
      topic.assignee = data.writer;
      topic.updated = "2026-09-10";
      closeModal();
      renderPage();
      showToast(`已分配给 ${data.writer}，任务已同步至剧本库`, "success");
    } else if (form.dataset.modalSubmit === "add-project") {
      const linkedScript = scripts.find(item => item.name === data.script);
      const episodeCount = Math.max(0, Number(linkedScript?.episodes || data.episodes || 0));
      const productionMode = data.productionMode || "internal";
      const isPartnerProduction = productionMode === "partner";
      const productionPlans = isPartnerProduction ? [] : collectAllocationPlans(form, "production", episodeCount);
      const editingPlans = isPartnerProduction ? [] : collectAllocationPlans(form, "editing", episodeCount);
      const managerPlans = isPartnerProduction
        ? [{ member: data.producerReviewer, range: episodeCount ? `1-${episodeCount}` : "", duration: "", episodes: Array.from({ length: episodeCount }, (_, index) => index + 1) }]
        : collectAllocationPlans(form, "manager", episodeCount);
      if (isPartnerProduction && (!data.partnerCompany || !data.producerReviewer)) {
        showToast("请选择承制方公司和制片审核人", "warning");
        return;
      }
      if (!isPartnerProduction && (!productionPlans[0]?.member || !editingPlans[0]?.member)) {
        showToast("制作和剪辑任务必须分配到具体部门", "warning");
        return;
      }
      if (!managerPlans[0]?.member) {
        showToast(isPartnerProduction ? "请选择制片审核人" : "制片任务必须指定具体人员", "warning");
        return;
      }
      const productionDepartment = isPartnerProduction ? "" : productionPlans[0].member;
      const editingDepartment = isPartnerProduction ? "" : editingPlans[0].member;
      projects.unshift({ id: 1, name: data.name, status: "进行中", genre: linkedScript?.genre || data.genre || "--", episodes: episodeCount, owner: currentAccount, budget: Number(data.budget), due: "--", overseas: false, script: data.script || "", scriptFile: data.scriptFile || "", writer: linkedScript?.uploader || "--", productionMode, partnerCompany: data.partnerCompany || "", producerReviewer: data.producerReviewer || managerPlans[0].member });
      projects.forEach((item, index) => { item.id = index + 1; });
      if (linkedScript) {
        linkedScript.status = "已立项";
        linkedScript.projects = linkedScript.projects === "暂未关联项目" ? data.name : `${linkedScript.projects}、${data.name}`;
        const sourceIp = ipWorks.find(item => item.name === linkedScript.sourceIp);
        if (sourceIp) {
          sourceIp.taskStatus = "已立项";
          sourceIp.updated = "2026-09-09 16:40";
        }
      }
      workflowProjects.unshift({ id: Date.now(), name: data.name, genre: linkedScript?.genre || data.genre || "--", script: data.script || "", scriptFile: data.scriptFile || "", scriptVersion: linkedScript?.version || (data.scriptFile ? "文件" : "--"), writer: linkedScript?.uploader || "--", episodes: episodeCount, productionMode, partnerCompany: data.partnerCompany || "", producerReviewer: data.producerReviewer || managerPlans[0].member, productionAssignee: isPartnerProduction ? data.partnerCompany : "待负责人分配", editorAssignee: isPartnerProduction ? data.partnerCompany : "待负责人分配", managerAssignee: managerPlans[0].member, productionDepartment, editingDepartment, managerDepartment: departmentIdForMember("manager", managerPlans[0].member), productionAssignments: Array.from({ length: episodeCount }, () => ""), editingAssignments: Array.from({ length: episodeCount }, () => ""), productionPlans: [], editingPlans: [], productionTaskPlans: productionPlans, editingTaskPlans: editingPlans, managerPlans, stage: isPartnerProduction ? "承制方制作" : "待负责人分配", storyboards: [] });
      closeModal();
      renderPage();
      showToast(isPartnerProduction ? `项目立项成功，已交由${data.partnerCompany}制作，审核人：${data.producerReviewer}` : "项目立项成功，部门任务与制片负责人已完成分配", "success");
    } else if (form.dataset.modalSubmit === "add-script") {
      scripts.unshift({ name: data.name, genre: data.genre, uploader: data.writer, episodes: Number(data.episodes || 1), version: "V1", status: "待立项", projects: "暂未关联项目", assignedAt: taskTime(), updated: taskTime(), shared: false });
      closeModal();
      renderPage();
      showToast("剧本已创建并进入剧本成品", "success");
    } else if (form.dataset.modalSubmit === "script-rating") {
      const context = state.scriptRatingContext;
      const item = context?.type === "task"
        ? scriptTasks.find(entry => entry.id === Number(context.id))
        : scripts.find(entry => entry.name === context?.name);
      if (!item) return;
      item.rating = Math.min(10, Math.max(0, Number(data.rating)));
      item.ratingNote = data.ratingNote.trim();
      saveScriptRatings();
      closeModal();
      renderPage();
      showToast(`《${item.name}》评分已更新为 ${item.rating.toFixed(1)} 分`, "success");
    } else if (form.dataset.modalSubmit === "writer-assignment") {
      closeModal();
      showToast(`已安排编剧 ${data.writer}`, "success");
    } else if (form.dataset.modalSubmit === "assign-member") {
      const item = workflowProjects.find(project => project.id === Number(state.workflowContext?.id));
      if (item) {
        const role = state.workflowContext.role;
        const assignmentKey = role === "production" ? "productionAssignments" : "editingAssignments";
        const legacyKey = role === "production" ? "productionAssignee" : "editorAssignee";
        const planKey = role === "production" ? "productionPlans" : "editingPlans";
        const plans = collectAllocationPlans(form, role, item.episodes);
        const invalidPlan = plans.find(plan => !plan.member || !plan.episodes.length || !Number(plan.duration));
        if (invalidPlan) {
          form.querySelector(`[name="${role}_member"]`)?.focus();
          return showToast("请完整填写人员、负责计划集数和工期", "warning");
        }
        item[planKey] = plans;
        item[assignmentKey] = plansToAssignments(plans, item.episodes);
        const names = [...new Set(item[assignmentKey].filter(Boolean))];
        item[legacyKey] = names.length ? names.join("、") : "待负责人分配";
        const hasProductionAssignment = getEpisodeAssignments(item, "production").some(Boolean);
        const hasEditingAssignment = getEpisodeAssignments(item, "editing").some(Boolean);
        if (!hasProductionAssignment && !hasEditingAssignment) item.stage = "待部门分配";
        else if (item.stage === "待部门分配" && hasProductionAssignment) item.stage = "制作中";
      }
      closeModal();
      renderPage();
      showToast("按集人员分配已更新", "success");
    } else if (form.dataset.modalSubmit === "delivery-upload") {
      const item = deliveries.find(delivery => delivery.name === state.deliveryContext?.name);
      if (item) {
        const project = workflowProjects.find(projectItem => projectItem.name === item.name);
        const batchType = data.batchType || "supplement";
        const availableEpisodes = String(form.dataset.availableEpisodes || "").split(",").map(Number).filter(Boolean);
        const parsedCompletion = batchType === "complete" ? parseCompletionRange(data.completedRange, project?.episodes || 0) : { episodes: [], invalid: false };
        const completedEpisodes = parsedCompletion.episodes;
        if (parsedCompletion.invalid) {
          form.querySelector("[name='completedRange']")?.focus();
          return showToast("计划集数格式有误或超出项目范围", "warning");
        }
        if (batchType === "complete" && !completedEpisodes.length) {
          form.querySelector("[name='completedRange']")?.focus();
          return showToast("请填写本批完成的计划集数", "warning");
        }
        const invalidEpisode = completedEpisodes.find(episode => !availableEpisodes.includes(episode));
        if (invalidEpisode) {
          form.querySelector("[name='completedRange']")?.focus();
          return showToast(`第${invalidEpisode}集不在当前账号可完成范围内`, "warning");
        }
        const pacing = Number(data.pacing);
        if (!Number.isFinite(pacing) || pacing < 0.5 || pacing > 3) {
          form.querySelector("[name='pacing']")?.focus();
          return showToast("请填写 0.5 至 3 之间的视频配速");
        }
        const uploadedAt = taskTime();
        const files = form.querySelector("[name='file']")?.files || [];
        const actualDirectoryCount = estimateDeliveryDirectories(files);
        if (batchType === "complete" && project) {
          completedEpisodes.forEach(episode => { project.editingCompletedAt[episode] ||= uploadedAt; });
          project.deliveryBatches.push({ at: uploadedAt, completedEpisodes, actualDirectoryCount, type: "complete" });
          const progress = roleProgress(project, "editing");
          if (progress.completed === progress.total) {
            project.stage = "已完成";
            project.editingCompletedAtFinal ||= progress.completedAt;
          }
        } else if (project) {
          project.deliveryBatches.push({ at: uploadedAt, completedEpisodes: [], actualDirectoryCount, type: "supplement" });
        }
        item.status = "待审核";
        item.fileName = `${item.name}-完整成片-v${item.version + 1}.mp4`;
        item.version += 1;
        item.pacing = `${pacing.toFixed(2).replace(/\.?0+$/, "")}x`;
        item.submittedAt = uploadedAt;
        item.total = batchType === "complete" ? Number(item.total || 0) + actualDirectoryCount : Math.max(Number(item.total || 0), actualDirectoryCount);
        item.pending = Math.max(1, actualDirectoryCount);
        item.rejected = 0;
        item.operationNote = "";
        const work = works.find(entry => entry.name === item.name);
        if (work) {
          work.version = `V${item.version}`;
          work.status = "待审核";
          work.pacing = item.pacing;
        }
        const editingProgress = project ? roleProgress(project, "editing") : null;
        if (editingProgress?.completed === editingProgress?.total) {
          const projectRecord = projects.find(entry => entry.name === item.name);
          if (projectRecord) {
            projectRecord.status = "已完成";
            projectRecord.completedAt ||= editingProgress.completedAt;
          }
        }
      }
      closeModal();
      renderPage();
      const workflowProject = workflowProjects.find(project => project.name === item?.name);
      const progress = workflowProject ? roleProgress(workflowProject, "editing") : null;
      showToast(progress?.completed === progress?.total ? "上传成功，剪辑计划集已全部完成，交付待审核" : "上传成功，计划集进度已更新", "success");
    } else if (form.dataset.modalSubmit === "confirm-delivery") {
      const item = deliveries.find(delivery => delivery.name === state.deliveryContext?.name);
      const note = String(data.note || "").trim();
      if (!note) {
        form.querySelector("[name='note']")?.focus();
        return showToast("请填写确认交付备注");
      }
      const bindings = item ? getCharacterIpBindings(item) : [];
      const missingBindingIndex = bindings.findIndex((binding, index) => !data[`ip_${index}`]);
      if (missingBindingIndex >= 0) {
        form.querySelector(`[name='ip_${missingBindingIndex}']`)?.focus();
        return showToast("请完成全部项目角色的 IP 绑定");
      }
      const cards = [...form.querySelectorAll("[data-ip-binding-card]")];
      if (cards.some(card => !card.classList.contains("is-bound"))) {
        form.querySelector("[data-action='open-ip-picker']")?.focus();
        return showToast("请先批量绑定或逐个完成全部角色绑定");
      }
      if (item) {
        item.deliveryNote = note;
        item.deliveryConfirmedAt = "2026-09-09 16:20";
        item.deliveryConfirmedBy = "当前制片";
        item.roleIpBindings = bindings.map((binding, index) => ({ ...binding, ipId: data[`ip_${index}`], confirmed: true }));
        item.status = "已完成";
        const work = works.find(entry => entry.name === item.name);
        if (work) {
          work.status = "已完成";
          work.pacing = item.pacing;
          work.roleIpBindings = item.roleIpBindings.map(binding => ({ ...binding }));
        }
        const project = projects.find(entry => entry.name === item.name);
        if (project) {
          project.status = "已完成";
          project.completedAt ||= item.deliveryConfirmedAt;
          project.roleIpBindings = item.roleIpBindings.map(binding => ({ ...binding }));
        }
      }
      closeModal();
      renderPage();
      showToast(`项目已确认交付，${bindings.length} 个角色 IP 已绑定`, "success");
    } else if (form.dataset.modalSubmit === "delivery-audit") {
      const item = deliveries.find(delivery => delivery.name === state.deliveryContext?.name);
      if (data.decision === "reject" && !String(data.note || "").trim()) {
        form.querySelector("[name='note']")?.focus();
        return showToast("驳回时请填写修改意见");
      }
      if (item) {
        if (data.decision === "approve") {
          item.status = "已通过";
          item.passed = item.total || 1;
          item.pending = 0;
          item.rejected = 0;
          let work = works.find(entry => entry.name === item.name);
          if (!work) {
            work = { code: `IPRJ-${Date.now()}`, name: item.name, total: item.total, genre: "项目", done: item.total, duration: item.duration, pacing: item.pacing, due: item.date, status: "已完成", version: `V${item.version}` };
            works.unshift(work);
          } else {
            work.status = "已完成";
            work.version = `V${item.version}`;
            work.duration = item.duration;
            work.pacing = item.pacing;
          }
          const project = projects.find(entry => entry.name === item.name);
          if (project) {
            project.status = "已完成";
            project.completedAt ||= taskTime();
          }
        } else {
          item.status = "已驳回";
          item.auditNote = data.note || "请根据审核意见修改后重新提交。";
          item.rejected = Math.max(1, item.rejected);
          item.pending = 0;
        }
      }
      closeModal();
      renderPage();
      showToast(data.decision === "approve" ? "审核通过，成片已进入作品库" : "已驳回并退回剪辑", data.decision === "approve" ? "success" : "info");
    } else if (form.dataset.modalSubmit === "request-change") {
      const work = works.find(entry => entry.code === state.workContext?.code);
      const delivery = deliveries.find(item => item.name === work?.name);
      if (work) work.status = "需要修改";
      if (delivery) {
        delivery.status = "需要修改";
        delivery.operationNote = data.note;
      }
      closeModal();
      renderPage();
      showToast("修改意见已发送给剪辑，旧版本继续保留", "success");
    } else if (form.dataset.modalSubmit === "delivery-change") {
      const item = deliveries.find(delivery => delivery.name === state.deliveryContext?.name);
      if (item) {
        item.status = "需要修改";
        item.operationNote = data.note;
        const work = works.find(entry => entry.name === item.name);
        if (work) work.status = "需要修改";
      }
      closeModal();
      renderPage();
      showToast("修改意见已提交，项目状态已更新为需要修改", "success");
    } else if (form.dataset.modalSubmit === "frame-config") {
      const item = deliveries.find(delivery => delivery.name === state.deliveryContext?.name);
      if (item) item.frame = "已设置";
      closeModal();
      renderPage();
      showToast("提帧配置已保存", "success");
    } else {
      closeModal();
      showToast("提帧配置已保存", "success");
    }
  }

  function handleTaskProcess(form, submitForReview) {
    const context = state.taskContext;
    const task = getTask(context?.id);
    const stage = task?.workflow[context?.role];
    if (!task || !stage) return;
    const data = Object.fromEntries(new FormData(form));
    const completed = Math.min(stage.total, Math.max(0, Number(data.completed) || 0));
    const note = String(data.note || "").trim();
    if (submitForReview && !note) {
      form.querySelector("[name='note']")?.focus();
      return showToast("提交审核前请填写处理说明");
    }
    stage.completed = completed;
    stage.workNote = note;
    stage.state = submitForReview ? "pending_review" : "processing";
    addTaskLog(task, context.role, submitForReview ? "已提交审核" : "已保存处理草稿", `${note || "暂未填写说明"}（进度 ${completed}/${stage.total} 集）`, stage.assignee);
    persistTaskState();
    closeModal();
    renderPage();
    showToast(submitForReview ? "已提交审核，等待审核人处理" : "处理进度已保存", "success");
  }

  function handleTaskReview(form) {
    const context = state.taskContext;
    const task = getTask(context?.id);
    const stage = task?.workflow[context?.role];
    if (!task || !stage) return;
    const data = Object.fromEntries(new FormData(form));
    const note = String(data.note || "").trim();
    if (data.decision === "reject" && !note) {
      form.querySelector("[name='note']")?.focus();
      return showToast("驳回任务时必须填写修改意见");
    }
    if (data.decision === "reject") {
      stage.state = "rejected";
      stage.reviewNote = note;
      addTaskLog(task, context.role, "审核已驳回", note, "当前审核人");
      persistTaskState();
      closeModal();
      renderPage();
      return showToast("任务已驳回至当前岗位", "success");
    }

    stage.state = "completed";
    stage.completed = stage.total;
    stage.completedAt = taskTime().slice(0, 10);
    stage.reviewNote = note || "审核通过";
    addTaskLog(task, context.role, "审核已通过", note || "成果符合要求，准予进入下一环节", "当前审核人");
    const currentIndex = taskRoles.indexOf(context.role);
    const nextRole = taskRoles[currentIndex + 1];
    if (nextRole) {
      const nextStage = task.workflow[nextRole];
      nextStage.state = "pending";
      addTaskLog(task, nextRole, "前序任务已通过", `${taskRoleLabels[context.role]}环节完成，任务已自动激活`, "系统");
    } else {
      task.status = "已完成";
      task.actual = stage.completedAt;
      task.progress = `${stage.total}/${stage.total}`;
    }
    persistTaskState();
    closeModal();
    renderPage();
    showToast(nextRole ? `审核通过，任务已流转至${taskRoleLabels[nextRole]}` : "全部岗位已完成，项目任务已闭环", "success");
  }

  function handleTaskTransfer(form) {
    const context = state.taskContext;
    const task = getTask(context?.id);
    const stage = task?.workflow[context?.role];
    if (!task || !stage) return;
    const data = Object.fromEntries(new FormData(form));
    const previous = stage.assignee;
    stage.assignee = data.assignee;
    addTaskLog(task, context.role, "任务已转交", `${previous} 转交给 ${data.assignee}：${data.reason}`, "当前用户");
    persistTaskState();
    closeModal();
    renderPage();
    showToast(`任务已转交给 ${data.assignee}`, "success");
  }

  function handleTaskAssets(form) {
    const context = state.taskContext;
    const task = getTask(context?.id);
    if (!task) return;
    task.assets = Object.fromEntries(new FormData(form));
    addTaskLog(task, context.role, "资产设定已更新", `视觉风格：${task.assets.style}`, "当前用户");
    persistTaskState();
    closeModal();
    renderPage();
    showToast("资产设定已保存", "success");
  }

  function withdrawTask(id) {
    const task = getTask(id);
    const role = state.sectionTabs.tasks;
    const stage = task?.workflow[role];
    if (!stage || stage.state !== "pending_review") return showToast("当前任务没有可撤回的审核提交");
    stage.state = "processing";
    addTaskLog(task, role, "已撤回审核提交", "任务返回处理中，可继续修改后再次提交", stage.assignee);
    persistTaskState();
    renderPage();
    showToast("提交已撤回，可继续处理", "success");
  }

  document.addEventListener("click", event => {
    if (!event.target.closest("[data-action='more']") && !event.target.closest(".dropdown")) document.querySelector(".dropdown")?.remove();
    const closeTarget = event.target.closest("[data-close-tab]");
    if (closeTarget) {
      event.stopPropagation();
      closeTab(closeTarget.dataset.closeTab);
      return;
    }
    const tabTarget = event.target.closest("[data-tab-page]");
    if (tabTarget) return navigate(tabTarget.dataset.tabPage);
    const navTarget = event.target.closest("[data-page]");
    if (navTarget) return navigate(navTarget.dataset.page);
    const sectionTab = event.target.closest("[data-section-tab]");
    if (sectionTab) {
      state.sectionTabs[state.activePage] = sectionTab.dataset.sectionTab;
      state.pages[state.activePage] = 1;
      renderPage();
      return;
    }
    const segment = event.target.closest("[data-segment]");
    if (segment) {
      state.modes[state.activePage] = segment.dataset.segment;
      state.pages[state.activePage] = 1;
      renderPage();
      return;
    }
    const deliveryRole = event.target.closest("[data-delivery-role]");
    if (deliveryRole) {
      state.modes.delivery = deliveryRole.dataset.deliveryRole;
      renderPage();
      return;
    }
    const modalTrigger = event.target.closest("[data-modal]");
    if (modalTrigger) return openModal(modalTrigger.dataset.modal);
    if (event.target === modalLayer || event.target.closest("[data-modal-close]")) return closeModal();
    if (event.target.closest("[data-confirm-delete]")) {
      const target = state.pendingDelete;
      const collections = { project: projects, topic: topics, script: scripts, ip: ipWorks, "script-task": scriptTasks };
      const collection = collections[target?.type];
      if (collection) {
        const index = collection.findIndex(item => target.id ? item.id === target.id : item.name === target.name);
        if (index >= 0) collection.splice(index, 1);
        projects.forEach((item, itemIndex) => { item.id = itemIndex + 1; });
      }
      closeModal();
      renderPage();
      showToast("删除成功", "success");
      return;
    }
    const numberStep = event.target.closest("[data-number-step]");
    if (numberStep) {
      const input = numberStep.closest(".number-input")?.querySelector("input[type='number']");
      if (input) input.value = String(Math.max(Number(input.min || 0), Number(input.value || 0) + Number(numberStep.dataset.numberStep)));
      return;
    }
    const pageNumber = event.target.closest("[data-page-number]");
    if (pageNumber) {
      state.pages[state.activePage] = Number(pageNumber.dataset.pageNumber);
      renderPage();
      showToast(`已切换到第 ${pageNumber.dataset.pageNumber} 页`);
      return;
    }
    const pageMove = event.target.closest("[data-page-prev], [data-page-next]");
    if (pageMove) {
      const jump = pageMove.closest(".pagination-bar")?.querySelector("[data-page-jump]");
      const max = Number(jump?.max || 1);
      const current = state.pages[state.activePage] || 1;
      state.pages[state.activePage] = Math.min(max, Math.max(1, current + (pageMove.hasAttribute("data-page-next") ? 1 : -1)));
      renderPage();
      showToast(`已切换到第 ${state.pages[state.activePage]} 页`);
      return;
    }
    const action = event.target.closest("[data-action]");
    if (action) {
      action.closest(".dropdown")?.remove();
      const name = action.dataset.action;
      if (name === "ip-detail") return openIpDetail(action.closest("[data-record-id]")?.dataset.recordId);
      if (name === "assign-ip-person") {
        state.ipContext = { id: Number(action.closest("[data-record-id]")?.dataset.recordId) || null };
        return openModal("assign-ip-person");
      }
      if (name === "view-ip-file") {
        const item = ipWorks.find(ip => ip.id === Number(state.ipContext?.id));
        const versionIndex = action.dataset.versionIndex === undefined ? state.ipContext?.versionIndex : Number(action.dataset.versionIndex);
        return openIpOriginalFile(item, Number(versionIndex));
      }
      if (name === "replace-ip-file") {
        state.ipContext = { id: Number(action.closest("[data-record-id]")?.dataset.recordId) || null };
        return openModal("upload-ip-version");
      }
      if (name === "ip-version-history") return openIpVersionHistory(action.closest("[data-record-id]")?.dataset.recordId);
      if (name === "select-ip-version") {
        const item = ipWorks.find(ip => ip.id === Number(state.ipContext?.id));
        const index = Number(action.dataset.versionIndex);
        const detail = action.closest(".ip-version-history")?.querySelector("[data-ip-version-detail]");
        if (!item || !detail || !item.versions?.[index]) return;
        state.ipContext.versionIndex = index;
        action.closest("nav")?.querySelectorAll(".ip-version-record").forEach(button => button.classList.toggle("is-active", button === action));
        detail.innerHTML = renderIpVersionDetail(item, index);
        return;
      }
      if (name === "accept-script-task") {
        const task = scriptTasks.find(item => item.id === Number(action.closest("[data-script-task-id]")?.dataset.scriptTaskId));
        if (task) {
          task.status = "创作中";
          task.updatedAt = taskTime();
          renderPage();
        }
        return showToast("任务已接收，可以开始创作", "success");
      }
      if (name === "create-task-script") {
        const taskId = Number(action.closest("[data-script-task-id]")?.dataset.scriptTaskId);
        const task = scriptTasks.find(item => item.id === taskId);
        if (task?.status === "待接收") {
          task.status = "创作中";
          task.updatedAt = taskTime();
          renderPage();
        }
        state.scriptTaskContext = { id: taskId };
        return openModal("create-task-script");
      }
      if (name === "toggle-source-content") {
        const content = action.closest(".script-source-panel")?.querySelector("[data-source-content]");
        if (!content) return;
        content.hidden = !content.hidden;
        action.setAttribute("aria-expanded", String(!content.hidden));
        action.textContent = content.hidden ? "查看原内容" : "收起原内容";
        return;
      }
      if (name === "switch-script-episode") {
        const form = action.closest("form");
        const active = form?.querySelector(".script-episode-tab.is-active");
        const title = form?.querySelector("[name='episodeTitle']");
        const content = form?.querySelector("[name='episodeContent']");
        if (active && title && content) {
          active.dataset.episodeTitle = encodeURIComponent(title.value);
          active.dataset.episodeContent = encodeURIComponent(content.value);
        }
        form?.querySelectorAll(".script-episode-tab").forEach(tab => tab.classList.toggle("is-active", tab === action));
        if (title) title.value = decodeURIComponent(action.dataset.episodeTitle || "");
        if (content) content.value = decodeURIComponent(action.dataset.episodeContent || "");
        return;
      }
      if (name === "toggle-script-editor") {
        const editor = action.closest(".script-episode-editor");
        editor?.classList.toggle("is-expanded");
        action.setAttribute("aria-label", editor?.classList.contains("is-expanded") ? "收起编辑区" : "展开编辑区");
        return;
      }
      if (name === "choose-script-file") {
        const form = action.closest("form");
        const file = form?.querySelector("input[name='file']");
        const stateLabel = form?.querySelector("[data-script-upload-state]");
        const version = state.scriptWorkspaceContext?.type === "script"
          ? versionNumber(scripts.find(item => item.name === state.scriptWorkspaceContext.name)?.version) + 1
          : 1;
        if (file) file.value = `剧本更新稿-V${version}.docx`;
        if (stateLabel) stateLabel.textContent = `已选择：剧本更新稿-V${version}.docx`;
        action.textContent = "重新上传";
        return showToast("剧本文件已加入本次更新", "success");
      }
      if (name === "script-task-detail") return openScriptTaskDetail(action.closest("[data-script-task-id]")?.dataset.scriptTaskId);
      if (name === "task-submission-detail") return openScriptTaskDetail(action.closest("[data-script-task-id]")?.dataset.scriptTaskId, true);
      if (name === "script-library-detail") {
        const row = action.closest("[data-record-type]");
        return openScriptLibraryDetail(row?.dataset.recordType, row?.dataset.recordType === "script-task" ? row.dataset.recordId : row?.dataset.recordName);
      }
      if (name === "view-script-file") return openScriptFilePreview();
      if (name === "rate-script") {
        const row = action.closest("[data-record-type]");
        state.scriptRatingContext = row?.dataset.recordType === "script-task"
          ? { type: "task", id: Number(row.dataset.recordId) }
          : { type: "script", name: row?.dataset.recordName };
        return openModal("script-rating");
      }
      if (name === "share-script-task") {
        const task = scriptTasks.find(item => item.id === Number(action.closest("[data-script-task-id]")?.dataset.scriptTaskId));
        if (task) task.shared = !task.shared;
        renderPage();
        return showToast("共享状态已更新", "success");
      }
      if (name === "confirm-script-project") {
        const row = action.closest("[data-record-type]");
        const item = row?.dataset.recordType === "script-task"
          ? scriptTasks.find(entry => entry.id === Number(row.dataset.recordId))
          : scripts.find(entry => entry.name === row?.dataset.recordName);
        if (!item) return;
        const isEnabled = item.launchDecision === "approved";
        item.launchDecision = isEnabled ? "blocked" : "approved";
        item.launchNote = "";
        renderPage();
        return showToast(isEnabled ? "已取消立项资格，该剧本当前不可立项" : "已允许立项，该剧本现在可以进入立项流程", "success");
      }
      if (name === "more") return showDropdown(action, action.dataset.menu);
      if (name === "task-assets") return openTaskAssets(action.dataset.taskId);
      if (name === "task-process") return openTaskProcess(action.dataset.taskId);
      if (name === "task-review") return openTaskReview(action.dataset.taskId);
      if (name === "task-history") return openTaskHistory(action.dataset.taskId);
      if (name === "task-transfer") return openTaskTransfer(action.dataset.taskId);
      if (name === "task-withdraw") return withdrawTask(action.dataset.taskId);
      if (name === "task-save-draft") {
        const form = document.getElementById("taskProcessForm");
        if (form) handleTaskProcess(form, false);
        return;
      }
      if (name === "batch-assign-episodes") {
        const form = action.closest("form");
        const item = workflowProjects.find(project => project.id === Number(state.workflowContext?.id));
        if (!form || !item) return;
        const assignee = form.querySelector("[data-batch-assignee]")?.value || "";
        const start = Math.max(1, Math.min(item.episodes, Number(form.querySelector("[data-batch-start]")?.value || 1)));
        const end = Math.max(1, Math.min(item.episodes, Number(form.querySelector("[data-batch-end]")?.value || item.episodes)));
        if (start > end) return showToast("起始集数不能大于结束集数", "warning");
        for (let episode = start; episode <= end; episode += 1) {
          const select = form.querySelector(`[name="episode_${episode}"]`);
          if (!select) continue;
          select.value = assignee;
          const rowStatus = select.closest(".episode-assignment-row")?.querySelector(".episode-assignment-status");
          if (rowStatus) rowStatus.innerHTML = assignee ? status("已设置") : status("待负责人分配");
        }
        const assigned = [...form.querySelectorAll('[name^="episode_"]')].filter(select => select.value).length;
        const counter = form.querySelector("[data-assignment-count]");
        if (counter) counter.textContent = `${assigned}/${item.episodes} 集已分配`;
        showToast(assignee ? `已将第 ${start}-${end} 集分配给 ${assignee}` : `已清空第 ${start}-${end} 集分配`, "success");
        return;
      }
      if (name === "assign-member") {
        const id = action.closest("[data-workflow-id]")?.dataset.workflowId;
        return openMemberAssignment(id, action.dataset.role);
      }
      if (name === "view-linked-script") {
        const id = action.closest("[data-workflow-id]")?.dataset.workflowId;
        return openLinkedScript(id);
      }
      if (name === "workflow-assets") {
        const id = action.closest("[data-workflow-id]")?.dataset.workflowId;
        return openWorkflowAssets(id);
      }
      if (name === "workflow-detail") {
        const id = action.closest("[data-workflow-id]")?.dataset.workflowId;
        return openWorkflowDetail(id, action.dataset.role || "production");
      }
      if (name === "view-deadlines") {
        const id = action.closest("[data-workflow-id]")?.dataset.workflowId;
        return openDeadlineDialog(id, action.dataset.role);
      }
      if (name === "open-production") {
        const id = action.closest("[data-workflow-id]")?.dataset.workflowId;
        return openProductionDetail(id);
      }
      if (name === "open-materials") {
        const id = action.closest("[data-workflow-id]")?.dataset.workflowId;
        return openMaterials(id);
      }
      if (["save-production-draft", "submit-production-episode"].includes(name)) {
        const item = workflowProjects.find(project => project.id === Number(state.workflowContext?.id));
        const episode = Number(action.closest("[data-plan-episode]")?.dataset.planEpisode);
        if (!item || !episode) return;
        const updatedAt = taskTime();
        if (name === "save-production-draft") {
          item.productionDrafts[episode] = updatedAt;
          openProductionDetail(item.id);
          return showToast(`第${episode}集草稿已保存，不计入完成进度`, "success");
        }
        const existingBoard = item.storyboards.find(board => Number(board.episode || board.id) === episode);
        if (existingBoard) {
          existingBoard.episode = episode;
          existingBoard.version += 1;
          existingBoard.updated = true;
          existingBoard.downloaded = false;
          existingBoard.updatedAt = updatedAt;
        } else {
          item.storyboards.push({ id: String(episode).padStart(2, "0"), episode, title: `第${episode}集制作成果`, file: `第${episode}集-制作成果.zip`, version: 1, updated: true, downloaded: false, updatedAt });
        }
        item.productionCompletedAt[episode] ||= updatedAt;
        delete item.productionDrafts[episode];
        const progress = roleProgress(item, "production");
        if (progress.completed === progress.total) {
          item.stage = "剪辑中";
          item.editingStartedAt ||= updatedAt;
        }
        renderPage();
        openProductionDetail(item.id);
        return showToast(item.productionCompletedAt[episode] === updatedAt ? `第${episode}集已完成` : `第${episode}集成果已替换，首次完成时间保持不变`, "success");
      }
      if (name === "go-delivery") {
        state.modes.delivery = "editor";
        return navigate("delivery");
      }
      if (name === "open-ip-picker") return openIpImagePicker(action.closest("form"));
      if (name === "close-ip-picker") {
        action.closest("[data-ip-picker-layer]")?.remove();
        return;
      }
      if (name === "confirm-ip-picker") {
        const layer = action.closest("[data-ip-picker-layer]");
        const selectedIps = [...layer.querySelectorAll("[data-ip-image-checkbox]:checked")].map(checkbox => checkbox.value);
        const targetIndices = String(layer.dataset.targetIndices || "").split(",").filter(Boolean);
        if (selectedIps.length !== targetIndices.length) return showToast(`请选择 ${targetIndices.length} 个 IP 形象`);
        const form = modalLayer.querySelector("form[data-modal-submit='confirm-delivery']");
        targetIndices.forEach((targetIndex, index) => {
          const card = form.querySelector(`[data-binding-index='${targetIndex}']`);
          const ip = characterIpCatalog.find(entry => entry.id === selectedIps[index]);
          const value = card?.querySelector("[data-ip-binding-value]");
          const code = card?.querySelector("[data-ip-mapping-code]");
          const cardStatus = card?.querySelector("[data-ip-binding-status]");
          if (value) value.value = ip?.id || "";
          if (code) code.textContent = ip ? `${ip.id} · ${ip.version}` : "尚未绑定";
          card?.classList.add("is-bound");
          if (cardStatus) {
            cardStatus.textContent = "已绑定";
            cardStatus.classList.remove("is-unbound");
          }
        });
        layer.remove();
        refreshIpBindingUi(form);
        return showToast(`已绑定 ${targetIndices.length} 个角色 IP 形象`, "success");
      }
      if (name === "resubmit-board") {
        const item = workflowProjects.find(project => project.id === Number(state.workflowContext?.id));
        const board = item?.storyboards.find(entry => entry.id === action.closest("[data-board-id]")?.dataset.boardId);
        if (board) {
          board.version += 1;
          board.updated = true;
          board.downloaded = false;
          board.updatedAt = "09-09 16:20";
          openProductionDetail(item.id);
          showToast(`分镜 ${board.id} 已重新提交，剪辑端将收到更新提示`, "success");
        }
        return;
      }
      if (name === "add-board") {
        const item = workflowProjects.find(project => project.id === Number(state.workflowContext?.id));
        if (item) {
          const number = String(item.storyboards.length + 1).padStart(2, "0");
          item.storyboards.push({ id: number, title: `新增分镜 ${number}`, file: `${number}-新增分镜.zip`, version: 1, updated: true, downloaded: false, updatedAt: "09-09 16:20" });
          item.stage = "制作中";
          openProductionDetail(item.id);
          showToast("新分镜已提交", "success");
        }
        return;
      }
      if (name === "download-board") {
        const item = workflowProjects.find(project => project.id === Number(state.workflowContext?.id));
        const board = item?.storyboards.find(entry => entry.id === action.closest("[data-board-id]")?.dataset.boardId);
        if (board) {
          board.downloaded = true;
          board.updated = false;
          openMaterials(item.id);
          showToast(`分镜 ${board.id} 已下载最新版本`, "success");
        }
        return;
      }
      if (name === "download-all") {
        const item = workflowProjects.find(project => project.id === Number(state.workflowContext?.id));
        const visibleEpisodes = String(action.dataset.visibleEpisodes || "").split(",").map(Number).filter(Boolean);
        item?.storyboards.filter(board => !visibleEpisodes.length || visibleEpisodes.includes(Number(board.episode || board.id))).forEach(board => { board.downloaded = true; board.updated = false; });
        closeModal();
        renderPage();
        return showToast("已生成全部最新分镜下载包", "success");
      }
      if (name === "delivery-upload") return openDeliveryUpload(action.closest("[data-delivery-name]")?.dataset.deliveryName);
      if (name === "delivery-audit") return openDeliveryAudit(action.closest("[data-delivery-name]")?.dataset.deliveryName);
      if (name === "delivery-view") return openDeliveryView(action.closest("[data-delivery-name]")?.dataset.deliveryName);
      if (name === "open-share") {
        const type = action.dataset.shareType;
        const key = type === "work" ? action.closest("[data-work-code]")?.dataset.workCode : action.closest("[data-delivery-name]")?.dataset.deliveryName;
        return openShareDialog(type, key);
      }
      if (name === "toggle-share-branch") {
        const branch = action.closest("[data-share-branch]");
        const children = branch?.querySelector(".share-org-children");
        if (!children) return;
        const collapsed = !branch.classList.contains("is-collapsed");
        branch.classList.toggle("is-collapsed", collapsed);
        action.setAttribute("aria-expanded", String(!collapsed));
        return;
      }
      if (name === "cancel-share") {
        const context = state.shareContext;
        const item = context?.type === "work" ? works.find(entry => entry.code === context.key) : deliveries.find(entry => entry.name === context?.key);
        const record = shareRecords(item).find(entry => String(entry.id) === String(action.dataset.shareRecordId));
        if (!record || record.cancelledAt || shareRecordState(record).key === "expired") return;
        record.cancelledAt = shareDateTime();
        const row = action.closest(".share-record");
        const recordStatus = row?.querySelector(".share-record__status");
        if (row) row.dataset.shareRecordState = "cancelled";
        if (recordStatus) {
          recordStatus.className = "share-record__status is-cancelled";
          recordStatus.textContent = "已取消";
        }
        action.textContent = "已取消";
        action.disabled = true;
        const activeCount = modalLayer.querySelector("[data-share-active-count]");
        if (activeCount) activeCount.textContent = `${activeSharedMemberCount(item)} 人生效中`;
        refreshShareRecordFilter(action.closest("[data-share-existing]"));
        renderPage();
        return showToast(`已取消 ${record.member} 的本次分享`, "success");
      }
      if (name === "delivery-frame-config") {
        const itemName = action.closest("[data-delivery-name]")?.dataset.deliveryName;
        state.deliveryContext = { name: itemName };
        return openModal("frame-config");
      }
      if (name === "confirm-delivery") return openDeliveryConfirm(action.closest("[data-delivery-name]")?.dataset.deliveryName);
      if (name === "delivery-history") return openDeliveryHistory(action.closest("[data-delivery-name]")?.dataset.deliveryName);
      if (name === "delivery-change") return openDeliveryChange(action.closest("[data-delivery-name]")?.dataset.deliveryName);
      if (name === "request-change") return openChangeRequest(action.closest("[data-work-code]")?.dataset.workCode);
      if (name === "confirm-work-revision") return confirmWorkRevision(action.closest("[data-work-code]")?.dataset.workCode);
      if (name === "view-film") return openFilm(action.closest("[data-work-code]")?.dataset.workCode);
      if (name === "work-upload") return showToast("已打开作品上传入口", "success");
      if (name === "work-operation-apply") return showToast("运营下载申请已提交", "success");
      if (name === "work-editing-apply") return showToast("剪辑下载申请已提交", "success");
      if (name === "work-editing-download") return showToast("正在下载剪辑素材", "success");
      if (name === "work-package") return showToast("正在生成全部下载包", "success");
      if (name === "preview-film") return showToast("正在打开完整成片预览");
      if (name === "task-attach") {
        const fileHint = action.closest(".task-upload")?.querySelector("[data-task-file]");
        if (fileHint) fileHint.textContent = "已选择：任务成果演示文件.zip";
        action.textContent = "重新选择";
        return showToast("演示附件已加入本次提交", "success");
      }
      if (name === "delete-demo") {
        const row = action.closest("[data-record-type]");
        state.pendingDelete = { type: row?.dataset.recordType, id: Number(row?.dataset.recordId) || null, name: row?.dataset.recordName || null };
        return openModal("delete");
      }
      if (name === "toggle-org-picker") {
        const control = action.closest("[data-org-person-select]");
        const picker = control?.querySelector("[data-org-person-picker]");
        if (!picker) return;
        const willOpen = picker.hidden;
        document.querySelectorAll("[data-org-person-picker]").forEach(item => { item.hidden = true; });
        document.querySelectorAll("[data-action='toggle-org-picker']").forEach(button => button.setAttribute("aria-expanded", "false"));
        picker.hidden = !willOpen;
        action.setAttribute("aria-expanded", String(willOpen));
        return;
      }
      if (name === "select-org-person") {
        const control = action.closest("[data-org-person-select]");
        const input = control?.querySelector("input[type='hidden']");
        const label = control?.querySelector("[data-org-person-label]");
        const picker = control?.querySelector("[data-org-person-picker]");
        const trigger = control?.querySelector("[data-action='toggle-org-picker']");
        if (input) input.value = action.dataset.person || "";
        if (label) label.textContent = action.dataset.person || "选择人员";
        control?.querySelectorAll(".org-person-option").forEach(option => option.classList.toggle("is-selected", option === action));
        if (picker) picker.hidden = true;
        trigger?.setAttribute("aria-expanded", "false");
        refreshAllocationCounter(action.closest("form"));
        return;
      }
      if (name === "role-add") {
        const row = action.closest(".role-card__row");
        const clone = row?.cloneNode(true);
        clone?.querySelectorAll("input").forEach(input => { input.value = ""; });
        clone?.querySelectorAll("select").forEach(select => { select.selectedIndex = 0; });
        const personLabel = clone?.querySelector("[data-org-person-label]");
        if (personLabel) personLabel.textContent = "选择人员";
        const picker = clone?.querySelector("[data-org-person-picker]");
        if (picker) picker.hidden = true;
        clone?.querySelectorAll(".org-person-option").forEach(option => option.classList.remove("is-selected"));
        clone?.querySelector("[data-action='toggle-org-picker']")?.setAttribute("aria-expanded", "false");
        row?.parentElement?.append(clone);
        refreshAllocationCounter(action.closest("form"));
        return;
      }
      if (name === "role-remove") {
        const card = action.closest(".role-card");
        const rows = card?.querySelectorAll(".role-card__row") || [];
        if (rows.length > 1) action.closest(".role-card__row")?.remove();
        else {
          const row = action.closest(".role-card__row");
          row?.querySelectorAll("input, select").forEach(control => { if (control.tagName === "SELECT") control.selectedIndex = 0; else control.value = ""; });
          const personLabel = row?.querySelector("[data-org-person-label]");
          if (personLabel) personLabel.textContent = "选择人员";
          row?.querySelectorAll(".org-person-option").forEach(option => option.classList.remove("is-selected"));
        }
        refreshAllocationCounter(action.closest("form"));
        return;
      }
      if (name === "related-project") {
        const scriptName = action.closest("[data-record-name]")?.dataset.recordName;
        return openRelatedProjects(scriptName);
      }
      if (name === "update-script") {
        const scriptName = action.closest("[data-record-name]")?.dataset.recordName;
        return openScriptWorkspace({ scriptName });
      }
      if (["topic-edit", "topic-evaluate", "topic-assign"].includes(name)) {
        const topicId = Number(action.closest("[data-record-id]")?.dataset.recordId);
        const topic = topics.find(item => item.id === topicId);
        if (!topic) return;
        if (name === "topic-assign" && topic.status !== "通过") return showToast("评估通过后才可以分配人员", "warning");
        if (name === "topic-assign" && topic.assignmentStatus === "已分配") return showToast("该选题已完成分配");
        state.topicContext = { id: topicId };
        return openModal(name);
      }
      if (["project-detail", "topic-detail", "hours", "audit", "history", "versions", "view", "feedback", "partner-list", "apply-list", "download-records", "version-history", "version-records"].includes(name)) return openModal("info");
      if (name === "project-switch") return showToast("立项月份已切换为 2026-09");
      if (name === "assignment-switch") return showToast("分配月份已切换为 2026-09");
      if (name === "choose-file") {
        const uploadBox = action.closest(".upload-box");
        const hint = uploadBox?.querySelector("[data-file-hint]");
        const hiddenFile = uploadBox?.querySelector("[data-upload-value], input[name='file']");
        const fileName = action.dataset.demoFile ? `已选择：${action.dataset.demoFile}` : state.activePage === "ips" ? "已选择：IP剧本.docx" : "已选择：剧本创作稿-V1.docx";
        if (hint) hint.textContent = fileName;
        if (hiddenFile) hiddenFile.value = fileName.replace("已选择：", "");
        action.textContent = "重新选择";
        return showToast("文件已加入本次提交", "success");
      }
      if (name === "share") {
        const scriptName = action.closest("[data-record-name]")?.dataset.recordName;
        const script = scripts.find(item => item.name === scriptName);
        if (script) script.shared = !script.shared;
        renderPage();
        return showToast("共享状态已更新", "success");
      }
      if (name === "frame-help") return showToast("宽屏推荐 2560，默认帧率 30fps");
      return showToast("操作入口已保留，当前为前端演示");
    }
    if (!event.target.closest(".dropdown")) document.querySelector(".dropdown")?.remove();
    if (!event.target.closest("[data-org-person-select]")) {
      document.querySelectorAll("[data-org-person-picker]").forEach(item => { item.hidden = true; });
      document.querySelectorAll("[data-action='toggle-org-picker']").forEach(button => button.setAttribute("aria-expanded", "false"));
    }
  });

  document.addEventListener("submit", event => {
    event.preventDefault();
    const taskProcessForm = event.target.closest("[data-task-process]");
    if (taskProcessForm) return handleTaskProcess(taskProcessForm, true);
    const taskReviewForm = event.target.closest("[data-task-review]");
    if (taskReviewForm) return handleTaskReview(taskReviewForm);
    const taskTransferForm = event.target.closest("[data-task-transfer]");
    if (taskTransferForm) return handleTaskTransfer(taskTransferForm);
    const taskAssetsForm = event.target.closest("[data-task-assets]");
    if (taskAssetsForm) return handleTaskAssets(taskAssetsForm);
    const modalForm = event.target.closest("[data-modal-submit]");
    if (modalForm) return handleModalSubmit(modalForm);
    const form = event.target.closest("[data-filter-form]");
    if (form) {
      state.filters[state.activePage] = Object.fromEntries(new FormData(form));
      state.pages[state.activePage] = 1;
      renderPage();
      showToast("查询完成", "success");
    }
  });

  document.addEventListener("reset", event => {
    const form = event.target.closest("[data-filter-form]");
    if (!form) return;
    event.preventDefault();
    state.filters[state.activePage] = {};
    state.pages[state.activePage] = 1;
    renderPage();
    showToast("筛选条件已重置");
  });

  document.addEventListener("input", event => {
    const shareRecordSearch = event.target.closest("[data-share-record-search]");
    if (shareRecordSearch) refreshShareRecordFilter(shareRecordSearch.closest("[data-share-existing]"));
  });

  document.addEventListener("change", event => {
    const uploadType = event.target.closest('form[data-modal-submit="delivery-upload"] input[name="batchType"]');
    if (uploadType) {
      const form = uploadType.closest("form");
      const field = form?.querySelector("[data-completion-range]");
      const input = field?.querySelector("[name='completedRange']");
      const completing = uploadType.value === "complete";
      field?.classList.toggle("is-disabled", !completing);
      if (input) {
        input.disabled = !completing;
        input.required = completing;
      }
      return;
    }
    const deliveryFiles = event.target.closest('form[data-modal-submit="delivery-upload"] input[name="file"]');
    if (deliveryFiles) {
      const summary = deliveryFiles.closest("form")?.querySelector("[data-upload-file-summary]");
      const count = deliveryFiles.files?.length || 0;
      const directories = estimateDeliveryDirectories(deliveryFiles.files || []);
      if (summary) summary.textContent = count ? `已选择 ${count} 个文件，预计生成 ${directories} 个实际交付目录` : "支持批量选择；选择后自动识别实际交付目录";
      return;
    }
    const shareRecordFilter = event.target.closest("[data-share-record-filter]");
    if (shareRecordFilter) {
      refreshShareRecordFilter(shareRecordFilter.closest("[data-share-existing]"));
      return;
    }
    const shareSelectAll = event.target.closest("[data-share-select-all]");
    if (shareSelectAll) {
      const form = shareSelectAll.closest("form");
      form?.querySelectorAll("[data-share-person]").forEach(checkbox => { checkbox.checked = shareSelectAll.checked; });
      refreshShareSelectionUi(form);
      return;
    }
    const shareDepartment = event.target.closest("[data-share-department]");
    if (shareDepartment) {
      const branch = shareDepartment.closest("[data-share-branch]");
      branch?.querySelectorAll("[data-share-person]").forEach(checkbox => { checkbox.checked = shareDepartment.checked; });
      refreshShareSelectionUi(shareDepartment.closest("form"));
      return;
    }
    const sharePerson = event.target.closest("[data-share-person]");
    if (sharePerson) {
      refreshShareSelectionUi(sharePerson.closest("form"));
      return;
    }
    const productionModeControl = event.target.closest('form[data-project-form] input[name="productionMode"]');
    if (productionModeControl) {
      syncProjectProductionMode(productionModeControl.closest("form"));
      return;
    }
    const cardIpSelect = event.target.closest("select[data-ip-binding-value]");
    if (cardIpSelect) {
      const card = cardIpSelect.closest("[data-ip-binding-card]");
      const form = cardIpSelect.closest("form");
      const ip = characterIpCatalog.find(entry => entry.id === cardIpSelect.value);
      const code = card?.querySelector("[data-ip-mapping-code]");
      const cardStatus = card?.querySelector("[data-ip-binding-status]");
      if (code) code.textContent = ip ? `${ip.id} · ${ip.version}` : "尚未绑定";
      card?.classList.toggle("is-bound", Boolean(ip));
      if (cardStatus) {
        cardStatus.textContent = ip ? "已绑定" : "待绑定";
        cardStatus.classList.toggle("is-unbound", !ip);
      }
      refreshIpBindingUi(form);
      if (ip) showToast(`已选择 ${ip.name}`, "success");
      return;
    }
    const ipImageCheckbox = event.target.closest("[data-ip-image-checkbox]");
    if (ipImageCheckbox) {
      const layer = ipImageCheckbox.closest("[data-ip-picker-layer]");
      const limit = Number(layer.dataset.selectionLimit || 0);
      const selected = layer.querySelectorAll("[data-ip-image-checkbox]:checked");
      if (selected.length > limit) {
        ipImageCheckbox.checked = false;
        showToast(`最多选择 ${limit} 个 IP 形象`);
      }
      refreshIpPickerUi(layer);
      return;
    }
    const selectAllCharacters = event.target.closest("[data-ip-select-all]");
    if (selectAllCharacters) {
      const form = selectAllCharacters.closest("form");
      form.querySelectorAll("[data-ip-card-select]").forEach(checkbox => { checkbox.checked = selectAllCharacters.checked; });
      refreshIpBindingUi(form);
      return;
    }
    const characterSelection = event.target.closest("[data-ip-card-select]");
    if (characterSelection) {
      refreshIpBindingUi(characterSelection.closest("form"));
      return;
    }
    const allocationControl = event.target.closest("[data-role-allocation-row] input, [data-role-allocation-row] select");
    if (allocationControl) {
      refreshAllocationCounter(allocationControl.closest("form"));
      return;
    }
    const episodeSelect = event.target.closest('.episode-assignment-row select[name^="episode_"]');
    if (episodeSelect) {
      const form = episodeSelect.closest("form");
      const item = workflowProjects.find(project => project.id === Number(state.workflowContext?.id));
      const rowStatus = episodeSelect.closest(".episode-assignment-row")?.querySelector(".episode-assignment-status");
      if (rowStatus) rowStatus.innerHTML = episodeSelect.value ? status("已设置") : status("待负责人分配");
      const assigned = [...form.querySelectorAll('[name^="episode_"]')].filter(select => select.value).length;
      const counter = form.querySelector("[data-assignment-count]");
      if (counter && item) counter.textContent = `${assigned}/${item.episodes} 集已分配`;
      return;
    }
    const scriptSelect = event.target.closest("select[name='script']");
    if (scriptSelect) {
      const script = scripts.find(item => item.name === scriptSelect.value);
      const form = scriptSelect.closest("form");
      const genre = form?.querySelector("[data-script-genre]");
      const episodes = form?.querySelector("[data-script-episodes]");
      const preview = form?.querySelector("[data-script-preview]");
      if (genre) genre.value = script?.genre || "";
      if (episodes) episodes.value = script?.episodes || "";
      if (preview) {
        const isPartner = form?.querySelector('[name="productionMode"]:checked')?.value === "partner";
        preview.innerHTML = script
          ? `<span class="script-link-preview__icon">${icon("book")}</span><div><strong>${escapeHtml(script.name)} ${script.version}</strong><p>编剧：${escapeHtml(script.uploader)} · ${script.episodes} 集 · 已自动关联剧本内容，编剧信息不可在立项中修改。</p></div><span class="status status--success">已关联</span>`
          : isPartner
            ? `<span class="script-link-preview__icon">${icon("book")}</span><div><strong>剧本资料可选</strong><p>可以关联已有剧本、单独上传文件，也可以暂不提供。</p></div>`
            : `<span class="script-link-preview__icon">${icon("book")}</span><div><strong>关联剧本后自动建立内容关系</strong><p>编剧人员、剧本版本与内容摘要将在这里展示，立项时不再重复分配编剧。</p></div>`;
      }
      return;
    }
    const pageJump = event.target.closest("[data-page-jump]");
    if (pageJump) {
      const value = Math.min(Number(pageJump.max || 1), Math.max(1, Number(pageJump.value || 1)));
      state.pages[state.activePage] = value;
      renderPage();
      showToast(`已切换到第 ${value} 页`);
      return;
    }
    const pageSize = event.target.closest(".page-size");
    if (pageSize) {
      state.pageSizes[state.activePage] = Number(pageSize.value);
      state.pages[state.activePage] = 1;
      renderPage();
      showToast(`已切换为${pageSize.value}条/页`);
      return;
    }
    const audit = event.target.closest("[data-role-audit]");
    if (audit) {
      const top = audit.closest(".role-card__top");
      const label = audit.closest(".region-toggle")?.querySelector(":scope > span:last-child");
      const auditor = top?.querySelector("[data-auditor]");
      if (label) label.textContent = audit.checked ? "已开启审核" : "未开启审核";
      if (auditor) auditor.disabled = !audit.checked;
      return;
    }
    const region = event.target.closest("[data-region-switch]");
    if (region) {
      const project = projects.find(item => item.id === Number(region.dataset.projectId));
      if (project) project.overseas = region.checked;
      const label = region.closest(".region-toggle")?.querySelector(":scope > span:last-child");
      if (label) label.textContent = region.checked ? "海外" : "国内";
      showToast(`资源区域已切换为${region.checked ? "海外" : "国内"}`, "success");
    }
  });

  document.querySelectorAll(".nav-item--expandable").forEach(button => {
    button.addEventListener("click", event => {
      const group = event.currentTarget.closest(".nav-project");
      group.classList.toggle("nav-project--open");
      event.currentTarget.setAttribute("aria-expanded", String(group.classList.contains("nav-project--open")));
    });
  });

  function updateProfileDisplay() {
    const profileButton = document.getElementById("profileButton");
    const avatar = profileButton.querySelector(".profile__avatar");
    avatar.textContent = currentAccount.slice(0, 1).toUpperCase();
    profileButton.setAttribute("aria-label", `${currentAccount}，修改账号密码`);
    profileButton.title = `${currentAccount} · 账号设置`;
  }

  document.getElementById("profileButton").addEventListener("click", () => openModal("account-settings"));

  window.addEventListener("hashchange", () => {
    const page = location.hash.slice(1);
    if (pageMeta[page] && page !== state.activePage) navigate(page);
  });

  hydrateIcons();
  updateProfileDisplay();
  const initialPage = pageMeta[location.hash.slice(1)] ? location.hash.slice(1) : "projects";
  navigate(initialPage);
})();
