import { memo } from 'react';
import { withAnimator } from '@arwes/animator';

import { Table as Component } from './Table.component';
import { animator } from './Table.animator';

const Table = withAnimator(animator)(memo(Component));

export * from './Table.component';
export { Table };
