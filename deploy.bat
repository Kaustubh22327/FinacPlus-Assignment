@echo off
echo 🚀 Indian Music Library - Deployment Preparation
echo ===============================================

echo 📋 Step 1: Installing dependencies...
call npm install --legacy-peer-deps

echo 📋 Step 2: Installing microfrontend dependencies...
cd music-library-mf
call npm install --legacy-peer-deps
cd ..

echo 📋 Step 3: Building the project...
call npm run build:all

if %errorlevel% neq 0 (
    echo ❌ Build failed! Please check the errors above.
    pause
    exit /b 1
)

echo ✅ Build completed successfully!
echo.
echo 📁 Your built files are in the 'dist' directory
echo.
echo 🚀 Ready for deployment! Choose your preferred option:
echo    1. Vercel: vercel --prod
echo    2. Netlify: netlify deploy --prod --dir=dist  
echo    3. GitHub Pages: npm run deploy (after setting up gh-pages)
echo    4. Firebase: firebase deploy (after firebase init)
echo.
echo 📖 See DEPLOYMENT_GUIDE.md for detailed instructions
echo.
pause
