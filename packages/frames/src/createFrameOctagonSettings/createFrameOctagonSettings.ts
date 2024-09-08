import { filterProps } from '@arwes/tools'
import { type AnimatedCSSProps } from '@arwes/animated'
import type { FrameSettingsElement, FrameSettingsPathDefinition, FrameSettings } from '../types.js'

type CreateFrameOctagonSettingsProps = {
  styled?: boolean
  leftTop?: boolean
  rightTop?: boolean
  rightBottom?: boolean
  leftBottom?: boolean
  squareSize?: number
  padding?: number
  strokeWidth?: number
}

const defaultProps: Required<CreateFrameOctagonSettingsProps> = {
  styled: true,
  leftTop: true,
  rightTop: true,
  rightBottom: true,
  leftBottom: true,
  squareSize: 16,
  strokeWidth: 1,
  padding: 0
}

type Point = [number | string, number | string]

const toPath = (points: Point[]): FrameSettingsPathDefinition =>
  points.map((p, i) => [i === 0 ? 'M' : 'L', ...p])

const createFrameOctagonSettings = (props?: CreateFrameOctagonSettingsProps): FrameSettings => {
  const {
    styled,
    leftTop,
    rightTop,
    rightBottom,
    leftBottom,
    squareSize: ss,
    strokeWidth,
    padding: p
  } = { ...defaultProps, ...(props ? filterProps(props) : null) }

  const so = strokeWidth / 2

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

  const leftTopPoints: Point[] = leftTop
    ? [
        [ss + so + p, so + p],
        [so + p, ss + so + p]
      ]
    : [[so + p, so + p]]

  const leftBottomPoints: Point[] = leftBottom
    ? [
        [so + p, `100% - ${ss + p}`],
        [ss + so + p, `100% - ${so + p}`]
      ]
    : [[so + p, `100% - ${so + p}`]]

  const rightBottomPoints: Point[] = rightBottom
    ? [
        [`100% - ${ss + so + p}`, `100% - ${so + p}`],
        [`100% - ${so + p}`, `100% - ${ss + so + p}`]
      ]
    : [[`100% - ${so + p}`, `100% - ${so + p}`]]

  const rightTopPoints: Point[] = rightTop
    ? [
        [`100% - ${so + p}`, ss - so + p],
        [`100% - ${ss - so + p}`, so + p]
      ]
    : [[`100% - ${so + p}`, so + p]]

  // leftTop > leftBottom > rightBottom
  const polyline1 = toPath([...leftTopPoints, ...leftBottomPoints, rightBottomPoints[0]])

  // rightBottom > rightTop > leftTop
  const polyline2 = toPath([...rightBottomPoints, ...rightTopPoints, leftTopPoints[0]])

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
      path: polyline1.concat(polyline2)
    },
    {
      name: 'line',
      style: polylineStyle,
      path: polyline1
    },
    {
      name: 'line',
      style: polylineStyle,
      path: polyline2
    }
  ]

  return { elements }
}

export type { CreateFrameOctagonSettingsProps }
export { createFrameOctagonSettings }
