/* AIGC管理后台 - 工具函数 */
var Utils = {
    qs: function(sel) { return document.querySelector(sel); },
    qsa: function(sel) { return document.querySelectorAll(sel); },
    byId: function(id) { return document.getElementById(id); },
    pageTitle: function(text) { Utils.byId('pageTitle').textContent = text; }
};
