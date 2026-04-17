import type { MapStat } from "@/lib/satchel/types";

export default function TopMaps({ maps }: { maps: MapStat[] }) {
  if (maps.length === 0) return null;
  return (
    <div className="bg-[#12151e] rounded-xl overflow-hidden">
      <div className="px-4 py-2 border-b border-white/5 grid grid-cols-3 text-[10px] uppercase tracking-widest text-white/30">
        <span>Map</span>
        <span className="text-right">Matchs</span>
        <span className="text-right">Winrate</span>
      </div>
      {maps.map((m) => (
        <div
          key={m.map}
          className="px-4 py-3 grid grid-cols-3 items-center border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
        >
          <span className="text-sm text-white font-medium">{m.map}</span>
          <span className="text-right text-sm text-white/60">{m.matches}</span>
          <span
            className={`text-right text-sm font-bold ${
              m.winrate >= 50 ? "text-green-400" : "text-red-400"
            }`}
          >
            {m.winrate}%
          </span>
        </div>
      ))}
    </div>
  );
}
