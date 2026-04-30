export type RunStatus = "idle" | "running" | "complete" | "failed";

export type TaskStatus =
  | "idle"
  | "running"
  | "complete"
  | "failed"
  | "cancelled";

export interface ToolCall {
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
}

export interface RunState {
  id: string | null;
  query: string;

  status: RunStatus;
  startTime: number | null;

  tasks: Record<string, Task>;
  taskOrder: string[];

  finalOutput?: {
    summary: string;
    citations: any[];
  };
}
