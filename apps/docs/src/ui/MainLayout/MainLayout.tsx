import { type ReactElement, type ReactNode } from 'react';
import { cx } from '@arwes/react';

import { Background } from '../Background';
import * as classes from './MainLayout.css';

interface MainLayoutProps {
  className?: string
  children?: ReactNode
}

const MainLayout = (props: MainLayoutProps): ReactElement => {
  const { className, children } = props;

  return (
    <div lang='en' className={cx(classes.root, className)}>
      <Background />
      <div className={classes.container}>
        {children}
      </div>
    </div>
  );
};

export type { MainLayoutProps };
export { MainLayout };
