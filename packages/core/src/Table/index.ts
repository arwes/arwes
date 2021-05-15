import { memo } from 'react';
import { withAnimator } from '@arwes/animator';

import { Table as Component, TableProps } from './Table.component';
import { animator } from './Table.animator';

const Table = withAnimator(animator)(memo(Component));

export { TableProps, Table };
