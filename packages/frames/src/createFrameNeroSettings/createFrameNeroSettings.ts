import { filterProps } from '@arwes/tools'
import type { FrameSettings } from '../types.js'

type CreateFrameNeroSettingsProps = {
  styled?: boolean
  animated?: boolean
  padding?: number
  cornerLength?: number
  cornerWidth?: number
}

const defaultProps: Required<CreateFrameNeroSettingsProps> = {
  styled: true,
  animated: true,
  padding: 0,
  cornerLength: 24,
  cornerWidth: 2
}

const createFrameNeroSettings = (props?: CreateFrameNeroSettingsProps): FrameSettings => {
  const {
    styled,
    animated,
    padding: p,
    cornerWidth,
    cornerLength
  } = { ...defaultProps, ...(props ? filterProps(props) : null) }

  const cornerHalf = cornerLength / 2
  const cornerInternal = cornerLength / 2 - cornerWidth * 2

  return {
    elements: [
      {
        type: 'rect',
        name: 'bg',
        x: p,
        y: p,
        width: `100% - ${p * 2}`,
        height: `100% - ${p * 2}`,
        style: {
          filter: styled ? 'var(--arwes-frames-bg-filter)' : undefined,
          fill: styled ? 'var(--arwes-frames-bg-color, currentcolor)' : undefined,
          strokeWidth: styled ? '0' : undefined
        },
        animated: animated && {
          transitions: {
            entering: ({ element, duration, animate }) =>
              animate(
                element,
                { opacity: [0, 1, 0.5, 1] },
                { delay: duration / 2, duration: duration / 2 }
              ),
            exiting: ({ element, duration, animate }) =>
              animate(element, { opacity: [1, 0, 0.5, 0] }, { duration: duration / 2 })
          }
        }
      },
      {
        type: 'g',
        name: 'deco',
        style: {
          filter: styled ? 'var(--arwes-frames-deco-filter)' : undefined,
          fill: styled ? 'var(--arwes-frames-deco-color, currentcolor)' : undefined,
          strokeWidth: styled ? '0' : undefined
        },
        animated: animated && {
          transitions: {
            entering: ({ element, duration, animate }) =>
              animate(element, { opacity: [0, 1, 0.5, 1] }, { duration: duration / 2 }),
            exiting: ({ element, duration, animate }) =>
              animate(
                element,
                { opacity: [1, 0, 0.5, 0] },
                { delay: duration / 2, duration: duration / 2 }
              )
          }
        },
        elements: [
          {
            type: 'path',
            path: [
              ['M', p, p],
              ['h', cornerLength],
              ['l', -cornerWidth, cornerWidth],
              ['h', -cornerHalf],
              ['l', -cornerInternal, cornerInternal],
              ['v', cornerHalf],
              ['l', -cornerWidth, cornerWidth],
              'z'
            ],
            animated: animated && {
              transitions: {
                entering: { x: [cornerLength, 0], y: [cornerLength, 0], easing: 'outExpo' },
                exiting: { x: [0, cornerLength], y: [0, cornerLength], easing: 'outExpo' }
              }
            }
          },
          {
            type: 'path',
            path: [
              ['M', `100% - ${p}`, p],
              ['v', cornerLength],
              ['l', -cornerWidth, -cornerWidth],
              ['v', -cornerHalf],
              ['l', -cornerInternal, -cornerInternal],
              ['h', -cornerHalf],
              ['l', -cornerWidth, -cornerWidth],
              'z'
            ],
            animated: animated && {
              transitions: {
                entering: { x: [-cornerLength, 0], y: [cornerLength, 0], easing: 'outExpo' },
                exiting: { x: [0, -cornerLength], y: [0, cornerLength], easing: 'outExpo' }
              }
            }
          },
          {
            type: 'path',
            path: [
              ['M', `100% - ${p}`, `100% - ${p}`],
              ['h', -cornerLength],
              ['l', cornerWidth, -cornerWidth],
              ['h', cornerHalf],
              ['l', cornerInternal, -cornerInternal],
              ['v', -cornerHalf],
              ['l', cornerWidth, -cornerWidth],
              'z'
            ],
            animated: animated && {
              transitions: {
                entering: { x: [-cornerLength, 0], y: [-cornerLength, 0], easing: 'outExpo' },
                exiting: { x: [0, -cornerLength], y: [0, -cornerLength], easing: 'outExpo' }
              }
            }
          },
          {
            type: 'path',
            path: [
              ['M', p, `100% - ${p}`],
              ['h', cornerLength],
              ['l', -cornerWidth, -cornerWidth],
              ['h', -cornerHalf],
              ['l', -cornerInternal, -cornerInternal],
              ['v', -cornerHalf],
              ['l', -cornerWidth, -cornerWidth],
              'z'
            ],
            animated: animated && {
              transitions: {
                entering: { x: [cornerLength, 0], y: [-cornerLength, 0], easing: 'outExpo' },
                exiting: { x: [0, cornerLength], y: [0, -cornerLength], easing: 'outExpo' }
              }
            }
          }
        ]
      }
    ]
  }
}

export type { CreateFrameNeroSettingsProps }
export { createFrameNeroSettings }
