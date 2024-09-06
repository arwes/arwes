import React, { useMemo, type ReactElement } from 'react'
import { cx } from '@arwes/tools'
import { memo } from '@arwes/react-tools'
import { type CreateFrameKranoxProps, createFrameKranox } from '@arwes/frames'

import { type FrameBaseProps, FrameBase } from '../FrameBase/index.js'

interface FrameKranoxProps
  extends Omit<FrameBaseProps, keyof CreateFrameKranoxProps>,
    CreateFrameKranoxProps {}

const FrameKranox = memo((props: FrameKranoxProps): ReactElement => {
  const {
    styled,
    padding,
    strokeWidth,
    bgStrokeWidth,
    squareSize,
    smallLineLength,
    largeLineLength,
    className,
    ...otherProps
  } = props

  const create = useMemo(
    () => (svg: SVGSVGElement) => createFrameKranox(svg, props),
    [styled, padding, strokeWidth, bgStrokeWidth, squareSize, smallLineLength, largeLineLength]
  )

  return (
    <FrameBase
      {...otherProps}
      className={cx('arwes-frames-framekranox', className)}
      create={create}
    />
  )
})

export type { FrameKranoxProps }
export { FrameKranox }
