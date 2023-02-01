import { animate } from 'motion';
import { NOOP, randomizeList } from '@arwes/tools';
import { easing } from '@arwes/animated';

import type { TextTransitionProps } from '../types';

const LETTERS = 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ>!"·$%&/()=?¿';

const transitionTextDecipher = (props: TextTransitionProps): (() => void) => {
  if (props.text.length === 0) {
    props.onComplete?.();
    return NOOP;
  }

  const {
    text,
    isEntering,
    duration,
    easing: easingName,
    onChange,
    onComplete
  } = props;

  const deciphered = randomizeList(Array(text.length).fill(null).map((_, i) => i))
    .map(i => [i, !isEntering]);

  const animation = animate(
    progress => {
      const newPositionsLength = Math.round(text.length * progress);

      for (let index = 0; index < text.length; index++) {
        if (index >= newPositionsLength) {
          break;
        }
        deciphered[index] = [deciphered[index][0], isEntering];
      }

      const newText = text
        .split('')
        .map((char, index) => {
          if (' ,.'.includes(char)) return char;
          const item = deciphered.find(p => p[0] === index);
          if (item?.[1] === true) return char;
          return LETTERS[Math.round(Math.random() * (LETTERS.length - 1))];
        })
        .join('');

      onChange(newText);
    },
    {
      duration,
      easing: easing[easingName],
      direction: isEntering ? 'normal' : 'reverse'
    }
  );

  animation.finished.then(onComplete).catch(NOOP);

  return () => animation.cancel();
};

export { transitionTextDecipher };
