import { Figure as Component, FigureProps } from './Figure.component';

import { animator } from './Figure.animator';
import { withAnimator } from '@arwes/animator';

const Figure = withAnimator(animator)(Component);

export { FigureProps, Figure };
