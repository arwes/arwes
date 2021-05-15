import { memo } from 'react';
import { withAnimator } from '@arwes/animator';

import { List as Component } from './List.component';
import { animator } from './List.animator';

const List = withAnimator(animator)(memo(Component));

export * from './List.component';
export { List };
