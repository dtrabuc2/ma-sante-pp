@echo off
REM Script pour démarrer le projet complet (Frontend + Backend) sur Windows

echo Demarrage de Ma Sante ++
echo.
echo ================================

REM Demarrer le backend
echo.
echo 1. Demarrage du backend Express (port 5000)...
start cmd /k "cd backend && npm run dev"

REM Attendre un peu
timeout /t 2 /nobreak

REM Demarrer le frontend
echo 2. Demarrage du frontend React (port 5173)...
start cmd /k "npm run dev"

echo.
echo ================================
echo.
echo Tous les serveurs sont lances!
echo.
echo Frontend React: http://localhost:5173
echo Backend Express: http://localhost:5000
echo.
echo Pour arreter: Ctrl+C dans les terminaux
