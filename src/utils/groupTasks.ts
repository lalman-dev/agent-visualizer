import type { RunState } from "../state/types";

export function groupTasks(state: RunState) {
  const result: (string | string[])[] = [];

  let currentGroup: string[] = [];
  let currentGroupId: string | null = null;

  for (const taskId of state.taskOrder) {
    const task = state.tasks[taskId];

    if (task.parallelGroup) {
      if (task.parallelGroup === currentGroupId) {
        currentGroup.push(taskId);
      } else {
        if (currentGroup.length > 0) {
          result.push([...currentGroup]);
        }

        currentGroup = [taskId];
        currentGroupId = task.parallelGroup;
      }
    } else {
      if (currentGroup.length > 0) {
        result.push([...currentGroup]);
        currentGroup = [];
        currentGroupId = null;
      }

      result.push(taskId);
    }
  }

  if (currentGroup.length > 0) {
    result.push(currentGroup);
  }

  return result;
}
