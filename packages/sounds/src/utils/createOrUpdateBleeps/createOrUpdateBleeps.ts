import {
  BLEEPS_CATEGORIES,
  BleepCategoryName,
  BleepsAudioSettings,
  BleepsPlayersSettings,
  BleepsSettings,
  BleepsGenerics
} from '../../constants';
import { createBleep } from '../createBleep';
import { updateBleep } from '../updateBleep';
import { unloadBleep } from '../unloadBleep';
import { unloadBleeps } from '../unloadBleeps';

const createOrUpdateBleeps = (
  providedBleeps: BleepsGenerics | undefined,
  audioSettings: BleepsAudioSettings,
  playersSettings: BleepsPlayersSettings,
  bleepsSettings: BleepsSettings
): BleepsGenerics => {
  const bleeps: BleepsGenerics = providedBleeps ?? {};

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

    // If a bleep has updated `src` or `format` settings, it should be re-created.
    // Otherwise it is updated to be fast and prevent more HTTP requests.
    const hasBleepUpdatedSrc =
      !!bleeps[bleepName]?._settings.src.find((v, i) => v !== playerSettings.src[i]);
    const hasBleepUpdatedFormat =
      !!bleeps[bleepName]?._settings.format?.find((v, i) => v !== playerSettings.format?.[i]);

    if (bleeps[bleepName] && !hasBleepUpdatedSrc && !hasBleepUpdatedFormat) {
      updateBleep(bleeps[bleepName], processedAudioSettings, playerSettings);
    }
    else {
      unloadBleep(bleeps, bleepName);

      bleeps[bleepName] = createBleep(processedAudioSettings, playerSettings);
    }
  });

  return bleeps;
};

export { createOrUpdateBleeps };
