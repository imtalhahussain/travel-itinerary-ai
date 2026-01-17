"use client";

import { useState } from "react";
import { ChevronDown, AlertTriangle, FileText, CalendarDays } from "lucide-react";

export type ItineraryDay = {
  title: string;
  items: { time?: string; title: string; meta?: string }[];
};

export type ItineraryCardModel = {
  title: string;
  dates: string;
  budgetLabel: string;
  estTotal: string;
  chips: string[];
  note: string;
  warning?: string;
  days: ItineraryDay[];
};

export default function RichItineraryCard({ model }: { model: ItineraryCardModel }) {
  const [open, setOpen] = useState<Record<number, boolean>>(
    Object.fromEntries(model.days.map((_, i) => [i, i === 0]))
  );

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-lg font-semibold">{model.title}</div>
            <div className="mt-1 text-sm text-zinc-500">{model.dates} · {model.budgetLabel}</div>
          </div>
          <div className="text-sm font-semibold text-zinc-900">{model.estTotal} <span className="text-zinc-500 font-medium">est.</span></div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {model.chips.map((c) => (
            <span key={c} className="chip">{c}</span>
          ))}
        </div>

        <div className="mt-4 text-sm text-zinc-700 leading-relaxed">
          {model.note}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <button className="btn"><FileText className="h-4 w-4" /> Export PDF</button>
          <button className="btn"><CalendarDays className="h-4 w-4" /> Calendar</button>
        </div>

        {model.warning && (
          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm">
            <div className="flex items-center gap-2 text-amber-900 font-semibold">
              <AlertTriangle className="h-4 w-4" />
              Flights data unavailable, showing best estimates.
            </div>
            <div className="mt-1 text-amber-900/80">{model.warning}</div>
          </div>
        )}
      </div>

      <div className="border-t border-zinc-200">
        {model.days.map((d, idx) => (
          <div key={idx} className="border-b border-zinc-200 last:border-b-0">
            <button
              onClick={() => setOpen((p) => ({ ...p, [idx]: !p[idx] }))}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-zinc-50 transition"
            >
              <div className="font-semibold">{d.title}</div>
              <ChevronDown className={`h-4 w-4 text-zinc-500 transition ${open[idx] ? "rotate-180" : ""}`} />
            </button>

            {open[idx] && (
              <div className="px-5 pb-5">
                <div className="grid gap-3">
                  {d.items.map((it, i) => (
                    <div key={i} className="rounded-2xl border border-zinc-200 bg-white p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="font-semibold">{it.title}</div>
                        {it.time && <div className="text-xs text-zinc-500">{it.time}</div>}
                      </div>
                      {it.meta && <div className="mt-1 text-sm text-zinc-600">{it.meta}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
