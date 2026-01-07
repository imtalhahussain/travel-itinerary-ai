from app.services.itinerary_merge import merge_itinerary

def planner_agent(state):
    state["itinerary"] = merge_itinerary(state)
    return state
