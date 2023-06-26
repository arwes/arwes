import { animate } from 'motion';
import { type Animation, createAnimation } from '@arwes/animated';

import type { TextTransitionProps } from '../types';
import { walkTextNodes } from '../internal/walkTextNodes/index';
import { setTextNodesContent } from '../internal/setTextNodesContent/index';

const transitionTextSequence = (props: TextTransitionProps): Animation => {
  const {
    rootElement,
    contentElement,
    duration,
    easing = 'linear',
    isEntering = true,
    hideOnExited = true,
    hideOnEntered
  } = props;

  // If no valid elements are provided, return an void animation for type safety.
  if (!rootElement || !contentElement) {
    return {
      isPending: () => false,
      cancel: () => {}
    };
  }

  const cloneElement = contentElement.cloneNode(true) as HTMLElement;
  Object.assign(cloneElement.style, {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    visibility: 'visible',
    opacity: 1
  });

  const blinkElement = document.createElement('span');
  blinkElement.classList.add('arwes-text__blink');
  blinkElement.innerHTML = '&#9614;';
  Object.assign(blinkElement.style, {
    position: 'relative',
    display: 'inline-block',
    width: 0,
    height: 0,
    lineHeight: '0',
    color: 'inherit'
  });

  const textNodes: Node[] = [];
  const texts: string[] = [];

  walkTextNodes(cloneElement, child => {
    textNodes.push(child);
    texts.push(child.textContent || '');

    if (isEntering) {
      child.textContent = '';
    }
  });

  const length = texts.join('').length;

  rootElement.appendChild(cloneElement);
  cloneElement.appendChild(blinkElement);
  contentElement.style.visibility = 'hidden';

  const blinkAnimation = animate(
    blinkElement,
    { color: ['transparent', 'inherit', 'transparent'] },
    { duration: 0.1, easing: 'steps(2, end)', repeat: Infinity }
  );

  return createAnimation({
    duration,
    easing,
    direction: isEntering ? 'normal' : 'reverse',
    onUpdate: progress => {
      const newLength = Math.round(progress * length);
      setTextNodesContent(textNodes, texts, newLength);
    },
    onComplete: () => {
      contentElement.style.visibility = (isEntering && hideOnEntered) || (!isEntering && hideOnExited)
        ? 'hidden'
        : 'visible';
      cloneElement.remove();
      blinkAnimation.cancel();
    },
    onCancel: () => {
      contentElement.style.visibility = '';
      cloneElement.remove();
      blinkAnimation.cancel();
    }
  });
};

export { transitionTextSequence };
