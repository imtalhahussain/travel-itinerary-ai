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
        <div className="flex gap-2">
          <button className="btn h-10 w-10 p-0 text-zinc-400 hover:text-indigo-600" title="Attach">
            <Paperclip className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={1}
            placeholder="Tell me destination, dates, budget…"
            className="w-full min-h-[50px] resize-none rounded-2xl border border-zinc-200/80 bg-white px-4 py-3.5 text-sm shadow-sm
                       placeholder:text-zinc-400
                       focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all custom-scrollbar"
            style={{ minHeight: "56px" }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
          />
        </div>

        <button
          className="btn-primary h-14 w-14 rounded-2xl p-0 flex items-center justify-center shrink-0"
          onClick={send}
          disabled={!text.trim()}
        >
          <Sparkles className={`h-5 w-5 ${text.trim() ? "animate-pulse" : ""}`} />
        </button>
      </div>

      <div className="mt-3 pl-[52px] flex flex-wrap gap-2">
        {QUICK.map((q) => (
          <button
            key={q}
            className="chip text-[11px] bg-white border-zinc-200/60 text-zinc-500 hover:border-indigo-300 hover:text-indigo-600 px-3 py-1.5"
            onClick={() => setText((p) => (p ? p + " " + q : q))}
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
