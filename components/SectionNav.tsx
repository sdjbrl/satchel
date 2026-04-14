"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation, X } from "lucide-react";

const sections = [
  { id: "hero", label: "Accueil", href: "#" },
  { id: "services", label: "Services", href: "#services" },
  { id: "methode", label: "Méthode", href: "#methode" },
  { id: "portfolio", label: "Références", href: "#portfolio" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export default function SectionNav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = id === "hero" ? document.documentElement : document.getElementById(id);
      if (!el) return;

      const target = id === "hero" ? document.body : el;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );
      observer.observe(target);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentLabel = sections.find((s) => s.id === active)?.label ?? "Navigation";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl shadow-black/20 dark:shadow-black/40 overflow-hidden w-52"
          >
            <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                Navigation
              </p>
            </div>

            <ul className="py-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    type="button"
                    onClick={() => handleNav(section.href)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors duration-150 ${
                      active === section.id ? "text-cyan-600 dark:text-cyan-400" : "text-slate-700 dark:text-slate-200"
                    }`}
                  >
                    <span
                      className={`flex-shrink-0 w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                        active === section.id ? "bg-cyan-500 dark:bg-cyan-400" : "bg-slate-300 dark:bg-slate-600"
                      }`}
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium">{section.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        whileTap={{ scale: 0.93 }}
        className="flex items-center gap-2 px-4 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 text-sm font-semibold"
        aria-label={open ? "Fermer la navigation" : "Naviguer dans la page"}
        aria-expanded={open}
      >
        {open ? <X size={15} aria-hidden="true" /> : <Navigation size={15} aria-hidden="true" />}
        <span className="max-w-[100px] truncate">{open ? "Fermer" : currentLabel}</span>
      </motion.button>
    </div>
  );
}
