import Image from "next/image";
import type { AgentStat } from "@/lib/satchel/types";

export default function TopAgents({ agents }: { agents: AgentStat[] }) {
  if (agents.length === 0) return null;
  return (
    <div className="bg-[#12151e] rounded-xl overflow-hidden">
      <div className="px-4 py-2 border-b border-white/5 grid grid-cols-5 text-[10px] uppercase tracking-widest text-white/30">
        <span className="col-span-2">Agent</span>
        <span className="text-right">Matchs</span>
        <span className="text-right">Winrate</span>
        <span className="text-right">K/D</span>
      </div>
      {agents.map((a) => (
        <div
          key={a.agent}
          className="px-4 py-3 grid grid-cols-5 items-center border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
        >
          <div className="col-span-2 flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white/5 flex-shrink-0">
              {a.agentImage ? (
                <Image src={a.agentImage} alt={a.agent} fill className="object-cover" sizes="32px" />
              ) : null}
            </div>
            <span className="text-sm text-white font-medium">{a.agent}</span>
          </div>
          <span className="text-right text-sm text-white/60">{a.matches}</span>
          <span
            className={`text-right text-sm font-bold ${
              a.winrate >= 50 ? "text-green-400" : "text-red-400"
            }`}
          >
            {a.winrate}%
          </span>
          <span
            className={`text-right text-sm font-bold ${
              a.kd >= 1 ? "text-[#FF4655]" : "text-white/40"
            }`}
          >
            {a.kd.toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  );
}
