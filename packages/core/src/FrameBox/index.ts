import { withAnimator } from '@arwes/animation';

import { FrameBoxProps, FrameBox as Component } from './FrameBox.component';

// TODO: withAnimator does not support a functional React component declared
// in "function Component () {}" notation with "defaultProps".
const FrameBox = withAnimator()(Component as any);

export { FrameBoxProps, FrameBox };
