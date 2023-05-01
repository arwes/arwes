import { type ReactElement, type ReactNode } from 'react';
import { type AnimatedProp, Animated, cx } from '@arwes/react';
import Link from 'next/link';

import * as classes from './Logo.css';

interface LogoProps {
  className?: string
  animated?: AnimatedProp
  children?: ReactNode
}

const Logo = (props: LogoProps): ReactElement => {
  const { className, animated, children } = props;

  return (
    <Animated
      as='h1'
      className={cx(classes.root, className)}
      animated={animated}
    >
      <Link className={classes.link} href='/' title='Arwes Project'>
        <img
          className={classes.logo}
          src='/logo.png'
          alt='Arwes Project'
          role='heading'
        />
        {children}
      </Link>
    </Animated>
  );
};

export type { LogoProps };
export { Logo };
