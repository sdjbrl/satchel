// app/satchel/(app)/layout.tsx
import JettSidebar from "@/components/satchel/JettSidebar";
import Link from "next/link";

export default function SatchelAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left: top nav + main content */}
      <div className="flex-1 flex flex-col pr-20">
        <header className="flex items-center gap-6 px-6 py-4 border-b border-white/5">
          <Link
            href="/satchel"
            className="text-[#FF4655] font-bold tracking-[0.2em] uppercase text-sm hover:opacity-80 transition-opacity"
          >
            Satchel
          </Link>
          <nav className="flex gap-4 text-xs text-white/50 uppercase tracking-widest">
            <Link href="/satchel/search" className="hover:text-white transition-colors">
              Rechercher
            </Link>
            <Link href="/satchel/dashboard" className="hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/satchel/shop" className="hover:text-white transition-colors">
              Boutique
            </Link>
            <Link href="/satchel/inventory" className="hover:text-white transition-colors">
              Inventaire
            </Link>
          </nav>
        </header>
        <main className="flex-1 px-6 py-8">{children}</main>
      </div>

      {/* Right: Jett accent sidebar */}
      <JettSidebar />
    </div>
  );
}
