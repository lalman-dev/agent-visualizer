import type { RunState } from "../state/types";

export function TaskList({ state }: { state: RunState }) {
  return (
    <div className="space-y-3 mt-4">
      {state.taskOrder.map((taskId) => {
        const task = state.tasks[taskId];

        return (
          <div key={task.id} className="p-3 border rounded-lg bg-gray-50">
            <div className="flex justify-between">
              <span className="font-medium">{task.label}</span>
              <span className="text-sm text-gray-500">{task.status}</span>
            </div>

            <div className="text-xs text-gray-400">Agent: {task.agent}</div>
          </div>
        );
      })}
    </div>
  );
}
