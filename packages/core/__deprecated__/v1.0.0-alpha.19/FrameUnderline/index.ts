import { memo } from 'react';
import { withAnimator } from '@arwes/animator';

import { FrameUnderline as Component } from './FrameUnderline.component';

const FrameUnderline = withAnimator()(memo(Component));

export * from './FrameUnderline.component';
export { FrameUnderline };
