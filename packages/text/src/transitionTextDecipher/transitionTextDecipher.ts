import { randomizeList } from '@arwes/tools';
import { Animation, createAnimation } from '@arwes/animated';

import type { TextTransitionProps } from '../types';

const LETTERS = 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ>!·$%&/()=?¿≤|@#';

const transitionTextDecipher = (props: TextTransitionProps): Animation => {
  const {
    rootElement,
    contentElement,
    duration,
    isEntering = true,
    easing = 'linear'
  } = props;

  const cloneElement = document.createElement('span');
  Object.assign(cloneElement.style, {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  });

  rootElement.appendChild(cloneElement);
  contentElement.style.visibility = 'hidden';

  const text = contentElement.textContent ?? '';
  const indexes = randomizeList(Array(text.length).fill(null).map((_, i) => i));
  const deciphered: Record<number, boolean> = {};

  const finish = (): void => {
    contentElement.style.visibility = isEntering ? 'visible' : 'hidden';
    cloneElement.remove();
  };

  return createAnimation({
    duration,
    easing,
    isEntering,
    onChange: progress => {
      const newPositionsLength = Math.round(text.length * progress);

      for (let index = 0; index < text.length; index++) {
        deciphered[indexes[index]] = index < newPositionsLength;
      }

      const newText = text
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (deciphered[index]) return char;
          return LETTERS[Math.round(Math.random() * (LETTERS.length - 1))];
        })
        .join('');

      cloneElement.textContent = newText;
    },
    onCancel: finish,
    onComplete: finish
  });
};

export { transitionTextDecipher };
