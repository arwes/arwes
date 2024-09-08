import { filterProps } from '@arwes/tools'
import { type AnimatedCSSProps } from '@arwes/animated'
import type { FrameSettingsElement, FrameSettingsPathDefinition, FrameSettings } from '../types.js'

type CreateFrameNefrexSettingsProps = {
  styled?: boolean
  squareSize?: number
  padding?: number
  strokeWidth?: number
  smallLineLength?: number
  largeLineLength?: number
}

const defaultProps: Required<CreateFrameNefrexSettingsProps> = {
  styled: true,
  squareSize: 16,
  strokeWidth: 1,
  smallLineLength: 16,
  largeLineLength: 64,
  padding: 0
}

type Point = [number | string, number | string]

const toPath = (points: Point[]): FrameSettingsPathDefinition =>
  points.map((p, i) => [i === 0 ? 'M' : 'L', ...p])

const createFrameNefrexSettings = (props?: CreateFrameNefrexSettingsProps): FrameSettings => {
  const {
    styled,
    squareSize: ss,
    strokeWidth,
    smallLineLength: sll,
    largeLineLength: lll,
    padding: p
  } = { ...defaultProps, ...(props ? filterProps(props) : null) }

  const so = strokeWidth / 2 // Stroke offset.

  const polylineStyle: AnimatedCSSProps | undefined = styled
    ? {
        filter: 'var(--arwes-frames-line-filter)',
        stroke: 'var(--arwes-frames-line-color, currentcolor)',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: String(strokeWidth),
        fill: 'none'
      }
    : undefined

  const leftTopLine: Point[] = [
    [so + p, sll + ss + so + p],
    [so + p, ss + so + p],
    [ss + so + p, so + p],
    [ss + lll + so + p, so + p]
  ]

  const rightBottomLine: Point[] = [
    [`100% - ${so + p}`, `100% - ${sll + ss + so + p}`],
    [`100% - ${so + p}`, `100% - ${ss + so + p}`],
    [`100% - ${ss + so + p}`, `100% - ${so + p}`],
    [`100% - ${ss + lll + so + p}`, `100% - ${so + p}`]
  ]

  const elements: FrameSettingsElement[] = [
    {
      name: 'bg',
      style: styled
        ? {
            strokeWidth: 0,
            fill: 'var(--arwes-frames-bg-color, currentcolor)',
            filter: 'var(--arwes-frames-bg-filter)'
          }
        : undefined,
      path: toPath(
        leftTopLine
          .concat([[`100% - ${so + p}`, so + p]])
          .concat(rightBottomLine)
          .concat([[so + p, `100% - ${so + p}`]])
      ).concat('Z')
    },
    {
      name: 'line',
      style: polylineStyle,
      path: toPath(leftTopLine)
    },
    {
      name: 'line',
      style: polylineStyle,
      path: toPath(rightBottomLine)
    }
  ]

  return { elements }
}

export type { CreateFrameNefrexSettingsProps }
export { createFrameNefrexSettings }
