import { TOOLS_IS_BROWSER } from '@arwes/tools';

import type { BleepProps, Bleep } from '../types';

const createBleep = (props: BleepProps): Bleep | null => {
  if (!TOOLS_IS_BROWSER || props.disabled) {
    return null;
  }

  const {
    sources,
    preload = true,
    loop = false,
    volume = 1.0,
    muted = false
  } = props;

  let isAudioLoaded = false;
  let isAudioPlaying = false;
  let isAudioError = false;

  const audioElement = document.createElement('audio');
  const callersAccount = new Set<string>();

  audioElement.addEventListener('canplaythrough', () => (isAudioLoaded = true));
  audioElement.addEventListener('play', () => (isAudioPlaying = true));
  audioElement.addEventListener('pause', () => (isAudioPlaying = false));
  audioElement.addEventListener('ended', () => (isAudioPlaying = false));

  audioElement.role = 'presentation';
  audioElement.preload = preload ? 'auto' : 'none';
  audioElement.loop = loop;
  audioElement.volume = Math.min(1, Math.max(0, volume));
  audioElement.muted = muted;

  sources.forEach(({ src, type }) => {
    const sourceElement = document.createElement('source');

    const onError = (): void => {
      isAudioError = true;
      console.error(`The bleep with source "${src}" with type "${type}" could not be loaded.`);
    };

    sourceElement.addEventListener('error', onError);
    sourceElement.addEventListener('abort', onError);
    sourceElement.addEventListener('stalled', onError);

    sourceElement.type = type;
    sourceElement.src = src;

    audioElement.appendChild(sourceElement);
  });

  const play = (caller?: string): void => {
    if (isAudioError) {
      return;
    }

    if (caller) {
      callersAccount.add(caller);
    }

    audioElement.currentTime = 0;
    audioElement.play()?.catch(() => {
      console.error(`The bleep with sources "${JSON.stringify(sources)}" could not be played.`);
    });
  };

  const stop = (caller?: string): void => {
    if (isAudioError) {
      return;
    }

    if (caller) {
      callersAccount.delete(caller);
    }

    if (!callersAccount.size && isAudioPlaying) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
  };

  const load = (): void => {
    if (isAudioError) {
      return;
    }

    if (!isAudioLoaded) {
      audioElement.load();
    }
  };

  const getDuration = (): number => {
    return Number.isFinite(audioElement.duration) ? audioElement.duration : 0;
  };

  const getIsPlaying = (): boolean => {
    return isAudioPlaying;
  };

  const getIsLoaded = (): boolean => {
    return isAudioLoaded;
  };

  const bleep = {} as unknown as Bleep;
  const bleepAPI: { [P in keyof Bleep]: PropertyDescriptor } = {
    play: {
      value: play,
      enumerable: true
    },
    stop: {
      value: stop,
      enumerable: true
    },
    load: {
      value: load,
      enumerable: true
    },
    duration: {
      get: getDuration,
      enumerable: true
    },
    isPlaying: {
      get: getIsPlaying,
      enumerable: true
    },
    isLoaded: {
      get: getIsLoaded,
      enumerable: true
    },
    props: {
      value: props,
      enumerable: true
    }
  };

  Object.defineProperties(bleep, bleepAPI);

  return bleep;
};

export { createBleep };
