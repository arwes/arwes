import { FC } from 'react';
import { WithAnimatorOutputProps, withAnimator } from '@arwes/animation';
import { WithBleepsOutputProps, withBleeps } from '@arwes/sounds';

import { CardProps, Card as Component } from './Card.component';
import { animator } from './Card.animator';
import { bleepsSettings } from './Card.bleeps';

const Card: FC<CardProps & WithAnimatorOutputProps & WithBleepsOutputProps> =
  withAnimator(animator)(
    withBleeps(bleepsSettings)(Component as any) as any
  ) as any;

export { CardProps, Card };
