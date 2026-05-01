import type { AgentThought } from "../state/types";

export function AgentThoughts({ thoughts }: { thoughts: AgentThought[] }) {
  if (thoughts.length === 0) return null;

  return (
    <div className="p-3 border rounded-xl bg-yellow-50">
      <p className="text-xs font-semibold text-yellow-700 mb-2">
        Agent Thoughts
      </p>

      {thoughts.map((t, i) => (
        <p key={i} className="text-xs text-gray-600">
          💭 {t.thought}
        </p>
      ))}
    </div>
  );
}
