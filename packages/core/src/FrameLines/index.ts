import { memo } from 'react';
import { withAnimator } from '@arwes/animator';

import { FrameLines as Component, FrameLinesProps } from './FrameLines.component';

const FrameLines = withAnimator()(memo(Component));

export { FrameLinesProps, FrameLines };
