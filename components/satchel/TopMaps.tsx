"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import type { MapStat } from "@/lib/satchel/types";

export default function TopMaps({ maps }: { maps: MapStat[] }) {
  if (maps.length === 0) return null;
  return (
    <div className="glass-card overflow-hidden">
      <div className="px-4 py-2 border-b border-white/5 grid grid-cols-3 text-[10px] uppercase tracking-widest text-white/30 font-semibold">
        <span>Map</span>
        <span className="text-right">Matchs</span>
        <span className="text-right">Winrate</span>
      </div>
      {maps.map((m, i) => (
        <motion.div
          key={m.map}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.04 }}
          whileHover={{ x: 2 }}
          className="px-4 py-3 grid grid-cols-3 items-center border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors cursor-default"
        >
          <span className="text-sm text-white font-medium flex items-center gap-2">
            <MapPin className="w-3 h-3 text-white/30" />
            {m.map}
          </span>
          <span className="text-right text-sm text-white/60 tabular-nums">{m.matches}</span>
          <span
            className={`text-right text-sm font-bold tabular-nums ${
              m.winrate >= 50 ? "text-green-400" : "text-red-400"
            }`}
          >
            {m.winrate}%
          </span>
        </motion.div>
      ))}
    </div>
  );
}
