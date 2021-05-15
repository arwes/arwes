import { memo } from 'react';
import { withAnimator } from '@arwes/animator';

import { FrameCorners as Component, FrameCornersProps } from './FrameCorners.component';

const FrameCorners = withAnimator()(memo(Component));

export { FrameCornersProps, FrameCorners };
