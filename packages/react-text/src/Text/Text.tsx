import {
  ReactElement,
  HTMLProps,
  ForwardedRef,
  memo,
  useMemo,
  useRef,
  useEffect
} from 'react';
import { jsx } from '@emotion/react';
import { cx } from '@arwes/tools';
import { mergeRefs } from '@arwes/react-tools';
import { ANIMATOR_STATES as STATES } from '@arwes/animator';
import { ease } from '@arwes/animated';
import { useAnimator } from '@arwes/react-animator';
import {
  getTransitionTextDuration,
  CreateTextTransitioner,
  createTextTransitioner
} from '@arwes/text';

interface TextProps<E extends HTMLElement = HTMLSpanElement> extends HTMLProps<E> {
  as?: keyof HTMLElementTagNameMap
  className?: string
  elementRef?: ForwardedRef<E>
  method?: 'sequence'
  ease?: keyof typeof ease
  dynamic?: boolean
  children: string
}

const TEXT_CLASS = 'arwes_react-text_Text';

const Text = memo((props: TextProps): ReactElement => {
  const {
    as: asProvided = 'span',
    className,
    children,
    method,
    ease,
    dynamic = true,
    elementRef: elementRefProvided,
    ...otherProps
  } = props;

  const as = useMemo(() => asProvided, []);
  const elementRef = useRef<HTMLElement>(null);
  const contentElementRef = useRef<HTMLSpanElement>(null);
  const transitioner = useRef<CreateTextTransitioner | null>(null);
  const animator = useAnimator();

  useEffect(() => {
    if (!animator) {
      return;
    }

    if (typeof children !== 'string') {
      throw new Error('Text children must be a string.');
    }

    if (dynamic) {
      const settings = animator.node.control.getSettings();
      const durationEnter = getTransitionTextDuration({
        text: children,
        maxDuration: settings.duration.enter
      });
      const durationExit = getTransitionTextDuration({
        text: children,
        maxDuration: settings.duration.exit
      });

      animator.node.control.setDynamicSettings({
        duration: { enter: durationEnter, exit: durationExit }
      });
    }

    if (!transitioner.current) {
      transitioner.current = createTextTransitioner({
        node: animator.node,
        rootElement: elementRef.current as HTMLElement,
        contentElement: contentElementRef.current as HTMLElement,
        initialText: children,
        ease
      });
    }
    else {
      transitioner.current.update(children);
    }

    return () => {
      transitioner.current?.cancel();
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
      ref: mergeRefs(elementRefProvided, elementRef)
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
});

export type { TextProps };
export { TEXT_CLASS, Text };
