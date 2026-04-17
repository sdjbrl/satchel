import { notFound } from "next/navigation";
import { Clock3, UserCircle2 } from "lucide-react";
import { getPlayerProfile } from "@/lib/satchel/henrikdev";
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

interface Props {
  params: Promise<{ riotId: string }>;
}

export default async function PlayerProfilePage({ params }: Props) {
  const { riotId } = await params;
  const decoded = decodeURIComponent(riotId);
  const [name, tag] = decoded.split("#");

  if (!name || !tag) notFound();

  let profile;
  try {
    profile = await getPlayerProfile("eu", name, tag);
  } catch {
    return (
      <PageTransition>
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-12 text-center">
            <UserCircle2 className="w-12 h-12 mx-auto text-white/20 mb-4" />
            <p className="text-white/60">Joueur introuvable ou API indisponible.</p>
            <p className="text-white/30 text-sm mt-2 font-mono">{decoded}</p>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <p className="text-[#FF4655] text-[10px] uppercase tracking-[0.4em] font-bold mb-1">
            Profil public
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
