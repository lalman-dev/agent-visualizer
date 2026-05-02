# AI Agent Execution Visualizer

A real-time frontend system for visualizing multi-agent AI workflows — including task orchestration, parallel execution, retries, and streaming outputs.

This project focuses on making complex AI execution processes **transparent, legible, and trustworthy** for end users.

---

## 🚀 Demo

👉 <img width="800" height="500" alt="agentrun-visualizer" src="https://github.com/user-attachments/assets/ea32478f-b907-428e-97c9-5c3cbfca038f" />

[Live link][https://agent-visualizer.vercel.app/](https://agent-visualizer.vercel.app/)



---

## 🧠 Problem

Modern AI systems are no longer simple request–response flows. They involve:

- Multiple agents working in coordination
- Task decomposition and dependency management
- Parallel execution across agents
- Tool calls and intermediate results
- Retries, failures, and cancellations

Most interfaces hide all of this behind a loading spinner.

This project solves that by making the **entire execution process visible and understandable**.

---

## ✨ Features

- ⚡ **Real-time event-driven UI** — state updates as execution unfolds
- 🧩 **Full task lifecycle handling** — `running → failed → retry → cancelled → complete`
- 🔀 **Parallel task visualization** — grouped execution with clear visual hierarchy
- 📡 **Progressive outputs** — partial results stream in before the final answer
- 🔁 **Failure and retry handling** — retries are surfaced, not hidden
- ⚠️ **Intentional cancellation UX** — cancelled tasks are treated as decisions, not errors
- 🧠 **Agent thoughts panel** — surfaces model reasoning for transparency
- 🎯 **Clear information hierarchy** — final output is always prominently emphasized

---

## 🧪 Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔀 Switching Between Fixtures

Use the scenario buttons at the top of the UI to switch between runs:

| Button          | Description                                                                                                                               |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Success Run** | Full happy-path scenario — sequential task, parallel peer fetches, failure + retry + cancellation, synthesis, final output with citations |
| **Error Run**   | Partial run that ends in `run_error` — one task complete, one in flight, one never started                                                |
| **Reset**       | Returns to the idle state                                                                                                                 |

No code changes needed — fixtures are swapped in the UI at runtime.

---

## 🏗️ Architecture

### Event-Driven State System

The application is built around a reducer-based state machine:

Event Stream → Reducer → Normalized State → UI

Each incoming event incrementally updates the system state, ensuring predictable and traceable UI behavior.

---

### Typed Event Model

All events are defined using a strict TypeScript union type:

```ts
type AgentEvent =
  | RunStartedEvent
  | TaskSpawnedEvent
  | ToolCallEvent
  | TaskUpdateEvent
  | PartialOutputEvent
  | RunCompletedEvent;
```

This ensures strong type safety across the event pipeline, clear contracts between the stream and UI, and easier debugging and extensibility.

---

### Mock Streaming Engine

A custom `MockEventEmitter` class simulates real-time execution with variable delays (`index * 800 + random jitter`), a pub-sub model for decoupled event handling, and proper cleanup on component unmount. This mirrors how a production WebSocket or SSE backend would behave — swapping in a real transport requires only replacing the emitter.

---

### State Normalization

Tasks are stored in a normalized structure:

```ts
tasks: Record<string, Task>
taskOrder: string[]
```

This enables O(1) task updates by ID, stable render order regardless of event arrival sequence, and efficient grouping for parallel task visualization.

---

## 🖥️ UI Structure

```
RunHeader          — query, run status badge, elapsed time
↓
TaskList           — ordered timeline of tasks
├── TaskItem     — label, agent, status, tool calls, outputs, retry info
└── ParallelGroup — grouped tasks sharing a parallel_group, with left-border accent
↓
Final Output       — emphasized result card with summary and citations
↓
Agent Thoughts     — separate panel for coordinator and task-level reasoning
```

---

## 🎨 Key Design Decisions

See [DECISIONS.md](./DECISIONS.md) for full reasoning on each decision. Summary:

**Agent Thoughts** — shown in a separate panel below the timeline, not inline, to keep the execution flow clean for non-technical analysts.

**Parallel Task Layout** — tasks with the same `parallel_group` are grouped in a labeled container with a left border accent to make concurrency visually explicit.

**Partial Outputs** — rendered inline as they arrive, with `...` suffix on intermediates and emphasis on final outputs, so analysts can see work progressing without waiting.

**Cancelled State** — displayed as neutral grey with "Stopped early" label, not as an error, because cancellation is an intentional coordinator decision.

**Task Dependencies** — not explicitly visualized; event arrival order naturally preserves execution order, which is sufficient for the analyst user.

---

## ⚙️ Tech Stack

|               |                                      |
| ------------- | ------------------------------------ |
| **Framework** | React (Hooks, functional components) |
| **Language**  | TypeScript (strict mode)             |
| **Styling**   | Tailwind CSS — no UI libraries       |
| **Bundler**   | Vite                                 |

---

## 📂 Project Structure

```
/
├── src/
│   ├── components/     # RunHeader, TaskItem, TaskList, ParallelGroup, AgentThoughts
│   ├── state/          # types.ts, reducer.ts, useAgentRun.ts
│   ├── mock/
│   │   ├── eventEmitter.ts        # MockEventEmitter with variable timing
│   │   └── fixtures/
│   │       ├── runSuccess.ts      # Full happy-path fixture
│   │       └── runError.ts        # Partial run ending in run_error
│   └── utils/
│       └── groupTasks.ts          # Groups parallel tasks for rendering
├── DECISIONS.md
└── README.md
```

---

## 🔮 Known Gaps & Future Improvements

- [ ] **No screen recording in demo** — GIF placeholder above should be replaced before final submission
- [ ] **Dependency graph** — `depends_on` is modeled in state but not visualized; a lightweight indicator inside the task card would help
- [ ] **WebSocket / SSE integration** — the `MockEventEmitter` interface is designed to be swappable; a real transport would require minimal changes
- [ ] **Collapsible logs** — tasks with many intermediate outputs could benefit from a collapsed log view
- [ ] **Error fixture depth** — the error fixture covers the required scenario but could include more in-flight task variety

---

## 📌 What This Project Demonstrates

- Event-driven frontend architecture built around a reducer state machine
- Complex async state modeling — retry sequences, cancellation, partial outputs, parallel grouping
- Real-time UI rendering with predictable, traceable updates
- Product-level UX thinking for a non-technical analyst audience
- Clean separation between mock transport and application state

---

## 👤 Author

**Lalman** — Frontend Developer (React, Next.js, TypeScript)
