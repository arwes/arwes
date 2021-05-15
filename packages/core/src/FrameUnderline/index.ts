import { memo } from 'react';
import { withAnimator } from '@arwes/animator';

import { FrameUnderline as Component, FrameUnderlineProps } from './FrameUnderline.component';

const FrameUnderline = withAnimator()(memo(Component));

export { FrameUnderlineProps, FrameUnderline };
