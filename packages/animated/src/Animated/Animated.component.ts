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
import anime from 'animejs';
import { ENTERING, EXITING, useAnimator } from '@arwes/animator';

import { AnimatedSettings } from '../constants';
import { NoInfer } from '../utils/types';
import { formatAnimatedCSSPropsShorthands } from './formatAnimatedCSSPropsShorthands';

interface AnimatedProps <E extends HTMLElement | SVGElement = HTMLElement, P = HTMLProps<HTMLElement>> {
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

  if (process.env.NODE_ENV !== 'production' && !animator) {
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
    if (!animator || !animator.animate || !animated) {
      return;
    }

    switch (animator.flow.value) {
      case ENTERING: {
        const animationParams = {
          targets: internalRef.current,
          duration: animator.duration.enter
        };

        animatedItems.filter(item => item.entering).forEach(item => {
          const animations = Array.isArray(item.entering) ? item.entering : [item.entering];

          animations.forEach(animation => {
            if (typeof animation === 'function') {
              animation(animationParams);
            }
            else {
              anime({
                easing: 'easeOutSine',
                ...animation,
                targets: internalRef.current,
                duration: animator.duration.enter
              });
            }
          });
        });

        break;
      }

      case EXITING: {
        const animationParams = {
          targets: internalRef.current,
          duration: animator.duration.exit
        };

        animatedItems.filter(item => item.exiting).forEach(item => {
          const animations = Array.isArray(item.exiting) ? item.exiting : [item.exiting];

          animations.forEach(animation => {
            if (typeof animation === 'function') {
              animation(animationParams);
            }
            else {
              anime({
                easing: 'easeOutSine',
                ...animation,
                targets: internalRef.current,
                duration: animator.duration.exit
              });
            }
          });
        });

        break;
      }
    }
  }, [animator?.flow]);

  let initialAttributes: P | undefined;
  if (animate) {
    initialAttributes = animatedItems
      .map(item => item?.initialAttributes)
      .reduce((total: any, item) => ({ ...total, ...item }), {});
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
      ...dynamicStyles
    },
    ref: rootRef
  });
};

const animatedSettingsPropType = PropTypes.shape({
  initialAttributes: PropTypes.object,
  initialStyles: PropTypes.object,
  entering: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.object
      ])
    )
  ]),
  exiting: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.object
      ])
    )
  ])
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
