"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Copy, FileDown, RefreshCcw, Save, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Composer from "./Composer";
import type { TripItem } from "./Sidebar";
import RichItineraryCard, { ItineraryCardModel } from "./RichItineraryCard";
import SkeletonMessage from "./SkeletonMessage";

export type ChatMessage =
  | { id: string; role: "user" | "assistant"; type: "text"; content: string; ts: string }
  | { id: string; role: "assistant"; type: "itinerary"; content: ItineraryCardModel; ts: string }
  | { id: string; role: "assistant"; type: "warning"; content: string; ts: string }
  | { id: string; role: "assistant"; type: "typing"; content: ""; ts: "" };

export default function ChatPanel({
  trip,
  messages,
  onSend,
}: {
  trip: TripItem;
  messages: ChatMessage[];
  onSend: (text: string) => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const headerTitle = useMemo(() => `${trip.destination} Itinerary`, [trip.destination]);

  function handleSend(text: string) {
    setLoading(true);
    onSend(text);
    setTimeout(() => setLoading(false), 950);
  }

  return (
    <div className="card h-[calc(100vh-120px)] flex flex-col overflow-hidden">
      <div className="px-5 py-4 border-b border-zinc-200/70 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl bg-indigo-600/10 border border-indigo-200 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-indigo-600" />
          </div>
          <div>
            <div className="font-semibold">{headerTitle}</div>
            <div className="text-xs text-zinc-500">Premium multi-agent planner · Groq runtime</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="btn" title="Copy">
            <Copy className="h-4 w-4" />
          </button>
          <button className="btn" title="Save">
            <Save className="h-4 w-4" />
          </button>
          <button className="btn" title="Regenerate">
            <RefreshCcw className="h-4 w-4" />
          </button>
          <button className="btn" title="Export">
            <FileDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div ref={listRef} className="flex-1 overflow-auto px-5 py-5 space-y-4">
        {messages.map((m) => {
          if (m.type === "typing") return <Typing key={m.id} />;
          if (m.type === "warning") return <WarningBubble key={m.id} text={m.content} />;

          if (m.type === "itinerary") {
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
                className="max-w-[92%]"
              >
                <RichItineraryCard model={m.content} />
              </motion.div>
            );
          }

          const isUser = m.role === "user";
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={isUser ? "flex justify-end" : "flex justify-start"}
            >
              <div className={isUser ? "max-w-[84%] rounded-2xl bg-zinc-900 text-white px-4 py-3 shadow-sm" : "max-w-[84%] rounded-2xl bg-white border border-zinc-200 px-4 py-3 shadow-sm"}>
                <div className="text-sm leading-relaxed">{m.content}</div>
                <div className={isUser ? "text-[11px] text-white/60 mt-2 text-right" : "text-[11px] text-zinc-500 mt-2"}>{m.ts}</div>
              </div>
            </motion.div>
          );
        })}

        {loading && <SkeletonMessage />}
      </div>

      <div className="border-t border-zinc-200/70 p-4">
        <Composer onSend={handleSend} />
      </div>
    </div>
  );
}

function Typing() {
  return (
    <div className="flex items-center gap-2 max-w-[70%]">
      <div className="h-9 w-9 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center">
        <div className="h-2 w-2 rounded-full bg-indigo-500" />
      </div>
      <div className="rounded-2xl bg-white border border-zinc-200 px-4 py-3">
        <div className="flex items-center gap-1">
          <Dot delay={0} />
          <Dot delay={0.15} />
          <Dot delay={0.3} />
        </div>
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <motion.span
      className="inline-block h-2 w-2 rounded-full bg-zinc-400"
      animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 0.9, repeat: Infinity, delay }}
    />
  );
}

function WarningBubble({ text }: { text: string }) {
  return (
    <div className="max-w-[92%] rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      <div className="font-semibold">Heads up</div>
      <div className="mt-1">{text}</div>
    </div>
  );
}
