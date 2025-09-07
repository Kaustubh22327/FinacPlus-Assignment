#!/bin/bash

# Start Music Library Micro Frontend
echo "Starting Music Library Micro Frontend on port 3001..."
cd music-library-mf
pnpm dev &
MF_PID=$!

# Wait a moment for the micro frontend to start
sleep 5

# Start Main Application
echo "Starting Main Application on port 3000..."
cd ..
pnpm dev &
MAIN_PID=$!

echo "Both applications are starting..."
echo "Main App: http://localhost:3000"
echo "Micro Frontend: http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop both applications"

# Wait for user to stop
wait

# Cleanup
kill $MF_PID $MAIN_PID 2>/dev/null
