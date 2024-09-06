import { filterProps } from '@arwes/tools'
import { type AnimatedCSSProps } from '@arwes/animated'
import type { FrameSettingsPathDefinition, FrameSettingsElement, Frame } from '../types.js'
import { createFrame } from '../createFrame/index.js'

type CreateFrameLinesProps = {
  styled?: boolean
  padding?: number
  largeLineWidth?: number
  smallLineWidth?: number
  smallLineLength?: number
}

const defaultProps: Required<CreateFrameLinesProps> = {
  styled: true,
  padding: 0,
  largeLineWidth: 1,
  smallLineWidth: 1,
  smallLineLength: 16
}

const createFrameLines = (svg: SVGSVGElement, props?: CreateFrameLinesProps): Frame => {
  const {
    styled,
    padding: p,
    largeLineWidth: llw,
    smallLineWidth: slw,
    smallLineLength: sll
  } = { ...defaultProps, ...(props ? filterProps(props) : null) }

  const polylineStyle: AnimatedCSSProps = {
    strokeLinecap: 'square',
    stroke: 'var(--arwes-frames-line-color, currentcolor)',
    filter: 'var(--arwes-frames-line-filter)',
    fill: 'none'
  }

  const llo = llw / 2
  const slo = slw / 2

  const largePolylines: FrameSettingsPathDefinition[] = [
    // Top
    [
      ['M', llo + p, llo + p],
      ['L', '50% + 0.1', llo + p]
    ],
    [
      ['M', `100% - ${llo + p}`, llo + p],
      ['L', '50% - 0.1', llo + p]
    ],

    // Bottom
    [
      ['M', llo + p, `100% - ${llo + p}`],
      ['L', '50% + 0.1', `100% - ${llo + p}`]
    ],
    [
      ['M', `100% - ${llo + p}`, `100% - ${llo + p}`],
      ['L', '50% - 0.1', `100% - ${llo + p}`]
    ]
  ]

  const smallPolylines: FrameSettingsPathDefinition[] = [
    // Top
    [
      ['M', slo + p, llw + slo + p],
      ['L', sll + slo + p, llw + slo + p]
    ],
    [
      ['M', `100% - ${slo + p}`, llw + slo + p],
      ['L', `100% - ${sll + slo + p}`, llw + slo + p]
    ],

    // Bottom
    [
      ['M', slo + p, `100% - ${llw + slo + p}`],
      ['L', sll + slo + p, `100% - ${llw + slo + p}`]
    ],
    [
      ['M', `100% - ${slo + p}`, `100% - ${llw + slo + p}`],
      ['L', `100% - ${sll + slo + p}`, `100% - ${llw + slo + p}`]
    ]
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
      path: [
        ['M', p, p],
        ['L', p, `100% - ${p}`],
        ['L', `100% - ${p}`, `100% - ${p}`],
        ['L', `100% - ${p}`, p]
      ]
    },
    ...largePolylines.map((polyline) => ({
      name: 'line',
      style: styled
        ? {
            ...polylineStyle,
            strokeWidth: String(llw)
          }
        : undefined,
      path: polyline
    })),
    ...smallPolylines.map((polyline) => ({
      name: 'line',
      style: styled
        ? {
            ...polylineStyle,
            strokeWidth: String(slw)
          }
        : undefined,
      path: polyline
    }))
  ]

  return createFrame(svg, { elements })
}

export type { CreateFrameLinesProps }
export { createFrameLines }
