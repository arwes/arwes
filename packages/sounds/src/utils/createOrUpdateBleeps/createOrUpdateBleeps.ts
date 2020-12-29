import {
  BLEEPS_CATEGORIES,
  BleepsSettings,
  BleepCategoryName,
  BleepsSetup,
  Bleeps
} from '../../constants';
import { createBleep } from '../createBleep';
import { updateBleep } from '../updateBleep';
import { unloadBleeps } from '../unloadBleeps';

const createOrUpdateBleeps = (providedBleeps: Bleeps | undefined, bleepsSetup: BleepsSetup, bleepsSettings: BleepsSettings): Bleeps => {
  const bleeps: Bleeps = providedBleeps ?? {};

  if (bleepsSetup.audioSettings.common?.disabled) {
    unloadBleeps(bleeps);
    return {};
  }

  Object.keys(bleepsSettings).map(bleepName => {
    const bleepSettings = bleepsSettings[bleepName];
    const bleepCategory = bleepSettings.category as BleepCategoryName;

    if (bleepCategory !== undefined && !BLEEPS_CATEGORIES.includes(bleepCategory)) {
      throw new Error(`Bleep category "${bleepCategory}" is not valid.`);
    }

    const audioCategorySettings = bleepsSetup.audioSettings.categories?.[bleepCategory];
    const audioSettings = {
      ...bleepsSetup.audioSettings.common,
      ...audioCategorySettings
    };

    if (audioSettings.disabled) {
      bleeps[bleepName]?.unload();
      delete bleeps[bleepName];
      return;
    }

    const playerSettings = bleepsSetup.playersSettings[bleepSettings.player];

    if (!playerSettings) {
      throw new Error(`Component bleep requires a provided player. Player "${bleepSettings.player}" was not found.`);
    }

    if (playerSettings.disabled) {
      bleeps[bleepName]?.unload();
      delete bleeps[bleepName];
      return;
    }

    if (bleeps[bleepName]) {
      bleeps[bleepName] = updateBleep(bleeps[bleepName], audioSettings, playerSettings);
    }
    else {
      bleeps[bleepName] = createBleep(audioSettings, playerSettings);
    }
  });

  return bleeps;
};

export { createOrUpdateBleeps };
