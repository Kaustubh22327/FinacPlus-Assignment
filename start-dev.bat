@echo off

echo Starting Music Library Micro Frontend on port 3001...
cd music-library-mf
start "Micro Frontend" cmd /k "pnpm dev"

echo Waiting for micro frontend to start...
timeout /t 5 /nobreak > nul

echo Starting Main Application on port 3000...
cd ..
start "Main App" cmd /k "pnpm dev"

echo.
echo Both applications are starting...
echo Main App: http://localhost:3000
echo Micro Frontend: http://localhost:3001
echo.
echo Press any key to exit...
pause > nul
