import { useMemo } from 'react';

import type { BleepName, Bleep, Bleeps } from '../types';
import { useBleepsSetup } from '../useBleepsSetup/index';

let instanceIdCounter = 0;

function useBleeps (): Bleeps {
  interface BleepItem {
    name: BleepName
    bleep: Bleep
  }

  const bleepsSetup = useBleepsSetup();

  const instanceId = useMemo(() => instanceIdCounter++, []);

  const bleeps: Bleeps = useMemo(() => {
    if (!bleepsSetup) {
      return {};
    }

    return Object
      .keys(bleepsSetup.bleeps)
      .map(bleepName => {
        const bleepGeneric = bleepsSetup.bleeps[bleepName];

        const bleepItem: BleepItem = {
          name: bleepName,
          bleep: {
            ...bleepGeneric,
            play: () => bleepGeneric.play(instanceId),
            stop: () => bleepGeneric.stop(instanceId)
          }
        };

        return bleepItem;
      })
      .reduce((bleeps: Bleeps, bleepItem: BleepItem) => {
        const { name, bleep } = bleepItem;
        return { ...bleeps, [name]: bleep };
      }, {});
  }, [bleepsSetup]);

  return bleeps;
}

export { useBleeps };
