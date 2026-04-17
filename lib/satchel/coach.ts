/**
 * Rule-based local "AI Coach" — zero LLM cost.
 * Inspects a PlayerProfile and emits a prioritised list of insights.
 * Order of output matters: we surface the most actionable ones first.
 */

import type { CoachInsight, PlayerProfile } from "./types";

export function generateCoachInsights(profile: PlayerProfile): CoachInsight[] {
  const out: CoachInsight[] = [];
  const { stats, statsByAgent, statsByMap, matches } = profile;

  if (matches.length === 0) {
    return [
      {
        severity: "neutral",
        title: "Pas assez de données",
        body: "Joue quelques matchs et reviens — le Coach aura alors de quoi analyser.",
      },
    ];
  }

  // --- Aim / HS% ---
  if (stats.headshotPct >= 30) {
    out.push({
      severity: "positive",
      title: "Aim de tireur d'élite",
      body: `Ton taux de headshot (${stats.headshotPct}%) est au-dessus du haut du panier. Continue comme ça.`,
      metric: `HS ${stats.headshotPct}%`,
    });
  } else if (stats.headshotPct < 18 && matches.length >= 5) {
    out.push({
      severity: "negative",
      title: "Travaille ton aim à la tête",
      body: `Ton HS% (${stats.headshotPct}%) est bas. 15 minutes de deathmatch en visant uniquement la tête par jour te ferait gagner ~5% en une semaine.`,
      metric: `HS ${stats.headshotPct}%`,
    });
  }

  // --- K/D vs Winrate mismatch ---
  if (stats.kd >= 1.2 && stats.winrate < 48) {
    out.push({
      severity: "negative",
      title: "Tu frags mais tu ne closes pas",
      body: `K/D de ${stats.kd} pour ${stats.winrate}% de WR — signe que tu meurs souvent dans des échanges qui décident du round. Essaie de jouer plus avec l'équipe sur les rounds clés.`,
      metric: `K/D ${stats.kd} · WR ${stats.winrate}%`,
    });
  }

  if (stats.kd < 0.85 && stats.winrate < 45 && matches.length >= 5) {
    out.push({
      severity: "negative",
      title: "Reviens aux fondamentaux",
      body: "K/D et winrate bas ensemble. Focus sur le placement de crosshair et les angles prétirés avant de vouloir flasher/fragger.",
      metric: `K/D ${stats.kd}`,
    });
  }

  // --- ACS standout ---
  if (stats.acs >= 260) {
    out.push({
      severity: "positive",
      title: "Impact élevé",
      body: `Ton ACS moyen de ${stats.acs} te place parmi les joueurs à gros impact. Tu rends chaque round plus facile pour ton équipe.`,
      metric: `ACS ${stats.acs}`,
    });
  }

  // --- Best / worst map ---
  const bestMap = [...statsByMap]
    .filter((m) => m.matches >= 2)
    .sort((a, b) => b.winrate - a.winrate)[0];
  const worstMap = [...statsByMap]
    .filter((m) => m.matches >= 3)
    .sort((a, b) => a.winrate - b.winrate)[0];

  if (bestMap && bestMap.winrate >= 60) {
    out.push({
      severity: "positive",
      title: `${bestMap.map} est ta map confort`,
      body: `Tu gagnes ${bestMap.winrate}% sur ${bestMap.matches} matchs joués ici. Dodge moins quand elle tombe.`,
      metric: `WR ${bestMap.winrate}%`,
    });
  }

  if (worstMap && worstMap.winrate < 35) {
    out.push({
      severity: "negative",
      title: `${worstMap.map} te fait du mal`,
      body: `${worstMap.winrate}% de winrate sur ${worstMap.matches} matchs. Soit tu l'apprends en custom, soit tu l'évites en queue solo.`,
      metric: `WR ${worstMap.winrate}%`,
    });
  }

  // --- Best / worst agent ---
  const bestAgent = [...statsByAgent]
    .filter((a) => a.matches >= 2)
    .sort((a, b) => b.winrate - a.winrate)[0];
  const worstAgent = [...statsByAgent]
    .filter((a) => a.matches >= 3)
    .sort((a, b) => a.winrate - b.winrate)[0];

  if (bestAgent && bestAgent.winrate >= 60) {
    out.push({
      severity: "positive",
      title: `${bestAgent.agent} — ton main clair`,
      body: `${bestAgent.winrate}% de winrate et ${bestAgent.kd} K/D sur ${bestAgent.matches} parties. Garde-le comme valeur sûre.`,
      metric: `WR ${bestAgent.winrate}%`,
    });
  }

  if (worstAgent && worstAgent.winrate < 40 && worstAgent.agent !== bestAgent?.agent) {
    out.push({
      severity: "neutral",
      title: `${worstAgent.agent} ne donne pas encore`,
      body: `${worstAgent.winrate}% de WR sur ${worstAgent.matches} games. Soit tu le bosses en custom, soit tu retournes sur ton main.`,
      metric: `WR ${worstAgent.winrate}%`,
    });
  }

  // --- Recent form (last 5) ---
  const last5 = matches.slice(0, 5);
  const last5Wins = last5.filter((m) => m.won).length;
  if (last5.length >= 5) {
    if (last5Wins >= 4) {
      out.push({
        severity: "positive",
        title: "Série en cours",
        body: `${last5Wins} victoires sur tes 5 dernières. C'est le moment de pousser ton rang.`,
        metric: `${last5Wins}/5 W`,
      });
    } else if (last5Wins <= 1) {
      out.push({
        severity: "negative",
        title: "Tu tiltes",
        body: `${last5Wins} victoire${last5Wins <= 1 ? "" : "s"} sur tes 5 dernières. Fais une pause avant de reperdre du RR.`,
        metric: `${last5Wins}/5 W`,
      });
    }
  }

  // --- Carry ---
  if (stats.winrate >= 58 && stats.kd >= 1.15) {
    out.push({
      severity: "positive",
      title: "Tu portes tes équipes",
      body: `${stats.winrate}% de WR avec ${stats.kd} de K/D sur ${stats.matchesPlayed} matchs — définition du joueur qui carry.`,
    });
  }

  // Dedupe by title
  const seen = new Set<string>();
  const unique = out.filter((i) => {
    if (seen.has(i.title)) return false;
    seen.add(i.title);
    return true;
  });

  // Order: negatives first (actionable), then neutral, then positives.
  const order: Record<CoachInsight["severity"], number> = {
    negative: 0,
    neutral: 1,
    positive: 2,
  };
  return unique.sort((a, b) => order[a.severity] - order[b.severity]).slice(0, 6);
}
