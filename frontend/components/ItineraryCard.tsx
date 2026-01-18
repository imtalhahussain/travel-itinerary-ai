"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Utensils, Star, Calendar, ChevronRight } from "lucide-react";

export default function ItineraryCard({ data }: any) {
  const destination = data?.destination ?? "Your Trip";
  const totalDays = data?.total_days ?? data?.totalDays ?? data?.plan?.length ?? 0;
  const plan = Array.isArray(data?.plan) ? data.plan : [];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-8 animate-in">
      {/* Header Info */}
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3 justify-center md:justify-start">
          <div className="p-2 bg-indigo-600 rounded-lg text-white">
            <MapPin className="h-6 w-6" />
          </div>
          {destination}
        </h2>
        <p className="text-slate-500 mt-2 font-medium flex items-center justify-center md:justify-start gap-2">
          <Calendar className="h-4 w-4 text-indigo-500" />
          {totalDays} Day Discovery
        </p>
      </div>

      {/* Itinerary Progress / List */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6"
      >
        {plan.map((day: any, idx: number) => (
          <motion.div
            key={day.day || idx}
            variants={item}
            className="glass-card rounded-[2rem] overflow-hidden bg-white/60 hover:bg-white/80 transition-all duration-300"
          >
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Day Marker */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex flex-col items-center justify-center border border-indigo-100/50">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-400">Day</span>
                    <span className="text-2xl font-black text-indigo-600 leading-none">{day.day || idx + 1}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow space-y-6">
                  {/* Activities */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                      Daily Experiences
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {Array.isArray(day.activities) && day.activities.map((activity: string, i: number) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-100 shadow-sm hover:border-indigo-100 transition-colors">
                          <div className="mt-1 p-1 rounded-md bg-indigo-50 text-indigo-600">
                            <ChevronRight className="h-3 w-3" />
                          </div>
                          <span className="text-sm text-slate-700 font-medium">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dining */}
                  {Array.isArray(day.food) && day.food.length > 0 && (
                    <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-4 items-center">
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Utensils className="h-3 w-3 text-rose-400" />
                        Culinary Tips
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {day.food.map((f: string, i: number) => (
                          <span key={i} className="px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-[11px] font-bold border border-rose-100">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {plan.length === 0 && (
          <div className="p-12 text-center glass-card rounded-[2rem] bg-white/40">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-10 w-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Itinerary Processing</h3>
            <p className="text-slate-500 mt-2 max-w-xs mx-auto">
              We couldn't find a detailed plan. Please try adjusting your preferences.
            </p>
          </div>
        )}
      </motion.div>

      {/* Footer / Summary Action */}
      <div className="pb-12 text-center">
        <p className="text-slate-400 text-sm italic">
          "Travel is the only thing you buy that makes you richer."
        </p>
      </div>
    </div>
  );
}
