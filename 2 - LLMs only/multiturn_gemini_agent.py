"""
Starter file for Gemini 2.5 Flash
Agent will start conversation and then respond in a multi-turn conversation.
"""

from strands import Agent, tool
from strands.models.litellm import LiteLLMModel
import os
from dotenv import load_dotenv
from typing import List, Dict
import json
from datetime import datetime

PROMPT = """
        placeholder
        """

# Load environment variables from .env file
load_dotenv()

gemini_api_key = os.environ.get("GEMINI_API_KEY")
if not gemini_api_key:
    raise ValueError("GEMINI_API_KEY environment variable is required. Make sure it's set in your .env file.")

model = LiteLLMModel(
    client_args={
        "api_key": gemini_api_key,
    },
    model_id="gemini/gemini-2.5-flash-preview-05-20",
    params={
        "max_tokens": 1000,
        "temperature": 0.7,
    }
)

# Initialize the medical agent with appropriate tools
agent = Agent(
    model=model,
    system_prompt=PROMPT
)

def start_chat():
    # Start the interview
    response = agent("INSTRUCTIONS TO AGENT")
    
    # Continue the conversation until the interview is complete
    while True:
        user_input = input("\nUSER(e to end): ")
        if user_input.lower() == "e":
            break
        response = agent(user_input)
        # If the response contains the summary, end the conversation
        if "<SUMMARY>" in str(response):
            return  # End the function, do not prompt for more input

if __name__ == "__main__":
    start_chat()