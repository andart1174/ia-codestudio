@echo off
title AuraGen IDE - Professional AI Site Generator
echo ==========================================
echo    AuraGen IDE - Starting Application
echo ==========================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/ to run this application.
    pause
    exit /b
)

:: Check if node_modules exists
if not exist "node_modules\" (
    echo [INFO] First time setup: Installing dependencies...
    call npm install
)

echo [INFO] Launching development server...
echo.
call npm run dev

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Failed to start the application.
    echo Please check if you have another instance running or if there are errors in the code.
    pause
)
