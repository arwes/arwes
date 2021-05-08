import { List as Component, ListProps } from './List.component';

import { animator } from './List.animator';
import { withAnimator } from '@arwes/animator';

const List = withAnimator(animator)(Component);

export { ListProps, List };
