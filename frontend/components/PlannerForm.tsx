"use client";

import { useState } from "react";
import ItineraryCard from "./ItineraryCard";

type ApiState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: any }
  | { status: "error"; message: string; details?: any };

export default function PlannerForm() {
  const [api, setApi] = useState<ApiState>({ status: "idle" });

  async function plan() {
    setApi({ status: "loading" });

    try {
      const res = await fetch("http://127.0.0.1:8000/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin: "Delhi",
          destination: "Kashmir",
          days: 4,
          budget: "low",
          interests: ["nature", "lakes", "mountains"],
        }),
      });

      // IMPORTANT: always read as text first (prevents JSON parsing crashes)
      const text = await res.text();
      let payload: any = null;

      try {
        payload = text ? JSON.parse(text) : null;
      } catch {
        payload = { raw: text };
      }

      if (!res.ok) {
        setApi({
          status: "error",
          message: `Backend error ${res.status}`,
          details: payload,
        });
        return;
      }

      setApi({ status: "success", data: payload });
    } catch (e: any) {
      setApi({
        status: "error",
        message: e?.message || "Network error",
      });
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="bg-glass backdrop-blur-xl rounded-3xl p-8 border border-white/10">
        <h2 className="text-2xl font-semibold mb-2">Trip Parameters</h2>
        <p className="text-gray-400 text-sm">
          This UI hits your FastAPI multi-agent backend and renders the returned itinerary.
        </p>

        <button
          onClick={plan}
          className="mt-6 w-full py-4 rounded-xl bg-gradient-to-r from-neon to-purple-500 font-semibold hover:opacity-90 transition"
          disabled={api.status === "loading"}
        >
          {api.status === "loading" ? "Planning..." : "Generate Itinerary"}
        </button>

        {api.status === "error" && (
          <div className="mt-6 p-4 rounded-xl bg-black/40 border border-red-500/30">
            <p className="font-semibold text-red-300">Error</p>
            <p className="text-sm text-gray-300 mt-1">{api.message}</p>
            {api.details && (
              <pre className="mt-3 text-xs text-gray-400 overflow-auto max-h-48">
{safeStringify(api.details)}
              </pre>
            )}
          </div>
        )}
      </div>

      {api.status === "success" && <ItineraryCard data={api.data} />}
    </div>
  );
}

// Safe stringify for any object (handles circular + BigInt)
function safeStringify(obj: any) {
  const seen = new WeakSet();
  return JSON.stringify(
    obj,
    (_, value) => {
      if (typeof value === "bigint") return value.toString();
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) return "[Circular]";
        seen.add(value);
      }
      return value;
    },
    2
  );
}
