import { createElement, memo, forwardRef } from 'react';

import { AnimatedX as Component } from './AnimatedX';

const AnimatedX: typeof Component = memo(
  forwardRef((props: any, forwardedRef: any) => (
    createElement(Component as any, {
      elementRef: forwardedRef,
      ...props
    })
  ))
) as any;

export * from './AnimatedX';
export { AnimatedX };
