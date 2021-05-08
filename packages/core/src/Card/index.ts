import { CardProps, Card as Component } from './Card.component';

import { animator } from './Card.animator';
import { withAnimator } from '@arwes/animator';

const Card = withAnimator(animator)(Component);

export { CardProps, Card };
