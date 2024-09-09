import React, { useMemo } from 'react'
import { cx } from '@arwes/tools'
import { memo } from '@arwes/react-tools'
import { type CreateFrameCornersSettingsProps, createFrameCornersSettings } from '@arwes/frames'

import { type FrameBaseProps, FrameBase } from '../FrameBase/index.js'

type FrameCornersProps = Omit<FrameBaseProps, 'settings'> & CreateFrameCornersSettingsProps

const FrameCorners = memo((props: FrameCornersProps): JSX.Element => {
  const { styled, padding, strokeWidth, cornerLength } = props

  const settings = useMemo(
    () => createFrameCornersSettings({ styled, padding, strokeWidth, cornerLength }),
    [styled, padding, strokeWidth, cornerLength]
  )
  return (
    <FrameBase
      {...props}
      className={cx('arwes-frames-framecorners', props.className)}
      settings={settings}
    />
  )
})

export type { FrameCornersProps }
export { FrameCorners }
