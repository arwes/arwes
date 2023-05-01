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
            <div className={cx(classes.frameLine, classes.frameLineLeft)} />
            <div className={cx(classes.frameLine, classes.frameLineRight)} />
            <Illuminator color='hsl(180 50% 50% / 5%)' size={400} />
          </div>
        )}
        <div className={cx(classes.section, classes.left)}>
          {left}
        </div>
        <div className={cx(classes.section, classes.center)}>
          {center}
        </div>
        <div className={cx(classes.section, classes.right)}>
          {right}
        </div>
      </div>
    </Animated>
  );
};

export type { HeaderLayoutProps };
export { HeaderLayout };
