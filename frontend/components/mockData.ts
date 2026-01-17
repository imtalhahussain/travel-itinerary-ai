import type { TripItem } from "./Sidebar";
import type { ChatMessage } from "./ChatPanel";
import type { ItineraryCardModel } from "./RichItineraryCard";

export const initialMockTrips: TripItem[] = [
  { id: "t1", destination: "Lisbon", dates: "Apr 20 — Apr 25", tag: "Work", budget: "Mid-range" },
  { id: "t2", destination: "Bali", dates: "Apr 24 — Apr 28", tag: "Family", budget: "Mid-range" },
  { id: "t3", destination: "Kashmir", dates: "Mar 15 — Mar 19", tag: "Budget", budget: "Low" },
  { id: "t4", destination: "Tokyo", dates: "Feb 12 — Feb 19", tag: "Luxury", budget: "High" },
  { id: "t5", destination: "Paris", dates: "Jan 15 — Jan 19", tag: "Work", budget: "Mid-range" },
];

export function buildMockAssistantResponse(opts?: { destination?: string }): ChatMessage[] {
  const model: ItineraryCardModel = {
    title: `Your ${opts?.destination ?? "Bali"} Itinerary`,
    dates: "Apr 24 — 28",
    budgetLabel: "Mid-range budget",
    estTotal: "$2,560.00",
    chips: ["Balanced", "Moderate pace", "Interests"],
    note:
      "Sunny with occasional showers. Best areas to stay include Seminyak and Ubud for easy access to beaches and dining.",
    warning:
      "We’ll still generate a strong plan using reputable averages. You can retry flights when the provider recovers.",
    days: [
      {
        title: "Day 1 · Uluwatu Sunset",
        items: [
          { time: "2:00 PM", title: "Check-in near Seminyak", meta: "Top areas: Seminyak / Canggu / Ubud" },
          { time: "5:30 PM", title: "Uluwatu Temple + sunset viewpoint", meta: "Scenic cliff walk; crowd-aware timing" },
          { time: "8:00 PM", title: "Seafood dinner (Jimbaran)", meta: "Reserve a beachfront table" },
        ],
      },
      {
        title: "Day 2 · Surf + Cafes",
        items: [
          { time: "8:30 AM", title: "Canggu cafes crawl", meta: "Short walking loop; great for photos" },
          { time: "11:00 AM", title: "Surf lesson", meta: "Beginner-friendly beach; board rental included" },
          { time: "6:30 PM", title: "Beach club sunset", meta: "Optional: swap for Ubud night market" },
        ],
      },
      {
        title: "Day 3 · Ubud nature",
        items: [
          { time: "9:00 AM", title: "Rice terraces + swing", meta: "Early to avoid queues" },
          { time: "1:00 PM", title: "Coffee tasting", meta: "Local roastery + tasting flight" },
          { time: "7:30 PM", title: "Spa recovery", meta: "Great after adventure days" },
        ],
      },
      {
        title: "Day 4 · Adventure",
        items: [
          { time: "6:00 AM", title: "Sunrise hike (optional)", meta: "Weather dependent; bring layers" },
          { time: "12:00 PM", title: "Waterfall loop", meta: "Short commute; swim spots" },
          { time: "8:00 PM", title: "Chef’s choice dinner", meta: "Modern Balinese tasting menu" },
        ],
      },
      {
        title: "Day 5 · Chill + depart",
        items: [
          { time: "10:00 AM", title: "Late brunch", meta: "Pack-friendly meal" },
          { time: "12:30 PM", title: "Beach time + souvenirs", meta: "Flexible block" },
          { time: "5:00 PM", title: "Airport transfer", meta: "Add buffer for traffic" },
        ],
      },
    ],
  };

  return [
    {
      id: `a-${Date.now()}-overview`,
      role: "assistant",
      type: "itinerary",
      content: model,
      ts: "now",
    },
  ];
}
