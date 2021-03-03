import { FC } from 'react';
import { WithAnimatorOutputProps, withAnimator } from '@arwes/animation';
import { WithBleepsOutputProps, withBleeps } from '@arwes/sounds';

import { FrameUnderlineProps, FrameUnderline as Component } from './FrameUnderline.component';
import { animator } from './FrameUnderline.animator';
import { bleepsSettings } from './FrameUnderline.bleeps';

const FrameUnderline: FC<FrameUnderlineProps & WithAnimatorOutputProps & WithBleepsOutputProps> =
  withAnimator(animator)(
    withBleeps(bleepsSettings)(Component as any) as any
  );

export { FrameUnderlineProps, FrameUnderline };
