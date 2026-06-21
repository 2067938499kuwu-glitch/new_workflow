/* AIGC管理后台 - 成片库模块 */
var FilmLibrary = (function() {

    function render() {
        var tbody = Utils.byId('filmTableBody');
        tbody.innerHTML = AppData.filmData.map(function(r) {
            return '<tr class="hover:bg-gray-50/50">'
                + '<td class="py-3.5 px-4 font-semibold text-blue-600 cursor-pointer">' + r.id + '</td>'
                + '<td class="py-3.5 px-4 text-gray-900 font-medium">' + r.name + '</td>'
                + '<td class="py-3.5 px-4 text-gray-600">' + r.episodes + '</td>'
                + '<td class="py-3.5 px-4 text-gray-400">' + r.category + '</td>'
                + '<td class="py-3.5 px-4"><span class="font-medium px-2 py-0.5 rounded border ' + r.statusClass + '">' + r.status + '</span></td>'
                + '<td class="py-3.5 px-4 text-gray-400">' + r.deadline + '</td>'
                + '<td class="py-3.5 px-4"><div class="flex items-center space-x-2"><label class="switch"><input type="checkbox" ' + (r.synced?'checked':'') + '><span class="slider"></span></label><span class="' + (r.synced?'text-green-600 font-medium':'text-gray-400 text-xs') + '">' + (r.synced?'已同步':'未同步') + '</span></div></td>'
                + '<td class="py-3.5 px-4 text-center"><button class="text-blue-600 hover:text-blue-800 font-semibold"><i class="fa-regular fa-eye"></i> 查看</button></td>'
                + '</tr>';
        }).join('');

        tbody.querySelectorAll('.switch input').forEach(function(input) {
            input.addEventListener('change', function() {
                var lbl = this.closest('.flex').querySelector('span');
                if (this.checked) { lbl.textContent = '已同步'; lbl.className = 'text-green-600 font-medium'; }
                else { lbl.textContent = '未同步'; lbl.className = 'text-gray-400 text-xs'; }
            });
        });
    }

    return { render: render };
})();
