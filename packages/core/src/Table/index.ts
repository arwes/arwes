import { Table as Component, TableProps } from './Table.component';

import { animator } from './Table.animator';
import { withAnimator } from '@arwes/animator';

const Table = withAnimator(animator)(Component);

export { TableProps, Table };
