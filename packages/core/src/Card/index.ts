import { FC } from 'react';
import { WithAnimatorOutputProps, withAnimator } from '@arwes/animator';

import { CardProps, Card as Component } from './Card.component';
import { animator } from './Card.animator';

const Card: FC<CardProps & WithAnimatorOutputProps> = withAnimator(animator)(Component);

export { CardProps, Card };
