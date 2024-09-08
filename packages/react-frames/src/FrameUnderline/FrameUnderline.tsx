import React, { useMemo } from 'react'
import { cx } from '@arwes/tools'
import { memo } from '@arwes/react-tools'
import { type CreateFrameUnderlineSettingsProps, createFrameUnderlineSettings } from '@arwes/frames'

import { type FrameBaseProps, FrameBase } from '../FrameBase/index.js'

type FrameUnderlineProps = FrameBaseProps & CreateFrameUnderlineSettingsProps

const FrameUnderline = memo((props: FrameUnderlineProps): JSX.Element => {
  const { styled, squareSize, strokeWidth, padding } = props

  const settings = useMemo(
    () => createFrameUnderlineSettings({ styled, squareSize, strokeWidth, padding }),
    [styled, squareSize, strokeWidth, padding]
  )
  return (
    <FrameBase
      {...props}
      className={cx('arwes-frames-frameunderline', props.className)}
      settings={settings}
    />
  )
})

export type { FrameUnderlineProps }
export { FrameUnderline }
