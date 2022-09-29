import { MutableRefObject, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import anime, { AnimeParams } from 'animejs';
import {
  ENTERING,
  ENTERED,
  EXITING,
  EXITED,
  AnimatorRef,
  useAnimator
} from '@arwes/animator';

interface TransitionsOnAnimatorStyleTargetParams {
  [name: string]: any
};
type TransitionsOnAnimatorTransitionTargetParams = AnimeParams & { target?: AnimeParams['targets'] };

interface TransitionsOnAnimatorPropsTransitionParams <T> {
  target?: T | null
  animator: AnimatorRef
  styleTarget: (params: TransitionsOnAnimatorStyleTargetParams) => void
  transitionTarget: (params: TransitionsOnAnimatorTransitionTargetParams) => void
}

type TransitionsOnAnimatorPropsTransition <T> = (params: TransitionsOnAnimatorPropsTransitionParams<T>) => void;

interface TransitionsOnAnimatorProps <T> {
  targetRef?: MutableRefObject<T | null>
  mount?: TransitionsOnAnimatorPropsTransition<T>
  unmount?: TransitionsOnAnimatorPropsTransition<T>
  entering?: TransitionsOnAnimatorPropsTransition<T>
  entered?: TransitionsOnAnimatorPropsTransition<T>
  exiting?: TransitionsOnAnimatorPropsTransition<T>
  exited?: TransitionsOnAnimatorPropsTransition<T>
}

const TransitionsOnAnimator = <T extends HTMLElement | SVGElement>(props: TransitionsOnAnimatorProps<T>): null => {
  const {
    targetRef,
    mount,
    entering,
    entered,
    exiting,
    exited,
    unmount
  } = props;

  const isMountedRef = useRef(false);
  const animator = useAnimator();

  if (!animator) {
    throw new Error('No animator is provided.');
  }

  const createTransitionParams = (): TransitionsOnAnimatorPropsTransitionParams<T> => {
    const target = targetRef?.current as T;
    const { flow, duration } = animator;

    const styleTarget = (params: TransitionsOnAnimatorStyleTargetParams): void => {
      const { selector, ...otherParams } = params;

      const targets = selector
        ? target?.querySelectorAll(selector)
        : params.target || params.targets || target;

      anime.set(targets, otherParams);
    };

    const transitionTarget = (params: TransitionsOnAnimatorTransitionTargetParams): void => {
      const { selector, ...otherParams } = params;

      const targets = selector
        ? target?.querySelectorAll(selector)
        : params.target || params.targets || target;

      anime({
        easing: 'easeOutSine',
        ...otherParams,
        targets,
        duration: flow.entering || flow.entered ? duration.enter : duration.exit
      });
    };

    return { animator, target, styleTarget, transitionTarget };
  };

  useEffect(() => {
    return () => {
      unmount?.(createTransitionParams());
    };
  }, []);

  useEffect(() => {
    const { animate, flow } = animator;

    if (!animate) {
      return;
    }

    const transitionParams = createTransitionParams();

    if (!isMountedRef.current) {
      mount?.(transitionParams);
      isMountedRef.current = true;
    }

    switch (flow.value) {
      case ENTERING: entering?.(transitionParams); break;
      case ENTERED: entered?.(transitionParams); break;
      case EXITING: exiting?.(transitionParams); break;
      case EXITED: exited?.(transitionParams); break;
    }
  }, [animator.flow]);

  return null;
};

TransitionsOnAnimator.propTypes = {
  targetRef: PropTypes.object,
  mount: PropTypes.func,
  unmount: PropTypes.func,
  entering: PropTypes.func,
  entered: PropTypes.func,
  exiting: PropTypes.func,
  exited: PropTypes.func
};

export { TransitionsOnAnimatorProps, TransitionsOnAnimator };
