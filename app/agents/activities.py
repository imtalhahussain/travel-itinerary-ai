from app.llm.groq_client import llm
import json

def activities_agent(state):
    prompt = f"""
    You are an activities planner.

    Return STRICT JSON only:
    {{
      "activities": ["activity 1", "activity 2", "activity 3"]
    }}

    Destination: {state['request']['destination']}
    Interests: {state['request']['interests']}
    """

    response = llm.invoke(prompt).content
    state["activities"] = json.loads(response)
    return state
