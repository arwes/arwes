import { type ReactElement, type ReactNode } from 'react';
import { type AnimatedProp, Animated, cx } from '@arwes/react';

import * as classes from './Header.css';

interface HeaderProps {
  className?: string
  animated?: AnimatedProp
  left?: ReactNode
  center?: ReactNode
  right?: ReactNode
}

const Header = (props: HeaderProps): ReactElement => {
  const { className, animated, left, center, right } = props;

  return (
    <Animated
      as='header'
      className={cx(classes.root, className)}
      animated={animated}
    >
      <div className={classes.left}>
        {left}
      </div>
      <div className={classes.center}>
        {center}
      </div>
      <div className={classes.right}>
        {right}
      </div>
    </Animated>
  );
};

export type { HeaderProps };
export { Header };
