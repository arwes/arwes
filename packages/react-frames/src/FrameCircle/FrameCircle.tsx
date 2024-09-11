import React, { useMemo } from 'react'
import { cx } from '@arwes/tools'
import { memo } from '@arwes/react-tools'
import { type CreateFrameCircleSettingsProps, createFrameCircleSettings } from '@arwes/frames'

import { type FrameBaseProps, FrameBase } from '../FrameBase/index.js'

type FrameCircleProps = Omit<FrameBaseProps, 'settings'> & CreateFrameCircleSettingsProps

const FrameCircle = memo((props: FrameCircleProps): JSX.Element => {
  const { styled, animated, padding, strokeWidth, separation, sideWidth } = props

  const settings = useMemo(
    () =>
      createFrameCircleSettings({ styled, animated, padding, strokeWidth, separation, sideWidth }),
    [styled, animated, padding, strokeWidth, separation, sideWidth]
  )
  return (
    <FrameBase
      {...props}
      className={cx('arwes-frames-framecircle', props.className)}
      settings={settings}
    />
  )
})

export type { FrameCircleProps }
export { FrameCircle }
