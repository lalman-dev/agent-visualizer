import type { Event } from "../../state/types";

const START = Date.now();

export const runSuccessEvents: readonly Event[] = [
  {
    type: "run_started",
    run_id: "r_001",
    query: "Analyse Apple R&D intensity vs large-cap peers",
    timestamp: START,
  },

  {
    type: "agent_thought",
    task_id: null,
    thought: "Initializing agent workflow...",
    timestamp: START + 500,
  },

  // MAIN TASK
  {
    type: "task_spawned",
    task_id: "t_001",
    label: "Fetch Apple 10-K filings",
    agent: "filing_fetcher",
    depends_on: [],
    parallel_group: null,
    spawned_by: "coordinator",
    timestamp: START + 1000,
  },

  {
    type: "tool_call",
    task_id: "t_001",
    tool: "sec_edgar_search",
    input_summary: "AAPL filings",
    timestamp: START + 2000,
  },

  {
    type: "tool_result",
    task_id: "t_001",
    tool: "sec_edgar_search",
    output_summary: "5 filings found",
    timestamp: START + 3000,
  },

  {
    type: "partial_output",
    task_id: "t_001",
    content: "Apple R&D grew from $16B → $29B",
    is_final: false,
    quality_score: null,
    timestamp: START + 4000,
  },

  {
    type: "task_update",
    task_id: "t_001",
    status: "complete",
    timestamp: START + 5000,
  },

  // PARALLEL TASKS
  {
    type: "task_spawned",
    task_id: "t_002",
    label: "Fetch Microsoft filings",
    agent: "peer_fetcher",
    depends_on: [],
    parallel_group: "g_1",
    spawned_by: "coordinator",
    timestamp: START + 6000,
  },

  {
    type: "task_spawned",
    task_id: "t_003",
    label: "Fetch Google filings",
    agent: "peer_fetcher",
    depends_on: [],
    parallel_group: "g_1",
    spawned_by: "coordinator",
    timestamp: START + 7000,
  },

  {
    type: "task_spawned",
    task_id: "t_004",
    label: "Fetch Meta filings",
    agent: "peer_fetcher",
    depends_on: [],
    parallel_group: "g_1",
    spawned_by: "coordinator",
    timestamp: START + 8000,
  },

  // INTERLEAVED EXECUTION
  {
    type: "tool_call",
    task_id: "t_002",
    tool: "sec_edgar_search",
    input_summary: "MSFT filings",
    timestamp: START + 9000,
  },

  {
    type: "tool_call",
    task_id: "t_003",
    tool: "sec_edgar_search",
    input_summary: "GOOG filings",
    timestamp: START + 10000,
  },

  {
    type: "tool_result",
    task_id: "t_002",
    tool: "sec_edgar_search",
    output_summary: "MSFT filings fetched",
    timestamp: START + 11000,
  },

  {
    type: "partial_output",
    task_id: "t_002",
    content: "Microsoft R&D steady ~13%",
    is_final: true,
    quality_score: 0.9,
    timestamp: START + 12000,
  },

  {
    type: "task_update",
    task_id: "t_002",
    status: "complete",
    timestamp: START + 13000,
  },

  // FAILURE + RETRY + CANCEL
  {
    type: "task_update",
    task_id: "t_004",
    status: "failed",
    error: "Rate limit hit",
    timestamp: START + 14000,
  },

  {
    type: "task_update",
    task_id: "t_004",
    status: "running",
    message: "Retrying...",
    timestamp: START + 15000,
  },

  {
    type: "task_update",
    task_id: "t_004",
    status: "cancelled",
    reason: "sufficient_data",
    message: "Enough peer data collected",
    timestamp: START + 16000,
  },

  {
    type: "partial_output",
    task_id: "t_003",
    content: "Google R&D ~15%",
    is_final: true,
    quality_score: 0.92,
    timestamp: START + 17000,
  },

  {
    type: "task_update",
    task_id: "t_003",
    status: "complete",
    timestamp: START + 18000,
  },

  // SYNTHESIS
  {
    type: "task_spawned",
    task_id: "t_005",
    label: "Synthesize analysis",
    agent: "coordinator",
    depends_on: ["t_001", "t_002", "t_003"],
    parallel_group: null,
    spawned_by: "coordinator",
    timestamp: START + 19000,
  },

  {
    type: "agent_thought",
    task_id: "t_005",
    thought: "Combining Apple vs peers...",
    timestamp: START + 20000,
  },

  {
    type: "partial_output",
    task_id: "t_005",
    content: "Apple is increasing R&D intensity...",
    is_final: false,
    quality_score: null,
    timestamp: START + 21000,
  },

  {
    type: "partial_output",
    task_id: "t_005",
    content: "Final comparison ready",
    is_final: true,
    quality_score: 0.95,
    timestamp: START + 22000,
  },

  {
    type: "task_update",
    task_id: "t_005",
    status: "complete",
    timestamp: START + 23000,
  },

  // FINAL OUTPUT
  {
    type: "run_complete",
    run_id: "r_001",
    status: "complete",
    duration_ms: 23000,
    task_count: 5,
    output: {
      summary:
        "Apple increased R&D intensity vs peers, though still behind Google in % terms.",
      citations: [
        { ref_id: "c1", title: "Apple 10-K Filing", source: "SEC", page: 45 },
        {
          ref_id: "c2",
          title: "Google Annual Report",
          source: "SEC",
          page: 32,
        },
      ],
    },
    timestamp: START + 24000,
  },
];
