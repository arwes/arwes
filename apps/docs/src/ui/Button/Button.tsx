import { type ReactElement, type ReactNode } from 'react';
import {
  type AnimatedProp,
  Animated,
  FrameSVGHexagon,
  Illuminator,
  cx
} from '@arwes/react';

import * as classes from './Button.css';

interface ButtonProps {
  className?: string
  animated?: AnimatedProp
  tabIndex?: number
  size?: 'small' | 'medium'
  frame?: 'simple' | 'hexagon'
  children: ReactNode
}

const Button = (props: ButtonProps): ReactElement => {
  const {
    animated,
    className,
    tabIndex,
    size = 'medium',
    frame = 'simple',
    children
  } = props;

  return (
    <Animated
      as='button'
      className={cx(
        classes.root,
        size === 'medium' && classes.medium,
        frame === 'simple' && classes.frameSimple,
        frame === 'hexagon' && classes.frameHexagon,
        className
      )}
      animated={animated}
      tabIndex={tabIndex}
    >
      {frame === 'simple' && (
        <div className={classes.frameSimpleDeco} />
      )}
      {frame === 'hexagon' && (
        <>
          <div className={classes.frameHexagonClip}>
            <Illuminator
              className={classes.frameHexagonIlluminator}
              color='hsl(60 50% 90% / 8%)'
              size={200}
            />
          </div>
          <FrameSVGHexagon squareSize={12} />
        </>
      )}
      <div className={classes.content}>
        {children}
      </div>
    </Animated>
  );
};

export type { ButtonProps };
export { Button };
