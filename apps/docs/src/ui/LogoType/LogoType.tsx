import { type ReactElement } from 'react';
import { type AnimatedProp, Animated, cx } from '@arwes/react';

import * as classes from './LogoType.css';

interface LogoTypeProps {
  className?: string
  animated?: AnimatedProp
}

const LogoType = (props: LogoTypeProps): ReactElement => {
  const { className, animated } = props;

  return (
    <Animated
      as='img'
      className={cx(classes.root, className)}
      animated={animated}
      src='/logotype.png'
      role='presentation'
    />
  );
};

export type { LogoTypeProps };
export { LogoType };
