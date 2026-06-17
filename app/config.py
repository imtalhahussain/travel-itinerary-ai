import os
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
MODEL_NAME = os.getenv("MODEL_NAME", "llama-3.3-70b-versatile")
print("ACTIVE MODEL:", MODEL_NAME)

if not GROQ_API_KEY:
    raise RuntimeError("GROQ_API_KEY missing")
