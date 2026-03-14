import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def analyze_emotion(text: str):

    prompt = f"""
Analyze the following journal entry.

Return ONLY valid JSON.

Format:
{{
"emotion": "",
"keywords": [],
"summary": ""
}}

Journal:
{text}
"""

    completion = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2
    )

    return completion.choices[0].message.content