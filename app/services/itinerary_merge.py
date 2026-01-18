from typing import Dict, List, Any

def merge_itinerary(state: Dict[str, Any]) -> List[Dict[str, Any]]:
    days = state["request"]["days"]
    itinerary = []

    # Helper to safely get day data
    def get_day_data(source_list: List[Any], day_num: int, key: str) -> List[str]:
        if isinstance(source_list, list):
            for item in source_list:
                if item.get("day") == day_num:
                    return item.get(key, [])
        return []

    for day in range(1, days + 1):
        day_activities = get_day_data(state["activities"], day, "activities")
        day_food = get_day_data(state["food"], day, "food_places")

        itinerary.append({
            "day": day,
            "transport": state["transport"],
            "stay": state["stay"],
            "activities": day_activities if day_activities else ["Relax and explore"],
            "food": day_food if day_food else ["Local options"]
        })

    return itinerary
