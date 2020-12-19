type SchedulerCallback = () => unknown;

declare function SchedulerStart (id: any, time: number, callback: SchedulerCallback): void;
declare function SchedulerStart (time: number, callback: SchedulerCallback): void;

interface Scheduler {
  stop: (id?: any) => void
  stopAll: () => void
  start: typeof SchedulerStart
}

function makeScheduler (): Scheduler {
  const timeouts: Record<any, any> = {};

  function stop (id: any): void {
    clearTimeout(timeouts[id]);
  }

  function stopAll (): void {
    Object.values(timeouts).forEach(timeout => clearTimeout(timeout));
  }

  function start (a: any, b: any, c?: any): void {
    const id = c ? a : undefined;
    const time = c ? b : a;
    const callback: () => unknown = c || b;

    stop(id);
    timeouts[id] = setTimeout(callback, time);
  }

  return { stop, stopAll, start };
}

export { Scheduler, makeScheduler };
