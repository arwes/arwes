import { FrameUnderline as Component, FrameUnderlineProps } from './FrameUnderline.component';

import { withAnimator } from '@arwes/animator';

const FrameUnderline = withAnimator()(Component);

export { FrameUnderlineProps, FrameUnderline };
