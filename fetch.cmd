@if (0)==(0) echo off
set "SWREPO_ROOT=%~dp0"
if not "x%~1"=="x" goto :main
:usage
echo fetch ^<software^> [/ver:^<ver^>] [/arch:x86^|x64] [/lang:^<lang^>]
echo fetch PECMD /lang:ch
echo fetch PENetwork /ver:v0.59.B10
echo fetch PENetwork /ver:v0.59.B10 /arch:x64

for /f "delims=" %%a in ('cscript //nologo //e:jscript "%~f0" GETCONF DMY') do set "%%a"
call bin\UpdateBin.cmd
pause
goto :EOF

:main
rem for /f "delims=" %%a in ('cscript //nologo //e:jscript "%~f0" GETINFO %*') do echo [DEBUG]"%%a"

set FETCH_ERROR=&&set FETCH_ERRORLEVEL=
set FETCH_ARCHIVE=&&set FETCH_FROM=&&set FETCH_FALLBACK=

for /f "delims=" %%a in ('cscript //nologo //e:jscript "%~f0" GETINFO %*') do set "%%a"
if not "x%FETCH_ERROR%"=="x" (echo %FETCH_ERROR%&&goto :end)

:fetch_info
if "x%FETCH_INFO%"=="x" goto :download
(call :fetch_info) && goto :end

:download
if exist "data/%FETCH_NAME%/%FETCH_ARCHIVE%" (
  echo [OK]data/%FETCH_NAME%/%FETCH_ARCHIVE%
  goto :end
)

call :fetch_info
rem donwloading...
if "x%FETCH_BIN%"=="x1" goto :fetch_dl
if "x%PROCESSOR_ARCHITECTURE%"=="xAMD64" (
  set "PATH=%~dp0\bin\x64;%PATH%"
) else (
  set "PATH=%~dp0\bin\x86;%PATH%"
)
set FETCH_BIN=1

:fetch_dl
rem http_proxy
if /i not "x%UI_USE_PROXY%"=="xfalse" (
  for /f "delims=" %%a in ('cscript //nologo //e:jscript "%~f0" GETCONF DMY') do set "%%a"
)

set "FETCH_FILE=%FETCH_ARCHIVE%"
if not "x%FETCH_TO%"=="x" set "FETCH_FILE=%FETCH_TO%"
pushd "data/%FETCH_NAME%"
rem del /f /q "%FETCH_FILE%"
if exist "%FETCH_FILE%" goto :fetch_processor
aria2c "%FETCH_FROM%" -o "%FETCH_FILE%"
if %errorlevel% NEQ 0 aria2c "%FETCH_FALLBACK%" -o "%FETCH_FILE%"
:fetch_processor
if exist processor.bat call processor.bat
popd

:end
if /i not "x%UI_NO_PAUSE%"=="xtrue" (
  pause
)
goto :EOF

:fetch_info
echo [DOWNLOAD]data/%FETCH_NAME%/%FETCH_ARCHIVE%
echo [    FROM]%FETCH_FROM%
if not "x%FETCH_TO%"=="x" echo [      TO]%FETCH_TO%
goto :EOF

@end

var objArgs = WScript.Arguments;
// WScript.Echo(objArgs.length)
if (objArgs.length < 2) {
  error('Invaild Arguments.')
  quit(1)
}

var var_table = {}
var func, name, ver, arch, lang, info_mode
func = objArgs.Item(0)
name = objArgs.Item(1)
ver = objArgs.Named.Item("ver") || 'latest'
arch = objArgs.Named.Item("arch") || ''
lang = objArgs.Named.Item("lang") || ''
info_mode = objArgs.Named.Item("info") || ''

add_var('name', name)
add_var('version', ver)
add_var('arch', arch)
add_var('lang', lang)

/*for (var i = 0; i < objArgs.length; i++) {
   WScript.Echo('ARGUMENTS(' + i + '):' + objArgs(i))
}*/

var fso = new ActiveXObject("Scripting.FileSystemObject")
var ForReading = 1, ForWriting = 2
var wsh = new ActiveXObject("WScript.Shell");

// http(s)_proxy, fallback_root settings
load_conf()
if (func == 'GETCONF') {
  if (use_proxy) {
    if (http_proxy != '') {
      echo('http_proxy=' + http_proxy)
    }
    if (https_proxy != '') {
      echo('https_proxy=' + https_proxy)
    }
  }
  quit(0)
}

var info = load_info(name)
var node = info['fetch'][ver]
if (!node && ver == 'latest') {
  ver = info['versions'][0]
  add_var('version', ver)
  node = info['fetch'][ver]
}

if (!node) {
  node = info['fetch']['%version%']
}

if (!node) {
  error('Invaild Arguments.')
  quit(1)
}

if (func == 'GETINFO') {
  /* return download info */
  echo('FETCH_INFO=' + info_mode)
  echo('SWREPO_ROOT=' + swrepo_root)
  echo('FETCH_NAME=' + name)
  echo('FETCH_ARCHIVE=' + expand_str(node['archive']))
  if (node['from']) echo('FETCH_FROM=' + expand_str(node['from']))
  if (node['to']) echo('FETCH_TO=' + expand_str(node['to']))
  if (node['fallback']) {
    var fb_url = fallback_root.replace('%s', expand_str(node['fallback']))
    echo('FETCH_FALLBACK=' + fb_url)
  }
  quit(0)
}

quit(0)

/* func == 'DOWNLOAD' */
var archive = expand_str(node['archive'])
if (fso.FileExists(name + '/' + archive)) {
  //TODO: md5 check
  echo(archive)
  quit(0)
}

echo('Downloading:' + archive)
if (!download(name, node)) {
  echo('Download failed.')
  quit(1)
}

echo('Download done.')
echo(archive)
quit(0)

/* ======================================================= */
function load_conf() {
  var f = fso.OpenTextFile('config.js', ForReading)
  eval(f.ReadAll())
  f.Close()

  //proxy
  if (http_proxy != '') {
    var env = wsh.Environment("PROCESS")
    env('http_proxy') = http_proxy
  }
  if (swrepo_root != '') {
    swrepo_root = wsh.ExpandEnvironmentStrings(swrepo_root)
  }
}

function load_info(name) {
  if (!fso.FileExists('data/' + name + '/info.js')) {
    error('Invaild Arguments.')
    quit(1)
  }
  var f = fso.OpenTextFile('data/' + name + '/info.js', ForReading)
  eval(f.ReadAll())
  f.Close()
  if (typeof(fetch_init)=='function') fetch_init()
  return info
}

function download(name, obj) {
  var to = name + '/' + expand_str(node['archive'])
  var from = expand_str(node['from'])
  //TODO: proxy
  var rc = exec('wget -O ' + to + ' ' + from)
  if (rc == 0) return 0
  var fallback = expand_str(node['fallback'])
  return exec('wget -O ' + to + ' ' + fallback_root + fallback)
}

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

function run(cmd) {
  return wsh.Run(cmd, 1, true)
}

function exec(cmd) {
  echo(cmd)
  var oExec = wsh.Exec(cmd)
  while (true) {
     if (!oExec.StdOut.AtEndOfStream) {
         print(oExec.StdOut.ReadLine)
     }
     if (oExec.Status == 1) break
     WScript.Sleep(100)
  }
  return oExec.ExitCode
}

function echo(msg) {
  WScript.Echo(msg)
}

function error(msg) {
  WScript.Echo('FETCH_ERROR=' + msg)
}

function quit(code){
  if (code != 0) WScript.Echo('FETCH_ERRORLEVEL=' + code)
  WScript.Quit(code)
}
