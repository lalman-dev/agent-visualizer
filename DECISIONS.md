This document explains key design decisions made while building the Agent Run Panel, along with reasoning and the conditions under which I would reconsider each decision.

---

## 1. Agent Thoughts

**Decision**

Agent thoughts are displayed in a dedicated panel below the main execution timeline, not inline within individual tasks.

**Reasoning**

The primary user is a non-technical financial analyst who cares about _what the system found_, not _how it planned to find it_. Inline thoughts would fragment the task timeline and bury the execution signal under internal reasoning noise. A separate panel keeps the main flow clean while still making reasoning accessible for users who want it.

**What would cause me to reconsider**

If analysts in usability testing spent time scrolling past the task list looking for context on _why_ a specific task ran, that would signal thoughts need to be anchored closer to their source task. I'd add a collapsible "reasoning" row inside each TaskItem, shown only when the task has an associated thought.

---

## 2. Parallel Task Layout

**Decision**

Tasks sharing the same `parallel_group` are visually grouped inside a labeled container with a left border accent ("Parallel"), rendered vertically within the group.

**Reasoning**

A flat list of parallel tasks implies sequential execution — which is factually wrong and would mislead an analyst interpreting the run. Grouping them makes concurrency explicit without requiring a graph. The vertical layout within the group was chosen over a horizontal grid because the task cards contain variable-length content (tool calls, outputs) that would break in a fixed-width column layout.

**What would cause me to reconsider**

If parallel groups regularly contain more than 4–5 tasks, vertical stacking becomes harder to scan. A side-by-side column layout or a compact "N tasks running in parallel" summary row with expand-on-click would be worth exploring at that scale.

---

## 3. Partial Outputs

**Decision**

Intermediate outputs (`is_final: false`) are rendered inline within each task as they arrive, visually distinguished from final outputs with a trailing `...` and muted text color. Final outputs are shown in full with emphasis.

**Reasoning**

Hiding intermediate outputs entirely would make tasks appear stalled during long-running operations, increasing analyst anxiety. Showing them progressively communicates that work is happening and gives analysts early signal on the direction of results. The `...` suffix was chosen over a streaming animation to avoid UI flickering on rapid re-renders.

**What would cause me to reconsider**

If tasks emit many intermediate outputs (5+), the task card becomes noisy. In that case I would collapse intermediates into a scrollable log, showing only the most recent partial and the final output at the top level.

---

## 4. Cancelled State

**Decision**

Cancelled tasks are displayed with a neutral grey badge and the label "Stopped early", with the `message` field rendered as supporting text (e.g. "Enough peer data collected").

**Reasoning**

Cancellation with `reason: "sufficient_data"` is not a failure — it is an intentional coordinator decision to proceed with available data. Styling it as an error (red, warning icon) would alarm analysts and undermine trust in the system. Neutral styling with an explanatory message frames it accurately: the system made a smart call, not a mistake.

**What would cause me to reconsider**

If analysts in testing consistently interpreted "Stopped early" as something going wrong — asking "why did it stop?" in a concerned way — I'd add a tooltip or inline callout that explicitly says "The coordinator had enough data from other tasks and stopped this one intentionally." The current message field from the event payload partially handles this, but a more prominent explanation may be needed.

---

## 5. Task Dependency Handling

**Decision**

Dependencies are not explicitly visualized. The UI renders tasks in the order they are received via the event stream, which naturally reflects the execution order implied by `depends_on`. A synthesis task that `depends_on` earlier tasks will always appear after them because it is spawned after them.

**Reasoning**

Drawing dependency arrows or a graph would add visual complexity that serves developers more than analysts. Since the event stream already encodes correct execution order, preserving arrival order in the UI implicitly respects dependencies without requiring the analyst to interpret a graph. The case where a dependency was cancelled (e.g. `t_004` not in `t_005`'s `depends_on`) is handled by the coordinator before the event reaches the UI — the frontend doesn't need to resolve it.

**What would cause me to reconsider**

If an analyst ever asked "why did this task start before that one?" during testing, that would signal the implicit ordering isn't legible enough. I would add a lightweight `depends on: t_001, t_002` annotation inside the task card header as a first step — no graph required.

---

## 6. Final Output Placement

**Decision**

The final output is rendered after the task list, visually emphasized with a distinct green bordered card, and includes citations when present.

**Reasoning**

Placing the output at the top would make it feel like a static summary that exists independently of the process. Since this UI is about watching a run _unfold_, the output should feel like a conclusion — earned at the end of a visible chain of work. This placement also mirrors how analysts naturally read: process first, result last. The green border and section heading ensure it still stands out clearly and doesn't get lost after a long task list.

**What would cause me to reconsider**

If analysts were observed scrolling past the final output or missing it entirely, I would either pin it in a sticky footer during the run or add a "Jump to result" anchor link in the RunHeader once the run completes.
