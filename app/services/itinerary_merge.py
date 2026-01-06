from typing import Dict, List, Any

def merge_itinerary(
    transport: Dict[str, Any],
    stay: Dict[str, Any],
    activities: Dict[str, Any],
    food: Dict[str, Any],
    days: int
) -> List[Dict[str, Any]]:
    """
    Merge multi-agent outputs into a structured itinerary.
    This layer is intentionally deterministic (no LLM calls).
    """

    itinerary = []

    for day in range(1, days + 1):
        itinerary.append({
            "day": day,
            "transport": transport.get("details", ""),
            "stay": stay.get("details", ""),
            "activities": activities.get("details", ""),
            "food": food.get("details", "")
        })

    return itinerary
