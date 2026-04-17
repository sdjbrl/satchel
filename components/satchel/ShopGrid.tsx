import Image from "next/image";
import type { ShopOffer } from "@/lib/satchel/types";

interface ShopGridProps {
  offers: ShopOffer[];
  resetInSeconds: number;
}

function formatCountdown(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m}m`;
}

export default function ShopGrid({ offers, resetInSeconds }: ShopGridProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xs text-white/40 uppercase tracking-widest">Boutique du jour</h2>
        <span className="text-xs text-white/30">
          Reset dans <span className="text-[#FF4655]">{formatCountdown(resetInSeconds)}</span>
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {offers.map((offer) => (
          <div
            key={offer.offerId}
            className="relative overflow-hidden rounded-lg border border-white/5 bg-[#12151e] group"
          >
            {/* Skin image */}
            <div className="relative h-40 w-full bg-gradient-to-br from-white/5 to-transparent">
              {offer.imageUrl ? (
                <Image
                  src={offer.imageUrl}
                  alt={offer.skinName}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-white/10 text-sm">
                  No image
                </div>
              )}
            </div>

            {/* Info bar */}
            <div className="px-4 py-3 flex items-center justify-between border-t border-white/5">
              <div>
                <p className="text-white text-sm font-medium truncate max-w-[140px]">{offer.skinName}</p>
                {offer.collectionName && (
                  <p className="text-white/30 text-xs truncate max-w-[140px]">{offer.collectionName}</p>
                )}
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {/* VP icon */}
                <span className="text-[10px] text-[#FF4655] font-bold">VP</span>
                <span className="text-white font-bold text-sm">{offer.costVP.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
