import { memo } from 'react';
import { withAnimator } from '@arwes/animator';

import { FrameBox as Component } from './FrameBox.component';

const FrameBox = withAnimator()(memo(Component));

export * from './FrameBox.component';
export { FrameBox };
