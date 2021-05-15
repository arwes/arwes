import { memo } from 'react';
import { withAnimator } from '@arwes/animator';

import { FrameHexagon as Component, FrameHexagonProps } from './FrameHexagon.component';

const FrameHexagon = withAnimator()(memo(Component));

export { FrameHexagonProps, FrameHexagon };
