import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

def generate_flashcard(topic: str) -> list:
    prompt = (
        f'Generate 10 flashcards on the topic "{topic}".\n'
        "Each flashcard should include:\n"
        "1. A concise question\n"
        "2. A short, clear answer\n\n"
        "Return the result as a JSON array of objects, each with \"question\" and \"answer\" fields, like this:\n"
        "[\n"
        "  {\"question\": \"...\", \"answer\": \"...\"},\n"
        "  ...\n"
        "]\n"
        "Only return valid JSON. Do not include any explanation or extra text."
    )
    model = genai.GenerativeModel('gemini-2.0-flash')
    response = model.generate_content(prompt) 
    import json
    try:
        flashcards = json.loads(response.text[7:-3])
    except Exception:
        flashcards = []
    return flashcards 