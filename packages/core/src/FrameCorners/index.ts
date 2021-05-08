import { FrameCorners as Component, FrameCornersProps } from './FrameCorners.component';

import { withAnimator } from '@arwes/animator';

const FrameCorners = withAnimator()(Component);

export { FrameCornersProps, FrameCorners };
