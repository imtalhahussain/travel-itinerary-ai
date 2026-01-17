"use client";

import { useMemo, useState } from "react";
import ItineraryCard from "./ItineraryCard";

type ApiState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: any }
  | { status: "error"; message: string; details?: any };

const DEFAULT_INTERESTS = ["nature", "lakes", "mountains", "food", "culture", "shopping", "adventure"];

export default function PlannerForm() {
  const [api, setApi] = useState<ApiState>({ status: "idle" });

  // Form fields
  const [origin, setOrigin] = useState("Delhi");
  const [destination, setDestination] = useState("Kashmir");
  const [days, setDays] = useState(4);
  const [budget, setBudget] = useState<"low" | "moderate" | "high">("moderate");
  const [interests, setInterests] = useState<string[]>(["nature", "food"]);

  const canSubmit = useMemo(() => {
    return origin.trim() && destination.trim() && days >= 1 && days <= 14 && interests.length >= 1;
  }, [origin, destination, days, interests]);

  function toggleInterest(tag: string) {
    setInterests((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  async function plan() {
    if (!canSubmit) return;

    setApi({ status: "loading" });

    try {
      const base = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8000";
      const res = await fetch(`${base}/plan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin,
          destination,
          days,
          budget,
          interests,
        }),
      });

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
      setApi({ status: "error", message: e?.message || "Failed to fetch" });
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Left: Input Panel */}
      <div className="bg-glass backdrop-blur-xl rounded-3xl p-8 border border-white/10">
        <h2 className="text-2xl font-semibold mb-2">Trip Parameters</h2>
        <p className="text-gray-400 text-sm">
          Enter your constraints. The backend runs multi-agent planning and returns a structured itinerary.
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-gray-300">Origin</label>
            <input
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
              placeholder="e.g., Delhi"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Destination</label>
            <input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
              placeholder="e.g., Da Lat"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-300">Days (1–14)</label>
              <input
                type="number"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                min={1}
                max={14}
                className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">Budget</label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value as any)}
                className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
              >
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-300">Interests</label>
            <div className="mt-3 flex flex-wrap gap-2">
              {DEFAULT_INTERESTS.map((tag) => {
                const active = interests.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleInterest(tag)}
                    className={[
                      "px-3 py-2 rounded-full text-sm border transition",
                      active
                        ? "bg-white/15 border-white/25"
                        : "bg-black/30 border-white/10 hover:border-white/20",
                    ].join(" ")}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-xs text-gray-500">Select at least 1 interest.</p>
          </div>

          <button
            onClick={plan}
            disabled={!canSubmit || api.status === "loading"}
            className="mt-2 w-full py-4 rounded-xl bg-gradient-to-r from-neon to-purple-500 font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {api.status === "loading" ? "Planning..." : "Generate Itinerary"}
          </button>
        </div>

        {api.status === "error" && (
          <div className="mt-6 p-4 rounded-xl bg-black/40 border border-red-500/30">
            <p className="font-semibold text-red-300">Error</p>
            <p className="text-sm text-gray-300 mt-1">{api.message}</p>
            {api.details && (
              <pre className="mt-3 text-xs text-gray-400 overflow-auto max-h-48 whitespace-pre-wrap">
{safeStringify(api.details)}
              </pre>
            )}
          </div>
        )}
      </div>

      {/* Right: Output Panel */}
      {api.status === "success" && <ItineraryCard data={api.data} />}
      {api.status !== "success" && (
        <div className="bg-glass backdrop-blur-xl rounded-3xl p-8 border border-white/10 flex items-center justify-center text-gray-400">
          Run a plan to see the itinerary here.
        </div>
      )}
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
