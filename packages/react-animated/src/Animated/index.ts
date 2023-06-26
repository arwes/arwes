import { createElement, memo, forwardRef } from 'react';

import { Animated as Component } from './Animated';

const Animated: typeof Component = memo(
  forwardRef((props: any, forwardedRef: any) => (
    createElement(Component as any, {
      elementRef: forwardedRef,
      ...props
    })
  ))
) as any;

export * from './Animated';
export { Animated };
