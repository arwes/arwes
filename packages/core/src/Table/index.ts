import { Table as Component, TableProps } from './Table.component';
import { WithAnimatorOutputProps, withAnimator } from '@arwes/animation';

import { FC } from 'react';
import { animator } from './Table.animator';

// TODO: Fix props or HOC to properly use nested component props with withAnimator.
const Table: FC<TableProps & WithAnimatorOutputProps> = withAnimator(animator)(Component);

export { TableProps, Table };
