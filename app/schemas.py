from pydantic import BaseModel
from typing import List, Optional, Dict, Any


class TravelRequest(BaseModel):
    origin: str
    destination: str
    days: int
    budget: str
    interests: List[str]


class DayPlan(BaseModel):
    day: int
    transport: Dict[str, Any]
    stay: Dict[str, Any]
    activities: List[str]
    food: List[str]


class ItineraryResponse(BaseModel):
    destination: str
    total_days: int
    plan: List[DayPlan]
