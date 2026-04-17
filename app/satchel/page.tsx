import Image from "next/image";
import { redirect } from "next/navigation";
import { auth, signIn } from "@/lib/satchel/auth-config";
import PlayerSearchBar from "@/components/satchel/PlayerSearchBar";

const JETT_IMAGE =
  "https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/fullportrait.png";

export default async function SatchelLandingPage() {
  const session = await auth();
  if (session) redirect("/satchel/dashboard");

  return (
    <div className="flex h-screen overflow-hidden">
      {/* LEFT — Login */}
      <div className="flex-1 flex flex-col justify-center px-10 lg:px-20 gap-8">
        <div>
          <p className="text-[#FF4655] text-xs font-bold tracking-[0.4em] uppercase mb-3">
            Satchel
          </p>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Ton univers<br />
            <span className="text-[#FF4655]">Valorant.</span>
          </h1>
          <p className="text-white/40 text-sm mt-3">
            Stats · Rang · Inventaire
          </p>
        </div>

        <div className="space-y-3">
          <form
            action={async () => {
              "use server";
              await signIn("riot", { redirectTo: "/satchel/dashboard" });
            }}
          >
            <button
              type="submit"
              className="flex items-center gap-3 bg-[#FF4655] hover:bg-[#e03d4a] transition-colors text-white font-bold text-sm uppercase tracking-widest px-6 py-4 rounded-md w-fit"
            >
              <span className="text-lg">⚡</span>
              Se connecter avec Riot Games
            </button>
          </form>
          <p className="text-white/20 text-xs max-w-xs leading-relaxed">
            Connexion sécurisée via Riot SSO. Satchel n'accède qu'aux données
            de ton propre compte, avec ton consentement explicite.
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 text-white/20 text-xs uppercase tracking-widest max-w-sm">
          <div className="flex-1 h-px bg-white/10" />
          ou
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Public search */}
        <div className="max-w-sm">
          <p className="text-white/50 text-xs mb-2 uppercase tracking-widest">
            Chercher un joueur
          </p>
          <PlayerSearchBar />
        </div>
      </div>

      {/* RIGHT — Jett full-height */}
      <div className="relative hidden lg:flex w-1/2 items-end justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-[#FF4655]/10 to-transparent" />
        <div className="absolute bottom-0 right-1/4 w-64 h-96 bg-[#FF4655]/20 blur-3xl rounded-full" />

        <div className="absolute top-16 right-12 flex flex-col gap-3 z-10">
          {["UPDRAFT", "CLOUDBURST", "BLADESTORM"].map((ability) => (
            <span
              key={ability}
              className="border border-[#FF4655]/40 bg-[#FF4655]/10 text-[#FF4655] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-sm"
            >
              {ability}
            </span>
          ))}
        </div>

        <div className="relative w-full h-full max-w-md">
          <Image
            src={JETT_IMAGE}
            alt="Jett — Agent Valorant"
            fill
            className="object-contain object-bottom"
            style={{ filter: "drop-shadow(0 0 40px rgba(255,70,85,0.5))" }}
            priority
            sizes="50vw"
          />
        </div>
      </div>
    </div>
  );
}
