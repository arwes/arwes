import { memo } from 'react';
import { withAnimator } from '@arwes/animator';

import { CardProps, Card as Component } from './Card.component';
import { animator } from './Card.animator';

const Card = withAnimator(animator)(memo(Component));

export { CardProps, Card };
