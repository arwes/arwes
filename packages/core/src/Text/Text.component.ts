import { FC, useRef, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { css, cx, keyframes } from '@emotion/css';
import { jsx } from '@emotion/react';
import { WithAnimatorInputProps } from '@arwes/animation';
import { WithBleepsInputProps } from '@arwes/sounds';

import { styles } from './Text.styles';
import { startAnimation } from './Text.animations';

interface TextProps {
  as?: keyof HTMLElementTagNameMap
  blink?: boolean
  blinkText?: string
  blinkInterval?: number
  dynamicDuration?: boolean
  dynamicDurationFactor?: number
  className?: string
}

const Text: FC<TextProps & WithAnimatorInputProps & WithBleepsInputProps> = props => {
  const {
    animator,
    bleeps,
    as,
    blink: hasBlink,
    blinkText,
    blinkInterval,
    dynamicDuration,
    dynamicDurationFactor,
    className,
    children
  } = props;

  const rootRef = useRef<HTMLElement>(null);
  const actualChildrenRef = useRef<HTMLElement>(null);
  const currentCloneNode = useRef<HTMLElement | null>(null);
  const currentBlinkNode = useRef<HTMLElement | null>(null);
  const currentAnimationFrame = useRef<number | null>(null);

  const animateRefs = useRef({
    rootRef,
    actualChildrenRef,
    currentCloneNode,
    currentBlinkNode,
    currentAnimationFrame,
    bleeps
  });

  animator.setupAnimateRefs(animateRefs);

  useEffect(() => {
    if (actualChildrenRef.current) {
      actualChildrenRef.current.style.opacity = animator.animate ? '0' : '';
    }
  }, [animator.animate]);

  useEffect(() => {
    // The blink element is created only once for all the animations,
    // since this element is the same each case.
    if (hasBlink && blinkText && blinkInterval) {
      const blinkKeyframes = keyframes(styles.blinkKeyframes);
      const blinkClassName = css({
        ...styles.blink,
        animation: `${blinkKeyframes} ${blinkInterval}ms step-end infinite`
      });

      currentBlinkNode.current = document.createElement('span');
      currentBlinkNode.current.innerHTML = blinkText;
      currentBlinkNode.current.setAttribute('class', blinkClassName);
    }
    else {
      currentBlinkNode.current = null;
    }
  }, [hasBlink]);

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
      const factor = dynamicDurationFactor || (1000 / 60);
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
      startAnimation(animator, animateRefs);
    }
  }, [children]);

  return jsx(
    as as string,
    {
      className: cx('arwes-core-text', className),
      ref: rootRef,
      css: styles.root
    },
    jsx(
      'span',
      {
        ref: actualChildrenRef,
        css: styles.actualChildren,
        className: 'arwes-core-text__content'
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
  blinkInterval: PropTypes.number
};

Text.defaultProps = {
  as: 'span',
  dynamicDuration: true,
  dynamicDurationFactor: 1000 / 60, // Normal FPS duration
  blink: true,
  blinkText: '&#9614;',
  blinkInterval: 100
};

export { TextProps, Text };
