/**
 * Mock regional leaderboard generator.
 * Real HenrikDev/Riot leaderboards require a premium key — we synthesize
 * deterministic mock data keyed by region so UI can be built.
 */

import type { LeaderboardData, LeaderboardEntry } from "./types";

const FIRST_NAMES = [
  "TenZ", "Aspas", "Demon1", "Cryo", "Derke", "Chronicle", "Alfajer",
  "Leo", "Less", "Kingg", "Sayf", "Nats", "ScreaM", "Shao", "Redgar",
  "Boaster", "Yay", "FNS", "Crashies", "Marved", "Jawgemo", "Ethan",
  "Zekken", "Johnqt", "Bcj", "Dephh", "MrFaliN", "Quick", "Kobra",
  "Jamppi", "Zyppan", "Runi", "Patitek", "Keznit", "Saadhak",
  "Aspire", "Hiro", "Mazin", "Suygetsu", "ANGE1",
];

const TAGS = ["EUW", "NA", "FR", "APAC", "KR", "BR", "2604", "XYZ", "GG", "IMM"];

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}
function rand(seed: string, salt: string): number {
  return (hash(seed + "|" + salt) % 10_000) / 10_000;
}

/** Deterministic mock: same region always gets same leaderboard */
export function getMockLeaderboard(region: string, limit = 100): LeaderboardData {
  const entries: LeaderboardEntry[] = [];
  for (let i = 0; i < limit; i++) {
    const seed = `${region}-${i}`;
    const nameBase = FIRST_NAMES[Math.floor(rand(seed, "n") * FIRST_NAMES.length)];
    const suffix = Math.floor(rand(seed, "s") * 999);
    const name = `${nameBase}${suffix % 2 === 0 ? "" : suffix}`;
    const tag = TAGS[Math.floor(rand(seed, "t") * TAGS.length)];

    // Tier distribution: top 5% radiant, next 10% imm3, etc.
    const pct = i / limit;
    let tier: { tier: number; name: string };
    if (pct < 0.05) tier = { tier: 27, name: "Radiant" };
    else if (pct < 0.15) tier = { tier: 26, name: "Immortal 3" };
    else if (pct < 0.35) tier = { tier: 25, name: "Immortal 2" };
    else if (pct < 0.7) tier = { tier: 24, name: "Immortal 1" };
    else tier = { tier: 23, name: "Ascendant 3" };

    // RR descends with rank (leaderboard ordered high to low)
    const baseRr = tier.tier === 27 ? 650 - i * 3 : 500 - Math.floor(rand(seed, "rr") * 200);
    const rr = Math.max(0, Math.round(baseRr));

    entries.push({
      rank: i + 1,
      puuid: `mock-${region}-${i}`,
      name,
      tag,
      tier: tier.tier,
      tierName: tier.name,
      rr,
      wins: Math.round(50 + rand(seed, "w") * 180),
    });
  }

  return {
    region,
    totalPlayers: 500_000 + Math.floor(rand(region, "total") * 500_000),
    entries,
  };
}
