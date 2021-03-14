import { FC } from 'react';
import { WithAnimatorOutputProps, withAnimator } from '@arwes/animation';

import {
  TableRowPropsColumn,
  TableRowPropsColumnWidth,
  TableRowProps,
  TableRow as Component
} from './TableRow.component';
import { animator } from './TableRow.animator';

// TODO: Fix props or HOC to properly use nested component props with withAnimator.
const TableRow: FC<TableRowProps & WithAnimatorOutputProps> = withAnimator(animator)(Component as any);

export {
  TableRowPropsColumn,
  TableRowPropsColumnWidth,
  TableRowProps,
  TableRow
};
