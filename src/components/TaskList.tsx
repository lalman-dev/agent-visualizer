import type { RunState } from "../state/types";
import { TaskItem } from "./TaskItem";
import { groupTasks } from "../utils/groupTasks";
import { ParallelGroup } from "./ParallelGroup";

export function TaskList({ state }: { state: RunState }) {
  const grouped = groupTasks(state);

  return (
    <div className="space-y-4 mt-4">
      {grouped.map((item, index) => {
        if (Array.isArray(item)) {
          const tasks = item.map((id) => state.tasks[id]);

          return <ParallelGroup key={index} tasks={tasks} />;
        }

        const task = state.tasks[item];
        return <TaskItem key={task.id} task={task} />;
      })}
    </div>
  );
}
