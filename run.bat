chcp 65001
:: run.bat 用于开发程序和调试
@echo off
set "SourceDir=.\src-python\"
set "TargetDir_d=.\src-tauri\target\debug\"
set "TargetDir_r=.\src-tauri\target\release\"
set "PythonPath=.\python-3.12.5-amd64\python.exe"

:: 删除所有python文件
del /Q "%TargetDir_d%\*.py"
del /Q "%TargetDir_r%\*.py"

cmd /c (%PythonPath% py2pyd.py .\src-python)

:: 复制所有pyd文件到目标目录
for %%f in (".\*.pyd") do (
    copy /Y "%%f" "%TargetDir_d%"
)
for %%f in (".\*.pyd") do (
    copy /Y "%%f" "%TargetDir_r%"
)

npm run tauri dev