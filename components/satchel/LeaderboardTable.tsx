"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Trophy, Crown, ChevronRight } from "lucide-react";
import type { LeaderboardEntry } from "@/lib/satchel/types";

interface Props {
  entries: LeaderboardEntry[];
  region: string;
}

function tierColor(tier: number): string {
  if (tier === 27) return "text-yellow-300";
  if (tier >= 25) return "text-purple-300";
  if (tier >= 24) return "text-pink-300";
  return "text-cyan-300";
}

function rankBadge(rank: number): { bg: string; text: string; Icon?: typeof Crown } {
  if (rank === 1) return { bg: "bg-yellow-500/20 border-yellow-500/60", text: "text-yellow-300", Icon: Crown };
  if (rank === 2) return { bg: "bg-slate-300/15 border-slate-300/40", text: "text-slate-200" };
  if (rank === 3) return { bg: "bg-orange-500/20 border-orange-500/50", text: "text-orange-300" };
  return { bg: "bg-white/5 border-white/10", text: "text-white/70" };
}

export default function LeaderboardTable({ entries, region }: Props) {
  return (
    <div className="glass-card p-0 overflow-hidden">
      <header className="flex items-center justify-between px-5 py-4 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <Trophy className="w-4 h-4 text-[#FF4655]" />
          <h2 className="text-white font-bold text-base tracking-tight">
            Top joueurs · {region.toUpperCase()}
          </h2>
        </div>
        <span className="text-[10px] text-white/30 uppercase tracking-widest">
          {entries.length} entries
        </span>
      </header>

      <div className="divide-y divide-white/5">
        {entries.map((e, i) => {
          const badge = rankBadge(e.rank);
          const Icon = badge.Icon;
          return (
            <motion.div
              key={e.puuid}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: Math.min(i * 0.01, 0.5) }}
            >
              <Link
                href={`/satchel/player/${encodeURIComponent(`${e.name}#${e.tag}`)}`}
                className="group flex items-center gap-4 px-5 py-3 hover:bg-white/5 transition"
              >
                <div
                  className={`w-9 h-9 rounded-md border flex items-center justify-center text-xs font-bold font-mono shrink-0 ${badge.bg} ${badge.text}`}
                >
                  {Icon ? <Icon className="w-4 h-4" /> : `#${e.rank}`}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm truncate">
                    {e.name}
                    <span className="text-white/30 font-normal">#{e.tag}</span>
                  </p>
                  <p className={`text-xs font-bold tracking-wide uppercase ${tierColor(e.tier)}`}>
                    {e.tierName}
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-6 text-right font-mono">
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest">RR</p>
                    <p className="text-white font-bold">{e.rr}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest">Wins</p>
                    <p className="text-white/80">{e.wins}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-[#FF4655] group-hover:translate-x-0.5 transition" />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
