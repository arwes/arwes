import { randomizeList } from '@arwes/tools';
import { type Animation, createAnimation } from '@arwes/animated';

import type { TextTransitionProps } from '../types';
import { walkTextNodes } from '../internal/walkTextNodes/index';
import { setTextNodesContent } from '../internal/setTextNodesContent/index';

const LETTERS = 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ>!·$%&/()=?¿≤|@#';

const transitionTextDecipher = (props: TextTransitionProps): Animation => {
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

  const textNodes: Node[] = [];
  const textsReal: string[] = [];

  walkTextNodes(cloneElement, child => {
    textNodes.push(child);
    textsReal.push(child.textContent || '');
  });

  const length = textsReal.join('').length;

  // A list of all the characters indexes in random positions.
  const indexes = randomizeList(Array(length).fill(null).map((_, i) => i));

  // A record of all characters indexes with `true` to know if their character
  // is now deciphered/visible.
  const deciphered: Record<number, boolean> = {};

  rootElement.appendChild(cloneElement);
  contentElement.style.visibility = 'hidden';

  return createAnimation({
    duration,
    easing,
    direction: isEntering ? 'normal' : 'reverse',
    onUpdate: progress => {
      // When entering, the animation decipher characters over time.
      // When exiting, the animation will cipher characters over time.

      const newPositionsLength = Math.round(length * progress);

      for (let index = 0; index < length; index++) {
        deciphered[indexes[index]] = index < newPositionsLength;
      }

      const textsCurrent = textsReal.map(text =>
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (deciphered[index]) return char;
            return LETTERS[Math.round(Math.random() * (LETTERS.length - 1))];
          })
          .join('')
      );

      setTextNodesContent(textNodes, textsCurrent, length);
    },
    onComplete: () => {
      contentElement.style.visibility = (isEntering && hideOnEntered) || (!isEntering && hideOnExited)
        ? 'hidden'
        : 'visible';
      cloneElement.remove();
    },
    onCancel: () => {
      contentElement.style.visibility = '';
      cloneElement.remove();
    }
  });
};

export { transitionTextDecipher };
