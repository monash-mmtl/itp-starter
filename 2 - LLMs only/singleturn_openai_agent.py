"""
Starter file for OpenAI o3
Agent will receive an input and then respond in a single-turn.
"""

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

PROMPT = """
        placeholder
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
    agent = Agent(model=model, system_prompt=PROMPT)
    result = agent("")
    # Extract the response content from the agent's result
    if hasattr(result, "message") and isinstance(result.message, dict):
        content = result.message.get("content")
        if isinstance(content, list) and len(content) > 0 and "text" in content[0]:
            response_content = content[0]["text"]
        elif isinstance(content, str):
            response_content = content
        else:
            response_content = str(result)
    else:
        response_content = str(result)
except Exception as e:
    raise HTTPException(status_code=500, detail=str(e))

class PromptRequest(BaseModel):
    prompt: str

class ResponseContent(BaseModel):
    response: str

@app.post("/ask", response_model=ResponseContent)
def ask_agent(request: PromptRequest):
    try:
        result = agent(request.prompt)
        if hasattr(result, "message") and isinstance(result.message, dict):
            content = result.message.get("content")
            if isinstance(content, list) and len(content) > 0 and "text" in content[0]:
                response_content = content[0]["text"]
            elif isinstance(content, str):
                response_content = content
            else:
                response_content = str(result)
        else:
            response_content = str(result)
        return ResponseContent(response=response_content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
