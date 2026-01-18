from app.llm.groq_client import llm
import json

def food_agent(state):
    days = state['request']['days']
    prompt = f"""
    You are a culinary travel expert.
    Recommend food places (restaurants, cafes, street food) for a {days}-day trip to {state['request']['destination']}.
    Budget: {state['request']['budget']}.

    Return STRICT JSON only. One entry per day.
    Example:
    {{
      "itinerary": [
         {{ "day": 1, "food_places": ["Lunch at X", "Dinner at Y"] }},
         {{ "day": 2, "food_places": ["Breakfast at Z", "Local street food"] }}
      ]
    }}

    Ensure you cover exactly {days} days.
    """

    response = llm.invoke(prompt).content
    try:
        data = json.loads(response)
        if "itinerary" in data:
            state["food"] = data["itinerary"]
        else:
            state["food"] = data
    except Exception as e:
        print(f"Error parsing food JSON: {e}")
        state["food"] = [{"day": i, "food_places": ["Local cuisine"]} for i in range(1, days + 1)]

    return state
