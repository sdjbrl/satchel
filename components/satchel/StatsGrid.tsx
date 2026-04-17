import type { PlayerStats } from "@/lib/satchel/types";

interface StatBadgeProps {
  label: string;
  value: string;
  accent?: boolean;
}

function StatBadge({ label, value, accent }: StatBadgeProps) {
  return (
    <div
      className={`bg-[#12151e] rounded-lg p-4 text-center border-t-2 ${
        accent ? "border-[#FF4655]" : "border-white/10"
      }`}
    >
      <p className={`text-2xl font-extrabold ${accent ? "text-[#FF4655]" : "text-white"}`}>
        {value}
      </p>
      <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1">{label}</p>
    </div>
  );
}

export default function StatsGrid({ stats }: { stats: PlayerStats }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <StatBadge label="K / D" value={stats.kd.toFixed(2)} accent={stats.kd >= 1} />
      <StatBadge label="Winrate" value={`${stats.winrate}%`} />
      <StatBadge
        label="HS%"
        value={stats.headshotPct > 0 ? `${stats.headshotPct}%` : "—"}
      />
      <StatBadge
        label="Dmg / Round"
        value={stats.damagePerRound > 0 ? stats.damagePerRound.toFixed(0) : "—"}
      />
    </div>
  );
}
