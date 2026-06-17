@echo off
title AD-GENIUS AI - Local Dev Server
echo ==========================================
echo    AD-GENIUS AI - Starting Local Studio
echo ==========================================
echo.
echo Starting local web server...
echo.

cd /d "%~dp0"

where python >nul 2>nul
if %errorlevel% equ 0 (
    echo [INFO] Starting Python HTTP Server on port 8081...
    start http://localhost:8081/index.html
    python -m http.server 8081
    exit /b
)

where npx >nul 2>nul
if %errorlevel% equ 0 (
    echo [INFO] Starting Node http-server on port 8081...
    start http://localhost:8081/index.html
    cmd /c "npx http-server -p 8081 -c-1"
    exit /b
)

echo [WARNING] Neither Python nor Node.js were found in PATH.
echo Opening index.html directly in the default browser...
start index.html
pause
