import { createElement, forwardRef } from 'react';

import { mergeClassAndInstanceAnimatorSettings } from '../utils/mergeClassAndInstanceAnimatorSettings';

function extendAnimator (extendedClassAnimator) {
  function extendAnimatorWrapper (Animated) {
    const ExtendAnimator = forwardRef((props, ref) => {
      const { animator: instanceAnimator, ...otherProps } = props;
      const resultAnimator = mergeClassAndInstanceAnimatorSettings(
        extendedClassAnimator,
        instanceAnimator
      );

      return createElement(Animated, {
        ...otherProps,
        animator: resultAnimator,
        ref
      });
    });

    ExtendAnimator.displayName = 'ExtendAnimator';

    return ExtendAnimator;
  }

  return extendAnimatorWrapper;
}

export { extendAnimator };
