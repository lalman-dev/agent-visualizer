import { RunHeader } from "./components/RunHeader";
import { TaskList } from "./components/TaskList";
import { useAgentRun } from "./state/useAgentRun";
import { runSuccessEvents } from "./mock/fixtures/runSuccess";
import { runErrorEvents } from "./mock/fixtures/runError";
import { AgentThoughts } from "./components/AgentThoughts";
import { useState } from "react";

function RunPanel({ fixture }: { fixture: "success" | "error" }) {
  const events = fixture === "success" ? runSuccessEvents : runErrorEvents;
  const state = useAgentRun(events);

  const total = state.taskOrder.length;
  const done = Object.values(state.tasks).filter(
    (t) => t.status === "complete" || t.status === "cancelled",
  ).length;
  const progress = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <>
      <RunHeader state={state} progress={progress} total={total} done={done} />
      <TaskList state={state} />

      {/* FINAL OUTPUT */}
      {state.finalOutput && (
        <div className="rounded-xl border border-emerald-800/50 bg-emerald-950/20 overflow-hidden">
          <div className="px-4 py-3 border-b border-emerald-800/40 flex items-center gap-2">
            <span className="text-emerald-400 text-xs">✦</span>
            <p className="text-[10px] font-mono tracking-widest text-emerald-500 uppercase">
              Final Output
            </p>
          </div>
          <div className="px-4 py-4">
            <p className="text-sm text-zinc-200 leading-relaxed">
              {state.finalOutput.summary}
            </p>
            {state.finalOutput.citations?.length > 0 && (
              <div className="mt-4 pt-3 border-t border-zinc-800 space-y-1">
                <p className="text-[10px] font-mono tracking-widest text-zinc-600 uppercase mb-2">
                  Citations
                </p>
                {state.finalOutput.citations.map((c) => (
                  <p
                    key={c.ref_id}
                    className="text-[11px] font-mono text-zinc-500"
                  >
                    <span className="text-zinc-600">[{c.ref_id}]</span>{" "}
                    {c.title} —{" "}
                    <span className="text-zinc-600">
                      {c.source} p.{c.page}
                    </span>
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* RUN ERROR */}
      {state.status === "failed" && (
        <div className="rounded-xl border border-red-900/50 bg-red-950/20 overflow-hidden">
          <div className="px-4 py-3 border-b border-red-900/40 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <p className="text-[10px] font-mono tracking-widest text-red-500 uppercase">
              Run Failed
            </p>
          </div>
          <p className="px-4 py-3 text-xs text-red-400 leading-relaxed">
            Coordinator encountered an unrecoverable error. Partial results may
            be available above.
          </p>
        </div>
      )}

      <AgentThoughts thoughts={state.agentThoughts} />
    </>
  );
}

function App() {
  const [fixture, setFixture] = useState<"idle" | "success" | "error">("idle");

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* WORDMARK + SWITCHER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[10px] font-mono tracking-widest text-zinc-600 uppercase">
              JcurveIQ
            </p>
            <h1 className="text-sm font-semibold text-zinc-300 tracking-tight">
              Agent Run Panel
            </h1>
          </div>

          <div className="flex gap-1.5">
            {(["success", "error", "idle"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFixture(f)}
                className={`text-[11px] font-mono px-3 py-1.5 rounded border transition-colors ${
                  fixture === f
                    ? "bg-zinc-700 border-zinc-600 text-zinc-100"
                    : "bg-transparent border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                }`}
              >
                {f === "idle" ? "Reset" : f === "success" ? "Success" : "Error"}
              </button>
            ))}
          </div>
        </div>

        {/* IDLE STATE */}
        {fixture === "idle" && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-10 text-center">
            <p className="text-2xl mb-3">◎</p>
            <h2 className="text-sm font-semibold text-zinc-300 mb-1">
              No active run
            </h2>
            <p className="text-xs text-zinc-600">
              Select a scenario above to simulate an agent workflow
            </p>
          </div>
        )}

        {/* ACTIVE RUN */}
        {fixture !== "idle" && <RunPanel key={fixture} fixture={fixture} />}
      </div>
    </div>
  );
}

export default App;
