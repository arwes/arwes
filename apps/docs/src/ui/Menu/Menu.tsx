import { type ReactElement, type ReactNode } from 'react';
import { type AnimatedProp, Animated, cx } from '@arwes/react';

import * as classes from './Menu.css';

interface MenuProps {
  className?: string
  animated?: AnimatedProp
  children?: ReactNode
}

const Menu = (props: MenuProps): ReactElement => {
  const { className, animated, children } = props;

  return (
    <Animated
      as='ul'
      className={cx(classes.root, className)}
      animated={animated}
    >
      {children}
    </Animated>
  );
};

export type { MenuProps };
export { Menu };
