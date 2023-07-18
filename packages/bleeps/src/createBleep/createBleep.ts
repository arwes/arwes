import { IS_BROWSER_SAFARI } from '@arwes/tools';
import { IS_BLEEPS_AVAILABLE } from '../constants';

import type { BleepProps, Bleep, BleepPropsUpdatable } from '../types';

const createBleep = (props: BleepProps): Bleep | null => {
  if (!IS_BLEEPS_AVAILABLE) {
    return null;
  }

  const {
    sources,
    preload = true,
    loop = false,
    volume = 1.0,
    fetchHeaders,
    masterGain
  } = props;

  let isBufferLoading = false;
  let isBufferError = false;
  let isBufferPlaying = false;

  let source: AudioBufferSourceNode | null = null;
  let buffer: AudioBuffer | null = null;
  let duration = 0;

  const context = props.context ?? new window.AudioContext();
  const gain = context.createGain();
  const callersAccount = new Set<string>();

  const fetchAudioBuffer = (): void => {
    if (buffer || isBufferLoading || isBufferError) {
      return;
    }

    if (!sources.length) {
      isBufferError = true;
      console.error('Every bleep must have at least one source with a valid audio file URL and type.');
      return;
    }

    const audioTest = new window.Audio();
    const source = sources.find(source => {
      // "webm" and "weba" file formats are not supported on Safari.
      if (IS_BROWSER_SAFARI && source.type.includes('audio/webm')) {
        return false;
      }

      const support = audioTest.canPlayType(source.type || '');
      return support === 'probably' || support === 'maybe';
    });

    if (!source) {
      isBufferError = true;
      console.error(`The bleep sources "${JSON.stringify(sources)}" are not supported on this navigator.`);
      return;
    }

    const { src, type } = source;

    isBufferLoading = true;

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    window.fetch(src, {
      method: 'GET',
      headers: fetchHeaders
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Bleep source could not be fetched.');
        }
        return response;
      })
      .then(response => response.arrayBuffer())
      .then(audioArrayBuffer => context.decodeAudioData(audioArrayBuffer))
      .then(audioBuffer => {
        buffer = audioBuffer;
        duration = buffer.duration;
      })
      .catch(err => {
        isBufferError = true;
        console.error(`The bleep with source URL "${src}" and type "${type}" could not be used:`, err);
      })
      .then(() => (isBufferLoading = false));
  };

  const getDuration = (): number => duration;
  const getIsPlaying = (): boolean => isBufferPlaying;
  const getIsLoaded = (): boolean => !!buffer;

  const play = (caller?: string): void => {
    if (!buffer) {
      fetchAudioBuffer();
      return;
    }

    if (loop && isBufferPlaying) {
      return;
    }

    // If the user has not yet interacted with the browser, audio is locked
    // so try to unlock it.
    if (context.state === 'suspended') {
      let isResumeError = false;

      context.resume().catch((err: Event) => {
        isResumeError = true;
        console.error(`The bleep audio context with sources "${JSON.stringify(sources)}" could not be resumed to be played:`, err);
      });

      if (isResumeError) {
        return;
      }
    }

    if (caller) {
      callersAccount.add(caller);
    }

    isBufferPlaying = true;

    if (source) {
      source.stop();
      source.disconnect(gain);
      source = null;
    }

    source = context.createBufferSource();
    source.buffer = buffer;
    source.loop = loop;

    if (loop) {
      source.loopStart = 0;
      source.loopEnd = buffer.duration;
    }

    source.connect(gain);
    source.start();

    source.onended = () => {
      isBufferPlaying = false;
    };
  };

  const stop = (caller?: string): void => {
    if (!buffer) {
      return;
    }

    if (caller) {
      callersAccount.delete(caller);
    }

    const canStop = loop ? !callersAccount.size : true;

    if (canStop) {
      if (source) {
        source.stop();
        source.disconnect(gain);
        source = null;
      }

      isBufferPlaying = false;
    }
  };

  const load = (): void => {
    fetchAudioBuffer();
  };

  const unload = (): void => {
    if (source) {
      source.stop();
      source.disconnect(gain);
      source = null;
    }

    // Remove audio buffer from memory.
    buffer = null;

    isBufferLoading = false;
    isBufferError = false;
  };

  const update = (props: BleepPropsUpdatable): void => {
    if (props.volume !== undefined) {
      const bleepVolume = Math.max(0, Math.min(1, props.volume));
      gain.gain.setValueAtTime(bleepVolume, context.currentTime);
    }
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
    update: {
      value: update,
      enumerable: true
    }
  };

  Object.defineProperties(bleep, bleepAPI);

  // If there is a master GainNode provided, subscribe to it so a global volume
  // can be set from there. Otherwise, subscribe to the context directly.
  if (masterGain) {
    gain.connect(masterGain);
  }
  else {
    gain.connect(context.destination);
  }

  // Set initial bleep volume.
  update({ volume });

  if (preload) {
    fetchAudioBuffer();
  }

  return bleep;
};

export { createBleep };
