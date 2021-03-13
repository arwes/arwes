import { Bleeps } from '../../constants';

const unloadBleep = (bleeps: Bleeps, bleepName: string): void => {
  bleeps[bleepName]?.unload();
  delete bleeps[bleepName];
};

export { unloadBleep };
