@echo off
echo 🧪 Testing Add/Delete Song Functionality
echo ========================================

echo 📋 Step 1: Installing dependencies...
call npm install --legacy-peer-deps

echo 📋 Step 2: Installing microfrontend dependencies...
cd music-library-mf
call npm install --legacy-peer-deps
cd ..

echo 📋 Step 3: Starting development servers...
echo.
echo 🚀 Starting microfrontend server...
start "Microfrontend" cmd /k "cd music-library-mf && npm run dev"

timeout /t 5 /nobreak >nul

echo 🚀 Starting main application...
start "Main App" cmd /k "npm run dev"

echo.
echo ✅ Both servers should be starting now!
echo.
echo 📖 Test Instructions:
echo   1. Wait for both servers to start (check the new windows)
echo   2. Open http://localhost:3002 (or the port shown)
echo   3. Click on "Admin Login" demo credential
echo   4. Try adding a new song using the "Add Song" button
echo   5. Try deleting a song using the trash icon
echo   6. You should see success notifications!
echo.
echo 💡 If you see issues, check the console in both server windows
echo.
pause
