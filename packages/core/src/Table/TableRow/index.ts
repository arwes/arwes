import {
  TableRow as Component,
  TableRowProps,
  TableRowPropsColumn,
  TableRowPropsColumnWidth
} from './TableRow.component';
import { WithAnimatorOutputProps, withAnimator } from '@arwes/animation';

import { FC } from 'react';
import { animator } from './TableRow.animator';

// TODO: Fix props or HOC to properly use nested component props with withAnimator.
const TableRow: FC<TableRowProps & WithAnimatorOutputProps> = withAnimator(animator)(Component);

export {
  TableRowPropsColumn,
  TableRowPropsColumnWidth,
  TableRowProps,
  TableRow
};
