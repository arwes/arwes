import type { BleepProps, Bleep, BleepPropsUpdatable } from '../types.js'
import { type BleepSource, createBleepSource } from './createBleepSource.js'
import { createBleepLoader } from './createBleepLoader.js'

const createBleep = (props: BleepProps): Bleep | null => {
  const isBrowser: boolean = typeof window !== 'undefined'
  const isBleepsAvailable = isBrowser && !!window.AudioContext

  if (!isBleepsAvailable) {
    return null
  }

  const {
    sources,
    preload = true,
    loop,
    masterGain,
    maxPlaybackDelay = 0.25,
    muteOnWindowBlur
  } = props

  let volume = props.volume ?? 1
  let muted = !!props.muted
  let isExternallyMuted = false
  let playbackCallbackTime = 0
  let bleepSource: BleepSource | null = null

  const context = props.context ?? new window.AudioContext()
  const gain = context.createGain()
  const callersAccount = new Set<string>()
  const bleepLoader = createBleepLoader(props, context)

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

    if (bleepLoader.isError) {
      return
    }

    if (bleepLoader.isLoading) {
      bleepLoader.addOnLoad(schedulePlay)

      return
    }

    if (!bleepLoader.buffer) {
      bleepLoader.load()
      bleepLoader.addOnLoad(schedulePlay)

      return
    }

    if (caller !== undefined) {
      callersAccount.add(caller)
    }

    if (loop && bleepSource?.isPlaying) {
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
      buffer: bleepLoader.buffer,
      context,
      gain,
      loop
    })

    bleepSource.play()
  }

  function stop(caller?: string): void {
    if (!bleepLoader.buffer) {
      return
    }

    if (caller !== undefined) {
      callersAccount.delete(caller)
    }

    const canStop = loop ? !callersAccount.size : true

    if (canStop && bleepSource) {
      bleepSource.stop()
    }
  }

  function load(): void {
    bleepLoader.load()
  }

  function unload(): void {
    bleepSource?.stop()
    bleepSource = null

    bleepLoader.unload()

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
      gain.gain.value = newVolume
    }
  }

  const bleep = {} as unknown as Bleep

  const bleepAPI: { [P in keyof Bleep]: PropertyDescriptor } = {
    duration: {
      get: () => bleepLoader.buffer?.duration ?? 0,
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
      get: () => !!bleepSource?.isPlaying,
      enumerable: true
    },
    isLoaded: {
      get: () => !!bleepLoader.buffer,
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
    bleepLoader.load()
  }

  if (muteOnWindowBlur) {
    window.addEventListener('focus', onUserWindowFocus)
    window.addEventListener('blur', onUserWindowBlur)
  }

  return bleep
}

export { createBleep }
