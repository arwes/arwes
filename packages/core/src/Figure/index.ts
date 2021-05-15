import { memo } from 'react';
import { withAnimator } from '@arwes/animator';

import { Figure as Component, FigureProps } from './Figure.component';
import { animator } from './Figure.animator';

const Figure = withAnimator(animator)(memo(Component));

export { FigureProps, Figure };
