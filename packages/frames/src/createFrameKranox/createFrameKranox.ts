import { filterProps } from '@arwes/tools'
import { type AnimatedCSSProps } from '@arwes/animated'
import type { FrameSettingsPathDefinition, FrameSettingsElement, Frame } from '../types.js'
import { createFrame } from '../createFrame/index.js'

type CreateFrameKranoxProps = {
  styled?: boolean
  padding?: number
  strokeWidth?: number
  bgStrokeWidth?: number
  squareSize?: number
  smallLineLength?: number
  largeLineLength?: number
}

const defaultProps: Required<CreateFrameKranoxProps> = {
  styled: true,
  padding: 0,
  strokeWidth: 2,
  bgStrokeWidth: 0,
  squareSize: 16,
  smallLineLength: 16,
  largeLineLength: 64
}

type Point = [number | string, number | string]

const toPath = (points: Point[]): FrameSettingsPathDefinition =>
  points.map((p, i) => [i === 0 ? 'M' : 'L', ...p])

const createFrameKranox = (svg: SVGSVGElement, props?: CreateFrameKranoxProps): Frame => {
  const {
    styled,
    padding: p,
    strokeWidth: sw,
    bgStrokeWidth: bsw,
    squareSize: ss,
    smallLineLength: sll,
    largeLineLength: lll
  } = { ...defaultProps, ...(props ? filterProps(props) : null) }

  const so = sw / 2 // Stroke offset.
  const bso = bsw / 2 // Background stroke offset.

  const polylineStyle: AnimatedCSSProps | undefined = styled
    ? {
        stroke: 'var(--arwes-frames-line-color, currentcolor)',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: String(sw),
        fill: 'none',
        filter: 'var(--arwes-frames-line-filter)'
      }
    : undefined

  // Left-bottom > left-top > right-top.
  const leftTopBgPolyline: Point[] = [
    // Left-bottom.
    [p + bso + ss * 2, `100% - ${p + bso + sw * 2}`],
    [p + bso + ss, `100% - ${p + bso + sw * 2 + ss}`],
    // Left.
    [p + bso + ss, p + bso + sw * 2 + lll + ss * 3 + sll],
    [p + bso, p + bso + sw * 2 + lll + ss * 2 + sll],
    [p + bso, p + bso + sw * 2 + ss * 2 + sll],
    [p + bso + ss, p + bso + sw * 2 + sll + ss],
    // Left-top.
    [p + bso + ss, p + bso + sw + ss],
    [p + bso + ss * 2 - sw, p + bso + sw * 2],
    // Right-top.
    [`100% - ${p + bso + ss * 2}`, p + bso + sw * 2]
  ]

  // Right-top > Right-bottom > Left-bottom.
  const rightBottomBgPolyline: Point[] = [
    // Right-top.
    [`100% - ${p + bso + ss * 2}`, p + bso + sw * 2],
    [`100% - ${p + bso + ss}`, p + bso + sw * 2 + ss],
    // Right.
    [`100% - ${p + bso + ss}`, `100% - ${p + bso + sw * 2 + ss * 3 + sll + lll}`],
    [`100% - ${p + bso}`, `100% - ${p + bso + sw * 2 + ss * 2 + sll + lll}`],
    [`100% - ${p + bso}`, `100% - ${p + bso + sw * 2 + ss * 2 + sll}`],
    [`100% - ${p + bso + ss}`, `100% - ${p + bso + sw * 2 + ss + sll}`],
    // Right-bottom.
    [`100% - ${p + bso + ss}`, `100% - ${p + bso + sw + ss}`],
    [`100% - ${p + bso + ss * 2 - sw}`, `100% - ${p + bso + sw * 2}`],
    // Left-bottom.
    [bso + p + ss * 2, `100% - ${p + bso + sw * 2}`]
  ]

  const leftTopLine: Point[] = [
    [p + so - sw * 2 + ss, p + so + ss + sll],
    [p + so - sw * 2 + ss, p + so + ss],
    [p + so - sw * 2 + ss * 2, p + so],
    [p + so - sw * 2 + ss * 2 + lll, p + so]
  ]

  const rightBottomLine: Point[] = [
    [`100% - ${p + so + ss} + ${sw * 2}`, `100% - ${p + so + ss + sll}`],
    [`100% - ${p + so + ss} + ${sw * 2}`, `100% - ${p + so + ss}`],
    [`100% - ${p + so + ss * 2} + ${sw * 2}`, `100% - ${p + so}`],
    [`100% - ${p + so + ss * 2 + lll} + ${sw * 2}`, `100% - ${p + so}`]
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
      path: toPath(leftTopBgPolyline.concat(rightBottomBgPolyline))
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

  return createFrame(svg, { elements })
}

export type { CreateFrameKranoxProps }
export { createFrameKranox }
