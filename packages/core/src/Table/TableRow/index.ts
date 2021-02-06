import { FC } from 'react';
import { WithAnimatorOutputProps, withAnimator } from '@arwes/animation';

import { TableRowProps, TableRow as Component } from './TableRow.component';
import { animator } from './TableRow.animator';

const TableRow: FC<TableRowProps & WithAnimatorOutputProps> =
  withAnimator(animator)(Component as any) as any;

export { TableRowProps, TableRow };
