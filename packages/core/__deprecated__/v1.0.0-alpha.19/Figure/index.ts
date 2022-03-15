import { memo } from 'react';
import { withAnimator } from '@arwes/animator';

import { Figure as Component } from './Figure.component';
import { animator } from './Figure.animator';

const Figure = withAnimator(animator)(memo(Component));

export * from './Figure.component';
export { Figure };
