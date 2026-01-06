from app.llm.groq_client import llm

def activities_agent(state):
    prompt = f"""
    Plan activities in {state['request']['destination']}
    for interests: {state['request']['interests']}.
    """
    result = llm.invoke(prompt).content
    state["activities"] = {"details": result}
    return state
