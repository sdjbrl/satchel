"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, LogOut, Package, Zap } from "lucide-react";
import { type ReactNode } from "react";
import GlobalSearch from "@/components/satchel/GlobalSearch";

interface Props {
  signOutAction: () => Promise<void>;
  user?: { name?: string | null; tag?: string };
  rightSlot?: ReactNode;
}

const NAV = [
  { href: "/satchel/dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/satchel/inventory", label: "Inventaire", Icon: Package },
];

export default function Header({ signOutAction, user, rightSlot }: Props) {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-30 backdrop-blur-xl bg-[#0b0f17]/70 border-b border-white/5"
    >
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-6">
        <Link
          href="/satchel"
          className="group flex items-center gap-2"
        >
          <Zap className="w-4 h-4 text-[#FF4655] group-hover:rotate-12 transition-transform" />
          <span className="text-[#FF4655] font-bold tracking-[0.25em] uppercase text-sm">
            Satchel
          </span>
        </Link>

        <nav className="hidden md:flex gap-1">
          {NAV.map(({ href, label, Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`relative px-3 py-1.5 rounded-md text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5 transition-colors ${
                  active ? "text-white" : "text-white/40 hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-2 right-2 -bottom-0.5 h-0.5 bg-[#FF4655] rounded"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex-1 max-w-sm">
          <GlobalSearch size="compact" />
        </div>

        {rightSlot}

        {user && (
          <div className="hidden lg:flex items-center gap-3 pl-4 border-l border-white/10">
            <div className="text-right">
              <p className="text-xs text-white font-semibold leading-tight">
                {user.name}
                <span className="text-white/40 font-normal">#{user.tag}</span>
              </p>
              <p className="text-[9px] text-white/30 uppercase tracking-widest">
                Connecté
              </p>
            </div>
            <form action={signOutAction}>
              <button
                type="submit"
                aria-label="Se déconnecter"
                className="p-2 rounded-md text-white/40 hover:text-[#FF4655] hover:bg-white/5 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </motion.header>
  );
}
