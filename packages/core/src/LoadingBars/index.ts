import { FC } from 'react';
import { WithAnimatorOutputProps, withAnimator } from '@arwes/animation';

import { LoadingBarsProps, LoadingBars as Component } from './LoadingBars.component';
import { animator } from './LoadingBars.animator';

const LoadingBars: FC<LoadingBarsProps & WithAnimatorOutputProps> = withAnimator(animator)(Component);

export { LoadingBarsProps, LoadingBars };
