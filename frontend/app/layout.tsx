import "./globals.css";

export const metadata = {
  title: "AgentTrip AI — Your itinerary, engineered.",
  description: "Premium multi-agent travel itinerary planner.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-50 text-zinc-900 antialiased">
        {children}
      </body>
    </html>
  );
}
