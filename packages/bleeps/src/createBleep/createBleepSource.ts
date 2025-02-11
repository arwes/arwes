type BleepSource = {
  isPlaying: boolean
  isPlayed: boolean
  play: () => void
  stop: () => void
}

type BleepSourceProps = {
  context: AudioContext
  buffer: AudioBuffer
  gain: GainNode
  loop?: boolean
}

const createBleepSource = (props: BleepSourceProps): BleepSource => {
  const { context, buffer, gain, loop } = props

  const source = context.createBufferSource()

  let isPlaying = false
  let isPlayed = false

  source.buffer = buffer
  source.loop = !!loop

  if (loop) {
    source.loopStart = 0
    source.loopEnd = buffer.duration
  }

  source.connect(gain)

  const play = (): void => {
    if (!isPlaying) {
      source.start()
      isPlaying = true
    }
  }

  const stop = (): void => {
    if (!isPlayed) {
      source.stop()
      source.disconnect(gain)
      isPlaying = false
      isPlayed = true
    }
  }

  return {
    get isPlaying() {
      return isPlaying
    },
    get isPlayed() {
      return isPlayed
    },
    play,
    stop
  }
}

export type { BleepSource, BleepSourceProps }
export { createBleepSource }
