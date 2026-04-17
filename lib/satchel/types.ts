// All Satchel domain types — used by henrikdev.ts, components, and pages

export interface SatchelPlayer {
  name: string;
  tag: string;
  region: string;
  puuid?: string;
}

export interface RankData {
  tier: number;
  tierName: string; // e.g. "Immortal 2"
  rr: number; // 0–99
  peakTier: number;
  peakTierName: string;
}

export interface PlayerStats {
  kd: number;
  winrate: number; // 0–100
  headshotPct: number; // 0–100
  damagePerRound: number;
  matchesPlayed: number;
  acs: number; // average combat score
  wins: number;
  losses: number;
}

export interface MatchResult {
  matchId: string;
  map: string;
  agent: string;
  agentImage: string; // Full URL from valorant-api.com
  kills: number;
  deaths: number;
  assists: number;
  kd: number;
  won: boolean;
  teamScore: string; // e.g. "13 – 7"
  startedAt: number; // unix timestamp
  mode: string; // e.g. "Competitive", "Unranked", "Swiftplay", "Deathmatch", "Hurm"
  gameLengthSecs: number; // match duration in seconds
  acs: number;
  headshotPct: number;
  damagePerRound: number;
}

export interface AgentStat {
  agent: string;
  agentImage: string;
  matches: number;
  winrate: number; // 0–100
  kd: number;
  avgKills: number;
  acs: number;
  headshotPct: number;
}

export interface MapStat {
  map: string;
  matches: number;
  winrate: number; // 0–100
  avgKills: number;
  avgAcs: number;
}

export interface PlayerProfile {
  player: SatchelPlayer;
  rank: RankData;
  stats: PlayerStats;
  matches: MatchResult[];
  topAgents: AgentStat[];
  topMaps: MapStat[];
  totalPlaytimeSecs: number; // sum of all gameLengthSecs
  statsByMode: Record<string, PlayerStats>; // keyed by mode name
  statsByAgent: AgentStat[]; // full breakdown, sorted by matches desc
  statsByMap: MapStat[]; // full breakdown, sorted by matches desc
}

export interface ShopOffer {
  offerId: string;
  skinName: string;
  weaponName: string;
  collectionName: string;
  costVP: number;
  imageUrl: string;
  owned: boolean;
  /** Hex color for gradient background — derived from collection */
  themeColor: string;
}

export interface InventorySkin {
  itemId: string;
  skinName: string;
  weaponType: string;
  imageUrl: string;
  equipped: boolean;
}

export interface PlayerInventory {
  vp: number;
  radianite: number;
  skins: InventorySkin[];
}

/** Reset time for the daily shop */
export interface ShopData {
  offers: ShopOffer[];
  resetInSeconds: number;
}

export interface MatchPlayer {
  name: string;
  tag: string;
  agent: string;
  agentImage: string;
  team: "blue" | "red";
  kills: number;
  deaths: number;
  assists: number;
  kd: number;
  acs: number; // average combat score
  headshotPct: number;
  damage: number;
  bodyshotPct: number;
  legshotPct: number;
  partyId: string; // players with same partyId are queued together
}

export interface RoundInfo {
  round: number;
  winningTeam: "blue" | "red";
  endType: "elimination" | "defuse" | "detonate" | "time";
  bluePlantedSpike: boolean;
  redPlantedSpike: boolean;
  blueEconomy: number; // sum of loadout value, mocked if missing
  redEconomy: number;
}

export interface MatchDetail {
  matchId: string;
  map: string;
  mode: string;
  startedAt: number;
  gameLengthSecs: number;
  blueWon: boolean;
  redWon: boolean;
  blueScore: number;
  redScore: number;
  players: MatchPlayer[];
  rounds: RoundInfo[];
}

export interface LeaderboardEntry {
  rank: number;
  puuid: string;
  name: string;
  tag: string;
  tier: number;
  tierName: string;
  rr: number;
  wins: number;
}

export interface LeaderboardData {
  region: string;
  totalPlayers: number;
  entries: LeaderboardEntry[];
}

export interface CoachInsight {
  /** "positive" = compliment, "neutral" = observation, "negative" = area to work on */
  severity: "positive" | "neutral" | "negative";
  title: string;
  body: string;
  /** Optional metric surface, e.g. "HS 18%" */
  metric?: string;
}
