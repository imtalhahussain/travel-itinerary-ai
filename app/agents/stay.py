from app.llm.groq_client import llm
import json

def stay_agent(state):
    prompt = f"""
    You are an accommodation planner.

    Return STRICT JSON only:
    {{
      "type": "hotel/hostel/homestay",
      "area": "recommended area",
      "price_range": "low/moderate/high"
    }}

    Destination: {state['request']['destination']}
    Budget: {state['request']['budget']}
    """

    response = llm.invoke(prompt).content
    state["stay"] = json.loads(response)
    return state
