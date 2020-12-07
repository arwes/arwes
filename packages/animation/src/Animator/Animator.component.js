import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
  ANIMATE_DEFAULT,
  DURATION_DEFAULT
} from '../constants';
import { expandAnimatorDuration } from '../utils/expandAnimatorDuration';
import { AnimatorContext } from '../AnimatorContext';
import { useAnimatorGeneralSettings } from '../useAnimatorGeneralSettings';
import { useAnimator } from '../useAnimator';

function Component (props) {
  const { animator, children } = props;

  const parentAnimatorGeneralSettings = useAnimatorGeneralSettings();
  const parentAnimator = useAnimator();

  const duration = useMemo(() => {
    return Object.freeze({
      ...DURATION_DEFAULT,
      ...parentAnimatorGeneralSettings?.duration,
      ...expandAnimatorDuration(animator.duration)
    });
  }, [animator.duration, parentAnimatorGeneralSettings]);

  // Since the expected boolean values applicable to the node are provided down
  // to the next child node, they are converted to booleans always to prevent
  // possible data leaking.

  const isParentAnimated = parentAnimator ? !!parentAnimator.animate : ANIMATE_DEFAULT;
  const animate = animator.animate !== undefined ? !!animator.animate : isParentAnimated;

  const root = parentAnimator ? !!animator.root : true;

  const merge = !root && !!animator.merge;

  const parentAnimatorFlowValue = parentAnimator?.flow?.value;
  const isParentActivatingMe = merge
    ? parentAnimatorFlowValue === ENTERED || parentAnimatorFlowValue === ENTERING
    : parentAnimatorFlowValue === ENTERED;

  // An animated root node is by default activated.
  const providedActivate = root ? animator.activate !== false : isParentActivatingMe;

  // If this node is not animated, its initial flow state is ENTERED,
  // so it is activated.
  const activate = animate ? providedActivate : true;

  // The flow object is not directly updated. It is always updated based on
  // its next value.
  const [flow, _setFlow] = useState(() => {
    const value = animate ? EXITED : ENTERED;
    const hasEntered = value === ENTERED;
    const hasExited = value === EXITED;
    return Object.freeze({ value, [value]: true, hasEntered, hasExited });
  });

  const setFlowValue = value => {
    const hasEntered = flow.hasEntered || value === ENTERED;
    const hasExited = flow.hasExited || value === EXITED;
    _setFlow(Object.freeze({ value, [value]: true, hasEntered, hasExited }));
  };

  useEffect(() => {
    // The flow should not be transitioned when it is not animated.
    // Even if this early return is removed, it should still work, but it is added
    // to improve performance.
    if (!animate) {
      return;
    }

    let timeout;

    if (activate) {
      if (flow.value === ENTERING || flow.value === ENTERED) {
        return;
      }

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setFlowValue(ENTERING);

        clearTimeout(timeout);
        timeout = setTimeout(() => setFlowValue(ENTERED), duration.enter);
      }, duration.delay);
    }
    else {
      if (flow.value === EXITING || flow.value === EXITED) {
        return;
      }

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setFlowValue(EXITING);

        clearTimeout(timeout);
        timeout = setTimeout(() => setFlowValue(EXITED), duration.exit);
      }, 0);
    }

    return () => clearTimeout(timeout);
  }, [activate]);

  useEffect(
    () => animate && animator.onTransition?.(flow),
    [flow]
  );

  const animatorToProvide = useMemo(
    () => Object.freeze({ duration, animate, root, merge, flow }),
    [duration, animate, root, merge, flow]
  );

  return (
    <AnimatorContext.Provider value={animatorToProvide}>
      {children}
    </AnimatorContext.Provider>
  );
}

Component.displayName = 'Animator';

Component.propTypes = {
  animator: PropTypes.shape({
    duration: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        enter: PropTypes.number,
        exit: PropTypes.number,
        stagger: PropTypes.number,
        delay: PropTypes.number,
        offset: PropTypes.number
      })
    ]),
    animate: PropTypes.bool,
    root: PropTypes.bool,
    merge: PropTypes.bool,
    activate: PropTypes.bool,
    onTransition: PropTypes.func
  }),
  children: PropTypes.any
};

Component.defaultProps = {
  animator: {}
};

export { Component };
