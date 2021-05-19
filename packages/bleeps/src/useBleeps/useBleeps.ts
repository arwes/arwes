import { useMemo } from 'react';

import { BleepName, Bleep, Bleeps } from '../constants';
import { useBleepsSetup } from '../useBleepsSetup';

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
      .keys(bleepsSetup.bleepsGenerics)
      .map(bleepName => {
        const bleepGeneric = bleepsSetup.bleepsGenerics[bleepName];

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
