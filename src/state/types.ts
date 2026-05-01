export type RunStatus = "idle" | "running" | "complete" | "failed";

export type TaskStatus =
  | "idle"
  | "running"
  | "complete"
  | "failed"
  | "cancelled";

// core models

export interface ToolCall {
  id: string;
  tool: string;
  input: string;
  output?: string;
}

export interface OutputChunk {
  content: string;
  isFinal: boolean;
  qualityScore?: number | null;
}

export interface Task {
  id: string;
  label: string;
  agent: string;

  status: TaskStatus;

  toolCalls: ToolCall[];
  outputs: OutputChunk[];

  dependencies: string[];
  parallelGroup: string | null;

  retries: number;

  error?: string | null;
  reason?: string | null;
  message?: string | null;
}

export interface AgentThought {
  taskId: string | null;
  thought: string;
  timestamp: number;
}

export interface RunState {
  id: string | null;
  query: string;

  status: RunStatus;
  startTime: number | null;

  tasks: Record<string, Task>;
  taskOrder: string[];

  agentThoughts: AgentThought[];

  finalOutput?: {
    summary: string;
    citations: any[];
  };
}

// Event types

export type Event =
  | RunStartedEvent
  | TaskSpawnedEvent
  | ToolCallEvent
  | ToolResultEvent
  | PartialOutputEvent
  | TaskUpdateEvent
  | AgentThoughtEvent
  | RunCompleteEvent
  | RunErrorEvent;

export interface RunStartedEvent {
  type: "run_started";
  run_id: string;
  query: string;
  timestamp: number;
}

export interface TaskSpawnedEvent {
  type: "task_spawned";
  task_id: string;
  label: string;
  agent: string;
  depends_on: string[];
  parallel_group: string | null;
  spawned_by: string;
  timestamp: number;
}

export interface ToolCallEvent {
  type: "tool_call";
  task_id: string;
  tool: string;
  input_summary: string;
  timestamp: number;
}

export interface ToolResultEvent {
  type: "tool_result";
  task_id: string;
  tool: string;
  output_summary: string;
  timestamp: number;
}

export interface PartialOutputEvent {
  type: "partial_output";
  task_id: string;
  content: string;
  is_final: boolean;
  quality_score: number | null;
  timestamp: number;
}

export interface TaskUpdateEvent {
  type: "task_update";
  task_id: string;
  status: TaskStatus;
  error?: string | null;
  reason?: string | null;
  message?: string | null;
  timestamp: number;
}

export interface AgentThoughtEvent {
  type: "agent_thought";
  task_id: string | null;
  thought: string;
  timestamp: number;
}

export interface RunCompleteEvent {
  type: "run_complete";
  run_id: string;
  status: "complete";
  duration_ms: number;
  task_count: number;
  output: {
    summary: string;
    citations: any[];
  };
  timestamp: number;
}

export interface RunErrorEvent {
  type: "run_error";
  run_id: string;
  message: string;
  timestamp: number;
}
