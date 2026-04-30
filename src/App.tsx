import { useAgentRun } from "./state/useAgentRun";
import { runSuccessEvents } from "./mock/fixtures/runSuccess";

function App() {
  const state = useAgentRun(runSuccessEvents);

  console.log("STATE UPDATE:", state);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Agent Run Debug Panel</h1>

      <div className="text-sm space-y-2">
        <div>
          <strong>Status:</strong> {state.status}
        </div>

        <div>
          <strong>Query:</strong> {state.query}
        </div>

        <div>
          <strong>Tasks:</strong> {Object.keys(state.tasks).length}
        </div>

        <div>
          <strong>Thoughts:</strong> {state.agentThoughts.length}
        </div>

        {state.finalOutput && (
          <div className="mt-4 p-3 border rounded bg-green-50">
            <strong>Final Output:</strong>
            <p>{state.finalOutput.summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
