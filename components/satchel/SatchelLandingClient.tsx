"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  BarChart3,
  LineChart,
  Package,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import GlobalSearch from "@/components/satchel/GlobalSearch";
import GlassCard from "@/components/satchel/ui/GlassCard";

const JETT_IMAGE =
  "https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/fullportrait.png";

const ABILITIES = ["UPDRAFT", "CLOUDBURST", "BLADESTORM", "TAILWIND"] as const;

const FEATURES = [
  {
    Icon: BarChart3,
    title: "Stats complètes",
    desc: "K/D, ACS, HS%, winrate par mode, par agent, par map.",
  },
  {
    Icon: Users,
    title: "Détection de party",
    desc: "Vois qui queue ensemble dans chaque match, avec badges colorés.",
  },
  {
    Icon: LineChart,
    title: "Historique riche",
    desc: "40 derniers matchs, filtres par mode, temps de jeu total.",
  },
  {
    Icon: Package,
    title: "Boutique & inventaire",
    desc: "Skins équipés, radianite, Valorant Points — en direct.",
  },
] as const;

interface Props {
  signInAction: () => void;
}

export default function SatchelLandingClient({ signInAction }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top mini-nav */}
      <motion.header
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between px-8 lg:px-16 py-5"
      >
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#FF4655]" />
          <span className="text-[#FF4655] font-bold tracking-[0.3em] uppercase text-xs">
            Satchel
          </span>
        </div>
        <span className="text-[10px] text-white/30 uppercase tracking-widest hidden sm:block">
          Valorant Companion · Unofficial
        </span>
      </motion.header>

      <div className="flex-1 grid lg:grid-cols-2 gap-10 px-8 lg:px-16 pb-16 items-center">
        {/* LEFT — Hero + login + search */}
        <div className="flex flex-col gap-10 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-[#FF4655] text-xs font-bold tracking-[0.4em] uppercase mb-4 flex items-center gap-2">
              <Sparkles className="w-3 h-3" />
              Ton hub Valorant
            </p>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-[1.05] tracking-tight">
              Stats, rang,
              <br />
              <span className="text-gradient-red">
                parties détectées.
              </span>
            </h1>
            <p className="text-white/50 text-sm mt-4 leading-relaxed max-w-md">
              Connecte ton compte Riot pour voir ton profil complet, ou cherche
              un autre joueur directement.
            </p>
          </motion.div>

          {/* Login */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <form action={signInAction}>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-3 bg-[#FF4655] hover:bg-[#e03d4a] text-white font-bold text-sm uppercase tracking-widest px-7 py-4 rounded-md glow-red-lg"
              >
                <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Se connecter avec Riot
                <span className="opacity-0 -ml-2 group-hover:ml-0 group-hover:opacity-100 transition-all">
                  →
                </span>
              </motion.button>
            </form>
            <p className="text-white/30 text-xs max-w-md leading-relaxed flex items-start gap-2">
              <ShieldCheck className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-white/40" />
              Connexion sécurisée via Riot Sign On. Satchel n'accède qu'aux
              données de ton propre compte, avec ton consentement explicite.
            </p>
          </motion.div>

          {/* Divider */}
          <div className="flex items-center gap-4 text-white/20 text-[10px] uppercase tracking-widest max-w-md">
            <div className="flex-1 h-px bg-white/10" />
            ou chercher quelqu'un
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Public search */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-md"
          >
            <GlobalSearch size="hero" />
          </motion.div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3 max-w-md mt-2">
            {FEATURES.map(({ Icon, title, desc }, i) => (
              <GlassCard
                key={title}
                delay={0.4 + i * 0.08}
                hover
                className="p-4 group"
              >
                <Icon className="w-4 h-4 text-[#FF4655] mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-white font-semibold text-xs mb-1">
                  {title}
                </p>
                <p className="text-white/40 text-[11px] leading-snug">{desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* RIGHT — Jett */}
        <div className="relative hidden lg:flex h-[85vh] items-end justify-center overflow-hidden">
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-l from-[#FF4655]/15 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          <motion.div
            aria-hidden
            className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-[#FF4655]/25 blur-3xl rounded-full"
            animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Ability tags */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute top-16 right-0 flex flex-col gap-2 z-10"
          >
            {ABILITIES.map((ability, i) => (
              <motion.span
                key={ability}
                whileHover={{ x: -4, borderColor: "rgba(255,70,85,1)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="border border-[#FF4655]/40 bg-[#FF4655]/10 text-[#FF4655] text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-sm backdrop-blur-sm"
              >
                {ability}
              </motion.span>
            ))}
          </motion.div>

          {/* Agent name tag */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute bottom-10 left-4 z-10"
          >
            <p className="text-[#FF4655] text-[10px] font-bold tracking-widest uppercase">
              Duelist
            </p>
            <p className="text-white text-4xl font-extrabold tracking-tight">
              JETT
            </p>
            <div className="h-0.5 w-10 bg-[#FF4655] mt-2" />
          </motion.div>

          {/* Jett */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full h-full max-w-md"
          >
            <motion.div
              className="relative w-full h-full"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src={JETT_IMAGE}
                alt="Jett — Agent Valorant"
                fill
                className="object-contain object-bottom"
                style={{
                  filter: "drop-shadow(0 0 48px rgba(255,70,85,0.55))",
                }}
                priority
                sizes="50vw"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
