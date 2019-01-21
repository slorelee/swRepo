@echo off
pushd "%~dp0"

if not exist x64\ mkdir x64
if not exist x86\ mkdir x86
if not exist "x86\wget.exe" expand.exe wget_x86.ex_ x86\wget.exe

call :EXPAND_BIN 7za

rem get aria2
call :download_aria2 86
call :download_aria2 64

popd
goto :EOF

:download_aria2
set aria2_pkg=aria2-1.34.0-win-%1bit-build1
if "%1"=="86" set aria2_pkg=aria2-1.34.0-win-32bit-build1
if not exist x%1\aria2c.exe (
  if not exist %aria2_pkg%.zip (
    call :WGET_DL %aria2_pkg%.zip https://github.com/aria2/aria2/releases/download/release-1.34.0/%aria2_pkg%.zip
  )
  x%1\7za e -ox%1 %aria2_pkg%.zip %aria2_pkg%\aria2c.exe
)
goto :EOF

:EXPAND_BIN
if not exist "x64\%1.exe" (
  expand.exe %1_x64.ex_ x64\%1.exe
)
if not exist "x86\%1.exe" (
  expand.exe %1_x86.ex_ x86\%1.exe
)
goto :EOF

:BITS_DL
bitsadmin /transfer DLJob /download /priority normal %2 "%~f1"
goto :EOF

:WGET_DL
rem x86\wget.exe --no-check-certificate -O "%~f1" %2
x86\aria2c.exe %2 -o "%1"
goto :EOF
