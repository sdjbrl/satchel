"use client";

import { motion } from "framer-motion";
import { Layout, Zap, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ServiceCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

const services: ServiceCard[] = [
  {
    icon: Layout,
    title: "Création de Site Vitrine",
    description: "Un design sur-mesure, mobile-first et optimisé pour le SEO local. L'outil idéal pour présenter votre savoir-faire et attirer de nouveaux clients à Nice et alentours.",
  },
  {
    icon: Zap,
    title: "Refonte & Optimisation",
    description: "Audit de votre site actuel, modernisation de l'interface et division du temps de chargement par 3. Votre ancienne vitrine devient une machine à convertir.",
  },
  {
    icon: Shield,
    title: "Maintenance & Sécurité",
    description: "Je gère l'hébergement, les mises à jour et les sauvegardes. Dormez sur vos deux oreilles pendant que votre site travaille pour vous.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
  },
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8" aria-labelledby="services-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
            className="text-xs font-semibold uppercase tracking-widest text-cyan-500 dark:text-cyan-400 mb-3"
          >
            Ce que je propose
          </motion.p>
          <motion.h2
            id="services-heading"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            Des services pensés pour{" "}
            <span className="text-gradient">votre croissance</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-4 text-slate-500 dark:text-slate-400 max-w-xl mx-auto"
          >
            Chaque prestation est construite pour répondre aux besoins concrets des artisans et commerçants de la Côte d&apos;Azur.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                variants={cardVariants}
                className="group relative bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-7 hover:border-slate-300 dark:hover:border-white/20 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 cursor-default"
              >
                <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/10 text-cyan-500 dark:text-cyan-400">
                  <Icon size={28} aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{service.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{service.description}</p>
                <div className="absolute bottom-0 left-6 right-6 h-px bg-linear-to-r from-transparent via-cyan-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
