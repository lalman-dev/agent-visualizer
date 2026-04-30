import type { Event } from "../state/types";

type Listener = (event: Event) => void;

export class MockEventEmitter {
  private events: readonly Event[];
  private listeners: Listener[] = [];
  private timeouts: number[] = [];

  constructor(events: readonly Event[]) {
    this.events = events;
  }

  subscribe(listener: Listener) {
    this.listeners.push(listener);
  }

  start() {
    this.events.forEach((event, index) => {
      const delay = this.getDelay(index);

      const timeout = window.setTimeout(() => {
        this.listeners.forEach((listener) => listener(event));
      }, delay);

      this.timeouts.push(timeout);
    });
  }

  stop() {
    this.timeouts.forEach(clearTimeout);
    this.timeouts = [];
  }

  private getDelay(index: number) {
    // Make it feel real (not constant)
    return index * 800 + Math.random() * 300;
  }
}
