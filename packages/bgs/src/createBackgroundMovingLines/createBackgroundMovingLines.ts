import { randomizeList } from '@arwes/tools'
import { type Animation, easing, createAnimation } from '@arwes/animated'
import type { AnimatorNode } from '@arwes/animator'

interface CreateBackgroundMovingLinesSettings {
  lineWidth?: number
  lineColor?: string
  /**
   * Distance between each line.
   */
  distance?: number
  /**
   * Sets of lines per interval animation.
   */
  sets?: number
}

interface CreateBackgroundMovingLinesProps {
  canvas: HTMLCanvasElement
  animator?: AnimatorNode
  settingsRef: { current: CreateBackgroundMovingLinesSettings }
}

interface BackgroundMovingLines {
  cancel: () => void
}

interface MovingLinesLineConfig {
  distance: number
  positionsLength: number
  margin: number
  size: number
}

interface MovingLinesLine {
  axis1: number
  axis2Initial: number
  length: number
}

const defaultProps: Required<CreateBackgroundMovingLinesSettings> = {
  lineWidth: 1,
  lineColor: '#777',
  distance: 30,
  sets: 5
}

const random = (min: number, max: number): number => (max - min) * Math.random()
const minmaxOverflow01 = (value: number): number =>
  Math.min(1, Math.max(0, value === 1 ? 1 : value % 1))

// Create a list of lines in the given available canvas axis size.
// The lines are placed at random positions in the grid.
const createLinesSet = (config: MovingLinesLineConfig): MovingLinesLine[] => {
  const { distance, positionsLength, margin, size } = config

  const linesLength = Math.floor(random(0.1, 0.5) * positionsLength)
  const positions = Array(positionsLength)
    .fill(0)
    .map((_, i) => i)
  const positionsRandom = randomizeList(positions)
  const positionsSelected = positionsRandom.slice(0, linesLength)

  return positionsSelected.map((position) => {
    const axis1 = margin / 2 + position * distance
    const axis2Initial = Math.random() * (size / 2)
    const length = Math.floor(random(0.1, 0.5) * size)
    return { axis1, axis2Initial, length }
  })
}

const createBackgroundMovingLines = (
  props: CreateBackgroundMovingLinesProps
): BackgroundMovingLines => {
  const { canvas, animator } = props
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return { cancel: () => {} }
  }

  let resizeObserver: ResizeObserver | undefined
  let transitionControl: Animation | undefined
  let runningControl: Animation | undefined
  let unsubscribe: (() => void) | undefined
  let linesSets: MovingLinesLine[][] = []

  const getSettings = (): Required<CreateBackgroundMovingLinesSettings> => ({
    ...defaultProps,
    ...props.settingsRef.current
  })

  const resize = (): void => {
    const dpr = Math.min(window.devicePixelRatio || 2, 2)
    const { width, height } = canvas.getBoundingClientRect()

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr
      canvas.height = height * dpr
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0) // Reset scale to identical.
    ctx.scale(dpr, dpr)
  }

  const draw = (intervalProgress: number): void => {
    const { lineWidth, lineColor, distance, sets: linesSetsLength } = getSettings()

    const { width, height } = canvas
    const isResized = canvas.width !== width || canvas.height !== height

    const axis1Size = width
    const axis2Size = height
    const positionsLength = 1 + Math.floor(axis1Size / distance)
    const margin = axis1Size % distance

    ctx.clearRect(0, 0, width, height)

    ctx.lineWidth = lineWidth
    ctx.strokeStyle = lineColor
    ctx.shadowBlur = lineWidth
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0
    ctx.shadowColor = lineColor

    if (linesSets.length === 0 || isResized) {
      linesSets = Array(linesSetsLength)
        .fill(null)
        .map(() => createLinesSet({ positionsLength, margin, distance, size: axis2Size }))
    }

    linesSets.forEach((linesSet, linesSetIndex) => {
      // "intervalProgress" goes from 0 to 1 repeatedly indicating each interval.
      // Every set of lines will have an progress offset so the its animation
      // starts/ends at different times than each other.
      // Since those sets will start later in time, they will end faster, so
      // when they do, they extra progress offset will start from the beginning.
      // So if one set ends at 1.23 in the animation progress, it overflows
      // and becomes 0.23.
      const linesSetProgressOffset = (1 / linesSetsLength) * linesSetIndex
      const progress = minmaxOverflow01(intervalProgress + linesSetProgressOffset)
      const progressEase = easing.inOutCubic(progress)

      linesSet.forEach((line) => {
        const { axis1, axis2Initial, length } = line

        // Move the line from before to after the visible space.
        const axis2Move = axis2Size * 2 * progressEase - axis2Size

        ctx.beginPath()
        ctx.moveTo(axis1, axis2Size - (axis2Initial + axis2Move))
        ctx.lineTo(axis1, axis2Size - (axis2Initial + length + axis2Move))
        ctx.stroke()
        ctx.closePath()
      })
    })
  }

  const run = (): void => {
    if (!animator) {
      return
    }

    const {
      duration: { interval = 10 }
    } = animator.settings

    runningControl?.cancel()
    runningControl = createAnimation({
      duration: interval,
      easing: 'linear',
      repeat: Infinity,
      onUpdate: draw
    })
  }

  const setup = (): void => {
    if (typeof window !== 'undefined' && !resizeObserver) {
      resizeObserver = new window.ResizeObserver(() => {
        resize()
        if (!animator) {
          draw(1)
        }
      })
      resizeObserver.observe(canvas)
      resize()
    }
  }

  const stop = (): void => {
    resizeObserver?.disconnect()
    resizeObserver = undefined

    transitionControl?.cancel()
    transitionControl = undefined

    runningControl?.cancel()
    runningControl = undefined
  }

  const start = (): void => {
    if (!animator) {
      setup()
      draw(1)
      canvas.style.opacity = '1'

      return
    }

    unsubscribe = animator.subscribe((node) => {
      switch (node.state) {
        case 'entering': {
          setup()
          if (runningControl === undefined) {
            run()
          }
          transitionControl = createAnimation({
            duration: node.settings.duration.enter,
            onUpdate(progress) {
              canvas.style.opacity = String(progress)
            }
          })
          break
        }

        case 'entered': {
          setup()
          if (runningControl === undefined) {
            run()
          }
          canvas.style.opacity = '1'
          break
        }

        case 'exiting': {
          transitionControl = createAnimation({
            duration: node.settings.duration.exit,
            onUpdate(progress) {
              canvas.style.opacity = String(1 - progress)
            }
          })
          break
        }

        case 'exited': {
          stop()
          canvas.style.opacity = '0'
          break
        }
      }
    })
  }

  const cancel = (): void => {
    unsubscribe?.()
    stop()
    canvas.style.opacity = '0'
  }

  start()

  return Object.freeze({ cancel })
}

export type {
  CreateBackgroundMovingLinesProps,
  CreateBackgroundMovingLinesSettings,
  BackgroundMovingLines
}
export { createBackgroundMovingLines }
