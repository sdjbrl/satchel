import { redirect } from "next/navigation";
import { auth } from "@/lib/satchel/auth-config";
import { getPlayerInventory } from "@/lib/satchel/henrikdev";
import type { PlayerInventory } from "@/lib/satchel/types";
import InventoryGrid from "@/components/satchel/InventoryGrid";

export default async function InventoryPage() {
  const session = await auth();
  if (!session) redirect("/satchel");

  const puuid = session.user.puuid;
  const accessToken = session.accessToken;

  // RSO not yet approved or session missing token — show pending state
  if (!puuid || !accessToken) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-1">Inventaire</h1>
        <p className="text-white/30 text-xs uppercase tracking-widest mb-8">Mes skins & portefeuille</p>
        <div className="border border-[#FF4655]/20 bg-[#FF4655]/5 rounded-lg p-8 text-center">
          <p className="text-3xl mb-4">🔐</p>
          <p className="text-white font-semibold mb-2">Accès RSO requis</p>
          <p className="text-white/40 text-sm max-w-md mx-auto">
            L'inventaire nécessite l'approbation RSO de Riot Games. Le dossier de candidature est en cours.
            Cette fonctionnalité sera active dès la validation de l'application.
          </p>
        </div>
      </div>
    );
  }

  let inventory: PlayerInventory;
  try {
    inventory = await getPlayerInventory("eu", puuid, accessToken);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-1">Inventaire</h1>
        <p className="text-white/30 text-xs uppercase tracking-widest mb-8">Mes skins & portefeuille</p>
        <div className="border border-white/10 rounded-lg p-8 text-center">
          <p className="text-white/40 text-sm">Impossible de charger l'inventaire.</p>
          <p className="text-white/20 text-xs mt-2 font-mono">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Inventaire</h1>
        <p className="text-white/30 text-xs uppercase tracking-widest mt-1">Mes skins & portefeuille</p>
      </div>
      <InventoryGrid inventory={inventory} />
    </div>
  );
}
