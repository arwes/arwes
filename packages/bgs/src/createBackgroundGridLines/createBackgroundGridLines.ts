import { type Animation, createAnimation } from '@arwes/animated'
import type { AnimatorNode } from '@arwes/animator'

interface CreateBackgroundGridLinesSettings {
  lineWidth?: number
  lineColor?: string
  horizontalLineDash?: number[]
  verticalLineDash?: number[]
  /**
   * Distance between each line.
   */
  distance?: number
}

interface CreateBackgroundGridLinesProps {
  canvas: HTMLCanvasElement
  animator?: AnimatorNode
  settingsRef: { current: CreateBackgroundGridLinesSettings }
}

interface BackgroundGridLines {
  cancel: () => void
}

const defaultProps: Required<CreateBackgroundGridLinesSettings> = {
  lineWidth: 1,
  lineColor: '#777',
  horizontalLineDash: [4],
  verticalLineDash: [],
  distance: 30
}

const createBackgroundGridLines = (props: CreateBackgroundGridLinesProps): BackgroundGridLines => {
  const { canvas, animator } = props
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return { cancel: () => {} }
  }

  let resizeObserver: ResizeObserver | undefined
  let transitionControl: Animation | undefined
  let unsubscribe: (() => void) | undefined

  const getSettings = (): Required<CreateBackgroundGridLinesSettings> => ({
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

  const draw = (): void => {
    const { lineWidth, lineColor, horizontalLineDash, verticalLineDash, distance } = getSettings()

    const { width, height } = canvas

    const xLength = 1 + Math.floor(width / distance)
    const yLength = 1 + Math.floor(height / distance)

    const xMargin = width % distance
    const yMargin = height % distance

    ctx.clearRect(0, 0, width, height)

    ctx.lineWidth = lineWidth
    ctx.strokeStyle = lineColor

    // Horizontal lines.

    ctx.setLineDash(horizontalLineDash)

    for (let yIndex = 0; yIndex < yLength; yIndex++) {
      const y = yMargin / 2 + yIndex * distance

      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
      ctx.closePath()
    }

    // Vertical lines.

    ctx.setLineDash(verticalLineDash)

    for (let xIndex = 0; xIndex < xLength; xIndex++) {
      const x = xMargin / 2 + xIndex * distance

      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
      ctx.closePath()
    }
  }

  const setup = (): void => {
    if (typeof window !== 'undefined' && !resizeObserver) {
      resizeObserver = new window.ResizeObserver(() => {
        resize()
        draw()
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
  }

  const start = (): void => {
    if (!animator) {
      setup()
      draw()
      canvas.style.opacity = '1'

      return
    }

    unsubscribe = animator.subscribe((node) => {
      switch (node.state) {
        case 'entering': {
          setup()
          draw()
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
          draw()
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
  CreateBackgroundGridLinesProps,
  CreateBackgroundGridLinesSettings,
  BackgroundGridLines
}
export { createBackgroundGridLines }
