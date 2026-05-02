import type { Task } from "../state/types";
import { TaskItem } from "./TaskItem";

interface Props {
  tasks: Task[];
  interrupted?: boolean;
}

export function ParallelGroup({ tasks, interrupted = false }: Props) {
  return (
    <div className="relative">
      {/* parallel label */}
      <div className="flex items-center gap-2 mb-2 px-1">
        <div className="flex gap-0.5">
          <span className="w-0.5 h-3 rounded-full bg-blue-500" />
          <span className="w-0.5 h-3 rounded-full bg-blue-400 opacity-70" />
          <span className="w-0.5 h-3 rounded-full bg-blue-300 opacity-40" />
        </div>
        <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase">
          Parallel · {tasks.length} agents
        </span>
      </div>

      {/* left rail */}
      <div className="relative pl-4 border-l border-blue-500/30 space-y-2">
        {tasks.map((task) => {
          const isInterrupted =
            interrupted &&
            task.status !== "complete" &&
            task.status !== "cancelled";

          return (
            <TaskItem key={task.id} task={task} interrupted={isInterrupted} />
          );
        })}
      </div>
    </div>
  );
}
