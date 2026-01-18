"use client";

import { Plus, MapPin, Calendar, Tag } from "lucide-react";

type TripTag = "Work" | "Family" | "Budget" | "Luxury";

export type TripItem = {
  id: string;
  destination: string;
  dates: string;
  tag: TripTag;
  budget: string;
};

export default function Sidebar({
  open,
  trips,
  activeTripId,
  onSelectTrip,
  onNewTrip,
}: {
  open: boolean;
  trips: TripItem[];
  activeTripId: string;
  onSelectTrip: (id: string) => void;
  onNewTrip: () => void;
}) {
  return (
    <div className="card h-full flex flex-col overflow-hidden">
      <div className="p-4 border-b border-zinc-100">
        <button
          className="btn-primary w-full shadow-lg shadow-indigo-500/20"
          onClick={onNewTrip}
        >
          <Plus className="h-4 w-4" />
          <span className={!open ? "hidden" : "inline"}>{open ? "New Framework" : ""}</span>
        </button>
      </div>

      {open && (
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-6">
          <section>
            <div className="text-[11px] uppercase tracking-wider font-bold text-zinc-400 mb-3 px-2">Recent Trips</div>
            <div className="space-y-1">
              {trips.map((t) => {
                const active = t.id === activeTripId;
                return (
                  <button
                    key={t.id}
                    onClick={() => onSelectTrip(t.id)}
                    className={[
                      "w-full text-left rounded-xl px-3 py-2.5 transition-all duration-200 group relative overflow-hidden",
                      active
                        ? "bg-indigo-50/50 text-indigo-900 ring-1 ring-indigo-200/50"
                        : "hover:bg-zinc-50 text-zinc-600 hover:text-zinc-900",
                    ].join(" ")}
                  >
                    <div className="relative z-10">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm truncate">{t.destination}</span>
                        {active && <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1 text-xs opacity-70">
                        <Calendar className="h-3 w-3" />
                        <span>{t.dates}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <section>
            <div className="text-[11px] uppercase tracking-wider font-bold text-zinc-400 mb-3 px-2">Filter View</div>
            <div className="flex flex-wrap gap-2 px-1">
              {(["Work", "Family", "Budget", "Luxury"] as const).map((x) => (
                <span key={x} className="chip text-[11px] py-1 px-2.5 bg-white/40 border-zinc-200/60 hover:border-zinc-300">
                  {x}
                </span>
              ))}
            </div>
          </section>
        </div>
      )}

      {open && (
        <div className="p-4 border-t border-zinc-100 bg-zinc-50/30">
          <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 p-[1px]">
            <div className="rounded-[11px] bg-white p-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                  <Tag className="h-4 w-4 text-indigo-600" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-zinc-900">Pro Plan</div>
                  <div className="text-[10px] text-zinc-500">Unlock more agents</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!open && (
        <div className="flex-1 flex flex-col items-center py-4 gap-4">
          {trips.slice(0, 4).map(t => (
            <div key={t.id} title={t.destination} className={`h-2 w-2 rounded-full ${t.id === activeTripId ? "bg-indigo-500" : "bg-zinc-300"}`} />
          ))}
        </div>
      )}
    </div>
  );
}
