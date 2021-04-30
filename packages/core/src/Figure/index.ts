import { FC } from 'react';
import { WithAnimatorOutputProps, withAnimator } from '@arwes/animator';

import { FigureProps, Figure as Component } from './Figure.component';
import { animator } from './Figure.animator';

// TODO: Fix props or HOC to properly use nested component props with withAnimator.
const Figure: FC<FigureProps & WithAnimatorOutputProps> = withAnimator(animator)(Component as any);

export { FigureProps, Figure };
