export function SkeletonLine({ className = "" }: { className?: string }) {
  return (
    <div className={`shimmer-bg rounded h-3 ${className}`} aria-hidden />
  );
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`glass-card p-4 space-y-3 ${className}`} aria-busy>
      <SkeletonLine className="w-1/3 h-2" />
      <SkeletonLine className="w-2/3 h-6" />
      <SkeletonLine className="w-1/2 h-2" />
    </div>
  );
}

export function SkeletonMatchRow() {
  return (
    <div className="glass-card px-4 py-3 flex items-center gap-3" aria-busy>
      <div className="w-8 h-8 rounded-full shimmer-bg" />
      <div className="flex-1 space-y-2">
        <SkeletonLine className="w-24" />
        <SkeletonLine className="w-16 h-2" />
      </div>
      <SkeletonLine className="w-16" />
    </div>
  );
}
