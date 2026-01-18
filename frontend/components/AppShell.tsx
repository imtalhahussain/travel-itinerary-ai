"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import TopBar from "@/components/TopBar";
import Sidebar from "@/components/Sidebar";
import ChatPanel, { ChatMessage } from "@/components/ChatPanel";
import TripPreview from "@/components/TripPreview";
import { buildMockAssistantResponse, initialMockTrips } from "@/components/mockData";

export default function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [trips, setTrips] = useState(initialMockTrips);
  const [activeTripId, setActiveTripId] = useState(() => trips?.[1]?.id ?? trips?.[0]?.id ?? "t1");

  const activeTrip = useMemo(
    () => trips?.find((t) => t.id === activeTripId) ?? trips?.[0],
    [trips, activeTripId]
  );

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m1",
      role: "assistant",
      type: "text",
      content: "Tell me where you’re going, dates, and budget. I’ll handle the rest.",
      ts: "now",
    },
    {
      id: "m2",
      role: "user",
      type: "text",
      content:
        "Plan a 5-day trip to Bali for 2 people, mid-range budget, beaches + cafes + a bit of adventure.",
      ts: "2m",
    },
    ...buildMockAssistantResponse(),
  ]);

  function onNewTrip() {
    const id = `trip-${Math.random().toString(16).slice(2)}`;
    const newTrip = {
      id,
      destination: "New Trip",
      dates: "Pick dates",
      tag: "Work" as const,
      budget: "Mid-range",
    };
    setTrips((p) => [newTrip, ...p]);
    setActiveTripId(id);
  }

  function onSend(userText: string) {
    const nowId = `u-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: nowId, role: "user", type: "text", content: userText, ts: "now" },
    ]);

    // Mock “streaming”: show typing and then insert response
    const typingId = `typing-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: typingId, role: "assistant", type: "typing", content: "", ts: "" },
    ]);

    setTimeout(() => {
      setMessages((prev) => prev.filter((m) => m.id !== typingId));
      setMessages((prev) => [...prev, ...buildMockAssistantResponse({ destination: activeTrip.destination })]);
    }, 900);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar onToggleSidebar={() => setSidebarOpen((s) => !s)} />

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex-1 mx-auto w-full max-w-[1700px] px-4 lg:px-6 pt-2 pb-6"
      >
        <div className="grid grid-cols-12 gap-5 h-[calc(100vh-100px)]">
          {/* Sidebar */}
          <div className={`${sidebarOpen ? "col-span-12 lg:col-span-3 xl:col-span-2" : "hidden lg:block lg:col-span-1"} transition-all duration-300 ease-in-out`}>
            <Sidebar
              open={sidebarOpen}
              trips={trips}
              activeTripId={activeTripId}
              onSelectTrip={setActiveTripId}
              onNewTrip={onNewTrip}
            />
          </div>

          {/* Chat Panel */}
          <div className={`${sidebarOpen ? "col-span-12 lg:col-span-6 xl:col-span-7" : "col-span-12 lg:col-span-8"} transition-all duration-300 ease-in-out`}>
            <ChatPanel
              trip={activeTrip}
              messages={messages}
              onSend={onSend}
            />
          </div>

          {/* Trip Preview */}
          <div className="col-span-12 lg:col-span-3 hidden lg:block">
            <TripPreview trip={activeTrip} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
