import { FC } from 'react';
import { WithAnimatorOutputProps, withAnimator } from '@arwes/animation';

import { FrameLinesProps, FrameLines as Component } from './FrameLines.component';

const FrameLines: FC<FrameLinesProps & WithAnimatorOutputProps> = withAnimator()(Component);

export { FrameLinesProps, FrameLines };
