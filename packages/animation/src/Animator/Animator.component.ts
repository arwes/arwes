import { FC, createElement, useState, useRef, useMemo, useEffect } from 'react';

import {
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
  PARALLEL,
  STAGGER,
  SEQUENCE,
  AnimatorFlowValue,
  AnimatorFlow,
  AnimatorSettings,
  AnimatorSettingsDuration,
  AnimatorChildrenActivations,
  AnimatorProvidedSettings,
  AnimatorDuration,
  AnimatorRefChild
} from '../constants';
import { makeScheduler } from '../utils/makeScheduler';
import { getChildrenNodesSequenceActivationTimes } from '../utils/getChildrenNodesSequenceActivationTimes';
import { getChildrenNodesStaggerActivationTimes } from '../utils/getChildrenNodesStaggerActivationTimes';
import { AnimatorContext } from '../AnimatorContext';
import { useAnimatorGeneral } from '../useAnimatorGeneral';
import { useAnimator } from '../useAnimator';

const ANIMATE_DEFAULT = true;
const DURATION_DEFAULT = Object.freeze({
  enter: 100,
  exit: 100,
  stagger: 25,
  delay: 0,
  offset: 0
});

let classInstanceIdCounter = 0;

interface AnimatorProps {
  animator?: AnimatorSettings
}

const Animator: FC<AnimatorProps> = props => {
  const { animator = {}, children } = props;

  const parentAnimatorGeneral = useAnimatorGeneral();
  const parentAnimator = useAnimator();

  const [instanceId] = useState(() => classInstanceIdCounter++);
  const [scheduler] = useState(() => makeScheduler());
  const [dynamicDuration, setDynamicDuration] = useState<AnimatorSettingsDuration | undefined>(undefined);

  const duration: AnimatorDuration = useMemo(() => {
    return Object.freeze({
      ...DURATION_DEFAULT,
      ...parentAnimatorGeneral?.duration,
      ...animator.duration,
      ...dynamicDuration
    });
  }, [parentAnimatorGeneral, animator.duration, dynamicDuration]);

  // Since the expected boolean values applicable to the node are provided down
  // to the next child node, they are converted to booleans always to prevent
  // possible data leaking.

  const isParentAnimated = parentAnimator ? !!parentAnimator.animate : ANIMATE_DEFAULT;
  const animate = animator.animate !== undefined ? !!animator.animate : isParentAnimated;

  const root = parentAnimator ? !!animator.root : true;

  const merge = !root && !!animator.merge;

  const manager = animator.manager ?? PARALLEL;

  // If this node is not animated, its initial flow state is ENTERED,
  // so it is activated.
  const [activate, setActivate] = useState(() => !animate);

  // The flow object is not directly updated. It is always updated based on
  // its next value.
  const [flow, _setFlow] = useState<AnimatorFlow>(() => {
    const value = animate ? EXITED : ENTERED;
    const hasEntered = value === ENTERED;
    const hasExited = value === EXITED;
    return Object.freeze({ value, [value]: true, hasEntered, hasExited });
  });

  const setFlowValue = (value: AnimatorFlowValue): void => {
    const hasEntered = flow.hasEntered || value === ENTERED;
    const hasExited = flow.hasExited || value === EXITED;
    _setFlow(Object.freeze({ value, [value]: true, hasEntered, hasExited }));
  };

  // All the <Animator/> children non-root instances.
  const [childrenNodesMap] = useState<Map<number, AnimatorRefChild>>(() => new Map());

  // This variable is supposed to be defined by the component using this
  // <Animator/>. It will contain the reference(s) to the actual HTML element(s)
  // to animate on the flow transitions and component lifecycle.
  const animateRefs = useRef<any>();

  const providedAnimator: AnimatorProvidedSettings = useMemo(() => {
    const setupAnimateRefs = (refs: any): void => {
      animateRefs.current = refs;
    };
    const updateDuration = (duration: AnimatorSettingsDuration | undefined): void => {
      setDynamicDuration(duration);
    };
    const _id = instanceId;
    const _subscribe = (id: number, node: AnimatorRefChild): void => {
      childrenNodesMap.set(id, node);
    };
    const _unsubscribe = (id: number): void => {
      childrenNodesMap.delete(id);
    };

    return Object.freeze({
      duration,
      animate,
      root,
      merge,
      flow,
      setupAnimateRefs,
      updateDuration,
      _id,
      _subscribe,
      _unsubscribe
    });
  }, [duration, animate, root, merge, flow]);

  useEffect(() => {
    if (!animate) {
      return;
    }

    // TODO: What if node is changed from child node to root node and needs
    // to be unsuscribed from its parent?

    if (!root) {
      const id = instanceId;
      const getDuration = (): AnimatorDuration => duration;
      const getIsMerge = (): boolean => merge;
      const child: AnimatorRefChild = Object.freeze({
        id,
        getDuration,
        getIsMerge,
        setActivate
      });

      parentAnimator?._subscribe(instanceId, child);
    }

    animator.useAnimateMount?.(providedAnimator, animateRefs.current);

    return () => {
      scheduler.stopAll();

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

    animator.onTransition?.(flow);

    switch (flow.value) {
      case ENTERING: animator.useAnimateEntering?.(providedAnimator, animateRefs.current); break;
      case ENTERED: animator.useAnimateEntered?.(providedAnimator, animateRefs.current); break;
      case EXITING: animator.useAnimateExiting?.(providedAnimator, animateRefs.current); break;
      case EXITED: animator.useAnimateExited?.(providedAnimator, animateRefs.current); break;
    }

    const nodes = Array.from(childrenNodesMap.values());
    const newChildrenActivation = flow.value === ENTERING || flow.value === ENTERED;

    let nodesToUpdate: AnimatorRefChild[] = [];
    let activations: AnimatorChildrenActivations;

    // On exited, no nodes should be updated.
    if (flow.value === ENTERING) {
      nodesToUpdate = nodes.filter(node => node.getIsMerge());
    }
    else if (flow.value === ENTERED) {
      nodesToUpdate = nodes.filter(node => !node.getIsMerge());
    }
    else if (flow.value === EXITING) {
      nodesToUpdate = nodes;
    }

    // On exiting, all nodes exit at the same time in parallel.
    if (flow.value === EXITING || manager === PARALLEL) {
      // Since all the children will be transitioned in parallel, a possible
      // approach is to make the process synchronous so the scheduler only makes
      // one task. This becomes a bottle-neck if there are more animated nodes
      // than the machine CPU can handle and eventually block the thread.
      // So each node is transitioned separately to prevent this case.
      const times = nodesToUpdate.map(node => ({ node, time: 0 }));
      activations = { times };
    }
    else if (flow.value === EXITED) {
      activations = { times: [] };
    }
    else if (manager === SEQUENCE) {
      activations = getChildrenNodesSequenceActivationTimes(nodesToUpdate);
    }
    else if (manager === STAGGER) {
      activations = getChildrenNodesStaggerActivationTimes(nodesToUpdate, duration);
    }
    else if (typeof manager === 'function') {
      activations = manager({ nodes: nodesToUpdate, duration });
    }
    else {
      throw new Error(`Manager "${String(manager)}" is not supported.`);
    }

    activations.times.forEach(({ node, time }) =>
      scheduler.start(node.id, time, () => node.setActivate(newChildrenActivation))
    );
  }, [flow.value]);

  useEffect(() => {
    // The flow should not be transitioned when it is not animated.
    // Even if this early return is removed, it should still work, but it is added
    // to improve performance.
    if (!animate) {
      return;
    }

    // TODO: Test when "duration" is changed before its activation is updated.
    // TODO: Test when "merge" is changed before its activation is updated.

    if (activate) {
      if (flow.value === ENTERING || flow.value === ENTERED) {
        return;
      }

      scheduler.start(duration.delay, () => {
        setFlowValue(ENTERING);
        scheduler.start(duration.enter, () => setFlowValue(ENTERED));
      });
    }
    else {
      if (flow.value === EXITING || flow.value === EXITED) {
        return;
      }

      scheduler.start(0, () => {
        setFlowValue(EXITING);
        scheduler.start(duration.exit, () => setFlowValue(EXITED));
      });
    }

    return () => scheduler.stop();
  }, [activate]);

  return createElement(AnimatorContext.Provider, { value: providedAnimator }, children);
};

export { Animator };
