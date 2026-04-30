import type { Task } from "../state/types";
import { TaskItem } from "./TaskItem";

export function ParallelGroup({ tasks }: { tasks: Task[] }) {
  return (
    <div className="border-l-4 border-blue-400 pl-4 space-y-3">
      <p className="text-xs text-blue-600 font-semibold">
        Parallel Tasks ({tasks.length})
      </p>

      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
