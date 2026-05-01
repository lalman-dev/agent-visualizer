This document explains key design decisions made while building the Agent Run Panel, along with trade-offs and potential future improvements.

---

## 1. Agent Thoughts

**Decision**

Agent thoughts are displayed in a separate panel below the main execution timeline instead of inline within each task.

**Reasoning**

The primary user is a non-technical analyst who cares more about *what happened* than *how the system reasoned internally*. Displaying thoughts inline with tasks would introduce noise and reduce clarity of the main execution flow.

By isolating them in a separate panel, the UI maintains clarity while still offering transparency for users who want deeper insight.

**Future Consideration**

If user feedback indicates that reasoning is critical for trust, I would:
- make thoughts toggleable per task
- or attach relevant thoughts directly to specific tasks

---

## 2. Parallel Task Layout

**Decision**

Tasks with the same `parallel_group` are grouped visually under a labeled container ("Parallel Tasks").

**Reasoning**

Rendering these tasks as a flat list would incorrectly imply sequential execution. Grouping them makes concurrency explicit and improves mental mapping of how the system operates.

The vertical grouped layout was chosen for simplicity and readability over more complex visualizations (e.g., graphs or grids).

**Future Consideration**

For larger parallel groups, I would explore:
- horizontal layouts
- or grid-based representations for better scalability

---

## 3. Partial Outputs

**Decision**

Partial outputs are rendered inline within each task as they arrive, with a subtle distinction between intermediate and final outputs.

**Reasoning**

Showing intermediate outputs improves transparency and helps users understand progress in real time. It also builds trust in the system by exposing how results are formed.

A simpler progressive indicator (`...`) was used instead of full streaming animation to ensure stability and avoid UI flickering caused by frequent re-renders.

**Future Consideration**

If outputs become verbose:
- collapse intermediate outputs into a log view
- or allow users to toggle visibility

---

## 4. Cancelled State

**Decision**

Cancelled tasks are displayed as a neutral state ("Stopped early") instead of an error.

**Reasoning**

Cancellation in this system represents an intentional decision by the coordinator (e.g., sufficient data already available), not a failure. Treating it as an error would mislead users and reduce trust.

The UI uses muted styling and explanatory text to clearly differentiate this state from failure.

**Future Consideration**

If users still misinterpret this state:
- add tooltips or icons
- or provide more contextual explanation

---

## 5. Task Dependency Handling

**Decision**

Dependencies are not explicitly visualized, but the task order and grouping ensure the UI does not contradict execution flow.

**Reasoning**

Displaying a full dependency graph would add complexity and overwhelm the primary user. Instead, maintaining a consistent execution order preserves clarity while still respecting dependencies implicitly.

**Future Consideration**

If deeper inspection is required:
- introduce an optional dependency view
- or add lightweight indicators for dependent tasks

---

## 6. Final Output Placement

**Decision**

The final output is placed at the end of the task timeline and visually emphasized.

**Reasoning**

Placing the output at the top initially improved visibility but disrupted the narrative flow of execution. Since this UI represents a process unfolding over time, placing the result at the end makes it feel like a natural conclusion.

Visual emphasis ensures the result still stands out as the most important element.

**Future Consideration**

If users prioritize results over process:
- move the output to the top
- or provide a summary view with collapsible execution details

---