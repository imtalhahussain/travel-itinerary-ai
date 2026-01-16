"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-16"
    >
      <h1 className="text-6xl font-bold leading-tight bg-gradient-to-r from-neon to-purple-400 bg-clip-text text-transparent">
        AgentTrip AI
      </h1>
      <p className="mt-6 text-xl text-gray-400 max-w-2xl">
        A multi-agent, Groq-powered travel intelligence system that generates structured itineraries from constraints.
      </p>
    </motion.div>
  );
}
