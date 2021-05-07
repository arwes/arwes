import { FrameCorners as Component, FrameCornersProps } from './FrameCorners.component';

import { withAnimator } from '@arwes/animation';

// TODO: withAnimator does not support a functional React component declared
// in "function Component () {}" notation with "defaultProps".
const FrameCorners = withAnimator()(Component);

export { FrameCornersProps, FrameCorners };
