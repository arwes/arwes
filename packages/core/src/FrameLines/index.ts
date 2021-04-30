import { FC } from 'react';
import { WithAnimatorOutputProps, withAnimator } from '@arwes/animator';

import { FrameLinesProps, FrameLines as Component } from './FrameLines.component';

// TODO: withAnimator does not support a functional React component declared
// in "function Component () {}" notation with "defaultProps".
const FrameLines: FC<FrameLinesProps<HTMLDivElement> & WithAnimatorOutputProps> = withAnimator()(Component as any);

export { FrameLinesProps, FrameLines };
