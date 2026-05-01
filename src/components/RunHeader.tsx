import type { RunState } from "../state/types";

interface Props {
  state: RunState;
}

export function RunHeader({ state }: Props) {
  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm">
  <div className="flex justify-between items-start">
    <div>
      <h2 className="text-lg font-semibold text-gray-900">
        Agent Run
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        {state.query}
      </p>

      {state.startTime && (
        <p className="text-xs text-gray-400 mt-1">
          {Math.floor((Date.now() - state.startTime) / 1000)}s elapsed
        </p>
      )}
    </div>

    <span
      className={`text-xs px-3 py-1 rounded-full font-medium ${
        state.status === "running"
          ? "bg-blue-100 text-blue-700"
          : state.status === "complete"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {state.status}
    </span>
  </div>
</div>
  );
}
