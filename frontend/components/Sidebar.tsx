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
    <div className="card h-[calc(100vh-120px)] overflow-hidden">
      <div className="p-4 border-b border-zinc-200/70">
        <button className="btn-primary w-full" onClick={onNewTrip}>
          <Plus className="h-4 w-4" />
          New Trip
        </button>
      </div>

      {open && (
        <>
          <div className="p-4">
            <div className="text-xs font-semibold text-zinc-500 mb-3">Recent</div>
            <div className="space-y-2">
              {trips.map((t) => {
                const active = t.id === activeTripId;
                return (
                  <button
                    key={t.id}
                    onClick={() => onSelectTrip(t.id)}
                    className={[
                      "w-full text-left rounded-2xl border px-3 py-3 transition",
                      active
                        ? "border-indigo-200 bg-indigo-50"
                        : "border-zinc-200 hover:bg-zinc-50",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-zinc-500" />
                        <div className="font-semibold">{t.destination}</div>
                      </div>
                      <span className="text-[11px] text-zinc-500">{t.tag}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500">
                      <Calendar className="h-3.5 w-3.5" />
                      {t.dates}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="px-4 pb-4">
            <div className="text-xs font-semibold text-zinc-500 mb-3">Shortcuts</div>
            <div className="flex flex-wrap gap-2">
              {(["Work", "Family", "Budget", "Luxury"] as const).map((x) => (
                <span key={x} className="chip">
                  <Tag className="h-3.5 w-3.5 text-zinc-500" />
                  {x}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto p-4 border-t border-zinc-200/70">
            <div className="h-28 rounded-2xl bg-gradient-to-br from-zinc-100 to-white border border-zinc-200 overflow-hidden">
              <div className="p-3 text-xs text-zinc-600">
                <div className="font-semibold">Your itinerary, engineered.</div>
                <div className="mt-1 text-zinc-500">
                  Export to PDF, Docs, Calendar.
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {!open && (
        <div className="p-3 text-xs text-zinc-500">
          Sidebar collapsed.
        </div>
      )}
    </div>
  );
}
