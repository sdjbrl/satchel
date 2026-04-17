"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Jett portrait from valorant-api.com community CDN
const JETT_IMAGE =
  "https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/fullportrait.png";

export default function JettSidebar() {
  return (
    <aside
      aria-hidden
      className="fixed right-0 top-0 h-full w-20 flex flex-col items-center justify-end pointer-events-none z-10 overflow-hidden"
    >
      {/* Red glow behind Jett */}
      <div className="absolute bottom-0 right-0 w-32 h-64 bg-[#FF4655]/20 blur-3xl rounded-full" />

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-20 h-52"
      >
        <Image
          src={JETT_IMAGE}
          alt=""
          fill
          className="object-contain"
          style={{ filter: "drop-shadow(0 0 18px rgba(255,70,85,0.7))" }}
          sizes="80px"
        />
      </motion.div>
    </aside>
  );
}
