import { LoadingBars as Component, LoadingBarsProps } from './LoadingBars.component';

import { animator } from './LoadingBars.animator';
import { withAnimator } from '@arwes/animator';

const LoadingBars = withAnimator(animator)(Component);

export { LoadingBarsProps, LoadingBars };
