import { type ReactElement, type ReactNode } from 'react';
import { type AnimatedProp, Animated, cx, useBleeps } from '@arwes/react';

import type { BleepNames } from '@app/types';
import * as classes from './MenuItem.css';

interface MenuItemProps {
  className?: string
  animated?: AnimatedProp
  active?: boolean
  children?: ReactNode
}

const MenuItem = (props: MenuItemProps): ReactElement => {
  const { className, animated, active, children } = props;

  const bleeps = useBleeps<BleepNames>();

  return (
    <Animated
      as='li'
      className={cx(classes.root, active && classes.active, className)}
      animated={animated}
      onClick={() => bleeps.click?.play()}
    >
      {children}
    </Animated>
  );
};

export type { MenuItemProps };
export { MenuItem };
