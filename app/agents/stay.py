from app.llm.groq_client import llm

def stay_agent(state):
    prompt = f"""
    Suggest accommodation options in {state['request']['destination']}
    for a {state['request']['budget']} budget.
    """
    result = llm.invoke(prompt).content
    state["stay"] = {"details": result}
    return state
