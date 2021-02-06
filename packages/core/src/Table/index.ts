import { FC } from 'react';
import { WithAnimatorOutputProps, withAnimator } from '@arwes/animation';
import { WithBleepsOutputProps, withBleeps } from '@arwes/sounds';

import { TableProps, Table as Component } from './Table.component';
import { animator } from './Table.animator';
import { bleepsSettings } from './Table.bleeps';

const Table: FC<TableProps & WithAnimatorOutputProps & WithBleepsOutputProps> =
  withAnimator(animator)(
    withBleeps(bleepsSettings)(Component as any) as any
  ) as any;

export { TableProps, Table };
