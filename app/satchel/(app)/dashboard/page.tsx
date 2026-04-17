import { redirect } from "next/navigation";
import { Clock3 } from "lucide-react";
import { auth } from "@/lib/satchel/auth-config";
import { getPlayerProfile } from "@/lib/satchel/henrikdev";
import type { PlayerProfile } from "@/lib/satchel/types";
import RankCard from "@/components/satchel/RankCard";
import StatsGrid from "@/components/satchel/StatsGrid";
import MatchHistory from "@/components/satchel/MatchHistory";
import TopAgents from "@/components/satchel/TopAgents";
import TopMaps from "@/components/satchel/TopMaps";
import PageTransition from "@/components/satchel/ui/PageTransition";

function formatPlaytime(secs: number): string {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  return `${h}h ${m}min`;
}

export default async function DashboardPage() {
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
        <p className="text-white/40">
          Impossible de charger les stats de{" "}
          <strong className="text-white">
            {name}#{tag}
          </strong>
          . Réessaie plus tard.
        </p>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Hero */}
        <div>
          <p className="text-[#FF4655] text-[10px] uppercase tracking-[0.4em] font-bold mb-1">
            Mon profil
          </p>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            {name}
            <span className="text-white/30 font-normal text-2xl">#{tag}</span>
          </h1>
          {profile.totalPlaytimeSecs > 0 && (
            <p className="text-white/40 text-xs mt-2 flex items-center gap-1.5">
              <Clock3 className="w-3 h-3" />
              {formatPlaytime(profile.totalPlaytimeSecs)} de jeu suivis
            </p>
          )}
        </div>

        <RankCard rank={profile.rank} />

        <section>
          <h2 className="text-xs text-white/40 uppercase tracking-widest mb-3 font-semibold">
            Statistiques
          </h2>
          <StatsGrid stats={profile.stats} />
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <section>
            <h2 className="text-xs text-white/40 uppercase tracking-widest mb-3 font-semibold">
              Top Agents
            </h2>
            <TopAgents agents={profile.topAgents} />
          </section>
          <section>
            <h2 className="text-xs text-white/40 uppercase tracking-widest mb-3 font-semibold">
              Top Maps
            </h2>
            <TopMaps maps={profile.topMaps} />
          </section>
        </div>

        <section>
          <h2 className="text-xs text-white/40 uppercase tracking-widest mb-3 font-semibold">
            Derniers matchs
          </h2>
          <MatchHistory
            matches={profile.matches}
            statsByMode={profile.statsByMode}
          />
        </section>
      </div>
    </PageTransition>
  );
}
