import { FramePentagon as Component, FramePentagonProps } from './FramePentagon.component';

import { withAnimator } from '@arwes/animator';

const FramePentagon = withAnimator()(Component);

export { FramePentagonProps, FramePentagon };
