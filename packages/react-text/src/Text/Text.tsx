import {
  ReactElement,
  HTMLProps,
  ForwardedRef,
  useMemo,
  useRef,
  useEffect
} from 'react';
import { jsx } from '@emotion/react';
import { cx } from '@arwes/tools';
import { mergeRefs } from '@arwes/react-tools';
import { ANIMATOR_STATES as STATES } from '@arwes/animator';
import { easing } from '@arwes/animated';
import { useAnimator } from '@arwes/react-animator';
import {
  TextTransitionManager,
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
  dynamic?: boolean
  children: string
}

const TEXT_CLASS = 'arwes_react-text_Text';

const Text = <E extends HTMLElement = HTMLSpanElement>(props: TextProps<E>): ReactElement => {
  const {
    as: asProvided = 'span',
    className,
    children,
    manager,
    easing,
    dynamic = true,
    elementRef: elementRefProvided,
    ...otherProps
  } = props;

  const as = useMemo(() => asProvided, []);
  const elementRef = useRef<E>(null);
  const contentElementRef = useRef<HTMLSpanElement>(null);
  const cancelTransition = useRef<(() => void) | null>(null);
  const animator = useAnimator();

  useEffect(() => {
    if (!animator) {
      if (contentElementRef.current) {
        contentElementRef.current.style.visibility = 'visible';
      }
      return;
    }

    if (typeof children !== 'string') {
      throw new Error('Text component children must be a string.');
    }

    if (dynamic) {
      const settings = animator.node.control.getSettings();
      const durationEnter = getTransitionTextDuration({
        length: children.length,
        maxDuration: settings.duration.enter
      });
      const durationExit = getTransitionTextDuration({
        length: children.length,
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
      cancelTransition.current?.();
      cancelTransition.current = transitioner({
        rootElement: elementRef.current as HTMLElement,
        contentElement: contentElementRef.current as HTMLElement,
        duration,
        isEntering,
        easing
      });
    };

    const subscription = animator.node.subscribe(node => {
      switch (node.state) {
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
      cancelTransition.current?.();
      cancelTransition.current = null;
    };
  }, [animator, children]);

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
