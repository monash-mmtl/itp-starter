#!/bin/bash

# Start FastAPI backend
cd backend
source venv/bin/activate
nohup uvicorn app.main:app --reload > backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Start React frontend
cd frontend

# Find first available port starting from 3000
DEFAULT_PORT=3000
PORT=${PORT:-$DEFAULT_PORT}

while lsof -i :$PORT >/dev/null 2>&1; do
  echo "Port $PORT is in use, trying next port..."
  PORT=$((PORT+1))
done

export PORT
nohup npm start > frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

# Print process IDs and server URLs
echo "Backend (FastAPI) running with PID $BACKEND_PID (logs: backend/backend.log)"
echo "  → http://localhost:8000"
echo "Frontend (React) running with PID $FRONTEND_PID (logs: frontend/frontend.log)"
echo "  → http://localhost:$PORT"

echo -e "\n--- Backend Log (backend/backend.log) ---"
tail -f backend/backend.log &
TAIL_BACKEND_PID=$!
echo -e "\n--- Frontend Log (frontend/frontend.log) ---"
tail -f frontend/frontend.log &
TAIL_FRONTEND_PID=$!

# Wait for background tail processes
wait $TAIL_BACKEND_PID $TAIL_FRONTEND_PID 