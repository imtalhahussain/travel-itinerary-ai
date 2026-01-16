from fastapi import FastAPI
from app.schemas import TravelRequest, ItineraryResponse
from app.graph import build_graph
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="Multi-Agent Travel Planner")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
