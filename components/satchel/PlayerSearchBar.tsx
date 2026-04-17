"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PlayerSearchBar() {
  const [value, setValue] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed.includes("#")) return;
    const encoded = encodeURIComponent(trimmed);
    router.push(`/satchel/player/${encoded}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="NomJoueur#EUW"
        className="flex-1 bg-[#12151e] border border-white/10 text-white placeholder-white/25 text-sm px-4 py-3 rounded-md focus:outline-none focus:border-[#FF4655]/60 transition-colors"
      />
      <button
        type="submit"
        disabled={!value.trim().includes("#")}
        aria-label="Rechercher le joueur"
        className="bg-white/10 hover:bg-white/15 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm px-4 py-3 rounded-md transition-colors"
      >
        →
      </button>
    </form>
  );
}
