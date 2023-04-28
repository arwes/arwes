import { type ReactElement, type ReactNode } from 'react';
import {
  type AnimatedProp,
  Animator,
  Animated,
  cx,
  FrameSVGOctagon,
  Illuminator,
  aaVisibility
} from '@arwes/react';

import * as classes from './PageContentLayout.css';

interface PageContentLayoutProps {
  className?: string
  animated?: AnimatedProp
  children?: ReactNode
}

const PageContentLayout = (props: PageContentLayoutProps): ReactElement => {
  const { className, animated, children } = props;

  return (
    <Animated
      as='main'
      className={cx(classes.root, className)}
      animated={animated}
    >
      <Animator>
        <Animated className={classes.frame} animated={aaVisibility()}>
          <FrameSVGOctagon className='page-document__svg' />
          <Illuminator color='hsl(180 50% 50% / 5%)' size={400} />
        </Animated>
      </Animator>
      <Animator combine manager='stagger'>
        <div className={classes.overflow}>
          <div className={classes.container}>
            <div className={classes.content}>
              {children}
            </div>
          </div>
        </div>
      </Animator>
    </Animated>
  );
};

export type { PageContentLayoutProps };
export { PageContentLayout };
