from fastapi import FastAPI
from app.schemas import TravelRequest, ItineraryResponse
from app.graph import build_graph
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="Multi-Agent Travel Planner")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

graph = build_graph()

@app.post("/plan", response_model=ItineraryResponse)
def plan_trip(req: TravelRequest):
    try:
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
    except Exception as e:
        import traceback
        traceback.print_exc()
        # For debugging purposes, return 500 but print to console
        from fastapi import HTTPException
        raise HTTPException(status_code=500, detail=str(e))
