import { filterProps } from '@arwes/tools'
import type { FrameSettingsElement, FrameSettingsPathDefinition, FrameSettings } from '../types.js'

type CreateFrameNefrexSettingsProps = {
  styled?: boolean
  animated?: boolean
  padding?: number
  leftTop?: boolean
  leftBottom?: boolean
  rightTop?: boolean
  rightBottom?: boolean
  squareSize?: number
  strokeWidth?: number
  smallLineLength?: number
  largeLineLength?: number
}

const defaultProps: Required<CreateFrameNefrexSettingsProps> = {
  styled: true,
  animated: true,
  padding: 0,
  leftTop: true,
  leftBottom: false,
  rightTop: false,
  rightBottom: true,
  squareSize: 16,
  strokeWidth: 1,
  smallLineLength: 16,
  largeLineLength: 64
}

const createFrameNefrexSettings = (props?: CreateFrameNefrexSettingsProps): FrameSettings => {
  const {
    styled,
    animated,
    padding: p,
    leftTop,
    leftBottom,
    rightTop,
    rightBottom,
    squareSize: ss,
    strokeWidth,
    smallLineLength,
    largeLineLength
  } = { ...defaultProps, ...(props ? filterProps(props) : null) }

  const so = strokeWidth / 2 // Stroke offset.

  const bgLeftTop: FrameSettingsPathDefinition = leftTop
    ? [
        ['M', p + so, p + so + ss + smallLineLength],
        ['v', -smallLineLength],
        ['l', ss, -ss],
        ['h', largeLineLength]
      ]
    : [['M', p + so, p + so]]

  const bgRightTop: FrameSettingsPathDefinition = rightTop
    ? [
        ['L', `100% - ${p + so + ss + largeLineLength}`, p + so],
        ['h', largeLineLength],
        ['l', ss, ss],
        ['v', smallLineLength]
      ]
    : [['L', `100% - ${p + so}`, p + so]]

  const bgRightBottom: FrameSettingsPathDefinition = rightBottom
    ? [
        ['L', `100% - ${p + so}`, `100% - ${p + so + ss + smallLineLength}`],
        ['v', smallLineLength],
        ['l', -ss, ss],
        ['h', -largeLineLength]
      ]
    : [['L', `100% - ${p + so}`, `100% - ${p + so}`]]

  const bgLeftBottom: FrameSettingsPathDefinition = leftBottom
    ? [
        ['L', p + so + ss + largeLineLength, `100% - ${p + so}`],
        ['h', -largeLineLength],
        ['l', -ss, -ss],
        ['v', -smallLineLength]
      ]
    : [['L', p + so, `100% - ${p + so}`]]

  const elements: FrameSettingsElement[] = [
    {
      name: 'bg',
      style: {
        filter: styled ? 'var(--arwes-frames-bg-filter)' : undefined,
        fill: styled ? 'var(--arwes-frames-bg-color, currentcolor)' : undefined,
        strokeWidth: 0
      },
      animated: animated && {
        transitions: {
          entering: ({ element, duration, animate }) =>
            animate(element, { opacity: [0, 1] }, { duration: duration / 2, delay: duration / 2 }),
          exiting: ({ element, duration, animate, easing }) =>
            animate(element, { opacity: [1, 0] }, { duration: duration / 2, ease: easing.outExpo })
        }
      },
      path: bgLeftTop.concat(bgRightTop).concat(bgRightBottom).concat(bgLeftBottom)
    },
    {
      type: 'g',
      style: {
        filter: styled ? 'var(--arwes-frames-line-filter)' : undefined,
        fill: styled ? 'none' : undefined,
        stroke: styled ? 'var(--arwes-frames-line-color, currentcolor)' : undefined,
        strokeLinecap: styled ? 'round' : undefined,
        strokeLinejoin: styled ? 'round' : undefined,
        strokeWidth: String(strokeWidth)
      },
      elements: [
        {
          type: 'g',
          animated: animated && [['x', ss, 0, undefined, 'outExpo']],
          elements: [
            leftTop && {
              name: 'line',
              animated: animated && ['draw'],
              path: [
                ['M', p + so, p + so + ss + smallLineLength],
                ['v', -smallLineLength],
                ['l', ss, -ss],
                ['h', largeLineLength]
              ]
            },
            leftBottom && {
              name: 'line',
              animated: animated && ['draw'],
              path: [
                ['M', p + so, `100% - ${p + so + ss + smallLineLength}`],
                ['v', smallLineLength],
                ['l', ss, ss],
                ['h', largeLineLength]
              ]
            }
          ].filter(Boolean) as FrameSettingsElement[]
        },
        {
          type: 'g',
          animated: animated && [['x', -ss, 0, undefined, 'outExpo']],
          elements: [
            rightTop && {
              name: 'line',
              animated: animated && ['draw'],
              path: [
                ['M', `100% - ${p + so}`, p + so + ss + smallLineLength],
                ['v', -smallLineLength],
                ['l', -ss, -ss],
                ['h', -largeLineLength]
              ]
            },
            rightBottom && {
              name: 'line',
              animated: animated && ['draw'],
              path: [
                ['M', `100% - ${p + so}`, `100% - ${p + so + ss + smallLineLength}`],
                ['v', smallLineLength],
                ['l', -ss, ss],
                ['h', -largeLineLength]
              ]
            }
          ].filter(Boolean) as FrameSettingsElement[]
        }
      ]
    }
  ]

  return { elements }
}

export type { CreateFrameNefrexSettingsProps }
export { createFrameNefrexSettings }
