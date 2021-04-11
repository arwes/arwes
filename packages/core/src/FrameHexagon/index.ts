import { withAnimator } from '@arwes/animation';

import { FrameHexagonProps, FrameHexagon as Component } from './FrameHexagon.component';

// TODO: withAnimator does not support a functional React component declared
// in "function Component () {}" notation with "defaultProps".
const FrameHexagon = withAnimator()(Component as any);

export { FrameHexagonProps, FrameHexagon };
