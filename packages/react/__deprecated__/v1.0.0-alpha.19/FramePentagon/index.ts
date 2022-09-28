import { memo } from 'react';
import { withAnimator } from '@arwes/animator';

import { FramePentagon as Component } from './FramePentagon.component';

const FramePentagon = withAnimator()(memo(Component));

export * from './FramePentagon.component';
export { FramePentagon };
