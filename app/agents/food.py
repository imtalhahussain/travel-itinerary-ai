from app.llm.groq_client import llm
import json

def food_agent(state):
    prompt = f"""
    You are a food recommendation agent.

    Return STRICT JSON only:
    {{
      "food_places": ["place 1", "place 2"]
    }}

    Destination: {state['request']['destination']}
    Budget: {state['request']['budget']}
    """

    response = llm.invoke(prompt).content
    state["food"] = json.loads(response)
    return state
