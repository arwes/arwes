import {
  BLEEPS_CATEGORIES,
  BleepCategoryName,
  BleepsAudioSettings,
  BleepsPlayersSettings,
  BleepsSettings,
  Bleeps
} from '../../constants';
import { createBleep } from '../createBleep';
import { updateBleep } from '../updateBleep';
import { unloadBleep } from '../unloadBleep';
import { unloadBleeps } from '../unloadBleeps';

const createOrUpdateBleeps = (
  providedBleeps: Bleeps | undefined,
  audioSettings: BleepsAudioSettings,
  playersSettings: BleepsPlayersSettings,
  bleepsSettings: BleepsSettings
): Bleeps => {
  const bleeps: Bleeps = providedBleeps ?? {};

  if (audioSettings.common?.disabled) {
    unloadBleeps(bleeps);
    return bleeps;
  }

  Object.keys(bleepsSettings).forEach(bleepName => {
    const bleepSettings = bleepsSettings[bleepName];

    if (!bleepSettings) {
      unloadBleep(bleeps, bleepName);
      return;
    }

    const bleepCategory = bleepSettings.category as BleepCategoryName;

    if (
      process.env.NODE_ENV !== 'production' &&
      bleepCategory !== undefined &&
      !BLEEPS_CATEGORIES.includes(bleepCategory)
    ) {
      throw new Error(`Bleep category "${bleepCategory}" is not valid.`);
    }

    const audioCategorySettings = audioSettings.categories?.[bleepCategory];
    const processedAudioSettings = {
      ...audioSettings.common,
      ...audioCategorySettings
    };

    if (processedAudioSettings.disabled) {
      unloadBleep(bleeps, bleepName);
      return;
    }

    const playerSettings = playersSettings[bleepSettings.player];

    if (!playerSettings) {
      throw new Error(`Component bleep requires a provided player. Player "${bleepSettings.player}" was not found.`);
    }

    if (playerSettings.disabled) {
      unloadBleep(bleeps, bleepName);
      return;
    }

    // TODO: Unload and create new bleep if src/format settings changed.

    if (bleeps[bleepName]) {
      bleeps[bleepName] = updateBleep(bleeps[bleepName], processedAudioSettings, playerSettings);
    }
    else {
      bleeps[bleepName] = createBleep(processedAudioSettings, playerSettings);
    }
  });

  return bleeps;
};

export { createOrUpdateBleeps };
