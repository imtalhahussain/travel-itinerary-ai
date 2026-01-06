from pydantic import BaseModel
from typing import List, Optional

class TravelRequest(BaseModel):
    origin: str
    destination: str
    days: int
    budget: str
    interests: List[str]

class DayPlan(BaseModel):
    day: int
    activities: List[str]
    transport: str
    food: List[str]
    stay: Optional[str]

class ItineraryResponse(BaseModel):
    destination: str
    total_days: int
    plan: List[DayPlan]
