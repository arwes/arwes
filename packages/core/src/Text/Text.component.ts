import { FC, useRef, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { css, cx, keyframes } from '@emotion/css';
import { jsx } from '@emotion/react';
import { WithAnimatorInputProps } from '@arwes/animation';
import { WithBleepsInputProps } from '@arwes/sounds';

import { styles } from './Text.styles';
import { startAnimation } from './Text.animations';

// TODO: Is the "bleeps" object reference always the same?
// TODO: Add support for dynamic duration based on text length.

interface TextProps {
  as?: keyof HTMLElementTagNameMap
  blink?: boolean
  blinkText?: string
  blinkInterval?: number
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
    const newChildrenContent = String(actualChildrenRef.current?.innerHTML || '');
    const isChildrenContentEqual = newChildrenContent === childrenContent.current;

    childrenContent.current = newChildrenContent;

    // The animation is re-run every time the children content changes when
    // animator is ENTERED.
    if (animator.animate && animator.flow.entered && !isChildrenContentEqual) {
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
  blink: PropTypes.bool,
  blinkText: PropTypes.string,
  blinkInterval: PropTypes.number
};

Text.defaultProps = {
  as: 'span',
  blink: true,
  blinkText: '&#9614;',
  blinkInterval: 100
};

export { TextProps, Text };
