from typing import TypedDict, List, Dict, Any

class PlannerState(TypedDict):
    request: Dict[str, Any]
    transport: Dict[str, Any]
    stay: Dict[str, Any]
    activities: Dict[str, Any]
    food: Dict[str, Any]
    itinerary: List[Dict[str, Any]]
