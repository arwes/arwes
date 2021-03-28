import { Howler, Howl } from 'howler';

import {
  BleepsAudioGroupSettings,
  BleepPlayerSettings,
  BleepGenericInstanceId,
  BleepGeneric
} from '../../constants';

const createBleep = (audioSettings: BleepsAudioGroupSettings, playerSettings: BleepPlayerSettings): BleepGeneric => {
  const { disabled, ...settings } = {
    ...audioSettings,
    ...playerSettings
  };

  // TODO: The Howler API does not provide a public interface to know if
  // the browser audio is locked or not. But it has a private flag.
  // This could potentially break this library if it changes unexpectedly,
  // but there is no proper way to know.
  const isGlobalAudioLocked = !(Howler as any)._audioUnlocked;

  let isLocked: boolean = isGlobalAudioLocked;
  let lastId: number | undefined;

  const howl = new Howl({
    ...settings,
    onunlock: () => {
      isLocked = false;
    }
  });

  // In a loop sound, if the sound is played by multiple sources
  // (e.g. multiple components multiple times), to stop the sound,
  // all of the play() calls must also call stop().
  // Otherwise, a race-condition issue can happen.
  const sourcesAccount: Record<BleepGenericInstanceId, boolean> = {};

  const play = (instanceId: BleepGenericInstanceId): void => {
    // Even if the audio is set up to be preloaded, sometimes the file
    // is not loaded, probably because the browser has locked the playback.
    if (howl.state() === 'unloaded') {
      howl.load();
    }

    // If the browser audio is locked, if the audio is played, it will be queued
    // until the browser audio is unlocked. But if in-between the audio is stopped,
    // the play is still queued. It is also accumulated, regardless of passing down
    // the same playback id.
    if (isLocked) {
      return;
    }

    sourcesAccount[instanceId] = true;

    // If the sound is being loaded, the play action will be
    // queued until it is loaded.
    const newId = howl.play(lastId);

    // If the sound is being loaded, it returns null.
    // To prevent errors, the id to pass to play must be a number or undefined.
    lastId = newId || undefined;
  };

  const stop = (instanceId: BleepGenericInstanceId): void => {
    delete sourcesAccount[instanceId];

    const noActiveSources = !Object.keys(sourcesAccount).length;

    const canStop = settings.loop ? noActiveSources : true;

    if (canStop && howl.playing()) {
      howl.stop();
    }
  };

  const getIsPlaying = (): boolean => {
    return howl.playing();
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
    stop,
    getIsPlaying,
    getDuration,
    unload
  };
};

export { createBleep };
