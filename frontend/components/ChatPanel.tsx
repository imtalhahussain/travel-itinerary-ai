"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Copy, FileDown, MoreHorizontal, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
    // Scroll to bottom when messages change
    if (listRef.current) {
      const scroll = listRef.current.scrollHeight - listRef.current.clientHeight;
      listRef.current.scrollTo({ top: scroll, behavior: "smooth" });
    }
  }, [messages, loading]);

  const headerTitle = useMemo(() => `${trip.destination} Itinerary`, [trip.destination]);

  function handleSend(text: string) {
    setLoading(true);
    onSend(text);
    setTimeout(() => setLoading(false), 950);
  }

  return (
    <div className="card h-full flex flex-col overflow-hidden bg-white/50 border-white/40 shadow-xl shadow-indigo-500/5">
      {/* Header */}
      <div className="px-6 py-4 border-b border-black/5 flex items-center justify-between bg-white/40 backdrop-blur-md z-10">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shadow-inner">
            <Sparkles className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <div className="font-bold text-zinc-900">{headerTitle}</div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              <span>Online · 3 Agents Active</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button className="btn border-none hover:bg-black/5" title="Export">
            <FileDown className="h-4 w-4" />
          </button>
          <button className="btn border-none hover:bg-black/5" title="More">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={listRef} className="flex-1 overflow-y-auto custom-scrollbar px-6 py-6 space-y-6">
        <AnimatePresence initial={false}>
          {messages.map((m) => {
            const isUser = m.role === "user";

            if (m.type === "typing") return <Typing key={m.id} />;
            if (m.type === "warning") return <WarningBubble key={m.id} text={m.content} />;

            if (m.type === "itinerary") {
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="max-w-[95%] lg:max-w-[90%]"
                >
                  <RichItineraryCard model={m.content} />
                </motion.div>
              );
            }

            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10, x: isUser ? 10 : -10 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-5 py-3.5 shadow-sm text-sm leading-relaxed ${isUser
                      ? "bg-[#2E2E30] text-white rounded-br-none"
                      : "bg-white border border-zinc-100 text-zinc-800 rounded-bl-none"
                    }`}
                >
                  <div>{m.content}</div>
                  <div className={`text-[10px] mt-1.5 font-medium opacity-60 ${isUser ? "text-right text-zinc-400" : "text-zinc-400"}`}>
                    {m.ts === "now" ? "Just now" : m.ts}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {loading && <SkeletonMessage />}
      </div>

      {/* Composer */}
      <div className="p-4 bg-white/60 backdrop-blur-md border-t border-white/50">
        <Composer onSend={handleSend} />
      </div>
    </div>
  );
}

function Typing() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex justify-start"
    >
      <div className="bg-white border border-zinc-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-1.5">
        <span className="block h-1.5 w-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="block h-1.5 w-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="block h-1.5 w-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </motion.div>
  );
}

function WarningBubble({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mx-auto max-w-[85%] rounded-xl border border-amber-200/60 bg-amber-50/80 px-4 py-3 text-sm text-amber-900 shadow-sm"
    >
      <div className="font-semibold flex items-center gap-2">
        Heads up
      </div>
      <div className="mt-1 opacity-90">{text}</div>
    </motion.div>
  );
}
