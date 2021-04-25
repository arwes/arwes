import { FC } from 'react';
import { WithAnimatorOutputProps, withAnimator } from '@arwes/animation';

import { FramePentagonProps, FramePentagon as Component } from './FramePentagon.component';

// TODO: withAnimator does not support a functional React component declared
// in "function Component () {}" notation with "defaultProps".
const FramePentagon: FC<FramePentagonProps<HTMLDivElement> & WithAnimatorOutputProps> = withAnimator()(Component as any);

export { FramePentagonProps, FramePentagon };
