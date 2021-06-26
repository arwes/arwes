import {
  HTMLProps,
  SVGProps,
  CSSProperties,
  MutableRefObject,
  ReactNode,
  ReactElement,
  createElement,
  useRef,
  useEffect,
  useMemo,
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import anime, { AnimeParams } from 'animejs';
import { ENTERING, ENTERED, useAnimator } from '@arwes/animator';

import { AnimatedSettings, AnimatedSettingsTransition } from '../constants';
import { NoInfer } from '../utils/types';
import { formatAnimatedCSSPropsShorthands } from './formatAnimatedCSSPropsShorthands';

const ANIME_ANIMATION_DEFAULTS = {
  easing: 'easeOutSine'
};

interface AnimatedProps <E extends HTMLElement | SVGElement = HTMLDivElement, P = HTMLProps<HTMLDivElement>> {
  as?: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap
  animated?: AnimatedSettings<P> | Array<AnimatedSettings<P>>
  className?: string
  style?: CSSProperties
  rootRef?: MutableRefObject<E | null> | ((node: E) => void)
  children?: ReactNode
}

const Animated = <
  E extends HTMLElement | SVGElement = HTMLDivElement,
  P extends HTMLProps<HTMLElement> | SVGProps<SVGElement> = HTMLProps<HTMLDivElement>
> (props: AnimatedProps<E, P> & NoInfer<P>): ReactElement => {
  const {
    as: asProvided,
    animated,
    className,
    style,
    rootRef: externalRef,
    ...otherProps
  } = props;

  const as = useMemo(() => asProvided || 'div', []);

  const internalRef = useRef<E | null>(null);

  const rootRef = useCallback((node: E) => {
    internalRef.current = node;

    if (typeof externalRef === 'function') {
      externalRef(node);
    }
    else if (externalRef) {
      externalRef.current = node;
    }
  }, []);

  const animator = useAnimator();

  if (!animator) {
    throw new Error('Animated component can only be used inside an Animator.');
  }

  const { animate } = animator || {};

  const animatedItemsReceived = Array.isArray(animated) ? animated : [animated];
  const animatedItems = animatedItemsReceived.filter(Boolean) as Array<AnimatedSettings<P>>;

  useEffect(() => {
    return () => {
      anime.remove(internalRef.current);
    };
  }, []);

  useEffect(() => {
    if (!animator || !animator.animate || !animated || !animatedItems.length) {
      return;
    }

    const target = internalRef.current as E;
    const flowValue = animator.flow.value;
    const durationTransition = flowValue === ENTERING || flowValue === ENTERED
      ? animator.duration.enter
      : animator.duration.exit;
    const transitionTarget = (params: AnimeParams & { selector?: string }): void => {
      const { selector, ...otherParams } = params;

      const targets = selector
        ? target?.querySelectorAll(selector)
        : params.target || params.targets || target;

      anime({
        ...ANIME_ANIMATION_DEFAULTS,
        ...otherParams,
        targets,
        duration: durationTransition
      });
    };

    animatedItems
      .filter(item => item[flowValue])
      .forEach(animatedItem => {
        const animationsReceived = Array.isArray(animatedItem[flowValue])
          ? animatedItem[flowValue]
          : [animatedItem[flowValue]];
        const animations = animationsReceived as AnimatedSettingsTransition[];

        animations.forEach(animation => {
          if (typeof animation === 'function') {
            animation({
              target,
              duration: durationTransition,
              transitionTarget
            });
          }
          else {
            anime({
              ...ANIME_ANIMATION_DEFAULTS,
              ...animation,
              targets: target,
              duration: durationTransition
            });
          }
        });
      });
  }, [animator?.flow]);

  let initialAttributes: P | undefined;
  if (animate) {
    initialAttributes = animatedItems
      .map(item => item?.initialAttributes)
      .reduce((total: any, item) => ({ ...total, ...item }), {});
  }

  let specialStyles: CSSProperties | undefined;
  if (animate && animator?.flow.exited) {
    specialStyles = {
      // Hide the element when it is EXITED.
      visibility: 'hidden'
    };
  }

  let dynamicStyles: CSSProperties | undefined;
  if (animate) {
    dynamicStyles = animatedItems
      .map(item => formatAnimatedCSSPropsShorthands(item?.initialStyles))
      .reduce((total, item) => ({ ...total, ...item }), {});
  }

  return createElement(as, {
    ...otherProps,
    ...initialAttributes,
    className,
    style: {
      ...style,
      ...specialStyles,
      ...dynamicStyles
    },
    ref: rootRef
  });
};

const animatedSettingsItemPropType = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.object,
  PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object
    ])
  )
]);

const animatedSettingsPropType = PropTypes.shape({
  initialAttributes: PropTypes.object,
  initialStyles: PropTypes.object,
  entering: animatedSettingsItemPropType,
  entered: animatedSettingsItemPropType,
  exiting: animatedSettingsItemPropType,
  exited: animatedSettingsItemPropType
});

Animated.propTypes = {
  as: PropTypes.string.isRequired,
  animated: PropTypes.oneOfType([
    animatedSettingsPropType,
    PropTypes.arrayOf(animatedSettingsPropType)
  ])
};

Animated.defaultProps = {
  as: 'div'
};

export { AnimatedProps, Animated };
