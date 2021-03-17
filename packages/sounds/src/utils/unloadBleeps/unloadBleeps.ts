import { BleepsGenerics } from '../../constants';
import { unloadBleep } from '../unloadBleep';

const unloadBleeps = (bleeps: BleepsGenerics): void => {
  Object.keys(bleeps).forEach(bleepName => unloadBleep(bleeps, bleepName));
};

export { unloadBleeps };
