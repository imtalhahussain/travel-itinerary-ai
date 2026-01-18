from app.llm.groq_client import llm
import json

def activities_agent(state):
    days = state['request']['days']
    prompt = f"""
    You are an expert travel activities planner.
    Create a unique, detailed daily activity plan for a {days}-day trip to {state['request']['destination']}.
    Interests: {', '.join(state['request']['interests'])}.

    Return STRICT JSON only. The format must be a list of objects, one for each day.
    Example:
    {{
      "itinerary": [
         {{ "day": 1, "activities": ["Visit X", "Walk around Y"] }},
         {{ "day": 2, "activities": ["Morning hike at Z", "Museum tour"] }}
      ]
    }}

    Ensure you cover exactly {days} days.
    """

    response = llm.invoke(prompt).content
    try:
        data = json.loads(response)
        # Handle cases where LLM might wrap it differently or just return the list
        if "itinerary" in data:
            state["activities"] = data["itinerary"]
        else:
            # Fallback if structure is slightly off but still usable
            state["activities"] = data
    except Exception as e:
        print(f"Error parsing activities JSON: {e}")
        # Fallback to empty structure to prevent crash
        state["activities"] = [{"day": i, "activities": ["Explore city center"]} for i in range(1, days + 1)]
        
    return state
