# Satchel — Design Spec

**Date:** 2026-04-17
**Project:** Satchel — Valorant companion web app
**Location:** `said-web` (existing Next.js 16 App Router project)
**Deployment:** Vercel

---

## Problem Statement

Players want a single place to check their Valorant stats, rank progression, and daily shop — without opening the game client. Tracker.gg exists but has no daily shop. The official Valorant client shows the shop but no deep stats. Satchel combines both, adding a public player-search mode (no login required) and a private authenticated mode for boutique and inventory access.

---

## Visual Identity

- **Character:** Jett is the permanent visual signature of Satchel — on the landing page she occupies the full right half; on inner app pages she appears as a narrow right-side accent panel (fixed sidebar, ~80px wide) with a floating animation and red glow
- **Color palette:** Background `#0d1117`, accent red `#FF4655`, text `#e0e0e0`, dark card `#12151e`
- **Typography:** System sans-serif (Next.js default), uppercase labels with letter-spacing for the Valorant feel
- **Motion:** Framer Motion for hover states, page transitions, and Jett micro-animations
- **Inspiration:** Valorant official client aesthetic — dark, cinematic, sharp

---

## Access Modes

| Mode | Auth | Available Features |
|---|---|---|
| **Public** | None | Search any player by `RiotID#TAG`, view their stats/rank/match history/top agents/maps |
| **Authenticated** | Riot RSO | Everything public + personal daily shop + full inventory + VP/Radianite balance |

---

## Routes

| Route | Auth Required | Description |
|---|---|---|
| `/satchel` | No | Landing page: Jett split login + public player search |
| `/satchel/search` | No | Search bar — enter `Name#TAG` to look up any player |
| `/satchel/player/[riotId]` | No | Public player profile: stats, rank, match history, top agents/maps |
| `/satchel/dashboard` | Yes | Authenticated player's own full profile |
| `/satchel/shop` | Yes | Authenticated player's daily shop (4 skins) |
| `/satchel/inventory` | Yes | Authenticated player's skins + VP/Radianite balance |
| `/api/auth/[...nextauth]` | — | NextAuth.js Riot RSO handler |
| `/api/satchel/stats` | — | Server proxy → HenrikDev stats endpoint |
| `/api/satchel/shop` | — | Server proxy → HenrikDev shop endpoint |
| `/api/satchel/inventory` | — | Server proxy → HenrikDev inventory endpoint |

All `/satchel/dashboard`, `/satchel/shop`, `/satchel/inventory` routes are protected by Next.js middleware that redirects unauthenticated users to `/satchel`.

---

## Architecture

### Layers

```
Browser (Client)
  └─ Next.js App Router (said-web/app/satchel/)
       ├─ Server Components (data fetching)
       ├─ Client Components (Framer Motion, interactivity)
       └─ Route Handlers (/api/satchel/*)
            ├─ NextAuth → Riot RSO (OAuth2 PKCE)
            └─ HenrikDev API proxy (API key never exposed to client)
```

### External APIs

| API | Purpose | Auth |
|---|---|---|
| `auth.riotgames.com` | OAuth2 RSO — player identity + access token | OAuth2 PKCE |
| `api.henrikdev.xyz` | Stats, shop, inventory data | API key (server-side only) |

**Key principle:** HenrikDev is always called server-side (Route Handlers or Server Components). The `HENRIK_API_KEY` environment variable is never sent to the browser.

### Auth Flow

1. User clicks "Se connecter avec Riot Games"
2. NextAuth redirects to `auth.riotgames.com` (RSO OAuth2 PKCE)
3. Riot redirects back to `/api/auth/callback/riot`
4. NextAuth exchanges code for access token + identity
5. Session stored as encrypted JWT in httpOnly cookie
6. Server Components read session via `getServerSession()` to gate authenticated pages
7. Route Handlers verify session before proxying HenrikDev calls

---

## File Structure

```
said-web/
├─ app/
│   ├─ satchel/
│   │   ├─ page.tsx                    # Landing / Login (Jett split)
│   │   ├─ search/page.tsx             # Public player search
│   │   ├─ player/[riotId]/page.tsx    # Public player profile
│   │   ├─ dashboard/page.tsx          # Authenticated: my profile
│   │   ├─ shop/page.tsx               # Authenticated: daily shop
│   │   └─ inventory/page.tsx          # Authenticated: inventory
│   └─ api/
│       ├─ auth/[...nextauth]/route.ts # NextAuth handler
│       └─ satchel/
│           ├─ stats/route.ts
│           ├─ shop/route.ts
│           └─ inventory/route.ts
├─ components/
│   └─ satchel/
│       ├─ JettSidebar.tsx             # Jett signature component (all pages)
│       ├─ RankCard.tsx
│       ├─ StatsGrid.tsx
│       ├─ MatchHistory.tsx
│       ├─ TopAgents.tsx
│       ├─ TopMaps.tsx
│       ├─ ShopGrid.tsx
│       ├─ InventoryGrid.tsx
│       └─ PlayerSearchBar.tsx
├─ lib/
│   └─ satchel/
│       ├─ auth-config.ts              # NextAuth provider + callbacks
│       └─ henrikdev.ts                # Typed HenrikDev API client
└─ middleware.ts                       # Extend existing middleware — add matcher for /satchel/dashboard, /satchel/shop, /satchel/inventory
```

---

## Pages

### `/satchel` — Landing / Login

- **Layout:** Split 50/50 — left: Satchel logo + "Se connecter avec Riot Games" button + public search bar; right: Jett full-height with red glow and ability tags (UPDRAFT, CLOUDBURST), Framer Motion floating animation
- **Behavior:** If already authenticated, redirect to `/satchel/dashboard`

### `/satchel/search` + `/satchel/player/[riotId]` — Public Profile

- **Data:** HenrikDev public endpoints (no auth token needed)
- **Sections:** Rank card + RR progress bar · Stats grid (K/D, Winrate, HS%, Damage/Round) · Match history (agent, map, score, K/D/A, W/L, colored border) · Top agents (winrate + K/D) · Top maps (winrate)
- **Style:** Tracker.gg-inspired density — compact rows, colored W/L borders, stat badges

### `/satchel/dashboard` — Authenticated Profile

- Same layout as public profile but data comes from the authenticated player's own account via their RSO token
- Additional: Peak rank display, Act rank history

### `/satchel/shop` — Daily Shop

- **Layout:** 2×2 grid — each skin card uses its collection's thematic color (gradient background unique per skin line)
- **Card content:** Weapon image (from HenrikDev/CDN) · Skin name · Collection name · VP price with Valorant Points icon · "Déjà possédé" badge if in inventory
- **Footer:** Countdown timer to shop reset

### `/satchel/inventory` — Inventory

- Grid of owned skins, grouped by weapon type
- VP balance + Radianite Points balance displayed in header
- Equipped skin highlighted per weapon slot

---

## Components

### `JettSidebar.tsx`
Persistent Jett visual on all authenticated/app pages. Renders as a narrow sidebar column or header accent. Framer Motion: subtle float animation loop, red glow pulses on hover.

### `RankCard.tsx`
Displays rank icon + tier name + RR value + progress bar to next rank. Accepts `rank`, `rr`, `maxRr` props.

### `StatsGrid.tsx`
Grid of stat badges: K/D · Winrate · HS% · Damage/Round. Color-coded: K/D uses red accent if above 1.0.

### `MatchHistory.tsx`
List of match rows. Each row: colored left border (green=win, red=loss) · agent icon · map name · score · K/D/A · K/D ratio. Framer Motion stagger on list entry.

### `ShopGrid.tsx`
2×2 CSS grid. Each `SkinCard` has a unique gradient derived from the skin collection's color theme. VP price badge in red.

---

## Data Flow

### Public player lookup
```
Client → /satchel/search → navigate to /satchel/player/[riotId]
/satchel/player/[riotId] (Server Component)
  → lib/satchel/henrikdev.ts → HenrikDev /v2/mmr/{region}/{name}/{tag}
  → lib/satchel/henrikdev.ts → HenrikDev /v3/matches/{region}/{name}/{tag}
```

### Authenticated shop
```
/satchel/shop (Server Component, session verified via getServerSession())
  → lib/satchel/henrikdev.ts (with session PUUID) → HenrikDev /v2/storefront/{puuid}
```

> **Note:** Server Components call `lib/satchel/henrikdev.ts` directly — no client → API route round-trip needed for SSR pages. The `/api/satchel/*` Route Handlers exist for future client-side refresh (e.g., shop countdown reload without full page navigation).

---

## Environment Variables

```env
# NextAuth
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=<random 32+ char string>

# Riot RSO (from developer.riotgames.com)
RIOT_CLIENT_ID=<your RSO client id>
RIOT_CLIENT_SECRET=<your RSO client secret>

# HenrikDev
HENRIK_API_KEY=<your henrikdev api key from dash.henrikdev.xyz>
```

---

## Risks & Mitigations

| Risk | Mitigation |
|---|---|
| HenrikDev ToS / unofficial API | Clearly mark Satchel as unofficial; rate limit proxied calls; monitor API stability |
| RSO token expiry | NextAuth handles refresh via `refreshAccessToken` callback |
| HenrikDev shop endpoint requires player token | Verify endpoint capability during implementation; fallback: use PUUID from RSO session |
| Vercel cold start on Route Handlers | Keep proxy handlers lean; use Next.js `cache` for public data |

---

## Out of Scope (MVP)

- Crosshair generator/manager (post-MVP)
- Statistics by agent per map (post-MVP)
- Night Market detection
- Competitive leaderboard

---

## Success Criteria

1. A user can sign in with their Riot account and see their live daily shop within 30 seconds
2. A visitor without an account can search any `RiotID#TAG` and see public stats
3. The Jett visual signature is present and animated on all pages
4. All HenrikDev calls are server-side — no API key in browser network tab
5. Deploys and runs on Vercel without configuration beyond `.env`
