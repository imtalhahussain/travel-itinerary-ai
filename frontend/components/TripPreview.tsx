"use client";

import { ChevronDown, Map, Download, Share2, MoreHorizontal } from "lucide-react";
import type { TripItem } from "./Sidebar";

export default function TripPreview({ trip }: { trip: TripItem }) {
  return (
    <div className="card h-full overflow-hidden flex flex-col bg-white/60 border-white/40 shadow-xl shadow-indigo-500/5">
      <div className="p-5 border-b border-black/5 flex items-start justify-between bg-white/40 backdrop-blur-md">
        <div>
          <div className="text-xl font-bold text-zinc-900 tracking-tight">{trip.destination}</div>
          <div className="text-xs font-medium text-zinc-500 mt-1">{trip.dates}</div>
        </div>
        <button className="btn h-8 w-8 p-0 rounded-full border-none bg-black/5 hover:bg-black/10">
          <MoreHorizontal className="h-4 w-4 text-zinc-600" />
        </button>
      </div>

      <div className="p-5 space-y-5 overflow-y-auto custom-scrollbar flex-1">

        {/* Map Card */}
        <div className="rounded-2xl border border-zinc-200/50 bg-white overflow-hidden shadow-sm group cursor-pointer hover:shadow-md transition-all">
          <div className="h-40 bg-zinc-100 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/50 to-violet-100/50" />
            <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center mix-blend-multiply" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm flex items-center gap-2 text-xs font-semibold text-zinc-600 group-hover:scale-105 transition-transform">
                <Map className="h-3.5 w-3.5 text-indigo-500" />
                Interact with Map
              </div>
            </div>
          </div>
          <div className="p-3.5 text-xs bg-white relative z-10">
            <div className="font-semibold text-zinc-900">Trip Overview</div>
            <div className="text-zinc-500 mt-0.5">Automated commute calculation enabled</div>
          </div>
        </div>

        {/* Budget Card */}
        <div className="rounded-2xl border border-zinc-200/50 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold text-zinc-900 flex items-center gap-2">
              Budget
              <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-1.5 py-0.5 rounded-full">GOOD</span>
            </div>
            <div className="text-xs text-zinc-400">USD</div>
          </div>

          <div className="text-3xl font-bold text-zinc-900 tracking-tight">$2,560</div>
          <div className="text-xs text-zinc-500 font-medium mb-5">Estimated total cost for 2 travelers</div>

          <div className="space-y-3">
            <Row label="Flights" value="$900" icon={<div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />} />
            <Row label="Stays" value="$1,100" icon={<div className="h-1.5 w-1.5 rounded-full bg-violet-500" />} />
            <Row label="Activities" value="$500" icon={<div className="h-1.5 w-1.5 rounded-full bg-fuchsia-500" />} />
            <Row label="Food & Dining" value="$60" icon={<div className="h-1.5 w-1.5 rounded-full bg-amber-500" />} />
          </div>

          <div className="mt-6 pt-5 border-t border-zinc-100 grid grid-cols-2 gap-3">
            <button className="btn-primary w-full text-xs h-9 shadow-indigo-500/20">
              <Download className="h-3.5 w-3.5" /> Export
            </button>
            <button className="btn w-full text-xs h-9 bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100">
              <Share2 className="h-3.5 w-3.5" /> Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="text-zinc-600 flex items-center gap-2">
        {icon}
        {label}
      </div>
      <div className="font-semibold text-zinc-900">{value}</div>
    </div>
  );
}
