import { type ReactElement, type ReactNode } from 'react';
import {
  type AnimatedProp,
  aaOpacity,
  Animated,
  FrameSVGHexagon,
  Illuminator,
  cx
} from '@arwes/react';

import * as classes from './Button.css';

interface ButtonProps {
  className?: string
  animated?: AnimatedProp
  children: ReactNode
}

const Button = (props: ButtonProps): ReactElement => {
  const { animated, className, children } = props;

  return (
    <Animated
      as='button'
      className={cx(classes.root, className)}
      animated={animated}
    >
      <div
        className={classes.clip}
      >
        <Illuminator
          className={classes.illuminator}
          color='hsl(60 50% 90% / 4%)'
          size={300}
        />
      </div>
      <FrameSVGHexagon
        squareSize={12}
      />
      <Animated
        as='span'
        className={classes.content}
        animated={aaOpacity()}
      >
        {children}
      </Animated>
    </Animated>
  );
};

export type { ButtonProps };
export { Button };
