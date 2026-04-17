import { redirect } from "next/navigation";
import { auth, signOut } from "@/lib/satchel/auth-config";
import { getPlayerProfile } from "@/lib/satchel/henrikdev";
import type { PlayerProfile } from "@/lib/satchel/types";
import RankCard from "@/components/satchel/RankCard";
import StatsGrid from "@/components/satchel/StatsGrid";
import MatchHistory from "@/components/satchel/MatchHistory";
import TopAgents from "@/components/satchel/TopAgents";
import TopMaps from "@/components/satchel/TopMaps";

function formatPlaytime(secs: number): string {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  return `${h}h ${m}min`;
}

async function handleSignOut() {
  "use server";
  await signOut({ redirectTo: "/satchel" });
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
    // Profile fetch failed — show error state
    return (
      <div className="text-center py-20">
        <p className="text-white/40">
          Impossible de charger les stats de <strong>{name}#{tag}</strong>. Réessaie plus tard.
        </p>
        <form action={handleSignOut}>
          <button type="submit" className="mt-4 text-[#FF4655] text-sm underline">Se déconnecter</button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            {name}
            <span className="text-white/40 font-normal text-lg">#{tag}</span>
          </h1>
          <p className="text-white/30 text-xs uppercase tracking-widest mt-1">Mon profil</p>
          <p className="text-white/30 text-xs mt-1">
            ⏱ {formatPlaytime(profile.totalPlaytimeSecs)} de jeu
          </p>
        </div>
        <form action={handleSignOut}>
          <button type="submit" className="text-white/30 hover:text-white text-xs uppercase tracking-widest transition-colors">
            Déconnexion
          </button>
        </form>
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
        <MatchHistory matches={profile.matches} statsByMode={profile.statsByMode} />
      </section>
    </div>
  );
}
