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
  useEffect
} from 'react';
import { animate } from 'motion';

import { type NoInfer } from '@arwes/tools';
import { mergeRefs } from '@arwes/react-tools';

import type {
  AnimatedSettings,
  AnimatedSettingsTransition,
  AnimatedSettingsTransitionFunctionReturn,
  AnimatedProp
} from '../types';
import { formatAnimatedCSSPropsShorthands } from '../internal/formatAnimatedCSSPropsShorthands/index';

interface AnimatedXProps<E extends HTMLElement | SVGElement = HTMLDivElement> {
  elementRef?: ForwardedRef<E>
  className?: string
  style?: CSSProperties
  state?: string
  animated?: AnimatedProp
  as?: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap
  children?: ReactNode
}

const AnimatedX = <
  E extends HTMLElement | SVGElement = HTMLDivElement,
  P extends HTMLProps<HTMLElement> | SVGProps<SVGElement> = HTMLProps<HTMLDivElement>
>(props: AnimatedXProps<E> & NoInfer<P>): ReactElement => {
  const {
    as: asProvided,
    state: animatedState,
    animated,
    className,
    style,
    elementRef: externalElementRef,
    ...otherProps
  } = props;

  const hasState = animatedState !== undefined && animatedState !== null;
  const as = useMemo(() => asProvided || 'div', []);
  const elementRef = useRef<E | null>(null);
  const animatedSettingsRef = useRef<AnimatedSettings[]>([]);
  const animationControlsRef = useRef<AnimatedSettingsTransitionFunctionReturn[]>([]);

  const animatedSettingsListReceived = Array.isArray(animated) ? animated : [animated];
  const animatedSettingsList = animatedSettingsListReceived.filter(Boolean) as AnimatedSettings[];

  // The animations list is passed as a reference so the Animator node subscription
  // and its respective functionalities are only initialized once for performance.
  animatedSettingsRef.current = animatedSettingsList;

  useEffect(() => {
    if (!hasState) {
      return;
    }

    animationControlsRef.current = [];

    const element = elementRef.current;
    const settingsList = animatedSettingsRef.current;

    // Weird case if the element is removed and the subscription is not cancelled.
    if (!element) {
      return;
    }

    settingsList
      .map(settingsItem => settingsItem.transitions?.[animatedState] as AnimatedSettingsTransition)
      .filter(Boolean)
      .map(transitions => Array.isArray(transitions) ? transitions : [transitions])
      .flat(1)
      .forEach(transition => {
        if (typeof transition === 'function') {
          const control = transition({ element, duration: 0 });
          if (control) {
            animationControlsRef.current.push(control);
          }
        }
        else {
          const { duration, delay, easing, options, ...definition } = transition;
          const control = animate(
            element,
            definition,
            { duration, delay, easing, ...options }
          );
          animationControlsRef.current.push(control);
        }
      });

    return () => {
      animationControlsRef.current.forEach(control => control.stop());
    };
  }, [hasState, animatedState]);

  let initialAttributes: object | undefined;
  if (hasState) {
    // TODO: Fix type.
    initialAttributes = animatedSettingsList
      .map(item => item?.initialAttributes)
      .reduce<any>((total: object, item: object | undefined) => ({ ...total, ...item }), {});
  }

  let dynamicStyles: CSSProperties | undefined;
  if (hasState) {
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
      ...dynamicStyles
    },
    ref: mergeRefs(externalElementRef, elementRef)
  });
};

export type { AnimatedXProps };
export { AnimatedX };
