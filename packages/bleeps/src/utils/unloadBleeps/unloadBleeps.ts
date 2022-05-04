import type { BleepsGenerics } from '../../types';
import { unloadBleep } from '../unloadBleep/index';

const unloadBleeps = (bleeps: BleepsGenerics): void => {
  Object.keys(bleeps).forEach(bleepName => unloadBleep(bleeps, bleepName));
};

export { unloadBleeps };
