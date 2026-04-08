import os
from typing import Optional
import requests
from dotenv import load_dotenv

GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"


def ask_gemini(prompt: str,context: str ,fast:bool = False) -> str:
    load_dotenv()
    if fast:
        model = "gemini-3.1-flash"
    else:
        model = "gemini-2.5-pro"
    api_key: Optional[str] = os.getenv("GEMINI_API_KEY")

    if not api_key:
        raise ValueError("GEMINI_API_KEY is not set in .env")

    url = GEMINI_ENDPOINT.format(model=model)
    headers = {"Content-Type": "application/json"}
    payload = {
        "contents": [
            {
                "parts": [{"text": prompt}],
            }
        ]
    }

    response = requests.post(
        f"{url}?key={api_key}",
        headers=headers,
        json=payload,
        timeout=30,
    )
    response.raise_for_status()

    data = response.json()
    candidates = data.get("candidates", [])
    if not candidates:
        return "No response from Gemini."

    parts = candidates[0].get("content", {}).get("parts", [])
    return "".join(part.get("text", "") for part in parts).strip()


if __name__ == "__main__":
    user_prompt = input("Enter prompt: ").strip()
    context = ""
    if not user_prompt:
        print("Prompt cannot be empty.")
    else:
        print(ask_gemini(user_prompt, context))