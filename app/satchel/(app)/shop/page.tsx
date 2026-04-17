import { redirect } from "next/navigation";
import { auth } from "@/lib/satchel/auth-config";
import { getPlayerShop } from "@/lib/satchel/henrikdev";
import ShopGrid from "@/components/satchel/ShopGrid";

export default async function ShopPage() {
  const session = await auth();
  if (!session) redirect("/satchel");

  const name = session.user.name;
  const tag = session.user.tag;
  const accessToken = session.accessToken;

  if (!name || !accessToken) {
    return (
      <div className="text-center py-20">
        <p className="text-white/40">Session incomplète. Déconnecte-toi et reconnecte-toi.</p>
      </div>
    );
  }

  let shopData;
  try {
    shopData = await getPlayerShop("eu", name, tag, accessToken);
  } catch {
    return (
      <div className="text-center py-20 space-y-2">
        <p className="text-white/40">Impossible de charger la boutique.</p>
        <p className="text-white/20 text-xs">
          ⚠️ Cet endpoint nécessite une approbation Riot RSO en production.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <ShopGrid offers={shopData.offers} resetInSeconds={shopData.resetInSeconds} />
    </div>
  );
}
