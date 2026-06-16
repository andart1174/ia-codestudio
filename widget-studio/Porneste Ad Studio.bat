@echo off
title AI Ad & Widget Studio Server
echo ==========================================
echo    AI Ad & Widget Studio - Launch Server
echo ==========================================
echo.
echo Launching local server for testing the Widget Generator...
echo.

where python >nul 2>nul
if %errorlevel% equ 0 (
    echo [INFO] Launching with Python http.server...
    start http://localhost:8001/index.html
    python -m http.server 8001
    exit /b
)

where npx >nul 2>nul
if %errorlevel% equ 0 (
    echo [INFO] Launching with Node.js npx http-server...
    start http://localhost:8001/index.html
    cmd /c "npx http-server -p 8001 -c-1"
    exit /b
)

echo [WARNING] Neither Python nor Node.js were found in the path.
echo Opening index.html directly. Note: Some browser security restrictions may apply to local iframes.
start index.html
pause
