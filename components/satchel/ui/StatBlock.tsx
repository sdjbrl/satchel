"use client";

import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { type ReactNode } from "react";

interface Props {
  icon?: LucideIcon;
  label: string;
  value: ReactNode;
  hint?: string;
  accent?: boolean;
  delay?: number;
}

export default function StatBlock({
  icon: Icon,
  label,
  value,
  hint,
  accent = false,
  delay = 0,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
      className={`glass-card p-4 relative overflow-hidden group ${
        accent ? "border-t-2 border-t-[#FF4655]" : ""
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <p className="text-white/40 text-[10px] uppercase tracking-widest font-semibold">
          {label}
        </p>
        {Icon && (
          <Icon
            className={`w-3.5 h-3.5 ${accent ? "text-[#FF4655]" : "text-white/30"} group-hover:text-[#FF4655] transition-colors`}
          />
        )}
      </div>
      <p
        className={`text-2xl font-extrabold tabular-nums ${
          accent ? "text-gradient-red" : "text-white"
        }`}
      >
        {value}
      </p>
      {hint && <p className="text-white/30 text-[10px] mt-1">{hint}</p>}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#FF4655]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}
