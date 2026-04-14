"use client";

import { motion } from "framer-motion";
import { ExternalLink, Users, Stethoscope, ShoppingBag } from "lucide-react";

interface Project {
  title: string;
  subtitle: string;
  url: string;
  displayUrl: string;
  sector: string;
  sectorIcon: React.ReactNode;
  description: string;
  highlights: string[];
  accentFrom: string;
  accentTo: string;
  badgeColor: string;
}

const projects: Project[] = [
  {
    title: "Kiné@Dom",
    subtitle: "Site vitrine patient",
    url: "https://kineadom.fr",
    displayUrl: "kineadom.fr",
    sector: "Santé · Kinésithérapie",
    sectorIcon: <Stethoscope size={14} aria-hidden="true" />,
    description: "Plateforme de prise en charge de kinésithérapie à domicile sur Nice et la Côte d'Azur. Prise de rendez-vous en ligne, tiers payant, suivi patient — le tout dans une interface épurée pensée pour des personnes à mobilité réduite.",
    highlights: ["Prise de RDV en ligne intégrée", "Couverture Nice + Côte d'Azur", "Tiers payant & convention CNAM", "Design accessible mobile-first"],
    accentFrom: "from-cyan-400",
    accentTo: "to-blue-500",
    badgeColor: "bg-cyan-400/10 text-cyan-600 dark:text-cyan-300 border-cyan-400/20",
  },
  {
    title: "Kiné@Dom Pro",
    subtitle: "Plateforme professionnelle",
    url: "https://pro.kineadom.fr",
    displayUrl: "pro.kineadom.fr",
    sector: "SaaS · Recrutement médical",
    sectorIcon: <Users size={14} aria-hidden="true" />,
    description: "Espace dédié aux kinésithérapeutes souhaitant rejoindre le réseau ou gérer leur activité. Recrutement, télésecrétariat, logiciel métier, cabinets équipés et co-working — une plateforme B2B complète active depuis 2012.",
    highlights: ["Recrutement de kinésithérapeutes", "Logiciel métier dédié", "Cabinets équipés & co-working", "Plusieurs milliers de consultations/semaine"],
    accentFrom: "from-blue-400",
    accentTo: "to-violet-500",
    badgeColor: "bg-blue-400/10 text-blue-600 dark:text-blue-300 border-blue-400/20",
  },
  {
    title: "Young Gold Industry",
    subtitle: "Boutique e-commerce",
    url: "https://www.younggoldindustry.fr",
    displayUrl: "younggoldindustry.fr",
    sector: "E-commerce · Cosmétiques",
    sectorIcon: <ShoppingBag size={14} aria-hidden="true" />,
    description: "Boutique en ligne de vente de cosmétiques avec expérience d'achat fluide et moderne. Paiement sécurisé multi-solutions (Stripe, PayPal, Apple Pay), livraison rapide 24h, politique de retour 30 jours et promotions attractives jusqu'à −40%.",
    highlights: ["Catalogue produits cosmétiques", "Paiement Stripe, PayPal, Apple Pay", "Livraison offerte dès 100€", "Retours sous 30 jours"],
    accentFrom: "from-amber-400",
    accentTo: "to-rose-500",
    badgeColor: "bg-amber-400/10 text-amber-600 dark:text-amber-300 border-amber-400/20",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: [0.4, 0, 0.2, 1] as const },
  }),
};

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-24 px-4 sm:px-6 lg:px-8" aria-labelledby="portfolio-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
            className="text-xs font-semibold uppercase tracking-widest text-cyan-500 dark:text-cyan-400 mb-3"
          >
            Références
          </motion.p>
          <motion.h2
            id="portfolio-heading"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            Projets <span className="text-gradient">déjà livrés</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-4 text-slate-500 dark:text-slate-400 max-w-xl mx-auto"
          >
            Des solutions web concrètes, en production et utilisées quotidiennement par de vrais professionnels.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.article
              key={project.url}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="group relative bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300 hover:shadow-xl dark:hover:shadow-2xl"
            >
              <div className={`h-1 w-full bg-linear-to-r ${project.accentFrom} ${project.accentTo}`} aria-hidden="true" />

              <div className="p-7">
                <div className="flex items-start justify-between mb-5 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">{project.title}</h3>
                      <span className="text-xs font-medium text-slate-400 dark:text-slate-500">— {project.subtitle}</span>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${project.badgeColor}`}>
                      {project.sectorIcon}
                      {project.sector}
                    </span>
                  </div>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-all duration-200 min-h-[36px]"
                    aria-label={`Voir le site ${project.displayUrl}`}
                  >
                    {project.displayUrl}
                    <ExternalLink size={12} aria-hidden="true" />
                  </a>
                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">{project.description}</p>

                <ul className="flex flex-col gap-2.5">
                  {project.highlights.map((point) => (
                    <li key={point} className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                      <span className={`flex-shrink-0 w-1.5 h-1.5 rounded-full bg-linear-to-r ${project.accentFrom} ${project.accentTo}`} aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-5 border-t border-slate-100 dark:border-white/8">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 text-sm font-semibold bg-linear-to-r ${project.accentFrom} ${project.accentTo} text-gradient hover:opacity-80 transition-opacity duration-200`}
                  >
                    Visiter le site
                    <ExternalLink size={14} aria-hidden="true" className="text-cyan-500 opacity-70" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
