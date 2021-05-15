import { memo } from 'react';
import { withAnimator } from '@arwes/animator';

import { List as Component, ListProps } from './List.component';
import { animator } from './List.animator';

const List = withAnimator(animator)(memo(Component));

export { ListProps, List };
