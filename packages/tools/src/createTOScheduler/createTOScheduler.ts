type TOSchedulerId = number | string;
type TOSchedulerCallback = () => unknown;

declare function TOSchedulerStart (id: TOSchedulerId, delay: number, callback: TOSchedulerCallback): void;
declare function TOSchedulerStart (delay: number, callback: TOSchedulerCallback): void;

interface TOScheduler {
  isPending: (id?: TOSchedulerId) => boolean
  stop: (id?: TOSchedulerId) => void
  stopAll: () => void
  start: typeof TOSchedulerStart
}

const ID_DEFAULT = '';

function createTOScheduler (): TOScheduler {
  const ledger = new Map<TOSchedulerId, TOSchedulerCallback>();

  const isPending = (id: TOSchedulerId = ID_DEFAULT): boolean => {
    return ledger.has(id);
  };

  const stop = (id: TOSchedulerId = ID_DEFAULT): void => {
    const cancelSchedule = ledger.get(id);

    if (cancelSchedule) {
      cancelSchedule();
    }

    ledger.delete(id);
  };

  const stopAll = (): void => {
    Array.from(ledger.keys()).forEach(stop);
  };

  const start = (a: TOSchedulerId | number, b: TOSchedulerCallback | number, c?: TOSchedulerCallback): void => {
    const id = c ? a : ID_DEFAULT;
    const delay = ((c ? b : a) as number) * 1000;
    const callback: () => unknown = c || b as TOSchedulerCallback;

    stop(id);

    const timeoutId = setTimeout(() => {
      ledger.delete(id);
      callback();
    }, delay);

    ledger.set(id, () => {
      clearTimeout(timeoutId);
    });
  };

  return Object.freeze({ isPending, stop, stopAll, start });
}

export type { TOScheduler };
export { createTOScheduler };
