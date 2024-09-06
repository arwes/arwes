import { filterProps } from '@arwes/tools'
import type { FrameSettingsPathDefinition, FrameSettingsElement, Frame } from '../types.js'
import { createFrame } from '../createFrame/index.js'

type CreateFrameCornersProps = {
  styled?: boolean
  strokeWidth?: number
  cornerLength?: number
  padding?: number
}

const defaultProps: Required<CreateFrameCornersProps> = {
  styled: true,
  strokeWidth: 1,
  cornerLength: 16,
  padding: 0
}

const createFrameCorners = (svg: SVGSVGElement, props?: CreateFrameCornersProps): Frame => {
  const {
    styled,
    strokeWidth: cw,
    cornerLength: cl,
    padding: p
  } = { ...defaultProps, ...(props ? filterProps(props) : null) }

  const co = cw / 2

  const bg: FrameSettingsElement = {
    name: 'bg',
    style: styled
      ? {
          strokeWidth: 0,
          fill: 'var(--arwes-frames-bg-color, currentcolor)',
          filter: 'var(--arwes-frames-bg-filter)'
        }
      : undefined,
    path: [
      ['M', cw + p, cw + p],
      ['L', cw + p, `100% - ${cw} - ${p}`],
      ['L', `100% - ${cw} - ${p}`, `100% - ${cw} - ${p}`],
      ['L', `100% - ${cw} - ${p}`, cw + p]
    ]
  }

  const linesPaths: FrameSettingsPathDefinition[] = [
    // Left top.
    [
      ['M', co + p, co + p],
      ['L', co + p, cl + p]
    ],
    [
      ['M', co + p, co + p],
      ['L', cl + p, co + p]
    ],

    // Right top.
    [
      ['M', `100% - ${co} - ${p}`, co + p],
      ['L', `100% - ${cl} - ${p}`, co + p]
    ],
    [
      ['M', `100% - ${co} - ${p}`, co + p],
      ['L', `100% - ${co} - ${p}`, cl + p]
    ],

    // Right bottom.
    [
      ['M', `100% - ${co} - ${p}`, `100% - ${co} - ${p}`],
      ['L', `100% - ${co} - ${p}`, `100% - ${cl} - ${p}`]
    ],
    [
      ['M', `100% - ${co} - ${p}`, `100% - ${co} - ${p}`],
      ['L', `100% - ${cl} - ${p}`, `100% - ${co} - ${p}`]
    ],

    // Left bottom.
    [
      ['M', co + p, `100% - ${co} - ${p}`],
      ['L', cl + p, `100% - ${co} - ${p}`]
    ],
    [
      ['M', co + p, `100% - ${co} - ${p}`],
      ['L', co + p, `100% - ${cl} - ${p}`]
    ]
  ]

  const lines: FrameSettingsElement[] = linesPaths.map((path) => ({
    name: 'line',
    style: styled
      ? {
          stroke: 'var(--arwes-frames-line-color, currentcolor)',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: String(cw),
          fill: 'none',
          filter: 'var(--arwes-frames-line-filter)'
        }
      : undefined,
    path
  }))

  const elements = [bg, ...lines]

  return createFrame(svg, { elements })
}

export type { CreateFrameCornersProps }
export { createFrameCorners }
