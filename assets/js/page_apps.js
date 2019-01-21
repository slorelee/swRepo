var $apps = [];
var $ver_item = [];
var _last_filter_arch = 'ALL';

var _env = wsh.Environment("PROCESS");


function apps_page_init() {
  do_refresh();
}


function filter_by_arch(arch, force) {
    if (_last_filter_arch == arch && !force) return;
    if (arch == 'ALL') {
        $(".arch_x64").removeClass('arch_hidden');
        $(".arch_x86").removeClass('arch_hidden');
    } else if (arch == 'x64') {
        $(".arch_x64").removeClass('arch_hidden');
        $(".arch_x86").addClass('arch_hidden');
    } else if (arch == 'x86') {
        $(".arch_x64").addClass('arch_hidden');
        $(".arch_x86").removeClass('arch_hidden');
    }
    _last_filter_arch = arch;
}


function do_refresh() {
    var apps = get_apps('data');
    $apps.length = 0;     //clear
    $ver_item.length = 0; //clear
    for (var i in apps) {
        var item = APP.New(apps[i].name);
        //var ver = item.info['versions'];
        var arch = info['arch'] || [];
        item.info['name'] = apps[i].name;
        //item['versions'] = ver; 
        item.info['arch'] = arch;
        $apps.push(item.info);
    }
    update_apps_table();
    if (_last_filter_arch) {
        filter_by_arch(_last_filter_arch, 1);
    }
}


function ver_item_delete(n) {
    var info = $ver_item[n];
    if (info.status != 'done') return;
    var msg = 'Do you want to delete ?\r\n' + info.archive_path;
    if (confirm(msg)) {
        fso.DeleteFile(info.archive_path);
        update_ver_item_status(n);
        return 1;
    }
    return 0;
}

function ver_item_download(n) {
    var info = $ver_item[n];
    if (info.status != 'done') {
        _env('UI_USE_PROXY') = $('#chk_use_proxy').prop('checked');
        _env('UI_NO_PAUSE') = $('#chk_no_pause').prop('checked');
        run_cmd( 'fetch.cmd ' + info.name + ' /ver:' + info.ver + ' /arch:' + info.arch, 10, true);
        update_ver_item_status(n);
    }
}

function ver_item_update(n) {
    var info = $ver_item[n];
    ver_item_delete(n);
    ver_item_download(n);
    update_ver_item_status(n);
}


function update_ver_item_status(n) {
    var info = $ver_item[n];
    if (fso.FileExists(info.archive_path)) {
        info.status = 'done';
        $('#ver_item_' + n + ' img').addClass('status_done').removeClass('status_download');
        return;
    }
    info.status = 'miss';
    $('#ver_item_' + n + ' img').addClass('status_download').removeClass('status_done');
}

function get_apps(rootdir) {
    var arr = new Array();
    get_sub_apps(rootdir, rootdir, '#', arr);
    return arr;
}

function get_sub_apps(rootdir, pdir, pid, arr) {
    var cdir = rootdir + '/' + pdir;
    if (pid == '#') cdir = pdir;

    var folder = fso.GetFolder(cdir);
    var fenum = new Enumerator(folder.SubFolders);
    for (var i = 0 ; !fenum.atEnd();i++) {
        var name = fenum.item().Name;
        var cid = pdir + '/' + name;
        if (pid == '#') cid = name;
        if (fso.FileExists(cdir + '/' + name + '/info.js')) {
            var item = { "id" : cid , "parent" : pid, "name" : name
             //"state": {opened: state_opened, checked: state_selected}
            };
            arr.push(item);
            // get_sub_apps(rootdir, cid, cid, arr);
        }
        fenum.moveNext();
    }
}

function update_apps_table() {
  var str = '<div style="overflow-y:auto">';
  for (var i in $apps) {
    str += add_app_block($apps[i]);
  }
  str += '</div>';
  $("#app_all_list").html(str);
  event_regist();
}

function add_app_block(app) {
  var s = '<div class="box">';
  s += '<table class="app_table" style="width:100%">';
  s += add_app_line(app.name);
  $.each(app.versions, function(i_v, ver) {
      $.each(app.arch, function(i_a, arch) {
          var obj = {'name':app.name, 'ver': ver, 'arch': arch, 'fetch': app.fetch};
          if (app.fetch_init) obj['fetch_init'] = app.fetch_init;
          $ver_item.push(obj);
          s += add_app_ver_line(obj);
      });
  });
  s += '</table></div>';
  return s + '</tr>';
}

function name2class(name) {
    return name.replace(/[ \[\]]/g, '_')
}

function toggle_app_table(btn, name) {
    var t = $(btn).text();
    if (t == '+') {
        $(btn).text('-');
    } else {
        $(btn).text('+');
    }
    toggle_by_class(name2class(name));
}


function check_ver_status(obj) {
    name = obj.name;
    arch = obj.arch;
    add_var('name', obj.name);
    add_var('version', obj.ver);
    add_var('arch', obj.arch || '');
    if (obj.fetch_init) obj.fetch_init();
    var node = obj['fetch'][obj.ver] || obj['fetch']['%version%']
    if (!node) {
         var ver_key = obj['fetch']['versions'][0]
        node = obj['fetch'][ver_key]
    }
    var archive = expand_str(node['archive']);
    obj.archive = archive;
    obj.archive_path = 'data/' + name + '/' + archive;
    if (fso.FileExists('data/' + name + '/' + archive)) {
        obj.status = 'done';
        return 'done';
    }
    return 'miss';
}

function add_app_line(name) {
  var s = "\r\n<tr>";
  s += '<td style="width:50%">'
    + '<button class="col_button" style="line-height:24px;height:24px;width:24px" onclick="toggle_app_table(this, \''+ name + '\')">-</button>'
    + '<span style="font-weight:bold;color:#000">' + name + '</span></td>';
  s += '<td style="width:20%">' + '</td>';  //status
  s += '<td style="width:30%">' + '</td>';  //action
  return s + '</tr>';
}

function add_app_ver_line(app) {
  var status = check_ver_status(app);
  var cls = name2class(app.name) + ' arch_' + app.arch;
  var n = $ver_item.length - 1;
  var s = '\r\n<tr id="ver_item_' + n + '" class="'+ cls + '">';
  s += '<td><span style="padding-left:30px">' + app.ver + ' (' + app.arch + ')</span></td>';
  cls = 'status_download';
  if (status == 'done') cls = 'status_done';
  s += '<td>' + '<img class="' + cls + '" onclick="ver_item_download(' + n + ')"></img>' + '</td>';  //status

  s += '<td>'
    + '<button style="margin:0px 0px 5px 0px" class="pure-button button-maroon" onclick="ver_item_delete(' + n + ')">delete</button>'
    + '<button style="margin:0px 0px 5px 10px" class="pure-button button-blue" onclick="ver_item_update(' + n + ')">update</button>'
    + '</td>';  //action
  return s + '</tr>';
}


function event_regist() {
  $(".app_table>tbody>tr").on("click", function () {
    $(this).parent().find("tr.focus").toggleClass("focus");
    $(this).toggleClass("focus");
  });
}

function toggle_by_class(cls) {
  $("." + cls).toggleClass("hidden");
}

