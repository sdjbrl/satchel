import { Trophy } from "lucide-react";
import PageTransition from "@/components/satchel/ui/PageTransition";
import LeaderboardTable from "@/components/satchel/LeaderboardTable";
import { getMockLeaderboard } from "@/lib/satchel/leaderboard";

const REGIONS = ["eu", "na", "ap", "kr", "br"] as const;

interface SearchParams {
  region?: string;
}

export default async function LeaderboardPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { region: regionParam } = await searchParams;
  const region = (REGIONS as readonly string[]).includes(regionParam ?? "")
    ? (regionParam as string)
    : "eu";

  const data = getMockLeaderboard(region, 100);

  return (
    <PageTransition>
      <div className="space-y-8">
        <header>
          <p className="text-[#FF4655] text-xs font-bold tracking-[0.3em] uppercase mb-2 flex items-center gap-2">
            <Trophy className="w-3.5 h-3.5" />
            Leaderboard
          </p>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            Top 100 régional
          </h1>
          <p className="text-white/50 text-sm mt-2">
            {data.totalPlayers.toLocaleString("fr-FR")} joueurs classés · données
            de démo tant que la clé leaderboard premium n'est pas branchée.
          </p>
        </header>

        <nav className="flex flex-wrap gap-2">
          {REGIONS.map((r) => (
            <a
              key={r}
              href={`/satchel/leaderboard?region=${r}`}
              className={`px-4 py-2 rounded-md border text-xs font-bold uppercase tracking-widest transition ${
                region === r
                  ? "bg-[#FF4655] border-[#FF4655] text-white glow-red"
                  : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {r}
            </a>
          ))}
        </nav>

        <LeaderboardTable entries={data.entries} region={region} />
      </div>
    </PageTransition>
  );
}
