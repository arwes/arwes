import {
  HTMLProps,
  CSSProperties,
  MutableRefObject,
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

import { NoInfer } from '../utils/types';

interface AnimatedSettingsTransitionFunctionParams {
  targets: anime.AnimeAnimParams['targets']
  duration: number
  delay?: number
}

type AnimatedSettingsTransitionFunction = (params: AnimatedSettingsTransitionFunctionParams) => void;

// TODO: Use a stronger typing for anime parameters instead of "anime.AnimeParams".
type AnimatedSettingsTransitionTypes = AnimatedSettingsTransitionFunction | anime.AnimeParams;

type AnimatedSettingsTransition = AnimatedSettingsTransitionTypes | AnimatedSettingsTransitionTypes[];

interface AnimatedSettings <P = HTMLProps<HTMLElement>> {
  initialAttributes?: P
  initialStyles?: CSSProperties
  entering?: AnimatedSettingsTransition
  exiting?: AnimatedSettingsTransition
}

interface AnimatedProps <E extends HTMLElement | SVGElement = HTMLElement, P = HTMLProps<HTMLElement>> {
  as?: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap
  animated?: AnimatedSettings<P>
  className?: string
  style?: CSSProperties
  rootRef?: MutableRefObject<E | null> | ((node: E) => void)
}

const Animated = <E extends HTMLElement | SVGElement = HTMLDivElement, P = HTMLProps<HTMLDivElement>> (props: AnimatedProps<E, P> & NoInfer<P>): ReactElement => {
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
  const dynamicStyles = animate ? animated?.initialStyles : null;
  const initialAttributes = animate ? animated?.initialAttributes : null;

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
        if (animated.entering) {
          const animationParams = {
            targets: internalRef.current,
            duration: animator.duration.enter
          };

          const animations: AnimatedSettingsTransitionTypes[] =
            Array.isArray(animated.entering)
              ? animated.entering
              : [animated.entering];

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
        }
        break;
      }

      case EXITING: {
        if (animated.exiting) {
          const animationParams = {
            targets: internalRef.current,
            duration: animator.duration.exit
          };

          const animations: AnimatedSettingsTransitionTypes[] =
            Array.isArray(animated.exiting)
              ? animated.exiting
              : [animated.exiting];

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
        }
        break;
      }
    }
  }, [animator?.flow]);

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

Animated.propTypes = {
  as: PropTypes.string.isRequired,
  animated: PropTypes.shape({
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
  })
};

Animated.defaultProps = {
  as: 'div'
};

export {
  AnimatedSettingsTransitionFunctionParams,
  AnimatedSettingsTransitionFunction,
  AnimatedSettingsTransition,
  AnimatedSettings,
  AnimatedProps,
  Animated
};
