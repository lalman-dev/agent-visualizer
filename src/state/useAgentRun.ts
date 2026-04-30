import { useEffect, useReducer, useRef } from "react";
import { reducer, initialState } from "./reducer";
import type { Event } from "./types";
import { MockEventEmitter } from "../mock/eventEmitter";

export function useAgentRun(events: readonly Event[]) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const emitterRef = useRef<MockEventEmitter | null>(null);

  useEffect(() => {
    const emitter = new MockEventEmitter(events);
    emitterRef.current = emitter;

    emitter.subscribe((event) => {
      dispatch(event);
    });

    emitter.start();

    return () => {
      emitter.stop();
    };
  }, [events]);

  return state;
}
