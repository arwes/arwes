import { Figure as Component, FigureProps } from './Figure.component';
import { WithAnimatorOutputProps, withAnimator } from '@arwes/animation';

import { FC } from 'react';
import { animator } from './Figure.animator';

// TODO: Fix props or HOC to properly use nested component props with withAnimator.
const Figure: FC<FigureProps & WithAnimatorOutputProps> = withAnimator(animator)(Component);

export { FigureProps, Figure };
