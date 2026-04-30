import { useState } from "react";
import type { Task } from "../state/types";

export function TaskItem({ task }: { task: Task }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-lg bg-gray-50 p-3">
      {/* HEADER */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div>
          <p className="font-medium">{task.label}</p>
          <p className="text-xs text-gray-400">Agent: {task.agent}</p>
        </div>

        <span
          className={`text-xs px-2 py-1 rounded ${
            task.status === "running"
              ? "bg-blue-100 text-blue-700"
              : task.status === "complete"
                ? "bg-green-100 text-green-700"
                : task.status === "failed"
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-200 text-gray-700"
          }`}
        >
          {task.status}
        </span>
      </div>

      {/* DETAILS */}
      {open && (
        <div className="mt-3 space-y-3 text-sm">
          {/* TOOL CALLS */}
          {task.toolCalls.length > 0 && (
            <div>
              <p className="font-semibold text-xs text-gray-500">Tool Calls</p>

              {task.toolCalls.map((call) => (
                <div key={call.id} className="mt-1 p-2 border rounded bg-white">
                  <p className="text-xs">🔧 {call.tool}</p>
                  <p className="text-xs text-gray-500">{call.input}</p>
                  {call.output && (
                    <p className="text-xs text-green-600 mt-1">{call.output}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* OUTPUTS */}
          {task.outputs.length > 0 && (
            <div>
              <p className="font-semibold text-xs text-gray-500">Outputs</p>

              {task.outputs.map((o, i) => (
                <p
                  key={i}
                  className={`text-xs ${
                    o.isFinal ? "text-green-700 font-medium" : "text-gray-600"
                  }`}
                >
                  {o.content}
                </p>
              ))}
            </div>
          )}

          {/* ERROR / MESSAGE */}
          {task.error && (
            <p className="text-xs text-red-600">Error: {task.error}</p>
          )}

          {task.message && (
            <p className="text-xs text-gray-500">{task.message}</p>
          )}

          {/* RETRY INFO */}
          {task.retries > 0 && (
            <p className="text-xs text-yellow-600">
              Retried {task.retries} time(s)
            </p>
          )}

          {/* CANCELLED */}
          {task.status === "cancelled" && (
            <p className="text-xs text-gray-600">
              Stopped early (sufficient data)
            </p>
          )}
        </div>
      )}
    </div>
  );
}
