import { memo } from 'react';
import { withAnimator } from '@arwes/animator';

import { FrameCorners as Component } from './FrameCorners.component';

const FrameCorners = withAnimator()(memo(Component));

export * from './FrameCorners.component';
export { FrameCorners };
