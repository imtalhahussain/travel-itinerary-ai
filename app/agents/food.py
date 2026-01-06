from app.llm.groq_client import llm

def food_agent(state):
    prompt = f"""
    Recommend local food places in {state['request']['destination']}
    suitable for budget {state['request']['budget']}.
    """
    result = llm.invoke(prompt).content
    state["food"] = {"details": result}
    return state
