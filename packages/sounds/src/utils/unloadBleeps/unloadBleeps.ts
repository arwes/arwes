import { Bleeps } from '../../constants';

const unloadBleeps = (bleeps: Bleeps): void => {
  Object.keys(bleeps).forEach(bleepName => {
    bleeps?.[bleepName].unload();
  });
};

export { unloadBleeps };
