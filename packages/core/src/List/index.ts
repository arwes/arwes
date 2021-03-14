import { FC } from 'react';
import { WithAnimatorOutputProps, withAnimator } from '@arwes/animation';

import { ListProps, List as Component } from './List.component';
import { animator } from './List.animator';

const List: FC<ListProps & WithAnimatorOutputProps> = withAnimator(animator)(Component);

export { ListProps, List };
