:: gen_publish.bat 用于打包程序到发布目录（.\bin）
@echo off
chcp 65001

echo 请耐心等待编译完成

start /WAIT cmd /c npm run tauri build

set "SourceDir=.\src-tauri\target\release\"
set "SourceFile=.\src-tauri\target\release\JTOP Game Launcher.exe"
set "TargetDir=.\bin"
set "PythonPath=./python-3.12.5-amd64/python.exe"

cmd /c %PythonPath% py2pyd.py ./src-python

:: 复制所有pyd文件到release目录
for %%f in (".\*.pyd") do (
    copy /Y "%%f" "%TargetDir%"
)

del /Q ".\*.pyd"

:: 复制所有pyd文件到发布目录
for %%f in ("%SourceDir%\*.pyd") do (
    copy /Y "%%f" "%TargetDir%"
)

:: 检查发布目录是否存在，如果不存在则创建它
if not exist "%TargetDir%" mkdir "%TargetDir%"

:: 复制文件到发布目录
copy /Y "%SourceFile%" "%TargetDir%\"

echo 成功！
pause