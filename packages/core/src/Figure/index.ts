import { FC } from 'react';
import { WithAnimatorOutputProps, withAnimator } from '@arwes/animation';
import { WithBleepsOutputProps, withBleeps } from '@arwes/sounds';

import { FigureProps, Figure as Component } from './Figure.component';
import { animator } from './Figure.animator';
import { bleepsSettings } from './Figure.bleeps';

const Figure: FC<FigureProps & WithAnimatorOutputProps & WithBleepsOutputProps> =
  withAnimator(animator)(
    withBleeps(bleepsSettings)(Component as any) as any
  ) as any;

export { FigureProps, Figure };
