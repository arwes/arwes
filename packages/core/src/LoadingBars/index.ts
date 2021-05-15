import { memo } from 'react';
import { withAnimator } from '@arwes/animator';

import { LoadingBars as Component } from './LoadingBars.component';
import { animator } from './LoadingBars.animator';

const LoadingBars = withAnimator(animator)(memo(Component));

export * from './LoadingBars.component';
export { LoadingBars };
