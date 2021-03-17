import {
  FC,
  MutableRefObject,
  CSSProperties,
  useRef,
  useMemo,
  useCallback,
  useEffect,
  useLayoutEffect
} from 'react';
import PropTypes from 'prop-types';
import { css, cx, keyframes } from '@emotion/css';
import { jsx } from '@emotion/react';
import { WithAnimatorInputProps } from '@arwes/animation';
import { useBleeps } from '@arwes/sounds';

import { TextAnimationRefs, startTextAnimation } from '../utils/textAnimations';
import { generateStyles } from './Text.styles';

// Browser normally renders 60 frames per second for requested animations.
const FPS_NORMAL_DURATION = 1000 / 60;

interface TextProps {
  as?: keyof HTMLElementTagNameMap
  blink?: boolean
  blinkText?: string
  blinkInterval?: number
  dynamicDuration?: boolean
  dynamicDurationFactor?: number
  className?: string
  style?: CSSProperties
  rootRef?: MutableRefObject<HTMLElement | null> | ((node: HTMLElement) => void)
}

const Text: FC<TextProps & WithAnimatorInputProps> = props => {
  const {
    animator,
    as: providedAs,
    blink: hasBlink,
    blinkText,
    blinkInterval,
    dynamicDuration,
    dynamicDurationFactor,
    className,
    style,
    rootRef: providedRootRef,
    children
  } = props;

  const internalRootRef = useRef<HTMLElement | null>(null);
  const actualChildrenRef = useRef<HTMLElement | null>(null);
  const cloneNode = useRef<HTMLElement | null>(null);
  const blinkNode = useRef<HTMLElement | null>(null);
  const animationFrame = useRef<number | null>(null);

  const animateRefs: TextAnimationRefs = useRef({
    rootRef: internalRootRef,
    actualChildrenRef,
    cloneNode,
    blinkNode,
    animationFrame
  });

  const bleeps = useBleeps();

  const styles = useMemo(
    () => generateStyles({ animate: animator.animate }),
    [animator.animate]
  );

  const as = useMemo(() => providedAs, []);

  const rootRef = useCallback((node: HTMLElement) => {
    internalRootRef.current = node;

    if (typeof providedRootRef === 'function') {
      providedRootRef(node);
    }
    else if (providedRootRef) {
      providedRootRef.current = node;
    }
  }, []);

  useEffect(() => {
    // The blink element is created only once for all the animations,
    // since this element is the same each case.
    if (animator.animate && hasBlink && blinkText && blinkInterval) {
      const blinkKeyframes = keyframes(styles.blinkKeyframes);
      const blinkClassName = css({
        ...styles.blink,
        animation: `${blinkKeyframes} ${blinkInterval}ms step-end infinite`
      });

      blinkNode.current = document.createElement('span');
      blinkNode.current.innerHTML = blinkText;
      blinkNode.current.setAttribute('class', blinkClassName);
    }
    else {
      blinkNode.current = null;
    }
  }, [animator.animate, hasBlink]);

  // Every time the children content is updated when the animator is ENTERED,
  // the animation should be re-run. This check is a simple comparision if children
  // is a string, but if it is a JSX object(s), every time any prop changes,
  // the children is received as changed too.
  // The solution is to store a copy of the children element content as
  // a string, then compare it each time it is changed.
  const childrenContent = useRef<string>('');

  useLayoutEffect(() => {
    if (!animator.animate) {
      return;
    }

    // The dynamic duration for ENTERING transition is the minimum number of:
    // 1) The children text length multiplied by a factor number. The factor is
    // by default a "normal" FPS (Frame per second) duration which is 1 second / 60.
    // 2) The provided animator entering duration.
    // This minimum calculation is made to ensure a consistent behavior.
    // If a fixed value is needed, dynamic duration must be disabled, and
    // a specific animator duration needs to be provided.
    if (dynamicDuration) {
      const newChildrenTextContent = String(actualChildrenRef.current?.textContent || '');
      const factor = dynamicDurationFactor || FPS_NORMAL_DURATION;
      const newDynamicDuration = Math.min(
        factor * newChildrenTextContent.length,
        animator.duration.enter
      );

      if (animator.duration.enter !== newDynamicDuration) {
        animator.updateDuration({ enter: newDynamicDuration });
      }
    }

    const newChildrenContent = String(actualChildrenRef.current?.innerHTML || '');
    const isChildrenContentEqual = newChildrenContent === childrenContent.current;

    childrenContent.current = newChildrenContent;

    // The animation is re-run every time the children content changes when
    // animator is ENTERED.
    if (animator.flow.entered && !isChildrenContentEqual) {
      bleeps.type?.play();
      startTextAnimation(animator, animateRefs, () => {
        bleeps.type?.stop();
      });
    }
  }, [children]);

  animator.setupAnimateRefs(animateRefs, bleeps);

  return jsx(
    as as string,
    {
      className: cx('arwes-text', className),
      css: styles.root,
      style,
      ref: rootRef
    },
    jsx(
      'span',
      {
        ref: actualChildrenRef,
        css: styles.actualChildren,
        className: 'arwes-text__content'
      },
      children
    )
  );
};

Text.propTypes = {
  // @ts-expect-error
  as: PropTypes.string,
  dynamicDuration: PropTypes.bool,
  dynamicDurationFactor: PropTypes.number,
  blink: PropTypes.bool,
  blinkText: PropTypes.string,
  blinkInterval: PropTypes.number,
  rootRef: PropTypes.any
};

Text.defaultProps = {
  as: 'span',
  dynamicDuration: true,
  dynamicDurationFactor: FPS_NORMAL_DURATION,
  blink: true,
  blinkText: '&#9614;',
  blinkInterval: 100
};

export { TextProps, Text };
