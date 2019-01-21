var var_table = {}
var func, name, ver, arch, lang

function add_var(key, val) {
  var_table[key] = val
}

function get_var(key) {
  return var_table[key]
}

function expand_str(str) {
  return str.replace(/%(.+?)%/g, fill_var)
}

function fill_var($0, $1) {
  return var_table[$1]
}


function echo(msg) {
}

function error(msg) {
}

function quit(code){
}
