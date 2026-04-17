import { redirect } from "next/navigation";
import Link from "next/link";
import { Clock3, BarChart3, Trophy, ArrowRight } from "lucide-react";
import { auth } from "@/lib/satchel/auth-config";
import { getPlayerProfile } from "@/lib/satchel/henrikdev";
import { generateCoachInsights } from "@/lib/satchel/coach";
import type { PlayerProfile } from "@/lib/satchel/types";
import RankCard from "@/components/satchel/RankCard";
import StatsGrid from "@/components/satchel/StatsGrid";
import MatchHistory from "@/components/satchel/MatchHistory";
import TopAgents from "@/components/satchel/TopAgents";
import TopMaps from "@/components/satchel/TopMaps";
import AiCoach from "@/components/satchel/AiCoach";
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

        <AiCoach insights={generateCoachInsights(profile)} />

        <section>
          <h2 className="text-xs text-white/40 uppercase tracking-widest mb-3 font-semibold">
            Statistiques
          </h2>
          <StatsGrid stats={profile.stats} />
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs text-white/40 uppercase tracking-widest font-semibold">
                Top Agents
              </h2>
              <Link
                href="/satchel/stats"
                className="text-[10px] text-[#FF4655] hover:underline flex items-center gap-1 uppercase tracking-widest font-bold"
              >
                Voir tout <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <TopAgents agents={profile.topAgents} />
          </section>
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs text-white/40 uppercase tracking-widest font-semibold">
                Top Maps
              </h2>
              <Link
                href="/satchel/stats"
                className="text-[10px] text-[#FF4655] hover:underline flex items-center gap-1 uppercase tracking-widest font-bold"
              >
                Voir tout <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <TopMaps maps={profile.topMaps} />
          </section>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link
            href="/satchel/stats"
            className="glass-card p-5 flex items-center gap-4 group hover:border-[#FF4655]/40 transition"
          >
            <BarChart3 className="w-6 h-6 text-[#FF4655] group-hover:scale-110 transition" />
            <div className="flex-1">
              <p className="text-white font-bold text-sm">Stats détaillées</p>
              <p className="text-white/40 text-xs">Par agent, par map, tri personnalisé</p>
            </div>
            <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-[#FF4655] group-hover:translate-x-0.5 transition" />
          </Link>
          <Link
            href="/satchel/leaderboard"
            className="glass-card p-5 flex items-center gap-4 group hover:border-[#FF4655]/40 transition"
          >
            <Trophy className="w-6 h-6 text-[#FF4655] group-hover:scale-110 transition" />
            <div className="flex-1">
              <p className="text-white font-bold text-sm">Leaderboard</p>
              <p className="text-white/40 text-xs">Top 100 par région</p>
            </div>
            <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-[#FF4655] group-hover:translate-x-0.5 transition" />
          </Link>
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
