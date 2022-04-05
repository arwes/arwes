import type { BleepsGenerics, BleepName } from '../../types';

const unloadBleep = (bleeps: BleepsGenerics, bleepName: BleepName): void => {
  bleeps[bleepName]?.unload();
  delete bleeps[bleepName]; // eslint-disable-line @typescript-eslint/no-dynamic-delete
};

export { unloadBleep };
