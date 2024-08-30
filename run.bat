chcp 65001
:: run.bat 用于开发程序和调试
@echo off
set "SourceDir=.\src-python\"
set "TargetDir_d=.\src-tauri\target\debug\"
set "TargetDir_r=.\src-tauri\target\release\"

:: 删除所有python文件
del /Q "%TargetDir_d%\*.py"
del /Q "%TargetDir_r%\*.py"

:: 复制所有python文件
if not exist "%TargetDir_d%" mkdir "%TargetDir_d%"
xcopy /E /I /Y "%SourceDir%" "%TargetDir_d%"

if not exist "%TargetDir_r%" mkdir "%TargetDir_r%"
xcopy /E /I /Y "%SourceDir%" "%TargetDir_r%"

npm run tauri dev