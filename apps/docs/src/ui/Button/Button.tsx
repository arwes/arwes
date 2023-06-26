import { type HTMLProps, type ReactElement, type ReactNode } from 'react';
import {
  type AnimatedProp,
  Animated,
  FrameSVGOctagon,
  Illuminator,
  useBleeps,
  cx
} from '@arwes/react';

import type { BleepNames } from '@app/types';
import * as classes from './Button.css';

interface ButtonProps extends Omit<HTMLProps<HTMLButtonElement>, 'size'> {
  className?: string
  animated?: AnimatedProp
  tabIndex?: number
  title?: string
  size?: 'small' | 'medium'
  frame?: 'simple' | 'hexagon'
  onHoverAnimateIcons?: boolean
  onClick?: () => void
  children: ReactNode
}

const Button = (props: ButtonProps): ReactElement => {
  const {
    animated,
    className,
    tabIndex,
    title,
    size = 'medium',
    frame = 'simple',
    onHoverAnimateIcons,
    onClick,
    children,
    ...otherProps
  } = props;

  const bleeps = useBleeps<BleepNames>();

  return (
    <Animated<HTMLButtonElement, HTMLProps<HTMLButtonElement>>
      {...otherProps}
      as='button'
      className={cx(
        classes.root,
        size === 'medium' && classes.medium,
        frame === 'simple' && classes.frameSimple,
        frame === 'hexagon' && classes.frameHexagon,
        onHoverAnimateIcons && classes.onHoverAnimateIcons,
        className
      )}
      animated={animated}
      tabIndex={tabIndex}
      title={title}
      onClick={() => {
        onClick?.();
        bleeps.click?.play();
      }}
    >
      {frame === 'simple' && (
        <div className={cx(classes.frameElement, classes.frameSimpleDeco)} />
      )}
      {frame === 'hexagon' && (
        <div className={cx(classes.frameElement, classes.frameHexagonClip)}>
          <Illuminator
            className={classes.frameHexagonIlluminator}
            color='hsl(60 50% 90% / 8%)'
            size={200}
          />
          <FrameSVGOctagon squareSize={12} leftBottom={false} rightTop={false} />
        </div>
      )}
      <div className={classes.content}>
        {children}
      </div>
    </Animated>
  );
};

export type { ButtonProps };
export { Button };
