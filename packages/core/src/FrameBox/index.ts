import { FrameBox as Component, FrameBoxProps } from './FrameBox.component';

import { withAnimator } from '@arwes/animator';

const FrameBox = withAnimator()(Component);

export { FrameBoxProps, FrameBox };
