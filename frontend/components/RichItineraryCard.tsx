"use client";

import { useState } from "react";
import { ChevronDown, AlertTriangle, FileText, CalendarDays } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="bg-white border border-zinc-200/60 rounded-2xl shadow-sm overflow-hidden ring-1 ring-black/5">
      <div className="p-6 bg-gradient-to-br from-white to-zinc-50/50">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xl font-bold text-zinc-900 tracking-tight">{model.title}</div>
            <div className="mt-1 text-xs font-medium text-zinc-500 flex items-center gap-2">
              <span>{model.dates}</span>
              <span className="h-1 w-1 rounded-full bg-zinc-300" />
              <span>{model.budgetLabel}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-zinc-900">{model.estTotal}</div>
            <div className="text-[10px] text-zinc-400 font-medium uppercase tracking-wide">Estimated</div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {model.chips.map((c) => (
            <span key={c} className="chip text-xs bg-white border-zinc-200 text-zinc-600 hover:text-indigo-600 hover:border-indigo-200">{c}</span>
          ))}
        </div>

        <div className="mt-5 text-sm text-zinc-600 leading-relaxed max-w-2xl">
          {model.note}
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button className="btn text-xs h-8 bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-600">
            <FileText className="h-3.5 w-3.5" /> PDF
          </button>
          <button className="btn text-xs h-8 bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-600">
            <CalendarDays className="h-3.5 w-3.5" /> Add to Calendar
          </button>
        </div>

        {model.warning && (
          <div className="mt-6 rounded-xl border border-amber-200/60 bg-amber-50/60 px-4 py-3 text-sm">
            <div className="flex items-center gap-2 text-amber-800 font-semibold mb-1">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <span>Estimate Warning</span>
            </div>
            <div className="text-amber-800/80 text-xs leading-relaxed ml-6">{model.warning}</div>
          </div>
        )}
      </div>

      <div className="border-t border-zinc-100">
        {model.days.map((d, idx) => (
          <div key={idx} className="border-b border-zinc-100 last:border-b-0 bg-white">
            <button
              onClick={() => setOpen((p) => ({ ...p, [idx]: !p[idx] }))}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-zinc-50/80 transition-colors group"
            >
              <div className="font-semibold text-sm text-zinc-800 group-hover:text-indigo-600 transition-colors">{d.title}</div>
              <ChevronDown className={`h-4 w-4 text-zinc-400 group-hover:text-zinc-600 transition-transform duration-300 ${open[idx] ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {open[idx] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-2">
                    <div className="grid gap-3 pl-3 border-l-2 border-zinc-100 relative">
                      {d.items.map((it, i) => (
                        <div key={i} className="relative group">
                          <span className="absolute -left-[19px] top-3 h-2.5 w-2.5 rounded-full bg-white border-2 border-zinc-200 group-hover:border-indigo-400 transition-colors z-10"></span>
                          <div className="rounded-xl border border-zinc-100 bg-zinc-50/30 p-3.5 hover:bg-white hover:shadow-sm hover:border-zinc-200 transition-all">
                            <div className="flex items-center justify-between gap-4">
                              <div className="font-medium text-sm text-zinc-900">{it.title}</div>
                              {it.time && <div className="text-[10px] font-mono font-medium text-zinc-400 bg-white px-1.5 py-0.5 rounded border border-zinc-100">{it.time}</div>}
                            </div>
                            {it.meta && <div className="mt-1 text-xs text-zinc-500">{it.meta}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
