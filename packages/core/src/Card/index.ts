import { memo } from 'react';
import { withAnimator } from '@arwes/animator';

import { Card as Component } from './Card.component';
import { animator } from './Card.animator';

const Card = withAnimator(animator)(memo(Component));

export * from './Card.component';
export { Card };
