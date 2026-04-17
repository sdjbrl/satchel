"use client";

import { motion } from "framer-motion";
import {
  Brain,
  ThumbsUp,
  AlertTriangle,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import type { CoachInsight } from "@/lib/satchel/types";

interface Props {
  insights: CoachInsight[];
}

const SEVERITY_STYLES = {
  positive: {
    ring: "ring-emerald-500/30",
    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40",
    Icon: ThumbsUp,
    label: "Fort",
  },
  negative: {
    ring: "ring-[#FF4655]/40",
    badge: "bg-[#FF4655]/15 text-[#FF4655] border-[#FF4655]/40",
    Icon: AlertTriangle,
    label: "À travailler",
  },
  neutral: {
    ring: "ring-white/15",
    badge: "bg-white/10 text-white/70 border-white/20",
    Icon: TrendingUp,
    label: "À noter",
  },
} as const;

export default function AiCoach({ insights }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card-red p-6 relative overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute -top-20 -right-20 w-64 h-64 bg-[#FF4655]/10 blur-3xl rounded-full pointer-events-none"
      />
      <header className="flex items-center justify-between mb-5 relative">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-[#FF4655]/20 border border-[#FF4655]/50 flex items-center justify-center glow-red">
            <Brain className="w-5 h-5 text-[#FF4655]" />
          </div>
          <div>
            <p className="text-[10px] text-[#FF4655] font-bold tracking-[0.25em] uppercase">
              Coach IA
            </p>
            <h2 className="text-white font-bold text-lg">
              Analyse de ton jeu
            </h2>
          </div>
        </div>
        <span className="hidden md:flex items-center gap-1.5 text-[10px] text-white/40 uppercase tracking-widest">
          <Sparkles className="w-3 h-3" />
          {insights.length} insight{insights.length > 1 ? "s" : ""}
        </span>
      </header>

      <div className="grid md:grid-cols-2 gap-3 relative">
        {insights.map((insight, i) => {
          const S = SEVERITY_STYLES[insight.severity];
          return (
            <motion.article
              key={insight.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={{ y: -2 }}
              className={`bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-4 ring-1 ${S.ring}`}
            >
              <div className="flex items-start gap-3">
                <div className={`border ${S.badge} rounded-md px-2 py-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider shrink-0`}>
                  <S.Icon className="w-3 h-3" />
                  {S.label}
                </div>
                {insight.metric && (
                  <span className="ml-auto text-[10px] font-mono text-white/50 uppercase tracking-wider">
                    {insight.metric}
                  </span>
                )}
              </div>
              <h3 className="text-white font-semibold text-sm mt-3 leading-snug">
                {insight.title}
              </h3>
              <p className="text-white/50 text-xs leading-relaxed mt-1.5">
                {insight.body}
              </p>
            </motion.article>
          );
        })}
      </div>

      <footer className="mt-5 pt-4 border-t border-white/10 text-[10px] text-white/30 uppercase tracking-widest relative">
        Basé sur tes {insights.length > 0 ? "derniers matchs" : "stats"} — pas un vrai LLM, juste de la logique.
      </footer>
    </motion.section>
  );
}
