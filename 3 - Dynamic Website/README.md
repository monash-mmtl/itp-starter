# 📜 Alexandria

Alexandria is an AI-powered writing tool designed to help you generate high-quality articles from your insights, context, and preferred writing style. The app features a modern, responsive interface with a three-panel editor and a live article preview. Built with a React frontend and a Python FastAPI backend, Alexandria streamlines the process of turning your ideas into polished written content.

<img width="1512" alt="image" src="https://github.com/user-attachments/assets/d5e021f6-f886-4985-8614-1657dcb03b00" />

## Quick Start (Recommended)

Before running the setup script, complete these steps:

1. **Create and activate a Python virtual environment:**
   ```sh
   python3 -m venv venv
   source venv/bin/activate
   ```

2. **Create a `.env` file in the project root with your OpenAI API key:**
   ```sh
   echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
   ```
   Replace `your_openai_api_key_here` with your actual OpenAI API key.

3. **Run the setup and start scripts:**
   ```sh
   # To set up all dependencies (backend & frontend)
   ./setup.sh

   # To start both backend and frontend servers
   ./start.sh
   ```

- UI is available at [http://localhost:3000](http://localhost:3000)

## Features
- **Three-panel input:** Enter your insights, paste context (articles, research), and specify a writing style.
- **AI article generation:** Click the play button to generate a complete article using your inputs.
- **Live editing:** Edit the generated article directly in the right panel.
- **Copy to clipboard:** Easily copy the generated article in Markdown format.
- **Dark mode & Synthwave theme:** Toggle between light/dark modes and a special synthwave theme.
- **Easter egg:** Click the lighthouse icon in the header for a surprise!

## Project Structure

```
alexandria/
  backend/        # FastAPI backend (Python)
    app/
      main.py     # Main API server
    requirements.txt
  frontend/       # React frontend (JavaScript)
    src/
      App.js      # Main React app
      TipTapEditor.js
    ...
  README.md
  PRD.txt         # Product requirements doc
  setup.sh        # (Optional) Setup script
  start.sh        # (Optional) Start script
```

## Usage

- Enter your insights, context, and style in the left panels.
- Click the play button (▶️) to generate an article.
- Edit the article in the right panel if needed.
- Click the copy button to copy the article in Markdown format.
- Toggle dark mode or synthwave theme using the icons in the header.

## Easter Egg

✨ **Click the lighthouse icon in the top header**

---

Built by Khoa Cao | MMTL
