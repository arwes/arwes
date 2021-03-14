import { FC } from 'react';
import { WithAnimatorOutputProps, withAnimator } from '@arwes/animation';

import { TableProps, Table as Component } from './Table.component';
import { animator } from './Table.animator';

// TODO: Fix props or HOC to properly use nested component props with withAnimator.
const Table: FC<TableProps & WithAnimatorOutputProps> = withAnimator(animator)(Component as any);

export { TableProps, Table };
