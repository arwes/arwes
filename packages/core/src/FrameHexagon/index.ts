import { FrameHexagon as Component, FrameHexagonProps } from './FrameHexagon.component';

import { withAnimator } from '@arwes/animator';

const FrameHexagon = withAnimator()(Component);

export { FrameHexagonProps, FrameHexagon };
