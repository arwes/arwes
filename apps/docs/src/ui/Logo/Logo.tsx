import { type ReactElement, type ReactNode } from 'react';
import { type AnimatedProp, Animated, cx, useBleeps } from '@arwes/react';
import Link from 'next/link';

import type { BleepNames } from '@app/types';
import * as classes from './Logo.css';

interface LogoProps {
  className?: string
  animated?: AnimatedProp
  children?: ReactNode
}

const Logo = (props: LogoProps): ReactElement => {
  const { className, animated, children } = props;

  const bleeps = useBleeps<BleepNames>();

  return (
    <Animated
      as='h1'
      className={cx(classes.root, className)}
      animated={animated}
      onClick={() => bleeps.click?.play()}
    >
      <Link className={classes.link} href='/' title='Arwes Project'>
        <img
          className={classes.logo}
          src='/logo.png'
          alt='Arwes Project'
        />
        {children}
      </Link>
    </Animated>
  );
};

export type { LogoProps };
export { Logo };
