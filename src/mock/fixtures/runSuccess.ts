import type { Event } from "../../state/types";

export const runSuccessEvents: readonly Event[] = [
  {
    type: "run_started",
    run_id: "r_001",
    query: "Analyse Apple R&D intensity vs large-cap peers",
    timestamp: Date.now(),
  },

  {
    type: "agent_thought",
    task_id: "coordinator",
    thought: "Breaking into Apple + peer analysis tasks",
    timestamp: Date.now(),
  },

  // MAIN TASK
  {
    type: "task_spawned",
    task_id: "t_001",
    label: "Fetch Apple 10-K filings",
    agent: "filing_fetcher",
    depends_on: [],
    parallel_group: null,
    timestamp: Date.now(),
  },

  {
    type: "tool_call",
    task_id: "t_001",
    tool: "sec_edgar_search",
    input_summary: "AAPL filings",
    timestamp: Date.now(),
  },

  {
    type: "tool_result",
    task_id: "t_001",
    tool: "sec_edgar_search",
    output_summary: "5 filings found",
    timestamp: Date.now(),
  },

  {
    type: "partial_output",
    task_id: "t_001",
    content: "Apple R&D grew from $16B → $29B",
    is_final: false,
    quality_score: null,
    timestamp: Date.now(),
  },

  {
    type: "task_update",
    task_id: "t_001",
    status: "complete",
    timestamp: Date.now(),
  },

  // PARALLEL TASKS
  {
    type: "task_spawned",
    task_id: "t_002",
    label: "Fetch Microsoft filings",
    agent: "peer_fetcher",
    depends_on: [],
    parallel_group: "g_1",
    timestamp: Date.now(),
  },
  {
    type: "task_spawned",
    task_id: "t_003",
    label: "Fetch Google filings",
    agent: "peer_fetcher",
    depends_on: [],
    parallel_group: "g_1",
    timestamp: Date.now(),
  },
  {
    type: "task_spawned",
    task_id: "t_004",
    label: "Fetch Meta filings",
    agent: "peer_fetcher",
    depends_on: [],
    parallel_group: "g_1",
    timestamp: Date.now(),
  },

  // INTERLEAVED TOOL CALLS
  {
    type: "tool_call",
    task_id: "t_002",
    tool: "sec_edgar_search",
    input_summary: "MSFT filings",
    timestamp: Date.now(),
  },
  {
    type: "tool_call",
    task_id: "t_003",
    tool: "sec_edgar_search",
    input_summary: "GOOG filings",
    timestamp: Date.now(),
  },

  {
    type: "tool_result",
    task_id: "t_002",
    tool: "sec_edgar_search",
    output_summary: "MSFT filings fetched",
    timestamp: Date.now(),
  },

  {
    type: "partial_output",
    task_id: "t_002",
    content: "Microsoft R&D steady ~13%",
    is_final: true,
    quality_score: 0.9,
    timestamp: Date.now(),
  },

  {
    type: "task_update",
    task_id: "t_002",
    status: "complete",
    timestamp: Date.now(),
  },

  // FAILURE + RETRY
  {
    type: "task_update",
    task_id: "t_004",
    status: "failed",
    error: "Rate limit hit",
    timestamp: Date.now(),
  },

  {
    type: "task_update",
    task_id: "t_004",
    status: "running",
    message: "Retrying...",
    timestamp: Date.now(),
  },

  // CANCELLED
  {
    type: "task_update",
    task_id: "t_004",
    status: "cancelled",
    reason: "sufficient_data",
    message: "Enough peer data collected",
    timestamp: Date.now(),
  },

  {
    type: "partial_output",
    task_id: "t_003",
    content: "Google R&D ~15%",
    is_final: true,
    quality_score: 0.92,
    timestamp: Date.now(),
  },

  {
    type: "task_update",
    task_id: "t_003",
    status: "complete",
    timestamp: Date.now(),
  },

  // SYNTHESIS TASK
  {
    type: "task_spawned",
    task_id: "t_005",
    label: "Synthesize analysis",
    agent: "coordinator",
    depends_on: ["t_001", "t_002", "t_003"],
    parallel_group: null,
    timestamp: Date.now(),
  },

  {
    type: "agent_thought",
    task_id: "t_005",
    thought: "Combining Apple vs peers...",
    timestamp: Date.now(),
  },

  {
    type: "partial_output",
    task_id: "t_005",
    content: "Apple is increasing R&D intensity...",
    is_final: false,
    quality_score: null,
    timestamp: Date.now(),
  },

  {
    type: "partial_output",
    task_id: "t_005",
    content: "Final comparison ready",
    is_final: true,
    quality_score: 0.95,
    timestamp: Date.now(),
  },

  {
    type: "task_update",
    task_id: "t_005",
    status: "complete",
    timestamp: Date.now(),
  },

  // FINAL OUTPUT
  {
    type: "run_complete",
    run_id: "r_001",
    status: "complete",
    duration_ms: 21000,
    task_count: 5,
    output: {
      summary:
        "Apple increased R&D intensity vs peers, though still behind Google in % terms.",
      citations: [],
    },
    timestamp: Date.now(),
  },
];
