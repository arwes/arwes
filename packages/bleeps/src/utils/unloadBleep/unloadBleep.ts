import { BleepsGenerics, BleepName } from '../../constants';

const unloadBleep = (bleeps: BleepsGenerics, bleepName: BleepName): void => {
  bleeps[bleepName]?.unload();
  delete bleeps[bleepName];
};

export { unloadBleep };
