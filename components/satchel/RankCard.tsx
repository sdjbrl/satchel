import type { RankData } from "@/lib/satchel/types";

// Riot rank tier → emoji icon (replace with rank images from valorant-api.com if desired)
const RANK_ICONS: Record<number, string> = {
  0: "🔰", 3: "🥉", 6: "🥈", 9: "🥇", 12: "💎", 15: "💎",
  18: "🔮", 21: "🔮", 24: "👑", 27: "⚡",
};

function rankIcon(tier: number): string {
  const base = Math.floor(tier / 3) * 3;
  return RANK_ICONS[base] ?? "❓";
}

export default function RankCard({ rank }: { rank: RankData }) {
  const pct = Math.min(rank.rr, 99); // 0–99 for the bar

  return (
    <div className="bg-gradient-to-br from-[#1a0a0c] to-[#12151e] border border-[#FF4655]/20 rounded-xl p-5 flex items-center gap-5">
      {/* Rank icon */}
      <div className="text-5xl leading-none filter drop-shadow-lg">{rankIcon(rank.tier)}</div>

      <div className="flex-1">
        <p className="text-[#FF4655] font-bold tracking-widest uppercase text-sm">
          {rank.tierName}
        </p>

        {/* RR progress bar */}
        <div className="mt-2 mb-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#FF4655] to-[#ff7b85] rounded-full transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-white/40 text-xs">{rank.rr} RR</p>

        {rank.peakTierName !== rank.tierName && (
          <p className="text-white/30 text-xs mt-1">
            Peak : {rank.peakTierName}
          </p>
        )}
      </div>
    </div>
  );
}
