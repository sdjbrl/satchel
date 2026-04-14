"use client";

import { useState } from "react";
import { Globe, ExternalLink, ChevronUp, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const domains = [
  {
    label: "saiddev.fr",
    description: "Portfolio freelance",
    url: "https://saiddev.fr",
    active: true,
    color: "bg-cyan-400",
  },
  {
    label: "kineadom.fr",
    description: "Kiné à domicile — patients",
    url: "https://kineadom.fr",
    active: false,
    color: "bg-blue-400",
  },
  {
    label: "pro.kineadom.fr",
    description: "Kiné à domicile — professionnels",
    url: "https://pro.kineadom.fr",
    active: false,
    color: "bg-violet-400",
  },
  {
    label: "younggoldindustry.fr",
    description: "Boutique cosmétiques",
    url: "https://www.younggoldindustry.fr",
    active: false,
    color: "bg-amber-400",
  },
];

export default function DomainSwitcher() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl shadow-black/20 dark:shadow-black/40 overflow-hidden w-72"
          >
            <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                Mes sites
              </p>
            </div>

            <ul className="py-2">
              {domains.map((domain) => (
                <li key={domain.url}>
                  <a
                    href={domain.url}
                    target={domain.active ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors duration-150 group"
                  >
                    <span
                      className={`flex-shrink-0 w-2 h-2 rounded-full ${domain.active ? domain.color : "bg-slate-300 dark:bg-slate-600"}`}
                      aria-hidden="true"
                    />
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold truncate ${domain.active ? "text-cyan-600 dark:text-cyan-400" : "text-slate-700 dark:text-slate-200"}`}>
                        {domain.label}
                        {domain.active && (
                          <span className="ml-2 text-xs font-normal text-slate-400 dark:text-slate-500">
                            (ce site)
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 truncate">
                        {domain.description}
                      </p>
                    </div>
                    {!domain.active && (
                      <ExternalLink
                        size={13}
                        className="flex-shrink-0 text-slate-300 dark:text-slate-600 group-hover:text-slate-500 dark:group-hover:text-slate-400 transition-colors"
                        aria-hidden="true"
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        whileTap={{ scale: 0.93 }}
        className="flex items-center gap-2 px-4 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 transition-all duration-200 text-sm font-semibold"
        aria-label={open ? "Fermer le sélecteur de domaine" : "Changer de domaine"}
        aria-expanded={open}
      >
        <Globe size={16} aria-hidden="true" />
        saiddev.fr
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {open ? <X size={14} aria-hidden="true" /> : <ChevronUp size={14} aria-hidden="true" />}
        </motion.div>
      </motion.button>
    </div>
  );
}
