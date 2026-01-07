from typing import Dict, List, Any

def merge_itinerary(state: Dict[str, Any]) -> List[Dict[str, Any]]:
    days = state["request"]["days"]
    itinerary = []

    for day in range(1, days + 1):
        itinerary.append({
            "day": day,
            "transport": state["transport"],
            "stay": state["stay"],
            "activities": state["activities"]["activities"],
            "food": state["food"]["food_places"]
        })

    return itinerary
