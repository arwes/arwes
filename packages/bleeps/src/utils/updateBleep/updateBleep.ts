import {
  BleepsAudioGroupSettings,
  BleepPlayerSettings,
  BleepGeneric
} from '../../constants';

const updateBleep = (
  bleep: BleepGeneric,
  audioSettings: BleepsAudioGroupSettings,
  playerSettings: BleepPlayerSettings
): void => {
  const settings = {
    ...audioSettings,
    ...playerSettings
  };
  bleep._settings = settings;

  if (settings.volume !== undefined && settings.volume !== bleep._howl.volume()) {
    bleep._howl.volume(settings.volume);
  }

  if (settings.rate !== undefined && settings.rate !== bleep._howl.rate()) {
    bleep._howl.rate(settings.rate);
  }

  if (settings.loop !== undefined && settings.loop !== bleep._howl.loop()) {
    bleep._howl.loop(settings.loop);
  }
};

export { updateBleep };
