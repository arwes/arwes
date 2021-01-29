import { FC, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { css, cx, keyframes } from '@emotion/css';
import { jsx } from '@emotion/react';
import { WithAnimatorInputProps } from '@arwes/animation';
import { WithBleepsInputProps } from '@arwes/sounds';

import { styles } from './Text.styles';
// DEBUG:
// import { startAnimation } from './Text.animations';

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
    currentAnimationFrame
  });

  animator.setupAnimateRefs(animateRefs);

  useEffect(() => {
    if (actualChildrenRef.current) {
      actualChildrenRef.current.style.opacity = animator.animate ? '0' : '';
    }
  }, [animator.animate]);

  useEffect(() => {
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

  useEffect(() => {
    if (animator.animate) {
      if (animator.flow.entering || animator.flow.exiting) {
        bleeps.typing?.play();
      }
      else {
        bleeps.typing?.stop();
      }
    }
  }, [animator.flow]);

  // DEBUG:
  /*
  useEffect(() => {
    if (animator.animate && animator.flow.entered) {
      // DEBUG:
      console.log('Children updated, reanimating');

      startAnimation(animator, animateRefs);
    }
  }, [children]);
  */

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
