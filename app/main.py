from fastapi import FastAPI
from app.schemas import TravelRequest, ItineraryResponse
from app.graph import build_graph

app = FastAPI(title="Multi-Agent Travel Planner")

graph = build_graph()

@app.post("/plan", response_model=ItineraryResponse)
def plan_trip(req: TravelRequest):
    state = {
        "request": req.dict(),
        "transport": {},
        "stay": {},
        "activities": {},
        "food": {},
        "itinerary": []
    }

    result = graph.invoke(state)

    return {
        "destination": req.destination,
        "total_days": req.days,
        "plan": result["itinerary"]
    }
