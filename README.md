# AgentTrip AI

AgentTrip AI is a production-ready, multi-agent travel itinerary planner built using FastAPI, LangGraph, and Groq-hosted LLaMA models.

The system converts user constraints (destination, duration, budget, interests) into a structured, end-to-end travel itinerary by orchestrating multiple specialized AI agents.

---

---

## 🚀 Architecture Overview

- **Planner (Coordinator Agent)**  
  Orchestrates task execution and merges outputs deterministically.

- **Specialized Agents**
  - Transport Agent
  - Stay Agent
  - Activities Agent
  - Food Agent

- **Deterministic Merge Layer**
  - No LLM calls
  - Ensures testability and consistency

- **LLM Provider**
  - Groq (low-latency, cost-efficient inference)

---

## 🧠 Key Design Principles

- Agents reason independently
- Outputs are forced into strict JSON
- Business logic is deterministic
- Clear separation of concerns
- API-first, production-grade backend

---

## 🛠 Tech Stack

- Python
- FastAPI
- LangGraph
- Groq (LLaMA 3.x)
- Pydantic
- Uvicorn

---

## ▶️ How to Run

```bash
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
