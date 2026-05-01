# AI Agent Execution Visualizer

A real-time frontend system for visualizing multi-agent AI workflows — including task orchestration, parallel execution, retries, and streaming outputs.

This project focuses on making complex AI execution processes **transparent, legible, and trustworthy** for end users.

---

## 🚀 Demo

> 👉 Add a short GIF or screen recording here (20–30 sec)

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

This ensures:

- Strong type safety across the event pipeline
- Clear contracts between the event stream and UI
- Easier debugging and future extensibility

---

### Mock Streaming Engine

A custom event emitter simulates real-time execution with:

- Variable delays for realistic pacing
- A pub-sub model for decoupled event handling
- Proper cleanup on component unmount

This mirrors how production WebSocket or SSE-based systems behave, making it straightforward to swap in a real backend.

---

### State Normalization

Tasks are stored in a normalized structure:

```ts
tasks: Record<string, Task>
taskOrder: string[]
```

This enables:

- Efficient O(1) task updates by ID
- Stable render order independent of arrival sequence
- Easy grouping for parallel task visualization

---

## 🖥️ UI Structure

RunHeader
↓
TaskList (timeline)
├── TaskItem
└── ParallelGroup
↓
Final Output
↓
Agent Thoughts

---

## 🎨 Key Design Decisions

**Final Output Placement**
Placed at the end of the timeline to preserve execution flow, making the result feel like a natural conclusion rather than an interruption.

**Parallel Task Representation**
Tasks sharing a `parallel_group` are grouped visually to prevent misleading sequential interpretation of work that happened concurrently.

**Cancelled State**
Displayed as a neutral "stopped early" state rather than an error, accurately reflecting intentional system behavior.

**Partial Outputs**
Rendered inline with progressive updates to provide continuous feedback throughout execution — no waiting for a final result.

**Agent Thoughts**
Surfaced in a dedicated panel to keep the main timeline clean while still exposing model reasoning for full transparency.

---

## ⚙️ Tech Stack

|               |                                      |
| ------------- | ------------------------------------ |
| **Framework** | React (Hooks, functional components) |
| **Language**  | TypeScript (strict mode)             |
| **Styling**   | Tailwind CSS — no UI libraries       |
| **Bundler**   | Vite                                 |

---

## 🧪 Running Locally

```bash
npm install
npm run dev
```

---

## 📂 Project Structure

```
src/
├── components/     # UI components (RunHeader, TaskItem, ParallelGroup, etc.)
├── state/          # Reducer, state types, and event definitions
├── mock/           # Streaming engine and simulated event sequences
└── utils/          # Helpers and shared logic
```

---

## 🔮 Future Improvements

- [ ] Dependency graph visualization
- [ ] WebSocket / SSE integration for real backends
- [ ] Improved streaming UX with smoother partial output transitions
- [ ] Collapsible logs for large or long-running executions

---

## 📌 What This Project Demonstrates

- Event-driven frontend architecture at a non-trivial scale
- Complex async state modeling with a reducer-based state machine
- Real-time UI rendering with predictable, traceable updates
- Product-level UX thinking — clarity, hierarchy, and user trust
- Ability to reason about and implement systems with genuine complexity

---

## 👤 Author

**Lalman** — Frontend Developer (React, Next.js, TypeScript)
