import { filterProps } from '@arwes/tools'
import type { FrameSettings } from '../types.js'
import { animate } from 'motion'

type CreateFrameCircleSettingsProps = {
  styled?: boolean
  animated?: boolean
  padding?: number
  strokeWidth?: number
  separation?: number
  sideWidth?: number
}

const defaultProps: Required<CreateFrameCircleSettingsProps> = {
  styled: true,
  animated: true,
  padding: 0,
  strokeWidth: 1,
  separation: 0,
  sideWidth: 24
}

const createFrameCircleSettings = (props?: CreateFrameCircleSettingsProps): FrameSettings => {
  const {
    styled,
    animated,
    padding: p,
    strokeWidth,
    separation,
    sideWidth
  } = { ...defaultProps, ...(props ? filterProps(props) : null) }

  const strokeOffset = strokeWidth / 2

  return {
    elements: [
      {
        type: 'g',
        style: {
          transformOrigin: 'center'
        },
        animated: animated && {
          initialStyle: { rotate: -45 },
          transitions: {
            entering: { rotate: [-45, 0], easing: 'outExpo' },
            exiting: { rotate: [0, 45], easing: 'outExpo' }
          }
        },
        elements: [
          {
            type: 'g',
            animated: animated && {
              transitions: {
                entering: ({ element, duration }) =>
                  animate(
                    element,
                    { opacity: [0, 1, 0.5, 1] },
                    { delay: duration / 2, duration: duration / 2 }
                  ),
                exiting: ({ element, duration }) =>
                  animate(element, { opacity: [1, 0, 0.5, 0] }, { duration: duration / 2 })
              }
            },
            elements: [
              {
                type: 'ellipse',
                name: 'bg',
                cx: '50%',
                cy: '50%',
                rx: `50% - ${p + strokeWidth + strokeWidth * 3 + separation}`,
                ry: `50% - ${p + strokeWidth + strokeWidth * 3 + separation}`,
                style: {
                  filter: styled ? 'var(--arwes-frames-bg-filter)' : undefined,
                  fill: styled ? 'var(--arwes-frames-bg-color, currentcolor)' : undefined,
                  stroke: styled ? 'none' : undefined,
                  strokeWidth: '0'
                }
              },
              {
                type: 'ellipse',
                name: 'line',
                cx: '50%',
                cy: '50%',
                rx: `50% - ${p + strokeOffset + strokeWidth * 3}`,
                ry: `50% - ${p + strokeOffset + strokeWidth * 3}`,
                style: {
                  filter: styled ? 'var(--arwes-frames-line-filter)' : undefined,
                  fill: styled ? 'none' : undefined,
                  stroke: styled ? 'var(--arwes-frames-line-color, currentcolor)' : undefined,
                  strokeWidth: String(strokeWidth)
                }
              }
            ]
          },
          {
            type: 'g',
            name: 'deco',
            style: {
              transformOrigin: 'center'
            },
            animated: animated && {
              transitions: {
                entering: ({ element, duration }) =>
                  animate(
                    element,
                    { opacity: [0, 1, 0.5, 1], scale: [0.9, 1] },
                    { duration: duration / 2 }
                  ),
                exiting: ({ element, duration }) =>
                  animate(
                    element,
                    { opacity: [1, 0, 0.5, 0], scale: [1, 0.9] },
                    { delay: duration / 2, duration: duration / 2 }
                  )
              }
            },
            elements: [
              {
                type: 'ellipse',
                cx: '50%',
                cy: '50%',
                rx: `50% - ${p + strokeOffset + strokeWidth * 3}`,
                ry: `50% - ${p + strokeOffset + strokeWidth * 3}`,
                style: {
                  filter: styled ? 'var(--arwes-frames-deco-filter)' : undefined,
                  fill: styled ? 'none' : undefined,
                  stroke: styled ? 'var(--arwes-frames-deco-color, currentcolor)' : undefined,
                  strokeWidth: String(strokeWidth),
                  transformOrigin: 'center',
                  rotate: -(360 / 16)
                },
                // TODO: Should this be executed as a context state animation or
                // better as an imperative function in an element on render/draw.
                contexts: {
                  status: {
                    initial: {
                      animate: ({ element }) => {
                        const radius = Number(element.getAttribute('rx'))
                        const length = radius * Math.PI * 2
                        element.setAttribute('stroke-dasharray', String(length / 8))
                      }
                    }
                  }
                }
              },
              {
                type: 'g',
                style: {
                  filter: styled ? 'var(--arwes-frames-deco-filter)' : undefined,
                  fill: styled ? 'var(--arwes-frames-deco-color, currentcolor)' : undefined,
                  stroke: styled ? 'none' : undefined,
                  strokeWidth: '0'
                },
                elements: [
                  {
                    type: 'path',
                    path: [
                      ['M', p, `50% - ${sideWidth * 0.2}`],
                      ['l', strokeWidth * 2, -sideWidth * 0.3],
                      ['h', strokeWidth * 2],
                      ['v', sideWidth],
                      ['h', -strokeWidth * 2],
                      ['l', -strokeWidth * 2, -sideWidth * 0.3],
                      'z'
                    ]
                  },
                  {
                    type: 'path',
                    path: [
                      ['M', `100% - ${p}`, `50% - ${sideWidth * 0.2}`],
                      ['l', -strokeWidth * 2, -sideWidth * 0.3],
                      ['h', -strokeWidth * 2],
                      ['v', sideWidth],
                      ['h', strokeWidth * 2],
                      ['l', strokeWidth * 2, -sideWidth * 0.3],
                      'z'
                    ]
                  },
                  {
                    type: 'path',
                    path: [
                      ['M', `50% + ${sideWidth * 0.2}`, p],
                      ['l', sideWidth * 0.3, strokeWidth * 2],
                      ['v', strokeWidth * 2],
                      ['h', -sideWidth],
                      ['v', -strokeWidth * 2],
                      ['l', sideWidth * 0.3, -strokeWidth * 2],
                      'z'
                    ]
                  },
                  {
                    type: 'path',
                    path: [
                      ['M', `50% + ${sideWidth * 0.2}`, `100% - ${p}`],
                      ['l', sideWidth * 0.3, -strokeWidth * 2],
                      ['v', -strokeWidth * 2],
                      ['h', -sideWidth],
                      ['v', strokeWidth * 2],
                      ['l', sideWidth * 0.3, strokeWidth * 2],
                      'z'
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],

    contexts: {
      status: 'initial'
    }
  }
}

export type { CreateFrameCircleSettingsProps }
export { createFrameCircleSettings }
