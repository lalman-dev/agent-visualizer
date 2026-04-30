import type { RunState } from "../state/types";

interface Props {
  state: RunState;
}

export function RunHeader({ state }: Props) {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Agent Run</h2>

        <span
          className={`text-sm px-2 py-1 rounded ${
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

      <p className="mt-2 text-sm text-gray-600">
        {state.query || "No active query"}
      </p>
    </div>
  );
}
