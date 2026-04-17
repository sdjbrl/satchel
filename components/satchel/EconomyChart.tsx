"use client";

import { motion } from "framer-motion";
import { DollarSign } from "lucide-react";
import type { RoundInfo } from "@/lib/satchel/types";

interface Props {
  rounds: RoundInfo[];
}

export default function EconomyChart({ rounds }: Props) {
  if (rounds.length === 0) return null;
  const max = Math.max(
    ...rounds.map((r) => Math.max(r.blueEconomy, r.redEconomy)),
    1
  );

  const blueAvg = Math.round(
    rounds.reduce((s, r) => s + r.blueEconomy, 0) / rounds.length
  );
  const redAvg = Math.round(
    rounds.reduce((s, r) => s + r.redEconomy, 0) / rounds.length
  );

  return (
    <div className="glass-card p-5">
      <header className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <DollarSign className="w-4 h-4 text-[#FF4655]" />
          <h2 className="text-white font-bold text-base tracking-tight">
            Économie round par round
          </h2>
        </div>
        <div className="flex gap-3 text-[10px] uppercase tracking-widest font-bold">
          <span className="text-cyan-400">Blue ⌀ {blueAvg.toLocaleString()}</span>
          <span className="text-[#FF4655]">Red ⌀ {redAvg.toLocaleString()}</span>
        </div>
      </header>

      <div className="flex items-end gap-0.5 h-32">
        {rounds.map((r, i) => {
          const bh = (r.blueEconomy / max) * 100;
          const rh = (r.redEconomy / max) * 100;
          return (
            <div
              key={r.round}
              className="flex-1 flex flex-col justify-end gap-0.5 h-full min-w-[6px] group relative"
              title={`R${r.round} · Blue ${r.blueEconomy.toLocaleString()} · Red ${r.redEconomy.toLocaleString()}`}
            >
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${bh / 2}%` }}
                transition={{ duration: 0.6, delay: i * 0.01 }}
                className="bg-cyan-500/60 group-hover:bg-cyan-400 rounded-sm transition"
              />
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${rh / 2}%` }}
                transition={{ duration: 0.6, delay: i * 0.01 + 0.05 }}
                className="bg-[#FF4655]/60 group-hover:bg-[#FF4655] rounded-sm transition"
              />
            </div>
          );
        })}
      </div>

      <p className="mt-3 text-[10px] text-white/30 uppercase tracking-widest">
        Valeurs en créds Valorant · données approximatives (détails de round complets non exposés par l'API publique)
      </p>
    </div>
  );
}
