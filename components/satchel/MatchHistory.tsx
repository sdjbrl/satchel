"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
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
  viewerName?: string;
}

export default function MatchHistory({ matches, statsByMode, viewerName }: Props) {
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState<string>("");

  if (matches.length === 0) {
    return <p className="text-white/30 text-sm">Aucun match trouvé.</p>;
  }

  // Extract unique modes
  const uniqueModes = [...new Set(matches.map(m => m.mode))];
  const filtered = selectedMode ? matches.filter(m => m.mode === selectedMode) : matches;

  return (
    <div className="flex flex-col gap-3">
      {/* Mode filter dropdown */}
      <select
        value={selectedMode}
        onChange={(e) => setSelectedMode(e.target.value)}
        className="bg-[#12151e] border border-white/10 text-white/70 text-xs rounded-md px-3 py-2 focus:outline-none focus:border-[#FF4655]/40"
      >
        <option value="">Tous les modes</option>
        {uniqueModes.map((mode) => (
          <option key={mode} value={mode}>
            {MODE_LABELS[mode] ?? mode}
          </option>
        ))}
      </select>

      {/* Per-mode stats bar */}
      {selectedMode && statsByMode[selectedMode] && (
        <div className="flex gap-6 text-xs text-white/50 bg-white/5 rounded-md px-4 py-2">
          <div>
            <span className="text-white/30">K/D: </span>
            <span className="text-white font-semibold">{statsByMode[selectedMode].kd.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-white/30">Winrate: </span>
            <span className="text-white font-semibold">{statsByMode[selectedMode].winrate.toFixed(0)}%</span>
          </div>
          <div>
            <span className="text-white/30">Matchs: </span>
            <span className="text-white font-semibold">{statsByMode[selectedMode].matchesPlayed}</span>
          </div>
        </div>
      )}

      {/* Match list */}
      <div className="flex flex-col gap-2">
        {filtered.map((m, i) => (
          <motion.div
            key={m.matchId}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => router.push(`/satchel/match/${m.matchId}`)}
            className={`flex items-center gap-3 bg-[#12151e] rounded-lg px-4 py-3 border-l-4 cursor-pointer ${
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
    </div>
  );
}
