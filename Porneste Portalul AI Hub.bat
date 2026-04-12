@echo off
title AI Hub Portal Server
echo ==========================================
echo    AI NEXT Hub - Pornire Server Local
echo ==========================================
echo.
echo Acest portal necesita un server local securizat (din cauza protectiei browserului pentru modulele AURA GEN).
echo Te rugam sa astepti, portalul se va deschide in browserul tau in cateva secunde...
echo.

cd ..
:: Use python if available, otherwise npx http-server
where python >nul 2>nul
if %errorlevel% equ 0 (
    echo [INFO] Folosesc Python pentru a porni serverul...
    start http://localhost:8000/site%%20web%%20ia/index.html
    python -m http.server 8000
    exit /b
)

where npx >nul 2>nul
if %errorlevel% equ 0 (
    echo [INFO] Folosesc Node npx pentru a porni serverul...
    start http://localhost:8080/site%%20web%%20ia/index.html
    cmd /c "npx http-server -p 8080 -c-1"
    exit /b
)

echo [EROARE] Nici Python, nici Node.js nu sunt instalate!
echo Te rugam sa instalezi Node.js de pe https://nodejs.org/ pentru a putea deschide AURA GEN.
pause
