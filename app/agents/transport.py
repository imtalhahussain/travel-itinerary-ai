from app.llm.groq_client import llm
from app.utils.json_parser import safe_json_loads

def transport_agent(state):
  prompt = f"""
  You are a travel transport planner.
  Return STRICT JSON only (no text outside JSON):

  {{
    "mode": "flight/train/bus",
    "summary": "short explanation",
    "estimated_cost": "low/moderate/high"
  }}

  Origin: {state['request']['origin']}
  Destination: {state['request']['destination']}
  Budget: {state['request']['budget']}
  """

  response = llm.invoke(prompt).content

  print("TRANSPORT RESPONSE:", response)

  state["transport"] = safe_json_loads(response)

  return state
