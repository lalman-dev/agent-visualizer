import { RunHeader } from "./components/RunHeader";
import { TaskList } from "./components/TaskList";
import { useAgentRun } from "./state/useAgentRun";
import { runSuccessEvents } from "./mock/fixtures/runSuccess";
import { AgentThoughts } from "./components/AgentThoughts";

function App() {
  const state = useAgentRun(runSuccessEvents);
  console.log("STATE UPDATE:", state);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <RunHeader state={state} />
      <TaskList state={state} />

      {state.finalOutput && (
        <div className="p-5 border-2 border-green-400 rounded-lg bg-green-50 mt-6 shadow-sm">
          <h3 className="font-semibold text-green-700 mb-2">Final Output</h3>
          <p className="text-gray-800">{state.finalOutput.summary}</p>
        </div>
      )}
      <AgentThoughts thoughts={state.agentThoughts} />
    </div>
  );
}

export default App;
