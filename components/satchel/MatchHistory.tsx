"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronRight, Filter } from "lucide-react";
import type { MatchResult, PlayerStats } from "@/lib/satchel/types";

const MODE_LABELS: Record<string, string> = {
  Competitive: "Ranked",
  Unranked: "Non classé",
  Swiftplay: "Swiftplay",
  Deathmatch: "Deathmatch",
  Hurm: "Team Deathmatch",
  Escalation: "Escalation",
  Replication: "Réplication",
  Snowball: "Snowball Fight",
  Unknown: "Autre",
};

function formatDate(ts: number): string {
  return new Date(ts * 1000).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
  });
}

interface Props {
  matches: MatchResult[];
  statsByMode: Record<string, PlayerStats>;
}

export default function MatchHistory({ matches, statsByMode }: Props) {
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState<string>("");

  if (matches.length === 0) {
    return <p className="text-white/30 text-sm">Aucun match trouvé.</p>;
  }

  const uniqueModes = [...new Set(matches.map((m) => m.mode))];
  const filtered = selectedMode
    ? matches.filter((m) => m.mode === selectedMode)
    : matches;

  return (
    <div className="flex flex-col gap-3">
      {/* Mode filter + stats */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex items-center gap-2 glass-card px-3 py-2">
          <Filter className="w-3.5 h-3.5 text-white/40" />
          <select
            value={selectedMode}
            onChange={(e) => setSelectedMode(e.target.value)}
            className="bg-transparent text-white/80 text-xs focus:outline-none cursor-pointer pr-2 appearance-none"
          >
            <option value="" className="bg-[#12151e]">
              Tous les modes
            </option>
            {uniqueModes.map((mode) => (
              <option key={mode} value={mode} className="bg-[#12151e]">
                {MODE_LABELS[mode] ?? mode}
              </option>
            ))}
          </select>
        </div>

        {selectedMode && statsByMode[selectedMode] && (
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-4 text-xs glass-card px-4 py-2"
          >
            <div>
              <span className="text-white/30">K/D: </span>
              <span className="text-white font-semibold tabular-nums">
                {statsByMode[selectedMode].kd.toFixed(2)}
              </span>
            </div>
            <div>
              <span className="text-white/30">Winrate: </span>
              <span className="text-white font-semibold tabular-nums">
                {statsByMode[selectedMode].winrate.toFixed(0)}%
              </span>
            </div>
            <div>
              <span className="text-white/30">Matchs: </span>
              <span className="text-white font-semibold tabular-nums">
                {statsByMode[selectedMode].matchesPlayed}
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Match list */}
      <div className="flex flex-col gap-2">
        {filtered.map((m, i) => (
          <motion.div
            key={m.matchId}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: Math.min(i * 0.025, 0.6) }}
            whileHover={{ x: 3, scale: 1.005 }}
            onClick={() => router.push(`/satchel/match/${m.matchId}`)}
            className={`group flex items-center gap-3 glass-card px-4 py-3 border-l-[3px] cursor-pointer transition-all ${
              m.won
                ? "border-l-green-500 hover:border-l-green-400"
                : "border-l-red-500 hover:border-l-red-400"
            }`}
          >
            <span
              className={`text-[10px] font-bold w-7 text-center uppercase tabular-nums ${
                m.won ? "text-green-400" : "text-red-400"
              }`}
            >
              {m.won ? "WIN" : "DEF"}
            </span>

            <motion.div
              whileHover={{ scale: 1.12, rotate: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative w-9 h-9 rounded-full overflow-hidden bg-white/5 flex-shrink-0 ring-1 ring-white/10"
            >
              {m.agentImage ? (
                <Image src={m.agentImage} alt={m.agent} fill className="object-cover" sizes="36px" />
              ) : (
                <span className="text-xs flex items-center justify-center h-full text-white/30">
                  {m.agent[0]}
                </span>
              )}
            </motion.div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white leading-tight truncate">
                {m.agent}
              </p>
              <p className="text-[11px] text-white/40 truncate">
                {m.map} · {MODE_LABELS[m.mode] ?? m.mode}
              </p>
            </div>

            <span className="text-white/40 text-xs hidden sm:block tabular-nums">
              {m.teamScore}
            </span>

            <span className="text-sm font-mono text-white/80 tabular-nums">
              {m.kills}/{m.deaths}/{m.assists}
            </span>

            <span
              className={`text-xs font-bold w-12 text-right tabular-nums ${
                m.kd >= 1 ? "text-[#FF4655]" : "text-white/30"
              }`}
            >
              {m.kd.toFixed(2)}
            </span>

            <span className="text-[10px] text-white/20 hidden lg:block w-14 text-right">
              {formatDate(m.startedAt)}
            </span>

            <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-[#FF4655] group-hover:translate-x-1 transition-all" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
