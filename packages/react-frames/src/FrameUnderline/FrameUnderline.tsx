import React, { useMemo, type ReactElement } from 'react'
import { cx } from '@arwes/tools'
import { memo } from '@arwes/react-tools'
import { type CreateFrameUnderlineProps, createFrameUnderline } from '@arwes/frames'

import { type FrameBaseProps, FrameBase } from '../FrameBase/index.js'

interface FrameUnderlineProps
  extends Omit<FrameBaseProps, keyof CreateFrameUnderlineProps>,
    CreateFrameUnderlineProps {}

const FrameUnderline = memo((props: FrameUnderlineProps): ReactElement => {
  const { styled, squareSize, strokeWidth, padding, className, ...otherProps } = props

  const create = useMemo(
    () => (svg: SVGSVGElement) => createFrameUnderline(svg, props),
    [styled, squareSize, strokeWidth, padding]
  )

  return (
    <FrameBase
      {...otherProps}
      className={cx('arwes-frames-frameunderline', className)}
      create={create}
    />
  )
})

export type { FrameUnderlineProps }
export { FrameUnderline }
