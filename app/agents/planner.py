def planner_agent(state):
    state["itinerary"] = [{
        "transport": state["transport"]["details"],
        "stay": state["stay"]["details"],
        "activities": state["activities"]["details"],
        "food": state["food"]["details"]
    }]
    return state
