import type { BleepProps } from '../types.js'

type BleepLoader = {
  isLoading: boolean
  isError: boolean
  buffer: AudioBuffer | null
  load: () => void
  unload: () => void
  addOnLoad: (callback: () => void) => void
  removeOnLoad: (callback: () => void) => void
}

const createBleepLoader = (props: BleepProps, context: AudioContext): BleepLoader => {
  const { sources, fetchHeaders, asyncLoad } = props

  const onloadCallbacks = new Set<() => void>()
  const isBrowserSafari: boolean =
    window.navigator.userAgent.includes('Safari') && !window.navigator.userAgent.includes('Chrome')

  let isLoading = false
  let isError = false
  let buffer: AudioBuffer | null = null
  let asyncLoadCallbackId: number | undefined

  function fetchAudioFile(src: string, callback: (_?: unknown) => void): void {
    // Some browser extensions or users might try to overwrite the global fetch function
    // and cause errors, particularly with fetching non-JSON resources.
    try {
      void window
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
          onloadCallbacks.forEach((onloadCallback) => onloadCallback())
          onloadCallbacks.clear()
        })
        .catch((err) => {
          isError = true
          console.error(`ARWES bleep with source URL "${src}" could not be used:`, err)
        })
        .then(() => {
          isLoading = false
          callback()
        })
    } catch (err) {
      isError = true
      isLoading = false
      buffer = null
      console.error(
        `ARWES bleep throws when fetched. This can happen due to some external source overwriting the global "fetch" function such as browsers extensions or your app.`
      )
    }
  }

  function load(): void {
    if (buffer || isLoading || isError) {
      return
    }

    if (!sources.length) {
      isError = true
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
      isError = true
      console.error(
        `ARWES bleep sources "${JSON.stringify(sources)}" are not supported on this navigator.`
      )
      return
    }

    const { src } = source

    isLoading = true
    isError = false

    void new Promise((resolve) => {
      if (asyncLoad) {
        asyncLoadCallbackId = window.setTimeout(() => {
          fetchAudioFile(src, resolve)
        }, 0)
      } else {
        fetchAudioFile(src, resolve)
      }
    })
  }

  function unload(): void {
    isLoading = false
    isError = false
    buffer = null
    onloadCallbacks.clear()
    window.clearTimeout(asyncLoadCallbackId)
  }

  function addOnLoad(callback: () => void): void {
    onloadCallbacks.add(callback)
  }

  function removeOnLoad(callback: () => void): void {
    onloadCallbacks.delete(callback)
  }

  return Object.freeze({
    get isLoading() {
      return isLoading
    },
    get isError() {
      return isError
    },
    get buffer() {
      return buffer
    },
    load,
    unload,
    addOnLoad,
    removeOnLoad
  })
}

export type { BleepLoader }
export { createBleepLoader }
