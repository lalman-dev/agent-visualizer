import type { Event } from "../../state/types";

export const runErrorEvents: readonly Event[] = [
  {
    type: "run_started",
    run_id: "r_002",
    query: "Analyse Tesla margins vs peers",
    timestamp: 1700000000000,
  },

  {
    type: "task_spawned",
    task_id: "t_001",
    label: "Fetch Tesla filings",
    agent: "filing_fetcher",
    depends_on: [],
    parallel_group: null,
    spawned_by: "coordinator",
    timestamp: 1700000001000,
  },

  {
    type: "task_spawned",
    task_id: "t_002",
    label: "Fetch peer data",
    agent: "peer_fetcher",
    depends_on: [],
    parallel_group: "g_1",
    spawned_by: "coordinator",
    timestamp: 1700000002000,
  },

  {
    type: "task_update",
    task_id: "t_001",
    status: "complete",
    timestamp: 1700000003000,
  },

  {
    type: "run_error",
    run_id: "r_002",
    message: "Coordinator failed mid-run",
    timestamp: 1700000004000,
  },
];
