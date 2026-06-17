from app.llm.groq_client import llm
import json

def activities_agent(state):
    days = state["request"]["days"]

    prompt = f"""
    You are an expert travel activities planner.

    Create a unique and detailed day-by-day itinerary for a {days}-day trip to {state['request']['destination']}.

    Traveler interests:
    {', '.join(state['request']['interests'])}

    Return ONLY valid JSON.
    Do not use markdown.
    Do not wrap JSON in triple backticks.
    Do not include explanations.

    Format:
    {{
      "itinerary": [
        {{
          "day": 1,
          "activities": [
            "Activity 1",
            "Activity 2",
            "Activity 3"
          ]
        }}
      ]
    }}

    Ensure you return exactly {days} days.
    """

    response = llm.invoke(prompt).content

    print("\n===== ACTIVITIES RAW RESPONSE =====")
    print(response)
    print("===================================\n")

    try:
        response = response.replace("```json", "").replace("```", "").strip()

        data = json.loads(response)

        if isinstance(data, dict) and "itinerary" in data:
            state["activities"] = data["itinerary"]
        else:
            state["activities"] = data

    except Exception as e:
        print(f"Error parsing activities JSON: {e}")

        state["activities"] = [
            {
                "day": i,
                "activities": ["Explore city center"]
            }
            for i in range(1, days + 1)
        ]

    return state
