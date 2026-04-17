import { Crosshair, Flame, Target, Trophy } from "lucide-react";
import type { PlayerStats } from "@/lib/satchel/types";
import StatBlock from "@/components/satchel/ui/StatBlock";

export default function StatsGrid({ stats }: { stats: PlayerStats }) {
  const showHs = stats.headshotPct > 0;
  const showDmg = stats.damagePerRound > 0;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <StatBlock
        icon={Crosshair}
        label="K / D"
        value={stats.kd.toFixed(2)}
        accent={stats.kd >= 1}
        delay={0}
      />
      <StatBlock
        icon={Trophy}
        label="Winrate"
        value={`${stats.winrate}%`}
        accent={stats.winrate >= 50}
        hint={`${stats.matchesPlayed} matchs`}
        delay={0.05}
      />
      <StatBlock
        icon={Target}
        label="Headshot %"
        value={showHs ? `${stats.headshotPct}%` : "—"}
        accent={showHs && stats.headshotPct >= 25}
        delay={0.1}
      />
      <StatBlock
        icon={Flame}
        label="Dmg / Round"
        value={showDmg ? stats.damagePerRound.toFixed(0) : "—"}
        delay={0.15}
      />
    </div>
  );
}
