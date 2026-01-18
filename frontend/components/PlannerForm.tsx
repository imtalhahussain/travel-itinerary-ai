"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, DollarSign, Plane, Loader2, Heart, Sparkles, Navigation } from "lucide-react";
import ItineraryCard from "./ItineraryCard";
import Image from "next/image";

type ApiState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: any }
  | { status: "error"; message: string; details?: any };

const INTERESTS = [
  { id: "Sightseeing", icon: "🏛️" },
  { id: "Adventure", icon: "🧗" },
  { id: "Relaxation", icon: "💆" },
  { id: "Culture", icon: "🎨" },
  { id: "Food & Drinks", icon: "🍷" },
  { id: "Nature", icon: "🌲" },
  { id: "Nightlife", icon: "✨" },
  { id: "Shopping", icon: "🛍️" },
];

export default function PlannerForm() {
  const [api, setApi] = useState<ApiState>({ status: "idle" });

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState<number | "">("");
  const [budget, setBudget] = useState("");
  const [interests, setInterests] = useState<string[]>([]);

  const canSubmit = useMemo(() => {
    return origin.trim() && destination.trim() && days && budget && interests.length > 0;
  }, [origin, destination, days, budget, interests]);

  function toggleInterest(tag: string) {
    setInterests((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  async function plan() {
    if (!canSubmit) return;
    setApi({ status: "loading" });

    try {
      const base = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";
      const res = await fetch(`${base}/plan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin,
          destination,
          days: Number(days),
          budget,
          interests,
        }),
      });

      const text = await res.text();
      let payload: any;
      try {
        payload = JSON.parse(text);
      } catch {
        payload = { raw: text };
      }

      if (!res.ok) {
        setApi({ status: "error", message: `Error ${res.status}`, details: payload });
        return;
      }
      setApi({ status: "success", data: payload });
    } catch (e: any) {
      setApi({ status: "error", message: e.message || "Failed to connect to the travel intelligence service. Please ensure the backend is running." });
    }
  }

  if (api.status === "success") {
    return (
      <div className="max-w-5xl mx-auto p-4 md:p-8 animate-in">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setApi({ status: "idle" })}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium group"
          >
            <div className="p-2 rounded-full bg-slate-100 group-hover:bg-indigo-50 transition-colors">
              <Navigation className="h-4 w-4 rotate-[-90deg]" />
            </div>
            Plan another trip
          </button>

          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full text-indigo-700 text-sm font-semibold">
            <Sparkles className="h-4 w-4" />
            AI-Generated Itinerary
          </div>
        </div>

        <ItineraryCard data={api.data} />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative inline-block mb-6"
          >
            <div className="relative w-32 h-32 mx-auto">
              <Image
                src="/hero-illustration.png"
                alt="Travel Hero"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight"
          >
            Your Next <span className="gradient-text">Adventure</span> Awaits
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-slate-600 max-w-xl mx-auto"
          >
            Tell us your travel dreams, and our AI agents will craft a professional itinerary just for you.
          </motion.p>
        </div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-[2rem] overflow-hidden p-1 shadow-2xl"
        >
          <div className="bg-white/40 rounded-[1.9rem] p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              {/* Destination & Origin */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-indigo-500" />
                    Starting Point
                  </label>
                  <input
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="Where are you starting?"
                    className="input-field"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                    <Navigation className="h-4 w-4 text-indigo-500" />
                    Destination
                  </label>
                  <input
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Where do you want to go?"
                    className="input-field"
                  />
                </div>
              </div>

              {/* Days & Budget */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-indigo-500" />
                    Duration (Days)
                  </label>
                  <input
                    type="number"
                    value={days}
                    onChange={(e) => setDays(e.target.value ? Number(e.target.value) : "")}
                    placeholder="How many days?"
                    className="input-field"
                    min="1"
                    max="14"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-indigo-500" />
                    Budget (approx)
                  </label>
                  <input
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g. $1500"
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            {/* Interests Section */}
            <div className="mb-10">
              <label className="text-sm font-bold text-slate-700 ml-1 mb-4 flex items-center gap-2">
                <Heart className="h-4 w-4 text-rose-500" />
                What are you interested in?
              </label>
              <div className="flex flex-wrap gap-3 mt-4">
                {INTERESTS.map((interest) => {
                  const active = interests.includes(interest.id);
                  return (
                    <button
                      key={interest.id}
                      onClick={() => toggleInterest(interest.id)}
                      className={`
                        px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 border
                        flex items-center gap-2
                        ${active
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100"
                          : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:bg-slate-50"
                        }
                      `}
                    >
                      <span className="text-base">{interest.icon}</span>
                      {interest.id}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {api.status === "error" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm flex items-start gap-3"
                >
                  <div className="mt-0.5">⚠️</div>
                  <div>
                    <p className="font-bold">Something went wrong</p>
                    <p className="opacity-90">{api.message}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Button */}
            <button
              onClick={plan}
              disabled={!canSubmit || api.status === "loading"}
              className={`
                w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all
                ${!canSubmit || api.status === "loading"
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-100 hover:shadow-indigo-200 active:scale-[0.98]"
                }
              `}
            >
              {api.status === "loading" ? (
                <>
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span>Consulting Agents...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-6 w-6" />
                  <span>Generate Itinerary</span>
                </>
              )}
            </button>

            <p className="text-center text-xs text-slate-400 mt-6 font-medium uppercase tracking-widest">
              Powered by Talha's Multi-Agent Intelligence
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
