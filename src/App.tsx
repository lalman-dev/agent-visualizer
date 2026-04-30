import { RunHeader } from "./components/RunHeader";
import { TaskList } from "./components/TaskList";
import { useAgentRun } from "./state/useAgentRun";
import { runSuccessEvents } from "./mock/fixtures/runSuccess";
function App() {
  const state = useAgentRun(runSuccessEvents);
  console.log("STATE UPDATE:", state);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <RunHeader state={state} />
      <TaskList state={state} />

      {state.finalOutput && (
        <div className="p-4 border rounded bg-green-50">
          <h3 className="font-semibold mb-2">Final Output</h3>
          <p>{state.finalOutput.summary}</p>
        </div>
      )}
    </div>
  );
}

export default App;
