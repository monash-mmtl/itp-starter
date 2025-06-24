from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

from strands import Agent
from strands.models.openai import OpenAIModel

# Load environment variables from .env file
load_dotenv()

app = FastAPI()

# Allow CORS for local frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ArticleRequest(BaseModel):
    insights: str
    context: str
    style: str

class ArticleResponse(BaseModel):
    article: str

@app.post("/generate-article", response_model=ArticleResponse)
async def generate_article(req: ArticleRequest):
    # Compose a comprehensive system prompt
    system_prompt = f"""
You are an expert writer. Your task is to generate a comprehensive, well-structured article.

Main points to cover (insights):
{req.insights}

Supporting context (draw details, facts, and examples from this):
{req.context}

Writing style to emulate:
{req.style}

Instructions:
- Cover all main points from insights.
- Use the context to add depth, examples, and supporting information.
- Write in the specified style.
- Output only the article in Markdown format.
"""
    try:
        openai_api_key = os.environ.get("OPENAI_API_KEY")
        if not openai_api_key:
            raise ValueError("OPENAI_API_KEY environment variable is required. Make sure it's set in your .env file.")
        model = OpenAIModel(
            client_args={
                "api_key": openai_api_key,
            },
            model_id="o3-mini",
            params={
                "max_completion_tokens": 2000
            }
        )
        print("\n[DEBUG] System prompt sent to LLM:\n", system_prompt)
        agent = Agent(model=model, system_prompt=system_prompt)
        result = agent("")
        # Extract the markdown string from the agent's result
        if hasattr(result, "message") and isinstance(result.message, dict):
            content = result.message.get("content")
            if isinstance(content, list) and len(content) > 0 and "text" in content[0]:
                article_markdown = content[0]["text"]
            elif isinstance(content, str):
                article_markdown = content
            else:
                article_markdown = str(result)
        else:
            article_markdown = str(result)
        print("[DEBUG] LLM response:\n", article_markdown)
        return {"article": article_markdown}
    except Exception as e:
        print("[ERROR] Exception in /generate-article:", str(e))
        raise HTTPException(status_code=500, detail=str(e))
