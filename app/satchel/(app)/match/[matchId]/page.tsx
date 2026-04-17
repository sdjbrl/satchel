import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock3, Swords, Users } from "lucide-react";
import { getMatchDetail } from "@/lib/satchel/henrikdev";
import type { MatchDetail, MatchPlayer } from "@/lib/satchel/types";
import PageTransition from "@/components/satchel/ui/PageTransition";
import RoundTimeline from "@/components/satchel/RoundTimeline";
import EconomyChart from "@/components/satchel/EconomyChart";

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

const PARTY_COLORS = [
  "bg-yellow-400",
  "bg-purple-400",
  "bg-orange-400",
  "bg-pink-400",
  "bg-lime-400",
  "bg-cyan-400",
];

function formatPlaytime(secs: number): string {
  if (secs <= 0) return "—";
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  return h > 0 ? `${h}h ${m}min` : `${m}min`;
}

function TeamSection({
  title,
  color,
  players,
  won,
  partyColorMap,
}: {
  title: string;
  color: "blue" | "red";
  players: MatchPlayer[];
  won: boolean;
  partyColorMap: Record<string, string>;
}) {
  const sortedPlayers = [...players].sort((a, b) => b.acs - a.acs);
  const accent = color === "blue" ? "text-blue-400" : "text-red-400";
  const border = color === "blue" ? "border-blue-500/30" : "border-red-500/30";

  return (
    <div className="glass-card p-4">
      <div
        className={`flex items-center justify-between mb-3 pb-2 border-b ${border}`}
      >
        <h2
          className={`text-xs font-bold uppercase tracking-widest ${accent} flex items-center gap-2`}
        >
          <Users className="w-3 h-3" />
          {title}
        </h2>
        {won && (
          <span className="text-[10px] bg-[#FF4655]/10 border border-[#FF4655]/30 text-[#FF4655] px-2 py-0.5 rounded uppercase tracking-widest font-bold">
            Victoire
          </span>
        )}
      </div>

      <div className="flex items-center gap-3 px-3 mb-1 text-[10px] text-white/20 uppercase tracking-widest">
        <div className="w-8" />
        <div className="flex-1">Joueur</div>
        <div className="w-12 text-right">ACS</div>
        <div className="w-20 text-center">K/D/A</div>
        <div className="w-10 text-right">KD</div>
        <div className="w-10 text-right hidden sm:block">HS%</div>
        <div className="w-12 text-right hidden md:block">DMG</div>
      </div>

      <div className="space-y-0.5">
        {sortedPlayers.map((player) => {
          const kdColor = player.kd >= 1 ? "text-[#FF4655]" : "text-white/30";
          const partyColor = partyColorMap[player.partyId];
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
                className="rounded-full object-cover bg-white/10 ring-1 ring-white/10"
                unoptimized
              />
              <div className="flex-1 flex items-center gap-1.5 min-w-0">
                {partyColor && (
                  <span
                    className={`flex-shrink-0 w-2 h-2 rounded-full ${partyColor}`}
                    title="En queue ensemble"
                  />
                )}
                <Link
                  href={`/satchel/player/${encodeURIComponent(
                    `${player.name}#${player.tag}`,
                  )}`}
                  className="text-sm text-white hover:text-[#FF4655] transition-colors truncate"
                >
                  {player.name}
                  <span className="text-white/30">#{player.tag}</span>
                </Link>
              </div>
              <span className="text-xs text-white/50 w-12 text-right tabular-nums">
                {player.acs}
              </span>
              <span className="text-sm font-mono text-white/80 tabular-nums w-20 text-center">
                {player.kills}/{player.deaths}/{player.assists}
              </span>
              <span
                className={`w-10 text-right text-xs font-bold tabular-nums ${kdColor}`}
              >
                {player.kd.toFixed(2)}
              </span>
              <span className="w-10 text-right text-xs text-white/50 tabular-nums hidden sm:block">
                {player.headshotPct}%
              </span>
              <span className="w-12 text-right text-xs text-white/50 tabular-nums hidden md:block">
                {player.damage}
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

  const partyCounts: Record<string, number> = {};
  for (const p of match.players) {
    if (p.partyId) partyCounts[p.partyId] = (partyCounts[p.partyId] || 0) + 1;
  }
  const partyColorMap: Record<string, string> = {};
  Object.entries(partyCounts)
    .filter(([, count]) => count >= 2)
    .forEach(([id], i) => {
      partyColorMap[id] = PARTY_COLORS[i % PARTY_COLORS.length];
    });

  const modeLabel = MODE_LABELS[match.mode] || match.mode || "Autre";
  const dateStr = new Date(match.startedAt * 1000).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const blueScoreStyle = match.blueWon
    ? "text-white font-extrabold"
    : "text-white/40";
  const redScoreStyle = match.redWon
    ? "text-white font-extrabold"
    : "text-white/40";

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto space-y-6">
        <Link
          href="/satchel/dashboard"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white text-xs uppercase tracking-widest transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Retour
        </Link>

        <div className="glass-card-red p-6 relative overflow-hidden">
          <div
            aria-hidden
            className="absolute -right-20 -top-20 w-60 h-60 bg-[#FF4655]/15 blur-3xl rounded-full"
          />
          <div className="relative z-10">
            <p className="text-[#FF4655] text-[10px] uppercase tracking-[0.4em] font-bold mb-1 flex items-center gap-2">
              <Swords className="w-3 h-3" />
              {modeLabel}
            </p>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              {match.map}
            </h1>
            <p className="text-white/40 text-xs mt-1">{dateStr}</p>

            <div className="flex items-center gap-4 text-3xl mt-5 font-mono tabular-nums">
              <span className="text-blue-400 text-sm font-bold uppercase tracking-widest">
                Bleu
              </span>
              <span className={blueScoreStyle}>{match.blueScore}</span>
              <span className="text-white/20">–</span>
              <span className={redScoreStyle}>{match.redScore}</span>
              <span className="text-red-400 text-sm font-bold uppercase tracking-widest">
                Rouge
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TeamSection
            title="Équipe Bleue"
            color="blue"
            players={bluePlayers}
            won={match.blueWon}
            partyColorMap={partyColorMap}
          />
          <TeamSection
            title="Équipe Rouge"
            color="red"
            players={redPlayers}
            won={match.redWon}
            partyColorMap={partyColorMap}
          />
        </div>

        {match.rounds.length > 0 && (
          <>
            <RoundTimeline rounds={match.rounds} />
            <EconomyChart rounds={match.rounds} />
          </>
        )}

        <p className="text-white/30 text-xs text-center flex items-center gap-3 justify-center">
          <Clock3 className="w-3 h-3" /> {formatPlaytime(match.gameLengthSecs)}
          <span className="text-white/15">·</span>
          <Users className="w-3 h-3" /> {match.players.length} joueurs
        </p>
      </div>
    </PageTransition>
  );
}
