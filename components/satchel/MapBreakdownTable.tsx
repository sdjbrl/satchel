"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, ArrowDownUp } from "lucide-react";
import type { MapStat } from "@/lib/satchel/types";

interface Props {
  maps: MapStat[];
}

type SortKey = "matches" | "winrate" | "avgKills" | "avgAcs";

export default function MapBreakdownTable({ maps }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>("matches");
  const sorted = [...maps].sort((a, b) => b[sortKey] - a[sortKey]);

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
          <MapPin className="w-4 h-4 text-[#FF4655]" />
          <h2 className="text-white font-bold text-base tracking-tight">Par map</h2>
        </div>
        <span className="text-[10px] text-white/30 uppercase tracking-widest">
          {maps.length} map{maps.length > 1 ? "s" : ""}
        </span>
      </header>

      {maps.length === 0 ? (
        <p className="text-white/40 text-sm py-8 text-center">Aucune map jouée.</p>
      ) : (
        <div className="space-y-2">
          <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-3 px-3 pb-2">
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">Map</span>
            <SortBtn k="matches" label="Games" />
            <SortBtn k="winrate" label="WR" />
            <SortBtn k="avgKills" label="Kills" />
            <SortBtn k="avgAcs" label="ACS" />
          </div>
          {sorted.map((m, i) => (
            <motion.div
              key={m.map}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-3 items-center px-3 py-2.5 rounded-md bg-white/5 hover:bg-white/10 transition"
            >
              <span className="text-white font-semibold text-sm">{m.map}</span>
              <span className="text-white/70 font-mono text-sm w-12 text-right">{m.matches}</span>
              <span className={`font-mono text-sm font-bold w-12 text-right ${
                m.winrate >= 55 ? "text-emerald-400" : m.winrate < 45 ? "text-[#FF4655]" : "text-white/80"
              }`}>{m.winrate}%</span>
              <span className="text-white/80 font-mono text-sm w-12 text-right">{m.avgKills}</span>
              <span className="text-white/80 font-mono text-sm w-12 text-right">{m.avgAcs}</span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
