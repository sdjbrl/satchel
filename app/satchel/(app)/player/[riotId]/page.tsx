import { notFound } from "next/navigation";
import { getPlayerProfile } from "@/lib/satchel/henrikdev";
import RankCard from "@/components/satchel/RankCard";
import StatsGrid from "@/components/satchel/StatsGrid";
import MatchHistory from "@/components/satchel/MatchHistory";
import TopAgents from "@/components/satchel/TopAgents";
import TopMaps from "@/components/satchel/TopMaps";
import PlayerSearchBar from "@/components/satchel/PlayerSearchBar";

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
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Rechercher un joueur</p>
          <PlayerSearchBar />
        </div>
        <div className="text-center py-20 border border-white/5 rounded-lg">
          <p className="text-white/40">Joueur introuvable ou API indisponible.</p>
          <p className="text-white/20 text-sm mt-2">{decoded}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Search bar at top */}
      <div>
        <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Rechercher un joueur</p>
        <PlayerSearchBar />
      </div>

      {/* Player header */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          {name}
          <span className="text-white/40 font-normal text-lg">#{tag}</span>
        </h1>
        <p className="text-white/30 text-xs uppercase tracking-widest mt-1">Profil public</p>
      </div>

      <RankCard rank={profile.rank} />

      <section>
        <h2 className="text-xs text-white/40 uppercase tracking-widest mb-3">Statistiques</h2>
        <StatsGrid stats={profile.stats} />
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section>
          <h2 className="text-xs text-white/40 uppercase tracking-widest mb-3">Top Agents</h2>
          <TopAgents agents={profile.topAgents} />
        </section>
        <section>
          <h2 className="text-xs text-white/40 uppercase tracking-widest mb-3">Top Maps</h2>
          <TopMaps maps={profile.topMaps} />
        </section>
      </div>

      <section>
        <h2 className="text-xs text-white/40 uppercase tracking-widest mb-3">Derniers matchs</h2>
        <MatchHistory matches={profile.matches} />
      </section>
    </div>
  );
}
