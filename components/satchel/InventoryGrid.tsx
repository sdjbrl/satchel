import type { InventorySkin, PlayerInventory } from "@/lib/satchel/types";
import Image from "next/image";

interface Props {
  inventory: PlayerInventory;
}

function WalletBadge({ label, amount, icon }: { label: string; amount: number; icon: string }) {
  return (
    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-3">
      <span className="text-xl">{icon}</span>
      <div>
        <p className="text-white font-bold text-lg leading-none">{amount.toLocaleString()}</p>
        <p className="text-white/40 text-xs uppercase tracking-widest mt-0.5">{label}</p>
      </div>
    </div>
  );
}

function SkinCard({ skin }: { skin: InventorySkin }) {
  return (
    <div className="group relative bg-[#12151e] border border-white/5 rounded-lg overflow-hidden hover:border-[#FF4655]/30 transition-colors">
      <div className="h-28 flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent p-4">
        {skin.imageUrl ? (
          <Image
            src={skin.imageUrl}
            alt={skin.skinName}
            width={160}
            height={80}
            className="object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-200"
            unoptimized
          />
        ) : (
          <div className="w-24 h-12 bg-white/10 rounded flex items-center justify-center">
            <span className="text-white/20 text-xs">No image</span>
          </div>
        )}
      </div>
      <div className="px-3 pb-3">
        <p className="text-white text-xs font-semibold truncate">{skin.skinName}</p>
        <p className="text-white/30 text-xs truncate mt-0.5">{skin.weaponType}</p>
      </div>
      {skin.equipped && (
        <div className="absolute top-2 right-2 bg-[#FF4655] text-white text-[10px] font-bold uppercase px-1.5 py-0.5 rounded">
          Équipé
        </div>
      )}
    </div>
  );
}

export default function InventoryGrid({ inventory }: Props) {
  const byWeapon = inventory.skins.reduce<Record<string, InventorySkin[]>>((acc, skin) => {
    const key = skin.weaponType || "Autre";
    (acc[key] ??= []).push(skin);
    return acc;
  }, {});

  const weaponOrder = [
    "Vandal", "Phantom", "Operator", "Bulldog", "Guardian",
    "Spectre", "Stinger", "Bucky", "Judge", "Shorty",
    "Sheriff", "Ghost", "Frenzy", "Classic",
    "Odin", "Ares", "Marshal",
    "Knife", "Melee", "Autre",
  ];

  const sorted = [
    ...weaponOrder.filter((w) => byWeapon[w]),
    ...Object.keys(byWeapon).filter((w) => !weaponOrder.includes(w)),
  ];

  return (
    <div className="space-y-8">
      {/* Wallet */}
      <div className="flex gap-3 flex-wrap">
        <WalletBadge label="Valorant Points" amount={inventory.vp} icon="💎" />
        <WalletBadge label="Radianite" amount={inventory.radianite} icon="🔶" />
        <WalletBadge label="Skins total" amount={inventory.skins.length} icon="🎨" />
      </div>

      {/* Skins grouped by weapon */}
      {sorted.length === 0 ? (
        <div className="text-center py-12 text-white/30 text-sm">Aucun skin trouvé.</div>
      ) : (
        sorted.map((weapon) => (
          <section key={weapon}>
            <h3 className="text-xs text-white/40 uppercase tracking-widest mb-3">{weapon}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {byWeapon[weapon].map((skin) => (
                <SkinCard key={skin.itemId} skin={skin} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
