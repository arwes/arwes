import { memo } from 'react';
import { withAnimator } from '@arwes/animator';

import { FramePentagon as Component, FramePentagonProps } from './FramePentagon.component';

const FramePentagon = withAnimator()(memo(Component));

export { FramePentagonProps, FramePentagon };
