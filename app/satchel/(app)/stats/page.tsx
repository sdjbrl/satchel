import { redirect } from "next/navigation";
import { BarChart3 } from "lucide-react";
import { auth } from "@/lib/satchel/auth-config";
import { getPlayerProfile } from "@/lib/satchel/henrikdev";
import type { PlayerProfile } from "@/lib/satchel/types";
import AgentBreakdownTable from "@/components/satchel/AgentBreakdownTable";
import MapBreakdownTable from "@/components/satchel/MapBreakdownTable";
import PageTransition from "@/components/satchel/ui/PageTransition";

export default async function StatsPage() {
  const session = await auth();
  if (!session) redirect("/satchel");

  const name = session.user.name ?? "";
  const tag = session.user.tag;

  let profile: PlayerProfile;
  try {
    profile = await getPlayerProfile("eu", name, tag);
  } catch {
    return (
      <div className="text-center py-20">
        <p className="text-white/40">Impossible de charger les stats.</p>
      </div>
    );
  }

  // Sort modes for display
  const modes = Object.entries(profile.statsByMode).sort(
    (a, b) => b[1].matchesPlayed - a[1].matchesPlayed
  );

  return (
    <PageTransition>
      <div className="space-y-8">
        <header>
          <p className="text-[#FF4655] text-xs font-bold tracking-[0.3em] uppercase mb-2 flex items-center gap-2">
            <BarChart3 className="w-3.5 h-3.5" />
            Stats détaillées
          </p>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            {name}
            <span className="text-white/30 font-normal text-2xl">#{tag}</span>
          </h1>
          <p className="text-white/50 text-sm mt-2">
            Breakdown complet sur {profile.matches.length} matchs récents.
          </p>
        </header>

        {/* Mode cards */}
        <section>
          <h2 className="text-xs text-white/40 uppercase tracking-widest mb-3 font-semibold">
            Par mode de jeu
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {modes.map(([mode, s]) => (
              <div key={mode} className="glass-card p-4">
                <p className="text-[10px] text-[#FF4655] font-bold uppercase tracking-widest mb-2">
                  {mode}
                </p>
                <p className="text-white font-mono font-bold text-xl">
                  {s.winrate}%
                </p>
                <p className="text-white/40 text-[11px] uppercase tracking-wider">
                  WR · {s.matchesPlayed} games
                </p>
                <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <p className="text-white/40 uppercase tracking-wider text-[9px]">K/D</p>
                    <p className="text-white font-mono">{s.kd}</p>
                  </div>
                  <div>
                    <p className="text-white/40 uppercase tracking-wider text-[9px]">ACS</p>
                    <p className="text-white font-mono">{s.acs}</p>
                  </div>
                  <div>
                    <p className="text-white/40 uppercase tracking-wider text-[9px]">HS%</p>
                    <p className="text-white font-mono">{s.headshotPct}%</p>
                  </div>
                  <div>
                    <p className="text-white/40 uppercase tracking-wider text-[9px]">W/L</p>
                    <p className="text-white font-mono">
                      <span className="text-emerald-400">{s.wins}</span>
                      <span className="text-white/30">/</span>
                      <span className="text-[#FF4655]">{s.losses}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-6">
          <AgentBreakdownTable agents={profile.statsByAgent} />
          <MapBreakdownTable maps={profile.statsByMap} />
        </div>
      </div>
    </PageTransition>
  );
}
