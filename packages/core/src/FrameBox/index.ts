import { memo } from 'react';
import { withAnimator } from '@arwes/animator';

import { FrameBox as Component, FrameBoxProps } from './FrameBox.component';

const FrameBox = withAnimator()(memo(Component));

export { FrameBoxProps, FrameBox };
