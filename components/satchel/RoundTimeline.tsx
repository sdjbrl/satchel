"use client";

import { motion } from "framer-motion";
import { Bomb, Shield, Swords, Clock, Zap } from "lucide-react";
import type { RoundInfo } from "@/lib/satchel/types";

interface Props {
  rounds: RoundInfo[];
}

const END_TYPE_ICON = {
  elimination: Swords,
  defuse: Shield,
  detonate: Bomb,
  time: Clock,
} as const;

const END_TYPE_LABEL = {
  elimination: "Élimination",
  defuse: "Désamorçage",
  detonate: "Détonation",
  time: "Temps écoulé",
} as const;

export default function RoundTimeline({ rounds }: Props) {
  return (
    <div className="glass-card p-5">
      <header className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <Zap className="w-4 h-4 text-[#FF4655]" />
          <h2 className="text-white font-bold text-base tracking-tight">
            Timeline des rounds
          </h2>
        </div>
        <span className="text-[10px] text-white/30 uppercase tracking-widest">
          {rounds.length} rounds
        </span>
      </header>

      <div className="flex items-center gap-4 text-[10px] text-white/40 uppercase tracking-widest mb-3">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-cyan-500/70" />
          Blue
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#FF4655]" />
          Red
        </span>
      </div>

      <div className="flex gap-1 overflow-x-auto pb-1">
        {rounds.map((r, i) => {
          const Icon = END_TYPE_ICON[r.endType];
          const isBlue = r.winningTeam === "blue";
          return (
            <motion.div
              key={r.round}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.015 }}
              whileHover={{ scale: 1.1, y: -2 }}
              title={`Round ${r.round} — ${END_TYPE_LABEL[r.endType]} · ${
                isBlue ? "Blue" : "Red"
              } win`}
              className={`relative flex flex-col items-center justify-center min-w-[32px] h-12 rounded-sm border transition cursor-default ${
                isBlue
                  ? "bg-cyan-500/20 border-cyan-500/50"
                  : "bg-[#FF4655]/20 border-[#FF4655]/50"
              }`}
            >
              <Icon
                className={`w-3 h-3 ${
                  isBlue ? "text-cyan-300" : "text-[#FF4655]"
                }`}
              />
              <span className="text-[9px] font-mono text-white/60 mt-0.5">
                {r.round}
              </span>
              {(r.bluePlantedSpike || r.redPlantedSpike) && (
                <span
                  className={`absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full ${
                    r.bluePlantedSpike ? "bg-cyan-400" : "bg-[#FF4655]"
                  } ring-2 ring-black/60`}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      <p className="mt-4 text-[10px] text-white/30 uppercase tracking-widest">
        Survole un round pour voir le détail · <span className="text-[#FF4655]">●</span> = spike planté
      </p>
    </div>
  );
}
