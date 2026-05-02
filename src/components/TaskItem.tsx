import { useEffect, useState } from "react";
import type { Task } from "../state/types";

const STATUS_CONFIG: Record<
  string,
  { dot: string; badge: string; label: string; border: string }
> = {
  running: {
    dot: "bg-amber-400 animate-pulse",
    badge: "text-amber-400 bg-amber-400/10 border-amber-500/30",
    label: "Running",
    border: "border-amber-500/20",
  },
  complete: {
    dot: "bg-emerald-400",
    badge: "text-emerald-400 bg-emerald-400/10 border-emerald-500/30",
    label: "Complete",
    border: "border-zinc-800",
  },
  failed: {
    dot: "bg-red-400",
    badge: "text-red-400 bg-red-400/10 border-red-500/30",
    label: "Failed",
    border: "border-red-900/40",
  },
  cancelled: {
    dot: "bg-zinc-500",
    badge: "text-zinc-400 bg-zinc-500/10 border-zinc-600/30",
    label: "Stopped early",
    border: "border-zinc-800",
  },
};

interface Props {
  task: Task;
  interrupted?: boolean;
}

export function TaskItem({ task, interrupted = false }: Props) {
  // Auto-expand while running, auto-collapse on complete
  const [open, setOpen] = useState(task.status === "running");

  useEffect(() => {
    if (task.status === "running") setOpen(true);
    if (task.status === "complete" || task.status === "cancelled")
      setOpen(false);
  }, [task.status]);

  const cfg = STATUS_CONFIG[task.status] ?? STATUS_CONFIG.running;

  return (
    <div
      className={`rounded-lg border bg-zinc-900 overflow-hidden transition-all duration-300 task-enter ${
        interrupted ? "opacity-40" : ""
      } ${cfg.border}`}
    >
      {/* HEADER */}
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-zinc-800/50 transition-colors"
        onClick={() => setOpen((p) => !p)}
      >
        {/* status dot */}
        <span className={`shrink-0 w-2 h-2 rounded-full ${cfg.dot}`} />

        {/* label + agent */}
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm font-medium truncate ${interrupted ? "text-zinc-500" : "text-zinc-200"}`}
          >
            {task.label}
          </p>
          <p className="text-[11px] text-zinc-500 font-mono">{task.agent}</p>
        </div>

        {/* retry badge */}
        {task.retries > 0 && (
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border text-amber-400 bg-amber-400/10 border-amber-500/30">
            ↺ {task.retries}
          </span>
        )}

        {/* interrupted badge */}
        {interrupted && (
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border text-zinc-500 bg-zinc-800 border-zinc-700">
            interrupted
          </span>
        )}

        {/* status badge */}
        {!interrupted && (
          <span
            className={`shrink-0 text-[10px] font-mono tracking-wide px-2 py-0.5 rounded border ${cfg.badge}`}
          >
            {cfg.label}
          </span>
        )}

        {/* chevron */}
        <span
          className={`text-zinc-600 text-xs transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </div>

      {/* EXPANDED DETAILS */}
      {open && (
        <div className="border-t border-zinc-800 px-4 py-3 space-y-3">
          {/* TOOL CALLS */}
          {task.toolCalls.length > 0 && (
            <div>
              <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-2">
                Tool Calls
              </p>
              <div className="space-y-1.5">
                {task.toolCalls.map((call) => (
                  <div
                    key={call.id}
                    className="rounded border border-zinc-800 bg-zinc-950 px-3 py-2"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono text-amber-400">
                        ⬡
                      </span>
                      <span className="text-[11px] font-mono text-zinc-300">
                        {call.tool}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 font-mono">
                      {call.input}
                    </p>
                    {call.output && (
                      <p className="text-[11px] text-emerald-400 font-mono mt-1.5 border-t border-zinc-800 pt-1.5">
                        {call.output}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* OUTPUTS */}
          {task.outputs.length > 0 && (
            <div>
              <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-2">
                Output
              </p>
              <div className="space-y-1">
                {task.outputs.map((o, i) => (
                  <p
                    key={i}
                    className={`text-[12px] leading-relaxed ${
                      o.isFinal
                        ? "text-zinc-200 font-medium"
                        : "text-zinc-500 italic"
                    }`}
                  >
                    {o.isFinal ? o.content : o.content + "…"}
                    {o.isFinal && o.qualityScore != null && (
                      <span className="ml-2 text-[10px] font-mono text-emerald-500">
                        ✓ {Math.round(o.qualityScore * 100)}%
                      </span>
                    )}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* ERROR */}
          {task.error && (
            <div className="rounded border border-red-900/50 bg-red-950/30 px-3 py-2">
              <p className="text-[11px] font-mono text-red-400">{task.error}</p>
            </div>
          )}

          {/* CANCELLED REASON */}
          {task.status === "cancelled" && task.message && (
            <div className="rounded border border-zinc-700/50 bg-zinc-800/30 px-3 py-2">
              <p className="text-[11px] font-mono text-zinc-400">
                ◎ {task.message}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
