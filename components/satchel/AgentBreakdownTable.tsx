"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Shield, ArrowDownUp } from "lucide-react";
import type { AgentStat } from "@/lib/satchel/types";

interface Props {
  agents: AgentStat[];
}

type SortKey = "matches" | "winrate" | "kd" | "acs" | "headshotPct";

export default function AgentBreakdownTable({ agents }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>("matches");

  const sorted = [...agents].sort((a, b) => b[sortKey] - a[sortKey]);

  const SortBtn = ({ k, label }: { k: SortKey; label: string }) => (
    <button
      onClick={() => setSortKey(k)}
      className={`flex items-center gap-1 uppercase tracking-wider text-[10px] font-bold transition ${
        sortKey === k ? "text-[#FF4655]" : "text-white/40 hover:text-white/70"
      }`}
    >
      {label}
      <ArrowDownUp className="w-3 h-3" />
    </button>
  );

  return (
    <div className="glass-card p-5">
      <header className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <Shield className="w-4 h-4 text-[#FF4655]" />
          <h2 className="text-white font-bold text-base tracking-tight">
            Par agent
          </h2>
        </div>
        <span className="text-[10px] text-white/30 uppercase tracking-widest">
          {agents.length} agent{agents.length > 1 ? "s" : ""}
        </span>
      </header>

      {agents.length === 0 ? (
        <p className="text-white/40 text-sm py-8 text-center">Aucun agent joué.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="pb-3 pr-2 text-white/40 text-[10px] uppercase tracking-widest font-semibold">
                  Agent
                </th>
                <th className="pb-3 px-2"><SortBtn k="matches" label="Games" /></th>
                <th className="pb-3 px-2"><SortBtn k="winrate" label="WR" /></th>
                <th className="pb-3 px-2"><SortBtn k="kd" label="K/D" /></th>
                <th className="pb-3 px-2"><SortBtn k="acs" label="ACS" /></th>
                <th className="pb-3 px-2"><SortBtn k="headshotPct" label="HS%" /></th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((a, i) => (
                <motion.tr
                  key={a.agent}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-t border-white/5 hover:bg-white/5 transition"
                >
                  <td className="py-3 pr-2">
                    <div className="flex items-center gap-2.5">
                      {a.agentImage && (
                        <div className="relative w-8 h-8 rounded-md overflow-hidden bg-black/40 ring-1 ring-white/10">
                          <Image
                            src={a.agentImage}
                            alt={a.agent}
                            fill
                            className="object-cover"
                            sizes="32px"
                          />
                        </div>
                      )}
                      <span className="text-white font-semibold">{a.agent}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-white/70 font-mono">{a.matches}</td>
                  <td className={`py-3 px-2 font-mono font-bold ${
                    a.winrate >= 55 ? "text-emerald-400" : a.winrate < 45 ? "text-[#FF4655]" : "text-white/80"
                  }`}>{a.winrate}%</td>
                  <td className="py-3 px-2 font-mono text-white/80">{a.kd}</td>
                  <td className="py-3 px-2 font-mono text-white/80">{a.acs}</td>
                  <td className="py-3 px-2 font-mono text-white/80">{a.headshotPct}%</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
