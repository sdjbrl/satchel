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
}

export interface AgentStat {
  agent: string;
  agentImage: string;
  matches: number;
  winrate: number; // 0–100
  kd: number;
  avgKills: number;
}

export interface MapStat {
  map: string;
  matches: number;
  winrate: number; // 0–100
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
  partyId: string; // players with same partyId are queued together
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
}
