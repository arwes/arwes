import { memo } from 'react';
import { withAnimator } from '@arwes/animator';

import { LoadingBars as Component, LoadingBarsProps } from './LoadingBars.component';
import { animator } from './LoadingBars.animator';

const LoadingBars = withAnimator(animator)(memo(Component));

export { LoadingBarsProps, LoadingBars };
