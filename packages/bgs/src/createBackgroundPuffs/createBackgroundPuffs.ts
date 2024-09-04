import { type Animation, easing, createAnimation } from '@arwes/animated'
import type { AnimatorNode } from '@arwes/animator'

interface CreateBackgroundPuffsSettings {
  /**
   * Puff color.
   */
  color: string
  /**
   * Number of puffs to create.
   */
  quantity: number
  /**
   * Extra padding space in pixels of the canvas so the puffs have space to
   * move when animating.
   */
  padding?: number
  /**
   * Position X offset to animate in pixels. A static value and a dynamic value.
   * @example
   * [10, 50] means it will at least move 10 pixels to the right and plus
   * a random value between 0 and 50 more.
   */
  xOffset?: [number, number]
  /**
   * Position Y offset to animate in pixels. A static value and a dynamic value.
   * @example
   * [10, 50] means it will at least move 10 pixels to the bottom and plus
   * a random value between 0 and 50 more.
   */
  yOffset?: [number, number]
  /**
   * Radius initial value in pixels.
   */
  radiusInitial?: number
  /**
   * Puff radius offset fixed and variation values in pixels.
   * @example
   * [4, 8] means the puff radius offset will be at least 4 pixels plus a random
   * value between 0 and 8 more.
   */
  radiusOffset?: [number, number]
  /**
   * Sets of puffs per interval animation.
   */
  sets?: number
}

interface CreateBackgroundPuffsProps {
  canvas: HTMLCanvasElement
  animator?: AnimatorNode
  settingsRef: { current: CreateBackgroundPuffsSettings }
}

interface BackgroundPuffs {
  cancel: () => void
}

interface Puff {
  x: number
  y: number
  r: number
  xo: number
  yo: number
  ro: number
}

const defaultProps: Required<CreateBackgroundPuffsSettings> = {
  color: '#777',
  quantity: 10,
  padding: 50,
  xOffset: [0, 0],
  yOffset: [-10, -100],
  radiusInitial: 4,
  radiusOffset: [4, 40],
  sets: 5
}

const minmaxOverflow01 = (value: number): number =>
  Math.min(1, Math.max(0, value === 1 ? 1 : value % 1))

const createBackgroundPuffs = (props: CreateBackgroundPuffsProps): BackgroundPuffs => {
  const { canvas, animator } = props
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return { cancel: () => {} }
  }

  let resizeObserver: ResizeObserver | undefined
  let transitionControl: Animation | undefined
  let runningControl: Animation | undefined
  let unsubscribe: (() => void) | undefined
  let runningControlTimeoutId: number | undefined
  let puffsSets: Puff[][] = []

  const getSettings = (): Required<CreateBackgroundPuffsSettings> => ({
    ...defaultProps,
    ...props.settingsRef.current
  })

  const createPuff = (width: number, height: number): Puff => {
    const { padding, xOffset, yOffset, radiusInitial, radiusOffset } = getSettings()

    const x = padding + Math.random() * (width - padding * 2)
    const y = padding + Math.random() * (height - padding * 2)
    const r = radiusInitial

    const xo = xOffset[0] + Math.random() * xOffset[1]
    const yo = yOffset[0] + Math.random() * yOffset[1]
    const ro = radiusOffset[0] + Math.random() * radiusOffset[1]

    return { x, y, r, xo, yo, ro }
  }

  const createPuffsSets = (width: number, height: number): Puff[][] => {
    const { quantity, sets } = getSettings()
    const puffsSetQuantity = Math.round(quantity / sets)

    return Array(sets)
      .fill(null)
      .map(() =>
        Array(puffsSetQuantity)
          .fill(null)
          .map(() => createPuff(width, height))
      )
  }

  const resize = (): void => {
    const dpr = Math.min(window.devicePixelRatio || 2, 2)
    const { width, height } = canvas.getBoundingClientRect()

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr
      canvas.height = height * dpr
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0) // Reset scale to identical.
    ctx.scale(dpr, dpr)

    puffsSets = createPuffsSets(width, height)
  }

  const drawPuffs = (puffs: Puff[], progress: number): void => {
    const { color } = getSettings()

    // From: 0 at 0%, 1 at 50%, 0 at 100%.
    ctx.globalAlpha = progress <= 0.5 ? progress * 2 : -2 * progress + 2

    puffs.forEach((puff) => {
      const x = puff.x + progress * puff.xo
      const y = puff.y + progress * puff.yo
      const r = puff.r + progress * puff.ro

      const grd = ctx.createRadialGradient(x, y, 0, x, y, r)
      grd.addColorStop(0, color)
      grd.addColorStop(1, 'transparent')

      ctx.beginPath()
      ctx.fillStyle = grd
      ctx.arc(x, y, r, 0, 2 * Math.PI)
      ctx.fill()
      ctx.closePath()
    })
  }

  const draw = (progress: number): void => {
    const { sets } = getSettings()
    const { width, height } = canvas
    const puffsSetOffset = 1 / sets

    ctx.clearRect(0, 0, width, height)

    puffsSets.forEach((puffs, index) => {
      const puffsOffset = puffsSetOffset * index
      const puffsProgress = minmaxOverflow01(progress + puffsOffset)
      drawPuffs(puffs, easing.outSine(puffsProgress))
    })
  }

  const run = (): void => {
    if (!animator) {
      return
    }

    const {
      duration: { interval = 2, intervalPause = 0 }
    } = animator.settings

    runningControl?.cancel()
    runningControl = createAnimation({
      duration: interval,
      easing: 'linear',
      onUpdate(progress) {
        draw(progress)
      },
      onFinish() {
        const emptyDuration = intervalPause * 1_000
        window.clearTimeout(runningControlTimeoutId)
        runningControlTimeoutId = window.setTimeout(run, emptyDuration)
      }
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

    window.clearTimeout(runningControlTimeoutId)
    runningControlTimeoutId = undefined
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
          transitionControl?.cancel()
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
          transitionControl?.cancel()
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

export type { CreateBackgroundPuffsSettings, CreateBackgroundPuffsProps, BackgroundPuffs }
export { createBackgroundPuffs }
