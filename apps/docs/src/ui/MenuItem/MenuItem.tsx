import { type ReactElement, type ReactNode } from 'react';
import { type AnimatedProp, Animated, cx } from '@arwes/react';

import * as classes from './MenuItem.css';

interface MenuItemProps {
  className?: string
  animated?: AnimatedProp
  active?: boolean
  children?: ReactNode
}

const MenuItem = (props: MenuItemProps): ReactElement => {
  const { className, animated, active, children } = props;

  return (
    <Animated
      as='li'
      className={cx(classes.root, active && classes.active, className)}
      animated={animated}
    >
      {children}
    </Animated>
  );
};

export type { MenuItemProps };
export { MenuItem };
