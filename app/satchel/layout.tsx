// app/satchel/layout.tsx
// Root Satchel layout — no site-wide nav, full Valorant dark theme
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Satchel — Valorant Companion",
  description: "Ton hub Valorant : stats, boutique quotidienne et inventaire.",
};

export default function SatchelRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Override the root layout's theme — Satchel always dark
    <div className="min-h-screen valorant-bg text-[#e0e0e0] font-sans antialiased">
      {children}
    </div>
  );
}
