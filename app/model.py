from google import genai 
from google.genai import types

client = genai.Client()

def ask_gemini(prompt: str,context: str ,think :bool = False) -> str:
  
    model = "gemini-2.5-flash"
    if(think == True):
        model = "gemini-2.5-pro"

    contents = types.Content(
        role ='user',
        parts = [types.Part(text=context),types.Part(text=prompt)]
    )

    response = client.models.generate_content(
        model=model,
        contents=contents,
        config=types.GenerateContentConfig(
            temperature=0.7,
            top_p=0.9,
            top_k=40,
        ),
    )
    
    data = response.json()
    candidates = data.get("candidates", [])
    if not candidates:
        return "No response from Gemini."

    parts = candidates[0].get("content", {}).get("parts", [])

    client.close()
    return "".join(part.get("text", "") for part in parts).strip()


if __name__ == "__main__":
    user_prompt = input("Enter prompt: ").strip()
    context = ""
    if not user_prompt:
        print("Prompt cannot be empty.")
    else:
        print(ask_gemini(user_prompt, context))