import { FC } from 'react';
import { WithAnimatorOutputProps, withAnimator } from '@arwes/animator';

import { FrameCornersProps, FrameCorners as Component } from './FrameCorners.component';

// TODO: withAnimator does not support a functional React component declared
// in "function Component () {}" notation with "defaultProps".
const FrameCorners: FC<FrameCornersProps<HTMLDivElement> & WithAnimatorOutputProps> = withAnimator()(Component as any);

export { FrameCornersProps, FrameCorners };
