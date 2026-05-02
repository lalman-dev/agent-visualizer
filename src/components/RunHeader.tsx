import { useEffect, useState } from "react";
import type { RunState } from "../state/types";

interface Props {
  state: RunState;
  progress: number;
  total: number;
  done: number;
}

export function RunHeader({ state, progress, total, done }: Props) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!state.startTime || state.status !== "running") return;
    setElapsed(Math.floor((Date.now() - state.startTime) / 1000));
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

  const elapsedLabel =
    state.status === "running"
      ? `${elapsed}s elapsed`
      : state.status === "failed"
        ? `stopped at ${elapsed}s`
        : `finished in ${elapsed}s`;

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-1">
              Research Query
            </p>
            <h2 className="text-base font-semibold text-zinc-100 leading-snug">
              {state.query || "—"}
            </h2>

            {state.startTime && (
              <p className="text-xs text-zinc-600 font-mono mt-2">
                {elapsedLabel}
                {total > 0 && (
                  <span className="ml-3 text-zinc-700">
                    {done}/{total} tasks
                  </span>
                )}
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

      {/* PROGRESS BAR */}
      {total > 0 && (
        <div className="h-0.5 bg-zinc-800">
          <div
            className={`h-full transition-all duration-700 ease-out ${
              state.status === "failed"
                ? "bg-red-500"
                : state.status === "complete"
                  ? "bg-emerald-500"
                  : "bg-amber-500"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
