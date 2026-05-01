import type { Task } from "../state/types";
import { TaskItem } from "./TaskItem";

export function ParallelGroup({ tasks }: { tasks: Task[] }) {
  return (
    <div className="relative border-l-2 border-blue-400 pl-5 space-y-4">
      <span className="absolute -left-2 top-0 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">
        Parallel
      </span>

      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
