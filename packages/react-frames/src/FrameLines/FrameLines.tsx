import React, { useMemo, type ReactElement } from 'react'
import { cx } from '@arwes/tools'
import { memo } from '@arwes/react-tools'
import { type CreateFrameLinesProps, createFrameLines } from '@arwes/frames'

import { type FrameBaseProps, FrameBase } from '../FrameBase/index.js'

interface FrameLinesProps
  extends Omit<FrameBaseProps, keyof CreateFrameLinesProps>,
    CreateFrameLinesProps {}

const FrameLines = memo((props: FrameLinesProps): ReactElement => {
  const {
    styled,
    padding,
    largeLineWidth,
    smallLineWidth,
    smallLineLength,
    className,
    ...otherProps
  } = props

  const create = useMemo(
    () => (svg: SVGSVGElement) => createFrameLines(svg, props),
    [styled, padding, largeLineWidth, smallLineWidth, smallLineLength]
  )

  return (
    <FrameBase
      {...otherProps}
      className={cx('arwes-frames-framelines', className)}
      create={create}
    />
  )
})

export type { FrameLinesProps }
export { FrameLines }
