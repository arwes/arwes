import { memo } from 'react';
import { withAnimator } from '@arwes/animator';

import { FrameLines as Component } from './FrameLines.component';

const FrameLines = withAnimator()(memo(Component));

export * from './FrameLines.component';
export { FrameLines };
