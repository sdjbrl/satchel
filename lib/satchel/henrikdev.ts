/**
 * Server-side HenrikDev API client.
 * NEVER import this in a Client Component — it reads HENRIK_API_KEY from env.
 */

import type {
  RankData,
  PlayerStats,
  MatchResult,
  AgentStat,
  MapStat,
  PlayerProfile,
  ShopData,
  ShopOffer,
  PlayerInventory,
  MatchDetail,
  MatchPlayer,
} from "./types";

const BASE = "https://api.henrikdev.xyz/valorant";

function apiKey(): string {
  const key = process.env.HENRIK_API_KEY;
  if (!key) throw new Error("HENRIK_API_KEY is not set");
  return key;
}

async function hFetch<T>(
  path: string,
  opts: { accessToken?: string; noCache?: boolean } = {}
): Promise<T> {
  const headers: Record<string, string> = {
    Authorization: apiKey(),
  };
  // Some endpoints (storefront, inventory) require the player's Riot token
  if (opts.accessToken) {
    headers["X-Riot-Token"] = opts.accessToken;
  }
  const res = await fetch(`${BASE}${path}`, {
    headers,
    next: opts.noCache ? { revalidate: 0 } : { revalidate: 300 },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`HenrikDev ${res.status} on ${path}: ${body}`);
  }
  const json = await res.json();
  return json.data as T;
}

// ---------- MMR / Rank ----------

interface HenrikMMRData {
  currenttier: number;
  currenttierpatched: string;
  ranking_in_tier: number;
  highest_rank?: { tier: number; patched_tier: string };
}

function mapRank(raw: HenrikMMRData): RankData {
  return {
    tier: raw.currenttier,
    tierName: raw.currenttierpatched,
    rr: raw.ranking_in_tier,
    peakTier: raw.highest_rank?.tier ?? raw.currenttier,
    peakTierName: raw.highest_rank?.patched_tier ?? raw.currenttierpatched,
  };
}

// ---------- Matches (v1/lifetime endpoint) ----------

interface HenrikLifetimeMatch {
  meta: {
    id: string;
    map: { name: string };
    mode: string;
    started_at: string;
  };
  stats: {
    team: string;
    character: { id: string; name: string };
    kills: number;
    deaths: number;
    assists: number;
  };
  teams: { red: number; blue: number };
}

function mapLifetimeMatch(raw: HenrikLifetimeMatch): MatchResult {
  const myTeam = raw.stats.team.toLowerCase();
  const myScore = myTeam === "blue" ? raw.teams.blue : raw.teams.red;
  const oppScore = myTeam === "blue" ? raw.teams.red : raw.teams.blue;
  const kd =
    raw.stats.deaths === 0
      ? raw.stats.kills
      : +(raw.stats.kills / raw.stats.deaths).toFixed(2);

  return {
    matchId: raw.meta.id,
    map: raw.meta.map.name,
    agent: raw.stats.character.name,
    agentImage: `https://media.valorant-api.com/agents/${raw.stats.character.id}/displayicon.png`,
    kills: raw.stats.kills,
    deaths: raw.stats.deaths,
    assists: raw.stats.assists,
    kd,
    won: myScore > oppScore,
    teamScore: `${myScore} – ${oppScore}`,
    startedAt: Math.floor(new Date(raw.meta.started_at).getTime() / 1000),
    mode: raw.meta.mode || "Unknown",
    gameLengthSecs: 0, // not exposed by v1/lifetime endpoint
  };
}

function deriveStats(matches: MatchResult[]): PlayerStats {
  if (matches.length === 0)
    return { kd: 0, winrate: 0, headshotPct: 0, damagePerRound: 0, matchesPlayed: 0 };

  const wins = matches.filter((m) => m.won).length;
  const totalKills = matches.reduce((s, m) => s + m.kills, 0);
  const totalDeaths = matches.reduce((s, m) => s + m.deaths, 0);
  return {
    kd: totalDeaths === 0 ? totalKills : +(totalKills / totalDeaths).toFixed(2),
    winrate: Math.round((wins / matches.length) * 100),
    headshotPct: 0, // HenrikDev v3 matches don't expose HS% directly; use 0 until available
    damagePerRound: 0, // Same — use 0 until available from match details endpoint
    matchesPlayed: matches.length,
  };
}

function deriveTopAgents(matches: MatchResult[]): AgentStat[] {
  const map: Record<
    string,
    { agent: string; agentImage: string; wins: number; kills: number; deaths: number; count: number }
  > = {};
  for (const m of matches) {
    if (!map[m.agent]) {
      map[m.agent] = { agent: m.agent, agentImage: m.agentImage, wins: 0, kills: 0, deaths: 0, count: 0 };
    }
    map[m.agent].count++;
    if (m.won) map[m.agent].wins++;
    map[m.agent].kills += m.kills;
    map[m.agent].deaths += m.deaths;
  }
  return Object.values(map)
    .map((a) => ({
      agent: a.agent,
      agentImage: a.agentImage,
      matches: a.count,
      winrate: Math.round((a.wins / a.count) * 100),
      kd: a.deaths === 0 ? a.kills : +(a.kills / a.deaths).toFixed(2),
      avgKills: +(a.kills / a.count).toFixed(1),
    }))
    .sort((a, b) => b.matches - a.matches)
    .slice(0, 5);
}

function deriveTopMaps(matches: MatchResult[]): MapStat[] {
  const map: Record<string, { wins: number; count: number }> = {};
  for (const m of matches) {
    if (!map[m.map]) map[m.map] = { wins: 0, count: 0 };
    map[m.map].count++;
    if (m.won) map[m.map].wins++;
  }
  return Object.entries(map)
    .map(([mapName, d]) => ({
      map: mapName,
      matches: d.count,
      winrate: Math.round((d.wins / d.count) * 100),
    }))
    .sort((a, b) => b.matches - a.matches)
    .slice(0, 5);
}

function deriveStatsByMode(matches: MatchResult[]): Record<string, PlayerStats> {
  const modeGroups: Record<string, MatchResult[]> = {};
  for (const m of matches) {
    const mode = m.mode || "Unknown";
    if (!modeGroups[mode]) modeGroups[mode] = [];
    modeGroups[mode].push(m);
  }
  const result: Record<string, PlayerStats> = {};
  for (const [mode, modeMatches] of Object.entries(modeGroups)) {
    result[mode] = deriveStats(modeMatches);
  }
  return result;
}

// ---------- Public API ----------

export async function getPlayerProfile(
  region: string,
  name: string,
  tag: string
): Promise<PlayerProfile> {
  const encodedName = encodeURIComponent(name);
  const encodedTag = encodeURIComponent(tag);
  const lifetimeBase = `/v1/lifetime/matches/${region}/${encodedName}/${encodedTag}?size=20`;

  const [rankRaw, page1, page2] = await Promise.all([
    hFetch<HenrikMMRData>(`/v2/mmr/${region}/${encodedName}/${encodedTag}`),
    hFetch<HenrikLifetimeMatch[]>(`${lifetimeBase}&page=1`),
    hFetch<HenrikLifetimeMatch[]>(`${lifetimeBase}&page=2`),
  ]);

  const rank = mapRank(rankRaw);

  // Combine pages, deduplicate by matchId
  const seen = new Set<string>();
  const allRaw = [...page1, ...page2].filter((m) => {
    if (seen.has(m.meta.id)) return false;
    seen.add(m.meta.id);
    return true;
  });

  const matches = allRaw.map(mapLifetimeMatch);

  return {
    player: { name, tag, region },
    rank,
    stats: deriveStats(matches),
    matches,
    topAgents: deriveTopAgents(matches),
    topMaps: deriveTopMaps(matches),
    totalPlaytimeSecs: 0, // not exposed by v1/lifetime endpoint
    statsByMode: deriveStatsByMode(matches),
  };
}

// ---------- Authenticated: Shop ----------

interface HenrikStoreOffer {
  offer_id: string;
  cost: Record<string, number>;
  rewards: Array<{ ItemTypeID: string; ItemID: string }>;
  skin_panel?: {
    DisplayName: string;
    displayIcon: string;
    contentTierUuid: string;
    // HenrikDev enriches with skin metadata
    weapon?: string;
    themeUuid?: string;
  };
}

const COLLECTION_COLORS: Record<string, string> = {
  // Common theme UUIDs → hex accent colors
  // Extend as needed based on actual HenrikDev response themeUuids
  default: "#1e1b4b",
};

function getCollectionColor(themeUuid?: string): string {
  return COLLECTION_COLORS[themeUuid ?? ""] ?? COLLECTION_COLORS.default;
}

/**
 * Fetch the authenticated player's daily shop.
 * Requires the player's Riot access token from their NextAuth session.
 *
 * ⚠️ Verify the exact endpoint + required headers at https://docs.henrikdev.xyz
 * before running. The endpoint below is the most likely structure.
 */
export async function getPlayerShop(
  region: string,
  name: string,
  tag: string,
  accessToken: string
): Promise<ShopData> {
  const raw = await hFetch<{
    SkinsPanelLayout: {
      SingleItemStoreOffers: HenrikStoreOffer[];
      SingleItemOffersRemainingDurationInSeconds: number;
    };
  }>(`/v2/store-offers/${region}/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`, {
    accessToken,
    noCache: true,
  });

  const offers: ShopOffer[] = raw.SkinsPanelLayout.SingleItemStoreOffers.map(
    (o) => ({
      offerId: o.offer_id,
      skinName: o.skin_panel?.DisplayName ?? "Unknown Skin",
      weaponName: o.skin_panel?.weapon ?? "Unknown Weapon",
      collectionName: "Unknown Collection",
      costVP: Object.values(o.cost)[0] ?? 0,
      imageUrl: o.skin_panel?.displayIcon ?? "",
      owned: false,
      themeColor: getCollectionColor(o.skin_panel?.themeUuid),
    })
  );

  return {
    offers,
    resetInSeconds: raw.SkinsPanelLayout.SingleItemOffersRemainingDurationInSeconds,
  };
}

// ---------- Authenticated: Inventory ----------

/**
 * Fetch the authenticated player's VP balance, Radianite, and owned skins.
 *
 * ⚠️ Verify endpoint at https://docs.henrikdev.xyz — this requires the player's
 * Riot access token and their PUUID.
 */
export async function getPlayerInventory(
  region: string,
  puuid: string,
  accessToken: string
): Promise<PlayerInventory> {
  const raw = await hFetch<{
    skins: Array<{
      item_id: string;
      name: string;
      weapon: string;
      icon: string;
    }>;
    wallet: { vp: number; radianite: number };
  }>(`/v1/by-puuid/assets/inventory/${region}/${puuid}`, {
    accessToken,
    noCache: true,
  });

  return {
    vp: raw.wallet?.vp ?? 0,
    radianite: raw.wallet?.radianite ?? 0,
    skins: (raw.skins ?? []).map((s) => ({
      itemId: s.item_id,
      skinName: s.name,
      weaponType: s.weapon,
      imageUrl: s.icon,
      equipped: false, // HenrikDev doesn't expose equipped state; leave false
    })),
  };
}

// ---------- Match Detail ----------

interface HenrikSingleMatch {
  metadata: {
    matchid: string;
    map: string;
    mode: string;
    game_start: number;
    game_length: number;
  };
  players: {
    all_players: Array<{
      name: string;
      tag: string;
      team: string; // "Blue" or "Red"
      character: string;
      assets: { agent: { full: string } };
      stats: { kills: number; deaths: number; assists: number; score: number };
    }>;
  };
  teams: {
    blue: { has_won: boolean; rounds_won: number };
    red: { has_won: boolean; rounds_won: number };
  };
}

export async function getMatchDetail(matchId: string): Promise<MatchDetail> {
  const raw = await hFetch<HenrikSingleMatch>(`/v2/match/${matchId}`);

  const blueScore = raw.teams.blue.rounds_won;
  const redScore = raw.teams.red.rounds_won;
  const totalRounds = blueScore + redScore || 1;

  const players: MatchPlayer[] = raw.players.all_players.map((p) => {
    const kd =
      p.stats.deaths === 0
        ? p.stats.kills
        : +(p.stats.kills / p.stats.deaths).toFixed(2);
    const acs = Math.round(p.stats.score / totalRounds);

    return {
      name: p.name,
      tag: p.tag,
      agent: p.character,
      agentImage: p.assets?.agent?.full ?? "",
      team: (() => { const rawTeam = p.team?.toLowerCase() ?? "blue"; return rawTeam === "red" ? "red" : "blue"; })() as "blue" | "red",
      kills: p.stats.kills,
      deaths: p.stats.deaths,
      assists: p.stats.assists,
      kd,
      acs,
    };
  });

  return {
    matchId: raw.metadata.matchid,
    map: raw.metadata.map,
    mode: raw.metadata.mode,
    startedAt: raw.metadata.game_start,
    gameLengthSecs: raw.metadata.game_length ?? 0,
    blueWon: raw.teams.blue.has_won,
    redWon: raw.teams.red.has_won,
    blueScore,
    redScore,
    players,
  };
}
