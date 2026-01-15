"use client";
import { useState } from "react";
import ItineraryCard from "./ItineraryCard";

export default function PlannerForm() {
  const [data, setData] = useState<any>(null);

  async function plan() {
    const res = await fetch("http://127.0.0.1:8000/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        origin: "Delhi",
        destination: "Kashmir",
        days: 4,
        budget: "low",
        interests: ["nature", "lakes", "mountains"]
      })
    });
    setData(await res.json());
  }

  return (
    <div className="grid grid-cols-2 gap-16">
      <div className="bg-glass backdrop-blur-xl rounded-3xl p-8 border border-white/10">
        <h2 className="text-2xl font-semibold mb-4">Trip Parameters</h2>
        <button
          onClick={plan}
          className="mt-6 w-full py-4 rounded-xl bg-gradient-to-r from-neon to-purple-500 font-semibold"
        >
          Generate Itinerary
        </button>
      </div>

      {data && <ItineraryCard data={data} />}
    </div>
  );
}
