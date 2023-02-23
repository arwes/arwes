import React, { type ReactElement, type ReactNode, useRef } from 'react';
import { cx } from '@arwes/tools';
import { Animated, aaOpacity } from '@arwes/react-animated';
import { useFrameSVGAssemblingAnimation, FrameSVGHexagon, Illuminator } from '@arwes/react-frames';

interface ButtonProps {
  variant?: 'primary' | 'secondary'
  className?: string
  children: ReactNode
}

const Button = (props: ButtonProps): ReactElement => {
  const { variant, className, children } = props;

  const svgRef = useRef<SVGSVGElement | null>(null);
  const { onRender } = useFrameSVGAssemblingAnimation(svgRef);

  return (
    <button
      className={cx(
        'button',
        variant && `button--${variant}`,
        className
      )}
    >
      <div className='button__illuminator'>
        <Illuminator size={150} lightness='100%' />
      </div>
      <FrameSVGHexagon
        elementRef={svgRef}
        onRender={onRender}
        squareSize={12}
        padding={1}
      />
      <Animated as='span' className='button__content' animated={aaOpacity()}>
        {children}
      </Animated>
    </button>
  );
};

export type { ButtonProps };
export { Button };