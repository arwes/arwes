import { filterProps } from '@arwes/tools'
import type { FrameSettingsElement, FrameSettings } from '../types.js'

type CreateFrameUnderlineSettingsProps = {
  styled?: boolean
  squareSize?: number
  strokeWidth?: number
  padding?: number
}

const defaultProps: Required<CreateFrameUnderlineSettingsProps> = {
  styled: true,
  squareSize: 16,
  strokeWidth: 1,
  padding: 0
}

const createFrameUnderlineSettings = (props?: CreateFrameUnderlineSettingsProps): FrameSettings => {
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

  return { elements }
}

export type { CreateFrameUnderlineSettingsProps }
export { createFrameUnderlineSettings }
