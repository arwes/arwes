import { createElement, memo, forwardRef } from 'react';

import { Animated as Component } from './Animated';

const Animated: typeof Component = memo(
  forwardRef((props: any, forwardedRef: any) => (
    createElement(Component, {
      elementRef: forwardedRef,
      ...props
    })
  ))
) as any;

export * from './Animated.types';
export { Animated };
