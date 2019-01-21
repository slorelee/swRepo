var wsh = new ActiveXObject("WScript.Shell");


function Run(file) {
    wsh.Run('"' + file + '"');
}

function run_cmd(file, style, wait) {
    wsh.Run(file, style, wait);
}

function eformat(str) {
    return wsh.ExpandEnvironmentStrings(str);
}

function exec_cmd(cmd) {
    var env = wsh.Environment("PROCESS");
    var tmp = env("WB_ROOT") + "_Factory_\\tmp\\_exec.tmp";
    cmd = eformat(cmd);
    wsh.Run(cmd + " 1>" + tmp, 0, true);
    return load_text_file(tmp);
}
