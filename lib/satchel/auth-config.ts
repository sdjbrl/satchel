import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";

const riotProvider: NextAuthConfig["providers"][number] = {
  id: "riot",
  name: "Riot Games",
  type: "oauth",
  authorization: {
    url: "https://auth.riotgames.com/authorize",
    params: {
      scope: "openid offline_access",
      response_type: "code",
    },
  },
  token: "https://auth.riotgames.com/token",
  userinfo: "https://auth.riotgames.com/userinfo",
  clientId: process.env.RIOT_CLIENT_ID,
  clientSecret: process.env.RIOT_CLIENT_SECRET,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profile(profile: any) {
    return {
      id: profile.sub,
      name: profile.acct?.game_name ?? profile.sub,
      email: profile.email ?? null,
      image: null,
      tag: profile.acct?.tag_line ?? "",
      puuid: profile.sub,
    };
  },
};

export const authConfig: NextAuthConfig = {
  providers: [riotProvider],
  pages: {
    signIn: "/satchel",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const p = profile as any;
        token.riotTag = p?.acct?.tag_line ?? "";
        token.puuid = p?.sub ?? "";
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = (token.accessToken as string) ?? "";
      session.user.tag = (token.riotTag as string) ?? "";
      session.user.puuid = (token.puuid as string) ?? "";
      return session;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
