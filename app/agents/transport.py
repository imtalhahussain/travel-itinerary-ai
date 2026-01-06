from app.llm.groq_client import llm

def transport_agent(state):
    prompt = f"""
    Suggest best transport options for a trip from
    {state['request']['origin']} to {state['request']['destination']}
    considering budget {state['request']['budget']}.
    """
    result = llm.invoke(prompt).content
    state["transport"] = {"details": result}
    return state
