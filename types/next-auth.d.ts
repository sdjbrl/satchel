import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    /** Riot access token — passed to HenrikDev for private endpoints */
    accessToken: string;
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      /** Riot tagline, e.g. "EUW" */
      tag: string;
      /** Riot PUUID */
      puuid: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    riotTag?: string;
    puuid?: string;
  }
}
