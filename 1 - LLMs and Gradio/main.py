"""
Agent will start conversation and then respond in a multi-turn conversation.
Uses Gradio Chat UI and Gemini
Live website is also created - refer to terminal to find link.
"""

from strands import Agent, tool
from strands.models.openai import OpenAIModel
from strands.models.litellm import LiteLLMModel
import os
from dotenv import load_dotenv
from typing import List, Tuple
import gradio as gr
import json
from datetime import datetime
from archimedes_prompt import PROMPT, INTRO_MESSAGE

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
# Initialize the agent
agent = Agent(
    model=model,
    system_prompt=PROMPT
)

def chat_fn(messages: List[Tuple[str, str]]) -> List[Tuple[str, str]]:
    """
    Gradio expects a function that takes a list of (user, assistant) message tuples and returns the updated chat history.
    """
    if not messages:
        return []
    # Get the last user message
    last_user_message = messages[-1][0]
    # Get response from agent
    response = agent(last_user_message)
    # Append the response to the chat history
    messages[-1] = (last_user_message, str(response))
    return messages

if __name__ == "__main__":
    with gr.Blocks(title="Archimedes") as demo:
        gr.Markdown("# 🧙‍♂️ Archimedes")
        gr.Markdown("AI to help you build a detailed Biodesign strategy")
        chatbot = gr.Chatbot(value=[["", INTRO_MESSAGE]])
        msg = gr.Textbox(label="Your message", placeholder="Provide as much information as possible about your project")
        clear = gr.Button("Clear")

        def respond(history, user_message):
            if not user_message:
                return history, ""
            history = history + [[user_message, None]]
            history = chat_fn(history)
            return history, ""

        msg.submit(respond, [chatbot, msg], [chatbot, msg])
        clear.click(lambda: ([["", INTRO_MESSAGE]], ""), None, [chatbot, msg])

    demo.launch(share=True)