import { Howl } from 'howler';

import {
  BleepsAudioGroupSettings,
  BleepPlayerSettings,
  Bleep
} from '../../constants';

const createBleep = (audioSettings: BleepsAudioGroupSettings, playerSettings: BleepPlayerSettings): Bleep => {
  const { disabled, ...settings } = {
    ...audioSettings,
    ...playerSettings
  };
  const howl = new Howl(settings);

  let lastId: number | undefined;

  const play = (): void => {
    lastId = howl.play(lastId);
  };
  const pause = (): void => {
    howl.pause(lastId);
  };
  const seek = (time: number): void => {
    howl.seek(time, lastId);
  };
  const stop = (): void => {
    howl.stop(lastId);
  };
  const getIsPlaying = (): boolean => {
    return howl.playing(lastId);
  };
  const getDuration = (): number => {
    return howl.duration();
  };
  const unload = (): void => {
    howl.unload();
  };

  return {
    _settings: settings,
    _howl: howl,
    play,
    pause,
    seek,
    stop,
    getIsPlaying,
    getDuration,
    unload
  };
};

export { createBleep };
