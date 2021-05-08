import { FrameLines as Component, FrameLinesProps } from './FrameLines.component';

import { withAnimator } from '@arwes/animator';

const FrameLines = withAnimator()(Component);

export { FrameLinesProps, FrameLines };
