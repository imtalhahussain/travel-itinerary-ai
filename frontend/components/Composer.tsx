"use client";

import { useState } from "react";
import { Calendar, Paperclip, SlidersHorizontal, Sparkles } from "lucide-react";

const QUICK = ["Weekend trip", "Honeymoon", "Family-friendly", "Low budget"];

export default function Composer({ onSend }: { onSend: (text: string) => void }) {
  const [text, setText] = useState("");

  function send() {
    const t = text.trim();
    if (!t) return;
    onSend(t);
    setText("");
  }

  return (
    <div>
      <div className="flex items-end gap-3">
        <button className="btn" title="Attach">
          <Paperclip className="h-4 w-4" />
        </button>
        <button className="btn" title="Calendar">
          <Calendar className="h-4 w-4" />
        </button>
        <button className="btn" title="Preferences">
          <SlidersHorizontal className="h-4 w-4" />
        </button>

        <div className="flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={2}
            placeholder="Tell me destination, dates, budget…"
            className="w-full resize-none rounded-2xl border border-zinc-200 bg-white/80 px-4 py-3 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-200"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {QUICK.map((q) => (
              <button key={q} className="chip" onClick={() => setText((p) => (p ? p + " " + q : q))}>
                {q}
              </button>
            ))}
          </div>
        </div>

        <button className="btn-primary h-11 px-5" onClick={send}>
          <Sparkles className="h-4 w-4" />
          Generate itinerary
        </button>
      </div>
      <div className="mt-2 text-xs text-zinc-500">
        Tip: Shift+Enter for new line · Enter to send
      </div>
    </div>
  );
}
