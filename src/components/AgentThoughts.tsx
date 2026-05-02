import type { AgentThought } from "../state/types";

export function AgentThoughts({ thoughts }: { thoughts: AgentThought[] }) {
  if (thoughts.length === 0) return null;

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
      <div className="px-4 py-3 border-b border-zinc-800 flex items-center gap-2">
        <span className="text-amber-400 text-xs">◈</span>
        <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
          Agent Reasoning
        </p>
      </div>

      <div className="px-4 py-3 space-y-2">
        {thoughts.map((t, i) => (
          <div key={i} className="flex gap-3 items-start">
            <span className="text-zinc-700 font-mono text-[10px] mt-0.5 shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="text-[12px] text-zinc-400 leading-relaxed">
              {t.thought}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
