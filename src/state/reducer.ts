import type { RunState, Task } from "../utils/types";

export const initialState: RunState = {
  id: null,
  query: "",
  status: "idle",
  startTime: null,
  tasks: {},
  taskOrder: [],
};

export function reducer(state: RunState, event: any): RunState {
  switch (event.type) {
    case "run_started":
      return {
        ...state,
        id: event.run_id,
        query: event.query,
        status: "running",
        startTime: event.timestamp,
      };

    case "task_spawned": {
      const newTask: Task = {
        id: event.task_id,
        label: event.label,
        agent: event.agent,
        status: "running",
        toolCalls: [],
        outputs: [],
        dependencies: event.depends_on,
        parallelGroup: event.parallel_group,
        retries: 0,
      };

      return {
        ...state,
        tasks: {
          ...state.tasks,
          [event.task_id]: newTask,
        },
        taskOrder: [...state.taskOrder, event.task_id],
      };
    }

    case "tool_call": {
      const task = state.tasks[event.task_id];
      if (!task) return state;

      return {
        ...state,
        tasks: {
          ...state.tasks,
          [event.task_id]: {
            ...task,
            toolCalls: [
              ...task.toolCalls,
              {
                tool: event.tool,
                input: event.input_summary,
              },
            ],
          },
        },
      };
    }

    case "tool_result": {
      const task = state.tasks[event.task_id];
      if (!task) return state;

      const updatedCalls = [...task.toolCalls];
      const last = updatedCalls[updatedCalls.length - 1];

      if (last) {
        last.output = event.output_summary;
      }

      return {
        ...state,
        tasks: {
          ...state.tasks,
          [event.task_id]: {
            ...task,
            toolCalls: updatedCalls,
          },
        },
      };
    }

    case "partial_output": {
      const task = state.tasks[event.task_id];
      if (!task) return state;

      return {
        ...state,
        tasks: {
          ...state.tasks,
          [event.task_id]: {
            ...task,
            outputs: [
              ...task.outputs,
              {
                content: event.content,
                isFinal: event.is_final,
                qualityScore: event.quality_score,
              },
            ],
          },
        },
      };
    }

    case "task_update": {
      const task = state.tasks[event.task_id];
      if (!task) return state;

      const isRetry = event.status === "running" && task.status === "failed";

      return {
        ...state,
        tasks: {
          ...state.tasks,
          [event.task_id]: {
            ...task,
            status: event.status,
            retries: isRetry ? task.retries + 1 : task.retries,
          },
        },
      };
    }

    case "run_complete":
      return {
        ...state,
        status: "complete",
        finalOutput: event.output,
      };

    case "run_error":
      return {
        ...state,
        status: "failed",
      };

    default:
      return state;
  }
}
