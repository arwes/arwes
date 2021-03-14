import { FC } from 'react';
import { WithAnimatorOutputProps, withAnimator } from '@arwes/animation';

import { FrameUnderlineProps, FrameUnderline as Component } from './FrameUnderline.component';
import { animator } from './FrameUnderline.animator';

const FrameUnderline: FC<FrameUnderlineProps & WithAnimatorOutputProps> = withAnimator(animator)(Component);

export { FrameUnderlineProps, FrameUnderline };
