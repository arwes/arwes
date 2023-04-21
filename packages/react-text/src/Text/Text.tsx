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
  elementRef?: ForwardedRef<E>
  manager?: TextTransitionManager
  easing?: keyof typeof easing
  /**
   * If the duration of the animation should be fixed by the parent Animator
   * or dynamic according to its children.
   */
  fixed?: boolean
  children: ReactNode
}

const TEXT_CLASS = 'arwes-react-text-text';

const Text = <E extends HTMLElement = HTMLSpanElement>(props: TextProps<E>): ReactElement => {
  const {
    as: asProvided = 'span',
    className,
    children,
    manager,
    easing,
    fixed,
    elementRef: elementRefProvided,
    ...otherProps
  } = props;

  const as = useMemo(() => asProvided, []);
  const [childrenText, setChildrenText] = useState('');
  const elementRef = useRef<E>(null);
  const contentElementRef = useRef<HTMLSpanElement>(null);
  const transitionControl = useRef<Animation | null>(null);
  const animator = useAnimator();

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
        easing
      });
    };

    const subscription = animator.node.subscribe(node => {
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
      subscription();
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
        position: 'relative',
        display: 'inline-block'
      },
      ref: mergeRefs<E>(elementRefProvided, elementRef)
    },
    jsx(
      'span',
      {
        ref: contentElementRef,
        className: `${TEXT_CLASS}__content`,
        css: {
          position: 'relative',
          zIndex: 1,
          display: 'inline-block',
          visibility: animator && animator.node.state !== STATES.entered ? 'hidden' : undefined
        }
      },
      children
    )
  );
};

export type { TextProps };
export { TEXT_CLASS, Text };
