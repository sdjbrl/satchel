"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  "Initializing runtime environment...",
  "Loading core modules... [OK]",
  "Mounting filesystem... [OK]",
  "Starting network stack... [OK]",
  "Connecting to saiddev.fr... [OK]",
  "Authenticating session... [OK]",
  "Rendering interface...",
];

function useCurrentDate() {
  const [date, setDate] = useState("");
  useEffect(() => {
    const fmt = () => {
      const now = new Date();
      const d = now.toLocaleDateString("fr-FR", {
        weekday: "short", year: "numeric", month: "2-digit", day: "2-digit",
      });
      const t = now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      setDate(`${d} — ${t}`);
    };
    fmt();
    const id = setInterval(fmt, 1000);
    return () => clearInterval(id);
  }, []);
  return date;
}

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const date = useCurrentDate();

  useEffect(() => {
    const totalDuration = 2200;
    const lineInterval = totalDuration / BOOT_LINES.length;

    const lineTimer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= BOOT_LINES.length) {
          clearInterval(lineTimer);
          return prev;
        }
        return prev + 1;
      });
    }, lineInterval);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 2;
      });
    }, totalDuration / 50);

    const doneTimer = setTimeout(() => {
      setDone(true);
      setTimeout(onDone, 600);
    }, totalDuration + 400);

    return () => {
      clearInterval(lineTimer);
      clearInterval(progressTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] bg-[#0a0a0f] flex flex-col justify-between p-6 sm:p-10 font-mono overflow-hidden"
          aria-label="Chargement"
          aria-live="polite"
        >
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" aria-hidden="true" />

          {/* Ambient glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" aria-hidden="true" />

          {/* Header */}
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-slate-600 uppercase tracking-widest">
                saiddev.fr — boot sequence
              </span>
              <span className="text-xs text-slate-600 tabular-nums">{date}</span>
            </div>
            <div className="h-px bg-slate-800 w-full" aria-hidden="true" />
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col gap-6">
            {/* Identity block */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <p className="text-xs text-cyan-400/60 uppercase tracking-[0.3em] mb-1">
                  operator
                </p>
                <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
                  <span className="text-white">Saïd </span>
                  <span className="text-gradient">AHMED MOUSSA</span>
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  Développeur Web Freelance · Nice, Côte d&apos;Azur
                </p>
              </motion.div>
            </div>

            {/* Boot log */}
            <div className="bg-black/40 border border-slate-800/60 rounded-xl p-4 sm:p-6 min-h-[180px]">
              <p className="text-xs text-slate-600 mb-3 uppercase tracking-widest">
                system log
              </p>
              <div className="flex flex-col gap-1.5">
                {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`text-xs sm:text-sm ${
                      line.includes("[OK]")
                        ? "text-emerald-400"
                        : i === visibleLines - 1
                        ? "text-cyan-400"
                        : "text-slate-500"
                    }`}
                  >
                    <span className="text-slate-700 mr-2 select-none">$</span>
                    {line}
                    {i === visibleLines - 1 && !done && (
                      <span className="inline-block w-2 h-3.5 bg-cyan-400 ml-1 animate-pulse align-middle" aria-hidden="true" />
                    )}
                  </motion.p>
                ))}
              </div>
            </div>

            {/* Progress bar */}
            <div>
              <div className="flex justify-between text-xs text-slate-600 mb-1.5 tabular-nums">
                <span>Loading</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-linear-to-r from-cyan-400 to-blue-500 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10">
            <div className="h-px bg-slate-800 w-full mb-3" aria-hidden="true" />
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-700">
                Next.js 16 · React 19 · Tailwind CSS v4
              </span>
              <span className="text-xs text-slate-700">
                © {new Date().getFullYear()} Saïd AHMED MOUSSA
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
