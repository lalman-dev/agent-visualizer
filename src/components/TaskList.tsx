import type { RunState } from "../state/types";
import { TaskItem } from "./TaskItem";

export function TaskList({ state }: { state: RunState }) {
  return (
    <div className="space-y-3 mt-4">
      {state.taskOrder.map((taskId) => {
        const task = state.tasks[taskId];

        return <TaskItem key={task.id} task={task} />;
      })}
    </div>
  );
}
