import {
  TableRow as Component,
  TableRowProps,
  TableRowPropsColumn,
  TableRowPropsColumnWidth
} from './TableRow.component';

import { animator } from './TableRow.animator';
import { withAnimator } from '@arwes/animator';

const TableRow = withAnimator(animator)(Component);

export {
  TableRowPropsColumn,
  TableRowPropsColumnWidth,
  TableRowProps,
  TableRow
};
