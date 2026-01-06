from langgraph.graph import StateGraph, START, END
from app.state import PlannerState
from app.agents.transport import transport_agent
from app.agents.stay import stay_agent
from app.agents.activities import activities_agent
from app.agents.food import food_agent
from app.agents.planner import planner_agent

def build_graph():
    graph = StateGraph(PlannerState)

    graph.add_node("transport", transport_agent)
    graph.add_node("stay", stay_agent)
    graph.add_node("activities", activities_agent)
    graph.add_node("food", food_agent)
    graph.add_node("planner", planner_agent)

    graph.add_edge(START, "transport")
    graph.add_edge("transport", "stay")
    graph.add_edge("stay", "activities")
    graph.add_edge("activities", "food")
    graph.add_edge("food", "planner")
    graph.add_edge("planner", END)

    return graph.compile()
