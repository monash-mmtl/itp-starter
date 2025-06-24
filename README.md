# ITP Starter Kits

This repository contains several starter folders for different types of web and AI projects. Below is an explanation of each folder and how to get started:

## 1 - LLMs and Gradio
- **Purpose:** Deployment of a Large Language Model (LLM) with a Gradio/Hugging Face Chat UI web interface.
- **Recommended for:** AI projects and rapid prototyping. Use this if you'd just like to play around with AI and prompt engineering for your use case!
- **How to start:**
  - Navigate to this folder.
  - Run `main.py` to launch the Gradio website.

## 2 - LLMs only
- **Purpose:** Use of LLMs without a pre-built UI.
- **Recommended for:** Advanced students who want to build their own user interface around an AI base.
- **Note:** Cannot be started as-is; requires further development to add a UI or other interaction method.

## 3 - Dynamic Website
- **Purpose:** Example of a dynamic, full-stack website.
- **Recommended for:** Students seeking a challenge and experience with both frontend and backend development.
- **How to start:**
  - Run `./setup.sh` to install dependencies.
  - Run `./start.sh` to start the project.

## 4 - Static Website
- **Purpose:** Simple static website that can be easily deployed to GitHub Pages.
- **Recommended for:** Students who want to quickly deploy a static website (i.e. no AI).
- **How to check the site:**
  - Open `4 - Static Website/index.html` in your browser.
- **Tip:** Search for "GitHub Pages deployment" on Google if you want to publish this site online.

---

Feel free to explore each folder and choose the one that best fits your project needs! 

There are also many tools we would recommend that we don't have a starter kit for: 

- Streamlit as an alternative to Gradio
- Perplexity for Web Search capability (requires a debit/credit card)
- ElevenLabs for Voice
- Lovable for UI Generation
- Fly.io or render for publishing (advanced)

Other Random Advice: 

- If you want inspiration for prompt engineering, check this Github - https://github.com/elder-plinius/CL4R1T4S/tree/main
- This is a great guide from Anthropic on how to build multi-agent systems - https://www.anthropic.com/engineering/built-multi-agent-research-system
- This is another great guide on agentic workflows - https://www.anthropic.com/engineering/building-effective-agents#agents
- If you want to play with different AI architectures, the library we use is Amazon's Strands - you can read more here - https://strandsagents.com/latest/. They have some pretty cool multi-agent architectures like a swarm and graph. We would recommend reading Anthropic's guide to agentic workflows and multi-agent workflows before proceeding with this. 
- Anthropic has created an amazing way to connect your AI systems with any tool you can imagine through the MCP protocol. You don't really need to know how these work (although if you're interested, this is a great link - https://www.anthropic.com/news/model-context-protocol). If you want to integrate awesome MCP tools to your AI - check out this list! https://github.com/punkpeye/awesome-mcp-servers