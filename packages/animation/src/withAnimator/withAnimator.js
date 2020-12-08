import React, { forwardRef } from 'react';

import { expandAnimatorDuration } from '../utils/expandAnimatorDuration';
import { filterClassAnimatorSettings } from '../utils/filterClassAnimatorSettings';
import { Animator } from '../Animator';
import { useAnimator } from '../useAnimator';

function mergeAnimatorSettings (providedClassAnimator, instanceAnimator) {
  const classAnimator = providedClassAnimator && filterClassAnimatorSettings(providedClassAnimator);

  return {
    ...classAnimator,
    ...instanceAnimator,
    duration: {
      ...expandAnimatorDuration(classAnimator?.duration),
      ...expandAnimatorDuration(instanceAnimator?.duration)
    }
  };
}

function withAnimator (classAnimator) {
  function AnimatorMiddleware (props) {
    const { Animated, forwardedRef, ...otherProps } = props;
    const componentAnimator = useAnimator();

    return (
      <Animated
        {...otherProps}
        animator={componentAnimator}
        ref={forwardedRef}
      />
    );
  }

  function withAnimatorWrapper (Animated) {
    const WithAnimator = forwardRef((props, forwardedRef) => {
      const { animator: instanceAnimator, ...otherProps } = props;
      const resultAnimator = mergeAnimatorSettings(classAnimator, instanceAnimator);

      return (
        <Animator animator={resultAnimator}>
          <AnimatorMiddleware
            {...otherProps}
            Animated={Animated}
            forwardedRef={forwardedRef}
          />
        </Animator>
      );
    });

    WithAnimator.displayName = 'WithAnimator';

    return WithAnimator;
  };

  return withAnimatorWrapper;
}

export { withAnimator };
