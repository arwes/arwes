import { withAnimator } from '@arwes/animation';

import { FrameUnderlineProps, FrameUnderline as Component } from './FrameUnderline.component';

// TODO: withAnimator does not support a functional React component declared
// in "function Component () {}" notation with "defaultProps".
const FrameUnderline = withAnimator()(Component as any);

export { FrameUnderlineProps, FrameUnderline };
