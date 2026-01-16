import { motion } from "framer-motion";

export default function ItineraryCard({ data }: any) {
  const destination = data?.destination ?? "Trip";
  const totalDays = data?.total_days ?? data?.totalDays ?? data?.plan?.length ?? 0;
  const plan = Array.isArray(data?.plan) ? data.plan : [];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
      className="bg-glass backdrop-blur-xl rounded-3xl p-8 border border-white/10"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-xl font-semibold">
          {destination} <span className="text-gray-400">·</span> {totalDays} Days
        </h3>
        <span className="text-xs text-gray-400 border border-white/10 rounded-full px-3 py-1 bg-black/30">
          Groq + Multi-Agent
        </span>
      </div>

      <div className="mt-6 space-y-4 max-h-[520px] overflow-auto pr-2">
        {plan.map((day: any) => (
          <div key={day.day} className="p-4 rounded-2xl bg-black/40 border border-white/10">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Day {day.day}</p>
              <p className="text-xs text-gray-400">
                {Array.isArray(day.activities) ? `${day.activities.length} activities` : "plan"}
              </p>
            </div>

            {Array.isArray(day.activities) && (
              <ul className="mt-3 text-sm text-gray-200 space-y-1 list-disc list-inside">
                {day.activities.slice(0, 6).map((a: string, i: number) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            )}

            {Array.isArray(day.food) && (
              <p className="mt-3 text-xs text-gray-400">
                Food: {day.food.slice(0, 3).join(", ")}
              </p>
            )}
          </div>
        ))}

        {plan.length === 0 && (
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-gray-300">
            No itinerary returned. Check backend response.
          </div>
        )}
      </div>
    </motion.div>
  );
}
