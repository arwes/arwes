import React, { useMemo, type ReactElement } from 'react'
import { cx } from '@arwes/tools'
import { memo } from '@arwes/react-tools'
import { type CreateFrameNefrexProps, createFrameNefrex } from '@arwes/frames'

import { type FrameBaseProps, FrameBase } from '../FrameBase/index.js'

interface FrameNefrexProps
  extends Omit<FrameBaseProps, keyof CreateFrameNefrexProps>,
    CreateFrameNefrexProps {}

const FrameNefrex = memo((props: FrameNefrexProps): ReactElement => {
  const {
    styled,
    squareSize,
    strokeWidth,
    smallLineLength,
    largeLineLength,
    padding,
    className,
    ...otherProps
  } = props

  const create = useMemo(
    () => (svg: SVGSVGElement) => createFrameNefrex(svg, props),
    [styled, squareSize, strokeWidth, smallLineLength, largeLineLength, padding]
  )

  return (
    <FrameBase
      {...otherProps}
      className={cx('arwes-frames-framenefrex', className)}
      create={create}
    />
  )
})

export type { FrameNefrexProps }
export { FrameNefrex }
