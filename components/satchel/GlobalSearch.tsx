"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Search, X } from "lucide-react";

const STORAGE_KEY = "satchel-recent-searches";
const MAX_HISTORY = 5;

const RIOT_ID_REGEX = /^.{3,16}#.{3,5}$/u;

function loadHistory(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string").slice(0, MAX_HISTORY) : [];
  } catch {
    return [];
  }
}

function saveHistory(items: string[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_HISTORY)));
  } catch {
    /* quota / blocked */
  }
}

interface Props {
  size?: "hero" | "compact";
  autoFocus?: boolean;
}

export default function GlobalSearch({ size = "compact", autoFocus = false }: Props) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const trimmed = value.trim();
  const isValid = useMemo(() => RIOT_ID_REGEX.test(trimmed), [trimmed]);

  const filteredHistory = useMemo(
    () =>
      trimmed
        ? history.filter((h) => h.toLowerCase().includes(trimmed.toLowerCase()))
        : history,
    [history, trimmed],
  );

  function commitAndGo(riotId: string) {
    const clean = riotId.trim();
    if (!RIOT_ID_REGEX.test(clean)) return;
    const next = [clean, ...history.filter((h) => h !== clean)].slice(0, MAX_HISTORY);
    setHistory(next);
    saveHistory(next);
    setFocused(false);
    router.push(`/satchel/player/${encodeURIComponent(clean)}`);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    commitAndGo(trimmed);
  }

  function removeFromHistory(item: string, ev: React.MouseEvent) {
    ev.stopPropagation();
    const next = history.filter((h) => h !== item);
    setHistory(next);
    saveHistory(next);
  }

  const isHero = size === "hero";
  const showDropdown = focused && filteredHistory.length > 0;

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSubmit}>
        <div
          className={`flex items-center gap-3 glass-card transition-all ${
            isHero ? "px-5 py-4" : "px-4 py-2.5"
          } ${focused ? "ring-1 ring-[#FF4655]/50 glow-red" : ""}`}
        >
          <Search className={`text-white/40 flex-shrink-0 ${isHero ? "w-5 h-5" : "w-4 h-4"}`} />
          <input
            type="text"
            value={value}
            autoFocus={autoFocus}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            placeholder="NomJoueur#EUW"
            autoComplete="off"
            spellCheck={false}
            aria-label="Rechercher un joueur"
            className={`flex-1 bg-transparent text-white placeholder-white/25 focus:outline-none ${
              isHero ? "text-base" : "text-sm"
            }`}
          />
          {trimmed && (
            <span
              className={`text-[10px] uppercase tracking-widest font-bold ${
                isValid ? "text-[#FF4655]" : "text-white/20"
              }`}
              aria-live="polite"
            >
              {isValid ? "GO →" : "Name#TAG"}
            </span>
          )}
          <button
            type="submit"
            disabled={!isValid}
            aria-label="Rechercher"
            className={`rounded-md transition-all flex-shrink-0 ${
              isHero ? "px-4 py-2" : "px-3 py-1.5"
            } ${
              isValid
                ? "bg-[#FF4655] hover:bg-[#e03d4a] text-white glow-red"
                : "bg-white/5 text-white/20 cursor-not-allowed"
            }`}
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </form>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full mt-2 glass-card overflow-hidden z-20"
          >
            <p className="px-4 pt-3 pb-1 text-[10px] uppercase tracking-widest text-white/30 flex items-center gap-2">
              <Clock className="w-3 h-3" /> Recherches récentes
            </p>
            <ul>
              {filteredHistory.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => commitAndGo(item)}
                    className="w-full text-left px-4 py-2.5 flex items-center justify-between gap-3 hover:bg-white/5 transition-colors group"
                  >
                    <span className="text-white text-sm truncate">{item}</span>
                    <span
                      onClick={(e) => removeFromHistory(item, e)}
                      className="opacity-0 group-hover:opacity-100 text-white/40 hover:text-white transition-opacity p-1 cursor-pointer"
                      aria-label={`Retirer ${item}`}
                    >
                      <X className="w-3 h-3" />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
