from app.llm.groq_client import llm
from app.utils.json_parser import safe_json_loads

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

  print("STAY RESPONSE:", response)

  state["stay"] = safe_json_loads(response)

  return state
