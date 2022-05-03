import { createElement, memo, forwardRef } from 'react';

import { Animated as AnimatedComponent } from './Animated.component';

const Animated: typeof AnimatedComponent = memo(
  forwardRef((props: any, forwardedRef: any) => (
    createElement(AnimatedComponent, {
      elementRef: forwardedRef,
      ...props
    })
  ))
) as any;

export { Animated };
