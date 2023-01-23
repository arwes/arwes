import {
  HTMLProps,
  SVGProps,
  CSSProperties,
  ReactElement,
  createElement,
  useRef,
  useMemo
} from 'react';
import { animate } from 'motion';

import { NoInfer } from '@arwes/tools';
import { mergeRefs, useOnChange } from '@arwes/react-tools';
import { AnimatorNode } from '@arwes/animator';
import { useAnimator } from '@arwes/react-animator';

import type {
  AnimatedSettings,
  AnimatedSettingsTransition,
  AnimatedSettingsTransitionFunctionReturn
} from '../types';
import { formatAnimatedCSSPropsShorthands } from '../internal/formatAnimatedCSSPropsShorthands/index';
import { AnimatedProps } from './Animated.types';

const Animated = <
  E extends HTMLElement | SVGElement = HTMLDivElement,
  P extends HTMLProps<HTMLElement> | SVGProps<SVGElement> = HTMLProps<HTMLDivElement>
>(props: AnimatedProps<E, P> & NoInfer<P>): ReactElement => {
  const {
    as: asProvided,
    animated,
    className,
    style,
    elementRef: externalElementRef,
    ...otherProps
  } = props;

  const animator = useAnimator();

  const as = useMemo(() => asProvided || 'div', []);
  const elementRef = useRef<E | null>(null);
  const animatedSettingsRef = useRef<Array<AnimatedSettings<P>>>([]);
  const animationControlsRef = useRef<AnimatedSettingsTransitionFunctionReturn[]>([]);

  const animatedSettingsListReceived = Array.isArray(animated) ? animated : [animated];
  const animatedSettingsList = animatedSettingsListReceived.filter(Boolean) as Array<AnimatedSettings<P>>;

  animatedSettingsRef.current = animatedSettingsList;

  useOnChange(() => {
    if (!animator) {
      return;
    }

    const animatorSubscriber = (node: AnimatorNode): void => {
      animationControlsRef.current = [];

      const element = elementRef.current as E;
      const settingsList = animatedSettingsRef.current;

      const { duration } = node.control.getSettings();
      const durationTransition = node.state === 'entering' || node.state === 'entered'
        ? duration.enter
        : duration.exit;

      // TODO: Support wildcard "*" state as any state transition.

      settingsList
        .map(settingsItem => settingsItem.transitions?.[node.state] as AnimatedSettingsTransition)
        .filter(Boolean)
        .map(transitions => Array.isArray(transitions) ? transitions : [transitions])
        .flat(1)
        .forEach(transition => {
          if (typeof transition === 'function') {
            const control = transition({
              element,
              duration: durationTransition
            });
            if (control) {
              animationControlsRef.current.push(control);
            }
          }
          else {
            const { options, ...definition } = transition;
            const control = animate(
              element,
              definition,
              { duration: durationTransition, ...options }
            );
            animationControlsRef.current.push(control);
          }
        });
    };

    animator.node.subscribers.add(animatorSubscriber);

    return () => {
      animator.node.subscribers.delete(animatorSubscriber);
      animationControlsRef.current.forEach(control => control.stop());
    };
  }, [animator]);

  let initialAttributes: P | undefined;
  if (animator) {
    // TODO: Fix type.
    initialAttributes = animatedSettingsList
      .map(item => item?.initialAttributes)
      .reduce<any>((total: P, item: P | undefined) => ({ ...total, ...item }), {});
  }

  let dynamicStyles: CSSProperties | undefined;
  if (animator) {
    dynamicStyles = animatedSettingsList
      .map(item => formatAnimatedCSSPropsShorthands(item?.initialStyle))
      .reduce((total, item) => ({ ...total, ...item }), {});
  }

  // TODO: Set CSS property "visibility: hidden" on exited animator state if animated.

  return createElement(as, {
    ...otherProps,
    ...initialAttributes,
    className,
    style: {
      ...style,
      ...dynamicStyles
    },
    ref: mergeRefs(externalElementRef, elementRef)
  });
};

export { Animated };
