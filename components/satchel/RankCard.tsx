"use client";

import { motion } from "framer-motion";
import { Crown, TrendingUp } from "lucide-react";
import type { RankData } from "@/lib/satchel/types";

const RANK_ICONS: Record<number, string> = {
  0: "🔰", 3: "🥉", 6: "🥈", 9: "🥇", 12: "💎", 15: "💎",
  18: "🔮", 21: "🔮", 24: "👑", 27: "⚡",
};

function rankIcon(tier: number): string {
  const base = Math.floor(tier / 3) * 3;
  return RANK_ICONS[base] ?? "❓";
}

export default function RankCard({ rank }: { rank: RankData }) {
  const pct = Math.min(rank.rr, 99);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card-red p-5 flex items-center gap-5 relative overflow-hidden glow-red"
    >
      {/* subtle gradient accent */}
      <div
        aria-hidden
        className="absolute -right-20 -top-20 w-48 h-48 bg-[#FF4655]/20 blur-3xl rounded-full"
      />

      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="text-5xl leading-none filter drop-shadow-[0_0_16px_rgba(255,70,85,0.6)]"
      >
        {rankIcon(rank.tier)}
      </motion.div>

      <div className="flex-1 relative z-10">
        <p className="text-[#FF4655] font-bold tracking-widest uppercase text-sm flex items-center gap-2">
          <Crown className="w-3.5 h-3.5" />
          {rank.tierName}
        </p>

        <div className="mt-2 mb-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="h-full bg-gradient-to-r from-[#FF4655] to-[#ff7b85] rounded-full"
          />
        </div>
        <p className="text-white/50 text-xs tabular-nums">{rank.rr} RR</p>

        {rank.peakTierName !== rank.tierName && (
          <p className="text-white/30 text-xs mt-1 flex items-center gap-1.5">
            <TrendingUp className="w-3 h-3" />
            Peak : {rank.peakTierName}
          </p>
        )}
      </div>
    </motion.div>
  );
}
