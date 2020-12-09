import React, { useState, createRef, useMemo, useEffect } from 'react';
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

let classInstanceIdCounter = 0;

function Component (props) {
  const { animator, children } = props;

  const parentAnimatorGeneralSettings = useAnimatorGeneralSettings();
  const parentAnimator = useAnimator();

  const [instanceId] = useState(() => classInstanceIdCounter++);

  const duration = useMemo(() => {
    return Object.freeze({
      ...DURATION_DEFAULT,
      ...parentAnimatorGeneralSettings?.duration,
      ...expandAnimatorDuration(animator.duration)
    });
  }, [parentAnimatorGeneralSettings, animator.duration]);

  // Since the expected boolean values applicable to the node are provided down
  // to the next child node, they are converted to booleans always to prevent
  // possible data leaking.

  const isParentAnimated = parentAnimator ? !!parentAnimator.animate : ANIMATE_DEFAULT;
  const animate = animator.animate !== undefined ? !!animator.animate : isParentAnimated;

  const root = parentAnimator ? !!animator.root : true;

  const merge = !root && !!animator.merge;

  // If this node is not animated, its initial flow state is ENTERED,
  // so it is activated.
  const [activate, setActivate] = useState(() => !animate);

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

  // All the <Animator/> children non-root instances.
  const [childrenNodesMap] = useState(() => new Map());

  // This variable is supposed to be defined by the component using this
  // <Animator/>. It will contain the reference(s) to the actual HTML element(s)
  // to animate on the flow transitions and component lifecycle.
  const animateRefs = createRef();

  const providedAnimator = useMemo(() => {
    const setupAnimateRefs = refs => (animateRefs.current = refs);

    const _id = instanceId;
    const _subscribe = (id, child) => childrenNodesMap.set(id, child);
    const _unsubscribe = id => childrenNodesMap.delete(id);

    return Object.freeze({
      duration,
      animate,
      root,
      merge,
      flow,
      setupAnimateRefs,
      _id,
      _subscribe,
      _unsubscribe
    });
  }, [duration, animate, root, merge, flow]);

  useEffect(() => {
    if (!animate) {
      return;
    }

    // TODO: What should be the interface reference from this child?
    // TODO: What if it is changed to root and needs to be unsuscribed?
    // TODO: Test when "duration" is changed before its activation is updated.
    // TODO: Test when "merge" is changed before its activation is updated.
    if (!root) {
      const getDuration = () => duration;
      const getIsMerge = () => merge;
      const child = Object.freeze({ getDuration, getIsMerge, setActivate });

      parentAnimator?._subscribe(instanceId, child);
    }

    animator.useAnimateMount?.(providedAnimator, animateRefs.current);

    return () => {
      animator.useAnimateUnmount?.(providedAnimator, animateRefs.current);

      if (!root) {
        parentAnimator?._unsubscribe(instanceId);
      }
    };
  }, []);

  useEffect(() => {
    // An animated root node is by default activated.
    if (animate && root) {
      setActivate(animator.activate !== false);
    }
  }, [root, animator.activate]);

  useEffect(() => {
    if (!animate) {
      return;
    }

    const childrenNodes = Array.from(childrenNodesMap.values());

    animator.onTransition?.(flow);

    switch (flow.value) {
      case ENTERING: {
        animator.useAnimateEntering?.(providedAnimator, animateRefs.current);

        childrenNodes
          .filter(child => child.getIsMerge())
          .forEach(child => child.setActivate(true));
        break;
      }
      case ENTERED: {
        animator.useAnimateEntered?.(providedAnimator, animateRefs.current);

        childrenNodes
          .filter(child => !child.getIsMerge())
          .forEach(child => child.setActivate(true));
        break;
      }
      case EXITING: {
        animator.useAnimateExiting?.(providedAnimator, animateRefs.current);

        childrenNodes.forEach(child => child.setActivate(false));
        break;
      }
      case EXITED: {
        animator.useAnimateExited?.(providedAnimator, animateRefs.current);
        break;
      }
    }
  }, [flow.value]);

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

  return (
    <AnimatorContext.Provider value={providedAnimator}>
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
    onTransition: PropTypes.func,
    useAnimateMount: PropTypes.func,
    useAnimateEntering: PropTypes.func,
    useAnimateEntered: PropTypes.func,
    useAnimateExiting: PropTypes.func,
    useAnimateExited: PropTypes.func,
    useAnimateUnmount: PropTypes.func
  }),
  children: PropTypes.any
};

Component.defaultProps = {
  animator: {}
};

export { Component };
