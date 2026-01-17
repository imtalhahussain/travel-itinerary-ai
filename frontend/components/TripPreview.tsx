"use client";

import { ChevronDown, Map, Download } from "lucide-react";
import type { TripItem } from "./Sidebar";

export default function TripPreview({ trip }: { trip: TripItem }) {
  return (
    <div className="card h-[calc(100vh-120px)] overflow-hidden flex flex-col">
      <div className="p-4 border-b border-zinc-200/70 flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">{trip.destination}</div>
          <div className="text-sm text-zinc-500">{trip.dates}</div>
        </div>
        <button className="btn">
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      <div className="p-4 space-y-4 overflow-auto">
        <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden">
          <div className="h-36 bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center">
            <div className="flex items-center gap-2 text-zinc-500">
              <Map className="h-4 w-4" />
              Map preview (placeholder)
            </div>
          </div>
          <div className="p-3 text-sm">
            <div className="font-semibold">{trip.destination}</div>
            <div className="text-zinc-500">Day-wise timeline · commute aware</div>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div className="font-semibold">Budget Summary</div>
            <button className="btn">⋯</button>
          </div>
          <div className="mt-2 text-2xl font-semibold">$2,560 <span className="text-sm font-medium text-zinc-500">est.</span></div>
          <div className="mt-3 space-y-2 text-sm text-zinc-700">
            <Row label="Flights" value="$900" />
            <Row label="Stays" value="$1,100" />
            <Row label="Activities" value="$500" />
            <Row label="Food" value="$60" />
          </div>

          <button className="btn-primary w-full mt-4">
            <Download className="h-4 w-4" />
            Finalize & Export
          </button>

          <div className="mt-3 text-xs text-zinc-500">
            Export options: PDF · Google Docs · Calendar
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-zinc-600">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}
