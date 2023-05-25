import {
  type ReactNode,
  type ReactElement,
  type HTMLProps,
  type ForwardedRef,
  useMemo,
  useState,
  useRef,
  useEffect
} from 'react';
import { jsx } from '@emotion/react';
import { cx } from '@arwes/tools';
import { mergeRefs } from '@arwes/react-tools';
import { ANIMATOR_STATES as STATES } from '@arwes/animator';
import { type Animation, type easing } from '@arwes/animated';
import { useAnimator } from '@arwes/react-animator';
import {
  type TextTransitionManager,
  getTransitionTextDuration,
  transitionTextSequence,
  transitionTextDecipher
} from '@arwes/text';

interface TextProps<E extends HTMLElement = HTMLSpanElement> extends HTMLProps<E> {
  as?: keyof HTMLElementTagNameMap
  className?: string
  contentClassName?: string
  elementRef?: ForwardedRef<E>
  manager?: TextTransitionManager
  easing?: keyof typeof easing
  /**
   * If the duration of the animation should be fixed by the parent Animator
   * or dynamic according to its children.
   */
  fixed?: boolean
  hideOnExited?: boolean
  hideOnEntered?: boolean
  children: ReactNode
}

const TEXT_CLASS = 'arwes-react-text-text';

const Text = <E extends HTMLElement = HTMLSpanElement>(props: TextProps<E>): ReactElement => {
  const {
    as: asProvided = 'p',
    className,
    contentClassName,
    children,
    manager,
    easing,
    fixed,
    hideOnExited = true,
    hideOnEntered,
    elementRef: elementRefProvided,
    ...otherProps
  } = props;

  const as = useMemo(() => asProvided, []);
  const [childrenText, setChildrenText] = useState('');
  const elementRef = useRef<E>(null);
  const contentElementRef = useRef<HTMLSpanElement>(null);
  const transitionControl = useRef<Animation | null>(null);
  const animator = useAnimator();
  const [isExited, setIsExited] = useState(() => animator?.node.state === STATES.exited);
  const [isEntered, setIsEntered] = useState(() => animator?.node.state === STATES.entered);

  useEffect(() => {
    setChildrenText(contentElementRef.current?.textContent ?? '');
  }, [children]);

  useEffect(() => {
    if (!animator) {
      if (contentElementRef.current) {
        contentElementRef.current.style.visibility = 'visible';
      }
      return;
    }

    // If there is no text, there is nothing to animate.
    if (!childrenText.length) {
      return;
    }

    if (!fixed) {
      const settings = animator.node.control.getSettings();
      const durationEnter = getTransitionTextDuration({
        length: childrenText.length,
        maxDuration: settings.duration.enter
      });
      const durationExit = getTransitionTextDuration({
        length: childrenText.length,
        maxDuration: settings.duration.exit
      });

      animator.node.control.setDynamicSettings({
        duration: { enter: durationEnter, exit: durationExit }
      });
    }

    const transitioner = manager === 'decipher'
      ? transitionTextDecipher
      : transitionTextSequence;

    const transition = (duration: number, isEntering: boolean): void => {
      transitionControl.current?.cancel();
      transitionControl.current = transitioner({
        rootElement: elementRef.current as HTMLElement,
        contentElement: contentElementRef.current as HTMLElement,
        duration,
        isEntering,
        easing,
        hideOnExited,
        hideOnEntered
      });
    };

    const cancelSubscription = animator.node.subscribe(node => {
      setIsEntered(node.state === STATES.entered);
      setIsExited(node.state === STATES.exited);

      switch (node.state) {
        case 'entered': {
          if (!transitionControl.current) {
            transition(node.duration.enter, true);
          }
          break;
        }
        case 'entering': {
          transition(node.duration.enter, true);
          break;
        }
        case 'exiting': {
          transition(node.duration.exit, false);
          break;
        }
      }
    });

    return () => {
      cancelSubscription();
      transitionControl.current?.cancel();
      transitionControl.current = null;
    };
  }, [animator, childrenText]);

  return jsx(
    as,
    {
      ...otherProps,
      className: cx(TEXT_CLASS, className),
      css: {
        position: 'relative'
      },
      ref: mergeRefs<E>(elementRefProvided, elementRef)
    },
    jsx(
      'span',
      {
        ref: contentElementRef,
        className: cx(`${TEXT_CLASS}__content`, contentClassName),
        css: {
          position: 'relative',
          zIndex: 1,
          display: 'inline-block',
          visibility: animator && ((hideOnEntered && isEntered) || (hideOnExited && isExited)) ? 'hidden' : 'visible'
        }
      },
      children
    )
  );
};

export type { TextProps };
export { TEXT_CLASS, Text };
