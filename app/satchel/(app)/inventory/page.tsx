import { redirect } from "next/navigation";
import { Lock, Package } from "lucide-react";
import { auth } from "@/lib/satchel/auth-config";
import { getPlayerInventory } from "@/lib/satchel/henrikdev";
import type { PlayerInventory } from "@/lib/satchel/types";
import InventoryGrid from "@/components/satchel/InventoryGrid";
import PageTransition from "@/components/satchel/ui/PageTransition";

export default async function InventoryPage() {
  const session = await auth();
  if (!session) redirect("/satchel");

  const puuid = session.user.puuid;
  const accessToken = session.accessToken;

  if (!puuid || !accessToken) {
    return (
      <PageTransition>
        <div className="max-w-4xl mx-auto">
          <p className="text-[#FF4655] text-[10px] uppercase tracking-[0.4em] font-bold mb-1">
            Inventaire
          </p>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-8">
            Mes skins
          </h1>
          <div className="glass-card-red p-10 text-center">
            <Lock className="w-10 h-10 mx-auto text-[#FF4655] mb-4" />
            <p className="text-white font-semibold mb-2">Accès RSO requis</p>
            <p className="text-white/50 text-sm max-w-md mx-auto leading-relaxed">
              L&apos;inventaire nécessite l&apos;approbation RSO de Riot Games.
              Le dossier de candidature est en cours. Cette fonctionnalité sera
              active dès la validation de l&apos;application.
            </p>
          </div>
        </div>
      </PageTransition>
    );
  }

  let inventory: PlayerInventory;
  try {
    inventory = await getPlayerInventory("eu", puuid, accessToken);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return (
      <PageTransition>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-8">
            Inventaire
          </h1>
          <div className="glass-card p-8 text-center">
            <p className="text-white/40 text-sm">
              Impossible de charger l&apos;inventaire.
            </p>
            <p className="text-white/20 text-xs mt-2 font-mono">{message}</p>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <p className="text-[#FF4655] text-[10px] uppercase tracking-[0.4em] font-bold mb-1 flex items-center gap-2">
            <Package className="w-3 h-3" />
            Inventaire
          </p>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            Mes skins & portefeuille
          </h1>
        </div>
        <InventoryGrid inventory={inventory} />
      </div>
    </PageTransition>
  );
}
