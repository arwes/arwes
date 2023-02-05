import { IS_BROWSER, IS_PRODUCTION } from '@arwes/tools';

import type { BleepProps, Bleep } from '../types';

const createBleep = (props: BleepProps): Bleep | null => {
  if (!IS_BROWSER) {
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

  const context = props.context ?? new AudioContext();
  const audioElement = document.createElement('audio');
  const track = new MediaElementAudioSourceNode(context, {
    mediaElement: audioElement
  });
  const callersAccount = new Set<string>();

  track.connect(context.destination);

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

    const onError = (err: Event): void => {
      isAudioError = true;
      if (!IS_PRODUCTION) {
        console.error(`The bleep with source "${src}" with type "${type}" could not be loaded:`, err);
      }
    };

    sourceElement.addEventListener('error', onError);
    sourceElement.addEventListener('abort', onError);
    sourceElement.addEventListener('stalled', onError);

    sourceElement.type = type;
    sourceElement.src = src;

    audioElement.appendChild(sourceElement);
  });

  const getDuration = (): number => audioElement.duration;
  const getIsPlaying = (): boolean => isAudioPlaying;
  const getIsLoaded = (): boolean => isAudioLoaded;

  const play = (caller?: string): void => {
    if (isAudioError) {
      return;
    }

    if (caller) {
      callersAccount.add(caller);
    }

    if (loop && isAudioPlaying) {
      return;
    }

    if (context.state === 'suspended') {
      let isResumeError = false;

      context.resume().catch((err: Event) => {
        isResumeError = true;
        if (!IS_PRODUCTION) {
          console.error(`The bleep audio context with sources "${JSON.stringify(sources)}" could not be resumed to be played:`, err);
        }
      });

      if (isResumeError) {
        return;
      }
    }

    audioElement.currentTime = 0;
    audioElement.play()?.catch(err => {
      if (!IS_PRODUCTION) {
        console.error(`The bleep with sources "${JSON.stringify(sources)}" could not be played:`, err);
      }
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

  const unload = (): void => {
    track.disconnect(context.destination);
  };

  const bleep = {} as unknown as Bleep;
  const bleepAPI: { [P in keyof Bleep]: PropertyDescriptor } = {
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
    unload: {
      value: unload,
      enumerable: true
    },
    // TODO: Implement.
    update: {
      value: null,
      enumerable: true
    }
  };

  Object.defineProperties(bleep, bleepAPI);

  return bleep;
};

export { createBleep };
