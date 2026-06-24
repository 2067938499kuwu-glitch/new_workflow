var Utils = {
    qs: function(sel, root) { return (root || document).querySelector(sel); },
    qsa: function(sel, root) { return (root || document).querySelectorAll(sel); },
    byId: function(id) { return document.getElementById(id); },
    pageTitle: function(text) {
        var el = Utils.byId('pageTitle');
        if (el) el.textContent = text;
    },
    escapeHtml: function(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    },
    badgeClassByStatus: function(status) {
        if (status.indexOf('完成') !== -1 || status.indexOf('通过') !== -1) return 'table-pill table-pill-status-complete';
        if (status.indexOf('驳回') !== -1) return 'table-pill table-pill-status-warning';
        return 'table-pill table-pill-status-running';
    },
    renderEmptyState: function(title, desc) {
        return '<div class="empty-state"><div class="empty-state__icon"><i class="fa-regular fa-folder-open"></i></div><div class="empty-state__title">'
            + Utils.escapeHtml(title)
            + '</div><div class="empty-state__desc">'
            + Utils.escapeHtml(desc)
            + '</div></div>';
    }
};
