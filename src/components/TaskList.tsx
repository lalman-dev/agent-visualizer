import type { RunState } from "../state/types";
import { TaskItem } from "./TaskItem";
import { groupTasks } from "../utils/groupTasks";
import { ParallelGroup } from "./ParallelGroup";

export function TaskList({ state }: { state: RunState }) {
  const grouped = groupTasks(state);
  const interrupted = state.status === "failed";

  return (
    <div className="space-y-3">
      {grouped.map((item, index) => {
        if (Array.isArray(item)) {
          const tasks = item.map((id) => state.tasks[id]);
          return (
            <ParallelGroup
              key={index}
              tasks={tasks}
              interrupted={interrupted}
            />
          );
        }

        const task = state.tasks[item];
        const isInterrupted =
          interrupted &&
          task.status !== "complete" &&
          task.status !== "cancelled";

        return (
          <TaskItem key={task.id} task={task} interrupted={isInterrupted} />
        );
      })}
    </div>
  );
}
