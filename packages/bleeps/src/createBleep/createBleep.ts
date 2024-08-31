import type { BleepProps, Bleep, BleepPropsUpdatable } from '../types.js'
import { type BleepSource, createBleepSource } from './createBleepSource.js'

const createBleep = (props: BleepProps): Bleep | null => {
  const isBrowser: boolean = typeof window !== 'undefined'
  const isBrowserSafari: boolean =
    isBrowser &&
    window.navigator.userAgent.includes('Safari') &&
    !window.navigator.userAgent.includes('Chrome')

  const isBleepsAvailable = isBrowser && !!window.AudioContext

  if (!isBleepsAvailable) {
    return null
  }

  const {
    sources,
    preload = true,
    loop,
    fetchHeaders,
    masterGain,
    maxPlaybackDelay = 0.25,
    muteOnWindowBlur
  } = props

  let volume = props.volume ?? 1
  let muted = !!props.muted
  let isExternallyMuted = false
  let isBufferLoading = false
  let isBufferError = false
  let isBufferPlaying = false
  let playbackCallbackTime = 0

  let bleepSource: BleepSource | null = null
  let buffer: AudioBuffer | null = null
  let duration = 0
  let fetchPromise: Promise<void>

  const context = props.context ?? new window.AudioContext()
  const gain = context.createGain()
  const callersAccount = new Set<string>()

  function fetchAudioBuffer(): void {
    if (buffer || isBufferLoading || isBufferError) {
      return
    }

    if (!sources.length) {
      isBufferError = true
      console.error(
        'ARWES bleep must have at least one source with a valid audio file URL and type.'
      )
      return
    }

    const audioTest = new window.Audio()
    const source = sources.find((source) => {
      // "webm" and "weba" file formats are not supported on Safari.
      if (isBrowserSafari && source.type.includes('audio/webm')) {
        return false
      }

      const support = audioTest.canPlayType(source.type || '')
      return support === 'probably' || support === 'maybe'
    })

    if (!source) {
      isBufferError = true
      console.error(
        `ARWES bleep sources "${JSON.stringify(sources)}" are not supported on this navigator.`
      )
      return
    }

    const { src, type } = source

    isBufferLoading = true

    fetchPromise = window
      .fetch(src, {
        method: 'GET',
        headers: fetchHeaders
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('ARWES bleep source could not be fetched.')
        }
        return response
      })
      .then((response) => response.arrayBuffer())
      .then((audioArrayBuffer) => context.decodeAudioData(audioArrayBuffer))
      .then((audioBuffer) => {
        buffer = audioBuffer
        duration = buffer.duration
      })
      .catch((err) => {
        isBufferError = true
        console.error(
          `ARWES bleep with source URL "${src}" and type "${type}" could not be used:`,
          err
        )
      })
      .then(() => {
        isBufferLoading = false
      })
  }

  function onUserAllowAudio(): void {
    window.removeEventListener('click', onUserAllowAudio)

    if (context.state === 'suspended') {
      void context.resume()
    }
  }

  function onUserWindowFocus(): void {
    if (muteOnWindowBlur) {
      isExternallyMuted = false
      update({})
    }
  }

  function onUserWindowBlur(): void {
    if (muteOnWindowBlur) {
      isExternallyMuted = true
      update({})
    }
  }

  function play(caller?: string): void {
    const schedulePlay = (): void => {
      if (Date.now() <= playbackCallbackTime + maxPlaybackDelay * 1_000) {
        play(caller)
      }
    }

    playbackCallbackTime = Date.now()

    if (isBufferError) {
      return
    }

    if (isBufferLoading) {
      void fetchPromise.then(schedulePlay)

      return
    }

    if (!buffer) {
      fetchAudioBuffer()

      void fetchPromise.then(schedulePlay)

      return
    }

    if (caller !== undefined) {
      callersAccount.add(caller)
    }

    if (loop && isBufferPlaying) {
      return
    }

    // If the user has not yet interacted with the browser, audio is locked
    // so try to unlock it.
    if (context.state === 'suspended') {
      window.addEventListener('click', onUserAllowAudio)

      context
        .resume()
        .then(schedulePlay)
        .catch((err: Event) => {
          const sourcesText = JSON.stringify(sources)
          console.error(
            `ARWES bleep audio context with sources "${sourcesText}" could not be resumed to be played:`,
            err
          )
        })

      return
    }

    if (bleepSource) {
      bleepSource.stop()
    }

    bleepSource = createBleepSource({
      context,
      buffer,
      gain,
      loop,
      onStop() {
        isBufferPlaying = false
      }
    })

    isBufferPlaying = true

    bleepSource.start()
  }

  function stop(caller?: string): void {
    if (!buffer) {
      return
    }

    if (caller !== undefined) {
      callersAccount.delete(caller)
    }

    const canStop = loop ? !callersAccount.size : true

    if (canStop) {
      if (bleepSource) {
        bleepSource.stop()
      }

      isBufferPlaying = false
    }
  }

  function load(): void {
    fetchAudioBuffer()
  }

  function unload(): void {
    if (bleepSource) {
      bleepSource.stop()
    }

    // Remove audio buffer from memory.
    bleepSource = null
    buffer = null

    isBufferLoading = false
    isBufferError = false
    isBufferPlaying = false

    window.removeEventListener('click', onUserAllowAudio)
    window.removeEventListener('focus', onUserWindowFocus)
    window.removeEventListener('blur', onUserWindowBlur)
  }

  function update(newProps: BleepPropsUpdatable): void {
    if (newProps.volume !== undefined) {
      volume = Math.max(0, Math.min(1, newProps.volume))
    }

    if (newProps.muted !== undefined) {
      muted = !!newProps.muted
    }

    const newVolume = muted || isExternallyMuted ? 0 : volume
    if (newVolume !== gain.gain.value) {
      gain.gain.setValueAtTime(newVolume, context.currentTime)
    }
  }

  const bleep = {} as unknown as Bleep
  const bleepAPI: { [P in keyof Bleep]: PropertyDescriptor } = {
    duration: {
      get: () => duration,
      enumerable: true
    },
    volume: {
      get: () => volume,
      set: (volume: number) => update({ volume }),
      enumerable: true
    },
    muted: {
      get: () => muted,
      set: (muted: boolean) => update({ muted }),
      enumerable: true
    },
    isPlaying: {
      get: () => isBufferPlaying,
      enumerable: true
    },
    isLoaded: {
      get: () => !!buffer,
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
  }

  Object.defineProperties(bleep, bleepAPI)

  // If there is a master GainNode provided, subscribe to it so a global volume
  // can be set from there. Otherwise, subscribe to the context directly.
  if (masterGain) {
    gain.connect(masterGain)
  } else {
    gain.connect(context.destination)
  }

  // Set initial bleep volume.
  update({ volume })

  if (preload) {
    fetchAudioBuffer()
  }

  if (muteOnWindowBlur) {
    window.addEventListener('focus', onUserWindowFocus)
    window.addEventListener('blur', onUserWindowBlur)
  }

  return bleep
}

export { createBleep }
