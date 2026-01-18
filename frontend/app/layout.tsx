import "./globals.css";

export const metadata = {
  title: "AgentTrip AI — Your itinerary, engineered.",
  description: "Premium multi-agent travel itinerary planner.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
