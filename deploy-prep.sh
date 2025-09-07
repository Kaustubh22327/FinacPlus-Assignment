#!/bin/bash

echo "🚀 Preparing Indian Music Library for Deployment..."
echo "=================================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "📋 Step 1: Installing dependencies..."

npm install --legacy-peer-deps

echo "📋 Step 2: Installing microfrontend dependencies..."
cd music-library-mf
npm install --legacy-peer-deps
cd ..

echo "📋 Step 3: Running linter..."
npm run lint

echo "📋 Step 4: Building the project..."
npm run build:all

echo "📋 Step 5: Testing the build..."
npm run preview &
PREVIEW_PID=$!
sleep 3

echo "✅ Build completed successfully!"
echo ""
echo "📁 Your built files are in the 'dist' directory"
echo "🌐 Preview server started on http://localhost:4173"
echo ""
echo "🚀 Ready for deployment! Choose your preferred option:"
echo "   1. Vercel: vercel --prod"
echo "   2. Netlify: netlify deploy --prod --dir=dist"
echo "   3. GitHub Pages: npm run deploy (after setting up gh-pages)"
echo "   4. Firebase: firebase deploy (after firebase init)"
echo ""
echo "Press Ctrl+C to stop the preview server"

# Keep preview running
wait $PREVIEW_PID
