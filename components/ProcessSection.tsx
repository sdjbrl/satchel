"use client";

import { motion } from "framer-motion";
import { Phone, Palette, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ProcessStep {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const steps: ProcessStep[] = [
  {
    number: "01",
    icon: Phone,
    title: "Découverte",
    description: "Un appel de 15 minutes pour comprendre vos enjeux, votre cible et vos objectifs. Pas de jargon technique — juste une vraie conversation.",
  },
  {
    number: "02",
    icon: Palette,
    title: "Maquette & Design",
    description: "Je vous soumets une proposition visuelle complète avant d'écrire la première ligne de code. Vous validez, on ajuste — puis on fonce.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Développement & Lancement",
    description: "Le site est développé, testé, optimisé pour le référencement local et mis en ligne. Je vous forme à la gestion de votre contenu.",
  },
];

export default function ProcessSection() {
  return (
    <section id="methode" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-100/60 dark:bg-slate-900/30" aria-labelledby="process-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
            className="text-xs font-semibold uppercase tracking-widest text-cyan-500 dark:text-cyan-400 mb-3"
          >
            La méthode
          </motion.p>
          <motion.h2
            id="process-heading"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            Comment se déroule{" "}
            <span className="text-gradient">notre collaboration ?</span>
          </motion.h2>
        </div>

        <ol className="flex flex-col gap-6 md:gap-0" aria-label="Étapes de la collaboration">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;
            return (
              <motion.li
                key={step.number}
                initial={{ opacity: 0, x: isEven ? -32 : 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] as const }}
                className={`relative md:flex md:items-center md:gap-12 md:mb-16 last:md:mb-0 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className="md:w-[calc(50%-48px)] flex-shrink-0">
                  <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-linear-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/20 dark:border-cyan-400/20 flex items-center justify-center text-cyan-500 dark:text-cyan-400">
                        <Icon size={22} aria-hidden="true" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{step.title}</h3>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>

                <div
                  className="hidden md:flex flex-shrink-0 w-12 h-12 items-center justify-center rounded-full bg-slate-50 dark:bg-[#0a0a0f] border-2 border-cyan-500/50 dark:border-cyan-400/50 text-cyan-500 dark:text-cyan-400 font-mono text-sm font-bold z-10"
                  aria-hidden="true"
                >
                  {step.number}
                </div>

                <div className="hidden md:block md:w-[calc(50%-48px)] flex-shrink-0" />
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
