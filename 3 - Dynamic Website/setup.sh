#!/bin/bash
set -e

# Backend setup
echo "Setting up backend..."
cd backend
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
cd ..

echo "Backend setup complete."

# Frontend setup
echo "Setting up frontend..."
cd frontend

# Check for Node.js and npm
if ! command -v node >/dev/null 2>&1; then
  echo "Error: Node.js is not installed. Please install Node.js and try again."
  exit 1
fi
if ! command -v npm >/dev/null 2>&1; then
  echo "Error: npm is not installed. Please install npm and try again."
  exit 1
fi

echo "Cleaning old node_modules and lock files..."
rm -rf node_modules package-lock.json

echo "Installing frontend dependencies..."
npm install

# Only initialize Tailwind if config does not exist
if [ ! -f tailwind.config.js ]; then
  echo "Initializing Tailwind CSS config..."
  npx tailwindcss init
fi

cd ..

echo "Setup complete! Backend and frontend dependencies installed successfully." 