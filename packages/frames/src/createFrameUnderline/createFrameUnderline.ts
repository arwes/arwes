import { filterProps } from '@arwes/tools'
import type { FrameSettingsElement, Frame } from '../types.js'
import { createFrame } from '../createFrame/index.js'

type CreateFrameUnderlineProps = {
  styled?: boolean
  squareSize?: number
  strokeWidth?: number
  padding?: number
}

const defaultProps: Required<CreateFrameUnderlineProps> = {
  styled: true,
  squareSize: 16,
  strokeWidth: 1,
  padding: 0
}

const createFrameUnderline = (svg: SVGSVGElement, props?: CreateFrameUnderlineProps): Frame => {
  const {
    styled,
    squareSize: ss,
    strokeWidth: sw,
    padding: p
  } = { ...defaultProps, ...(props ? filterProps(props) : null) }

  const so = sw / 2

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
      path: [
        ['M', p, p],
        ['L', p, `100% - ${p}`],
        ['L', `100% - ${ss} - ${p}`, `100% - ${p}`],
        ['L', `100% - ${p}`, `100% - ${ss} - ${p}`],
        ['L', `100% - ${p}`, p]
      ]
    },
    {
      name: 'line',
      style: styled
        ? {
            filter: 'var(--arwes-frames-line-filter)',
            stroke: 'var(--arwes-frames-line-color, currentcolor)',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeWidth: String(sw),
            fill: 'none'
          }
        : undefined,
      path: [
        ['M', so + p, `100% - ${so} - ${p}`],
        ['L', `100% - ${ss} - ${p}`, `100% - ${so} - ${p}`],
        ['L', `100% - ${so} - ${p}`, `100% - ${ss - so} - ${p}`]
      ]
    }
  ]

  return createFrame(svg, { elements })
}

export type { CreateFrameUnderlineProps }
export { createFrameUnderline }
