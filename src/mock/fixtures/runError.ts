import type { Event } from "../../state/types";

const START = Date.now();

export const runErrorEvents: readonly Event[] = [
  {
    type: "run_started",
    run_id: "r_002",
    query: "Analyse Tesla margins vs peers",
    timestamp: START,
  },

  {
    type: "task_spawned",
    task_id: "t_001",
    label: "Fetch Tesla filings",
    agent: "filing_fetcher",
    depends_on: [],
    parallel_group: null,
    spawned_by: "coordinator",
    timestamp: START + 1000,
  },

  {
    type: "task_spawned",
    task_id: "t_002",
    label: "Fetch peer data",
    agent: "peer_fetcher",
    depends_on: [],
    parallel_group: "g_1",
    spawned_by: "coordinator",
    timestamp: START + 2000,
  },

  {
    type: "task_spawned",
    task_id: "t_003",
    label: "Fetch BMW filings",
    agent: "peer_fetcher",
    depends_on: [],
    parallel_group: "g_1",
    spawned_by: "coordinator",
    timestamp: START + 2500,
  },

  {
    type: "tool_call",
    task_id: "t_001",
    tool: "sec_edgar_search",
    input_summary: "TSLA filings",
    timestamp: START + 3000,
  },

  {
    type: "tool_result",
    task_id: "t_001",
    tool: "sec_edgar_search",
    output_summary: "4 filings found",
    timestamp: START + 4000,
  },

  {
    type: "task_update",
    task_id: "t_001",
    status: "complete",
    timestamp: START + 5000,
  },

  {
    type: "tool_call",
    task_id: "t_002",
    tool: "sec_edgar_search",
    input_summary: "Peer margin data",
    timestamp: START + 6000,
  },

  {
    type: "run_error",
    run_id: "r_002",
    message:
      "Coordinator encountered an unrecoverable error. Partial results may be available.",
    timestamp: START + 7000,
  },
];
