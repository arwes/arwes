import { memo } from 'react';
import { withAnimator } from '@arwes/animator';

import { FrameHexagon as Component } from './FrameHexagon.component';

const FrameHexagon = withAnimator()(memo(Component));

export * from './FrameHexagon.component';
export { FrameHexagon };
