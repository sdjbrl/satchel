"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { AgentStat } from "@/lib/satchel/types";

export default function TopAgents({ agents }: { agents: AgentStat[] }) {
  if (agents.length === 0) return null;
  return (
    <div className="glass-card overflow-hidden">
      <div className="px-4 py-2 border-b border-white/5 grid grid-cols-5 text-[10px] uppercase tracking-widest text-white/30 font-semibold">
        <span className="col-span-2">Agent</span>
        <span className="text-right">Matchs</span>
        <span className="text-right">Winrate</span>
        <span className="text-right">K/D</span>
      </div>
      {agents.map((a, i) => (
        <motion.div
          key={a.agent}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.04 }}
          whileHover={{ x: 2 }}
          className="px-4 py-3 grid grid-cols-5 items-center border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors cursor-default"
        >
          <div className="col-span-2 flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.15, rotate: 4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative w-8 h-8 rounded-full overflow-hidden bg-white/5 flex-shrink-0 ring-1 ring-white/10"
            >
              {a.agentImage ? (
                <Image src={a.agentImage} alt={a.agent} fill className="object-cover" sizes="32px" />
              ) : null}
            </motion.div>
            <span className="text-sm text-white font-medium">{a.agent}</span>
          </div>
          <span className="text-right text-sm text-white/60 tabular-nums">{a.matches}</span>
          <span
            className={`text-right text-sm font-bold tabular-nums ${
              a.winrate >= 50 ? "text-green-400" : "text-red-400"
            }`}
          >
            {a.winrate}%
          </span>
          <span
            className={`text-right text-sm font-bold tabular-nums ${
              a.kd >= 1 ? "text-[#FF4655]" : "text-white/40"
            }`}
          >
            {a.kd.toFixed(2)}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
