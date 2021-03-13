import { Bleeps } from '../../constants';
import { unloadBleep } from '../unloadBleep';

const unloadBleeps = (bleeps: Bleeps): void => {
  Object.keys(bleeps).forEach(bleepName => unloadBleep(bleeps, bleepName));
};

export { unloadBleeps };
