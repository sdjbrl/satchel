"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { MatchResult } from "@/lib/satchel/types";

function formatDate(ts: number): string {
  return new Date(ts * 1000).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
  });
}

export default function MatchHistory({ matches }: { matches: MatchResult[] }) {
  if (matches.length === 0) {
    return <p className="text-white/30 text-sm">Aucun match trouvé.</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {matches.map((m, i) => (
        <motion.div
          key={m.matchId}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.04 }}
          className={`flex items-center gap-3 bg-[#12151e] rounded-lg px-4 py-3 border-l-4 ${
            m.won ? "border-green-500" : "border-red-500"
          }`}
        >
          {/* W / L badge */}
          <span
            className={`text-[10px] font-bold w-7 text-center uppercase ${
              m.won ? "text-green-400" : "text-red-400"
            }`}
          >
            {m.won ? "WIN" : "DEF"}
          </span>

          {/* Agent portrait */}
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white/5 flex-shrink-0">
            {m.agentImage ? (
              <Image src={m.agentImage} alt={m.agent} fill className="object-cover" sizes="32px" />
            ) : (
              <span className="text-xs flex items-center justify-center h-full text-white/30">
                {m.agent[0]}
              </span>
            )}
          </div>

          {/* Agent + map */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white leading-tight truncate">{m.agent}</p>
            <p className="text-[11px] text-white/40 truncate">{m.map}</p>
          </div>

          {/* Score */}
          <span className="text-white/40 text-xs hidden sm:block">{m.teamScore}</span>

          {/* K/D/A */}
          <span className="text-sm font-mono text-white/80 tabular-nums">
            {m.kills}/{m.deaths}/{m.assists}
          </span>

          {/* KD ratio */}
          <span
            className={`text-xs font-bold w-12 text-right ${
              m.kd >= 1 ? "text-[#FF4655]" : "text-white/30"
            }`}
          >
            {m.kd.toFixed(2)}
          </span>

          {/* Date */}
          <span className="text-[10px] text-white/20 hidden lg:block w-16 text-right">
            {formatDate(m.startedAt)}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
