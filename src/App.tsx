import { RunHeader } from "./components/RunHeader";
import { TaskList } from "./components/TaskList";
import { useAgentRun } from "./state/useAgentRun";
import { runSuccessEvents } from "./mock/fixtures/runSuccess";
import { runErrorEvents } from "./mock/fixtures/runError";
import { AgentThoughts } from "./components/AgentThoughts";
import { useState } from "react";

function App() {
  const [fixture, setFixture] = useState<"idle" | "success" | "error">("idle");

  const events =
    fixture === "success"
      ? runSuccessEvents
      : fixture === "error"
        ? runErrorEvents
        : [];

  const state = useAgentRun(events);

  console.log("STATE UPDATE:", state);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* CONTROL PANEL */}
        <div className="flex gap-2">
          <button
            onClick={() => setFixture("success")}
            className="px-3 py-1 text-sm border rounded bg-white hover:bg-gray-100"
          >
            Success Run
          </button>

          <button
            onClick={() => setFixture("error")}
            className="px-3 py-1 text-sm border rounded bg-white hover:bg-gray-100"
          >
            Error Run
          </button>

          <button
            onClick={() => setFixture("idle")}
            className="px-3 py-1 text-sm border rounded bg-white hover:bg-gray-100"
          >
            Reset
          </button>
        </div>

        {/* IDLE STATE */}
        {fixture === "idle" && (
          <div className="bg-white border rounded-xl p-8 text-center shadow-sm">
            <h2 className="text-lg font-semibold text-gray-700">
              No active run
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Select a scenario to simulate an agent workflow
            </p>
          </div>
        )}

        {/* ACTIVE RUN */}
        {fixture !== "idle" && (
          <>
            <RunHeader state={state} />

            <TaskList state={state} />

            {state.finalOutput && (
              <div className="p-5 border-2 border-green-400 rounded-xl bg-green-50 shadow-sm">
                <h3 className="font-semibold text-green-700 mb-2">
                  Final Output
                </h3>

                <p className="text-gray-800">{state.finalOutput.summary}</p>

                {/* 📚 CITATIONS */}
                {state.finalOutput.citations?.length > 0 && (
                  <div className="mt-4 border-t pt-3 text-xs text-gray-600">
                    <p className="font-medium mb-1">Citations</p>

                    {state.finalOutput.citations.map((c) => (
                      <p key={c.ref_id}>
                        [{c.ref_id}] {c.title} — {c.source} (p. {c.page})
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}

            <AgentThoughts thoughts={state.agentThoughts} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
