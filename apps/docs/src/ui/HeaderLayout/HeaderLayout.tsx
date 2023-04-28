import { type ReactElement, type ReactNode } from 'react';
import { type AnimatedProp, Animated, Illuminator, cx } from '@arwes/react';

import { transition } from '@app/styles/motion.css';
import * as classes from './HeaderLayout.css';

interface HeaderLayoutProps {
  className?: string
  animated?: AnimatedProp
  hasFrame?: boolean
  left?: ReactNode
  center?: ReactNode
  right?: ReactNode
}

const HeaderLayout = (props: HeaderLayoutProps): ReactElement => {
  const { className, animated, hasFrame, left, center, right } = props;

  return (
    <Animated
      as='header'
      className={cx(classes.root, className)}
      animated={animated}
    >
      <div className={classes.container}>
        {hasFrame && (
          <div role='presentation' className={cx(classes.frame, transition)}>
            <div className={classes.frameLineLeft} />
            <div className={classes.frameLineRight} />
            <Illuminator color='hsl(180 50% 50% / 5%)' size={400} />
          </div>
        )}
        <div className={classes.left}>
          {left}
        </div>
        <div className={classes.center}>
          {center}
        </div>
        <div className={classes.right}>
          {right}
        </div>
      </div>
    </Animated>
  );
};

export type { HeaderLayoutProps };
export { HeaderLayout };
