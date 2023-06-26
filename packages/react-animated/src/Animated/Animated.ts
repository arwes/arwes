import {
  type HTMLProps,
  type SVGProps,
  type CSSProperties,
  type ReactElement,
  type ForwardedRef,
  type ReactNode,
  createElement,
  useRef,
  useMemo,
  useState,
  useEffect
} from 'react';
import { animate } from 'motion';

import { type NoInfer } from '@arwes/tools';
import { mergeRefs } from '@arwes/react-tools';
import { ANIMATOR_STATES as STATES } from '@arwes/animator';
import { useAnimator } from '@arwes/react-animator';

import type {
  AnimatedSettings,
  AnimatedSettingsTransition,
  AnimatedSettingsTransitionFunctionReturn,
  AnimatedProp
} from '../types';
import { formatAnimatedCSSPropsShorthands } from '../internal/formatAnimatedCSSPropsShorthands/index';

interface AnimatedProps<E extends HTMLElement | SVGElement = HTMLDivElement> {
  elementRef?: ForwardedRef<E>
  className?: string
  style?: CSSProperties
  animated?: AnimatedProp
  hideOnExited?: boolean
  hideOnEntered?: boolean
  as?: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap
  children?: ReactNode
}

const Animated = <
  E extends HTMLElement | SVGElement = HTMLDivElement,
  P extends HTMLProps<HTMLElement> | SVGProps<SVGElement> = HTMLProps<HTMLDivElement>
>(props: AnimatedProps<E> & NoInfer<P>): ReactElement => {
  const {
    as: asProvided,
    animated,
    className,
    style,
    elementRef: externalElementRef,
    hideOnExited = true,
    hideOnEntered,
    ...otherProps
  } = props;

  const animator = useAnimator();

  const as = useMemo(() => asProvided || 'div', []);
  const elementRef = useRef<E | null>(null);
  const animatedSettingsRef = useRef<AnimatedSettings[]>([]);
  const animationControlsRef = useRef<AnimatedSettingsTransitionFunctionReturn[]>([]);
  const [isExited, setIsExited] = useState(() => animator?.node.state === STATES.exited);
  const [isEntered, setIsEntered] = useState(() => animator?.node.state === STATES.entered);

  const animatedSettingsListReceived = Array.isArray(animated) ? animated : [animated];
  const animatedSettingsList = animatedSettingsListReceived.filter(Boolean) as AnimatedSettings[];

  // The animations list is passed as a reference so the Animator node subscription
  // and its respective functionalities are only initialized once for performance.
  animatedSettingsRef.current = animatedSettingsList;

  useEffect(() => {
    if (!animator) {
      return;
    }

    const cancelSubscription = animator.node.subscribe(node => {
      setIsExited(node.state === STATES.exited);
      setIsEntered(node.state === STATES.entered);

      animationControlsRef.current = [];

      const element = elementRef.current;

      // Weird case if the element is removed and the subscription is not cancelled.
      if (!element) {
        return;
      }

      const settingsList = animatedSettingsRef.current;
      const { duration } = node;
      const durationTransition = node.state === STATES.entering || node.state === STATES.entered
        ? duration.enter
        : duration.exit;

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
            const { duration, delay, easing, options, ...definition } = transition;
            const control = animate(
              element,
              definition,
              { duration: duration || durationTransition, delay, easing, ...options }
            );
            animationControlsRef.current.push(control);
          }
        });
    });

    return () => {
      cancelSubscription();
      animationControlsRef.current.forEach(control => control.stop());
    };
  }, [animator]);

  let initialAttributes: object | undefined;
  if (animator) {
    // TODO: Fix type.
    initialAttributes = animatedSettingsList
      .map(item => item?.initialAttributes)
      .reduce<any>((total: object, item: object | undefined) => ({ ...total, ...item }), {});
  }

  let dynamicStyles: CSSProperties | undefined;
  if (animator) {
    dynamicStyles = animatedSettingsList
      .map(item => formatAnimatedCSSPropsShorthands(item?.initialStyle))
      .reduce((total, item) => ({ ...total, ...item }), {});
  }

  return createElement(as, {
    ...otherProps,
    ...initialAttributes,
    className,
    style: {
      ...style,
      ...dynamicStyles,
      visibility: animator && ((hideOnExited && isExited) || (hideOnEntered && isEntered)) ? 'hidden' : 'visible'
    },
    ref: mergeRefs(externalElementRef, elementRef)
  });
};

export type { AnimatedProps };
export { Animated };
