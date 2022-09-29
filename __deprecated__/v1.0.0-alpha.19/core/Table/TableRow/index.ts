import { memo } from 'react';
import { withAnimator } from '@arwes/animator';

import { TableRow as Component } from './TableRow.component';
import { animator } from './TableRow.animator';

const TableRow = withAnimator(animator)(memo(Component));

export * from './TableRow.component';
export { TableRow };
