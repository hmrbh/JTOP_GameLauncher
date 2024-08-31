@echo off
chcp 65001

:: 获取当前脚本所在的绝对路径
set "ScriptDir=%~dp0"

:: 设置源代码目录和目标目录的绝对路径
set "SourceDir=%ScriptDir%\src-python\"
set "TargetDir_d=%ScriptDir%\src-tauri\target\debug\"
set "TargetDir_r=%ScriptDir%\src-tauri\target\release\"
set "PythonPath=%ScriptDir%\Python312\python.exe"

:: 删除所有pyd文件
del /Q "%TargetDir_d%\*.pyd"
del /Q "%TargetDir_r%\*.pyd"

:: 运行Python脚本
 "%PythonPath%" -u "%ScriptDir%/py2pyd.py"

:: 复制所有文件到目标目录
for %%f in ("bin-python\*.py") do (
    copy /Y "%%f" "%TargetDir_d%"
)
for %%f in ("bin-python\*.pyd") do (
    copy /Y "%%f" "%TargetDir_d%"
)
for %%f in ("src-python\*.py") do (
    copy /Y "%%f" "%TargetDir_r%"
)
for %%f in ("src-python\*.pyd") do (
    copy /Y "%%f" "%TargetDir_r%"
)
:: 运行Tauri开发服务器
cmd /c npm run tauri dev