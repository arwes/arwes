import React, { useMemo, type ReactElement } from 'react'
import { cx } from '@arwes/tools'
import { memo } from '@arwes/react-tools'
import { type CreateFrameOctagonProps, createFrameOctagon } from '@arwes/frames'

import { type FrameBaseProps, FrameBase } from '../FrameBase/index.js'

interface FrameOctagonProps
  extends Omit<FrameBaseProps, keyof CreateFrameOctagonProps>,
    CreateFrameOctagonProps {}

const FrameOctagon = memo((props: FrameOctagonProps): ReactElement => {
  const {
    styled,
    leftTop,
    rightTop,
    rightBottom,
    leftBottom,
    squareSize,
    strokeWidth,
    padding,
    className,
    ...otherProps
  } = props

  const create = useMemo(
    () => (svg: SVGSVGElement) => createFrameOctagon(svg, props),
    [styled, leftTop, rightTop, rightBottom, leftBottom, squareSize, strokeWidth, padding]
  )

  return (
    <FrameBase
      {...otherProps}
      className={cx('arwes-frames-frameoctagon', className)}
      create={create}
    />
  )
})

export type { FrameOctagonProps }
export { FrameOctagon }
