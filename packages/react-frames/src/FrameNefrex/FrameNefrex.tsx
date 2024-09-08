import React, { useMemo } from 'react'
import { cx } from '@arwes/tools'
import { memo } from '@arwes/react-tools'
import { type CreateFrameNefrexSettingsProps, createFrameNefrexSettings } from '@arwes/frames'

import { type FrameBaseProps, FrameBase } from '../FrameBase/index.js'

type FrameNefrexProps = FrameBaseProps & CreateFrameNefrexSettingsProps

const FrameNefrex = memo((props: FrameNefrexProps): JSX.Element => {
  const { styled, squareSize, strokeWidth, smallLineLength, largeLineLength, padding } = props

  const settings = useMemo(
    () =>
      createFrameNefrexSettings({
        styled,
        squareSize,
        strokeWidth,
        smallLineLength,
        largeLineLength,
        padding
      }),
    [styled, squareSize, strokeWidth, smallLineLength, largeLineLength, padding]
  )

  return (
    <FrameBase
      {...props}
      className={cx('arwes-frames-framenefrex', props.className)}
      settings={settings}
    />
  )
})

export type { FrameNefrexProps }
export { FrameNefrex }
