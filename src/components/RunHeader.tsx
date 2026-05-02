import { useEffect, useState } from "react";
import type { RunState } from "../state/types";

interface Props {
  state: RunState;
  progress: number;
  total: number;
  done: number;
}

export function RunHeader({ state }: Props) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!state.startTime || state.status !== "running") return;
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - state.startTime!) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [state.startTime, state.status]);

  useEffect(() => {
    if (state.startTime && state.status !== "running") {
      setElapsed(Math.floor((Date.now() - state.startTime) / 1000));
    }
  }, [state.status]);

  const statusConfig = {
    idle: { label: "IDLE", cls: "text-zinc-500 border-zinc-700" },
    running: {
      label: "LIVE",
      cls: "text-amber-400 border-amber-500 animate-pulse",
    },
    complete: { label: "COMPLETE", cls: "text-emerald-400 border-emerald-600" },
    failed: { label: "FAILED", cls: "text-red-400 border-red-600" },
  };

  const { label, cls } = statusConfig[state.status] ?? statusConfig.idle;

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-1">
            Research Query
          </p>
          <h2 className="text-base font-semibold text-zinc-100 leading-snug truncate">
            {state.query || "—"}
          </h2>
          {state.startTime && (
            <p className="text-xs text-zinc-600 font-mono mt-2">
              {state.status === "running"
                ? `${elapsed}s elapsed`
                : `completed in ${elapsed}s`}
            </p>
          )}
        </div>

        <span
          className={`shrink-0 text-[10px] font-mono tracking-widest px-2.5 py-1 rounded border ${cls}`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
