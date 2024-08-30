@echo off
chcp 65001

:: 获取当前脚本所在的绝对路径
set "ScriptDir=%~dp0"

:: 设置源代码目录和目标目录的绝对路径
set "SourceDir=%ScriptDir%\src-python\"
set "TargetDir_d=%ScriptDir%\src-tauri\target\debug\"
set "TargetDir_r=%ScriptDir%\src-tauri\target\release\"
set "PythonPath=%ScriptDir%\python-3.12.5-amd64\python.exe"

:: 删除所有pyd文件
del /Q "%TargetDir_d%\*.py"
del /Q "%TargetDir_r%\*.py"

:: 运行Python脚本
:: "%PythonPath%" "%ScriptDir%/py2pyd.py"

:: 复制所有py文件到目标目录
for %%f in ("src-python\*.py") do (
    copy /Y "%%f" "%TargetDir_d%"
)
for %%f in ("src-python\*.py") do (
    copy /Y "%%f" "%TargetDir_r%"
)

:: 删除构建目录中的所有pyd文件
del /Q "src-python\*.py"

:: 运行Tauri开发服务器
cmd /c npm run tauri dev