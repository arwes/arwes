import { createElement, forwardRef } from 'react';

import { mergeClassAndInstanceAnimatorSettings } from '../utils/mergeClassAndInstanceAnimatorSettings';
import { Animator } from '../Animator';
import { useAnimator } from '../useAnimator';

function withAnimator (classAnimator) {
  function AnimatorMiddleware (props) {
    const { Animated, forwardedRef, ...otherProps } = props;
    const componentAnimator = useAnimator();

    return createElement(Animated, {
      ...otherProps,
      animator: componentAnimator,
      ref: forwardedRef
    });
  }

  function withAnimatorWrapper (Animated) {
    const WithAnimator = forwardRef((props, forwardedRef) => {
      const { animator: instanceAnimator, ...otherProps } = props;
      const resultAnimator = mergeClassAndInstanceAnimatorSettings(classAnimator, instanceAnimator);

      return createElement(
        Animator,
        { animator: resultAnimator },
        createElement(AnimatorMiddleware, {
          ...otherProps,
          Animated,
          forwardedRef: forwardedRef
        })
      );
    });

    WithAnimator.displayName = 'WithAnimator';

    return WithAnimator;
  };

  return withAnimatorWrapper;
}

export { withAnimator };
