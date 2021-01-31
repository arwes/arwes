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
    // Even if the audio is set up to be preloaded, sometimes the file
    // is not loaded, probably because the browser has locked the playback.
    if (howl.state() === 'unloaded') {
      howl.load();
    }

    const newId = howl.play(lastId);

    // If the sound is being loaded, it returns null.
    // The id to pass to play must be a number or undefined.
    lastId = newId || undefined;
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
