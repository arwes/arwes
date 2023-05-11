import { type ReactElement, type ReactNode } from 'react';
import { type AnimatedProp, Animated, Illuminator, cx, aa } from '@arwes/react';

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
          <div
            role='presentation'
            className={cx(classes.frame, transition)}
          >
            <Illuminator color='hsl(180 50% 50% / 10%)' size={400} />
          </div>
        )}
        <Animated
          className={cx(classes.section, classes.left)}
          animated={aa('x', -12, 0)}
        >
          {left}
        </Animated>
        <Animated
          className={cx(classes.section, classes.center)}
          animated={aa('scaleX', 0.9, 1)}
        >
          {center}
        </Animated>
        <Animated
          className={cx(classes.section, classes.right)}
          animated={aa('x', 12, 0)}
        >
          {right}
        </Animated>
      </div>
    </Animated>
  );
};

export type { HeaderLayoutProps };
export { HeaderLayout };
