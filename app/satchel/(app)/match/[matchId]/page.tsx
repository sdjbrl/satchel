import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getMatchDetail } from "@/lib/satchel/henrikdev";
import type { MatchDetail, MatchPlayer } from "@/lib/satchel/types";

interface Props {
  params: Promise<{ matchId: string }>;
}

const MODE_LABELS: Record<string, string> = {
  Competitive: "Ranked",
  Unranked: "Unranked",
  "Swift Play": "Swiftplay",
  Swiftplay: "Swiftplay",
  Deathmatch: "Deathmatch",
  Hurm: "Team Deathmatch",
  Escalation: "Escalation",
};

function formatPlaytime(secs: number): string {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  return `${h}h ${m}min`;
}

function TeamSection({
  title,
  color,
  players,
  won,
}: {
  title: string;
  color: "blue" | "red";
  players: MatchPlayer[];
  won: boolean;
}) {
  const sortedPlayers = [...players].sort((a, b) => b.acs - a.acs);

  return (
    <div className="bg-white/5 rounded-lg p-4">
      <div
        className={`flex items-center justify-between mb-2 pb-2 border-b ${
          color === "blue" ? "border-blue-500/30" : "border-red-500/30"
        }`}
      >
        <h2
          className={`text-xs font-bold uppercase tracking-widest ${
            color === "blue" ? "text-blue-400" : "text-red-400"
          }`}
        >
          {title}
        </h2>
        {won && (
          <span className="text-[10px] bg-white/10 text-white/60 px-2 py-0.5 rounded uppercase tracking-widest">
            Victoire
          </span>
        )}
      </div>

      <div className="flex items-center gap-3 px-3 mb-1 text-[10px] text-white/20 uppercase tracking-widest">
        <div className="w-8" />
        <div className="flex-1">Joueur</div>
        <div className="w-12 text-right">ACS</div>
        <div className="w-24 text-center">K/D/A</div>
        <div className="w-10 text-right">KD</div>
      </div>

      <div className="space-y-0.5">
        {sortedPlayers.map((player) => {
          const kdColor = player.kd >= 1 ? "text-[#FF4655]" : "text-white/30";
          return (
            <div
              key={`${player.name}#${player.tag}`}
              className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-white/5 transition-colors"
            >
              <Image
                src={player.agentImage || "/globe.svg"}
                alt={player.agent}
                width={32}
                height={32}
                className="rounded-full object-cover bg-white/10"
                unoptimized
              />
              <Link
                href={`/satchel/player/${encodeURIComponent(
                  `${player.name}#${player.tag}`
                )}`}
                className="flex-1 text-sm text-white hover:text-[#FF4655] transition-colors truncate min-w-0"
              >
                {player.name}
                <span className="text-white/30">#{player.tag}</span>
              </Link>
              <span className="text-xs text-white/50 w-12 text-right tabular-nums">
                {player.acs}
              </span>
              <span className="text-sm font-mono text-white/80 tabular-nums w-24 text-center">
                {player.kills}/{player.deaths}/{player.assists}
              </span>
              <span
                className={`w-10 text-right text-xs font-bold tabular-nums ${kdColor}`}
              >
                {player.kd.toFixed(2)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default async function MatchDetailPage({ params }: Props) {
  const { matchId } = await params;

  let match: MatchDetail;
  try {
    match = await getMatchDetail(matchId);
  } catch {
    notFound();
  }

  const bluePlayers = match.players.filter((p) => p.team === "blue");
  const redPlayers = match.players.filter((p) => p.team === "red");

  const modeLabel = MODE_LABELS[match.mode] || "Autre";
  const dateStr = new Date(match.startedAt * 1000).toLocaleDateString(
    "fr-FR",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );

  const blueScoreStyle = match.blueWon
    ? "text-white font-bold"
    : "text-white/40";
  const redScoreStyle = match.redWon ? "text-white font-bold" : "text-white/40";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        href="/satchel"
        className="inline-block text-white/40 hover:text-white text-xs uppercase tracking-widest transition-colors"
      >
        ← Retour
      </Link>

      <div className="bg-white/5 rounded-lg p-6 space-y-2">
        <h1 className="text-2xl font-bold text-white">{match.map}</h1>
        <p className="text-white/60 text-sm">
          {modeLabel} · {dateStr}
        </p>
        <div className="flex items-center gap-3 text-lg">
          <span className="text-blue-400 font-semibold">BLEU</span>
          <span className={blueScoreStyle}>{match.blueScore}</span>
          <span className="text-white/40">–</span>
          <span className={redScoreStyle}>{match.redScore}</span>
          <span className="text-red-400 font-semibold">ROUGE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TeamSection
          title="Équipe Bleue"
          color="blue"
          players={bluePlayers}
          won={match.blueWon}
        />
        <TeamSection
          title="Équipe Rouge"
          color="red"
          players={redPlayers}
          won={match.redWon}
        />
      </div>

      <p className="text-white/20 text-xs text-center">
        ⏱ {formatPlaytime(match.gameLengthSecs)} · {match.players.length}{" "}
        joueurs
      </p>
    </div>
  );
}
