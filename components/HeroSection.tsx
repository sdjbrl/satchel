"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
  },
};

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center pt-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-grid-pattern"
      aria-label="Introduction"
    >
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-600/5 blur-3xl pointer-events-none" aria-hidden="true" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        <motion.div variants={itemVariants} className="mb-8 flex justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-sm text-sm font-medium text-slate-600 dark:text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            Disponible pour de nouveaux projets partout dans le monde
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6"
        >
          Transformez vos visiteurs en clients
          <br className="hidden sm:block" />
          avec un site web{" "}
          <span className="text-gradient">ultra-performant.</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Je suis Saïd, développeur freelance disponible{" "}
          <strong className="text-slate-700 dark:text-slate-200 font-medium">partout dans le monde</strong>. Je
          conçois des sites web modernes, rapides et pensés pour le{" "}
          <strong className="text-slate-700 dark:text-slate-200 font-medium">référencement</strong>{" "}
          afin de faire décoller votre activité.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-linear-to-r from-cyan-500 to-blue-500 rounded-full hover:opacity-90 transition-all duration-200 min-h-[44px] glow-cyan"
          >
            Obtenir un devis gratuit
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
          </Link>

          <Link
            href="#services"
            className="inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-all duration-200 min-h-[44px]"
          >
            Découvrir mes services
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400 dark:text-slate-600"
        aria-hidden="true"
      >
        <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </motion.div>
    </section>
  );
}
