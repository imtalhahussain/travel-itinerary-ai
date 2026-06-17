from app.llm.groq_client import llm
import json

def food_agent(state):
    days = state["request"]["days"]

    prompt = f"""
    You are a culinary travel expert.

    Recommend food experiences for a {days}-day trip to {state['request']['destination']}.

    Budget:
    {state['request']['budget']}

    Return ONLY valid JSON.
    Do not use markdown.
    Do not wrap JSON in triple backticks.
    Do not include explanations.

    Format:
    {{
    "itinerary": [
        {{
        "day": 1,
        "food_places": [
            "Breakfast at ...",
            "Lunch at ...",
            "Dinner at ..."
        ]
        }}
    ]
    }}

    Ensure you return exactly {days} days.
    """

    response = llm.invoke(prompt).content

    print("\n===== FOOD RAW RESPONSE =====")
    print(response)
    print("===================================\n")

    try:
        response = response.replace("```json", "").replace("```", "").strip()

        data = json.loads(response)

        if isinstance(data, dict) and "itinerary" in data:
            state["food"] = data["itinerary"]
        else:
            state["food"] = data

    except Exception as e:
        print(f"Error parsing food JSON: {e}")

        state["food"] = [
            {
                "day": i,
                "food_places": ["Local cuisine"]
            }
            for i in range(1, days + 1)
        ]

    return state
