import { animate } from 'motion';
import { NOOP } from '@arwes/tools';
import { easing } from '@arwes/animated';

import type { TextTransitionProps } from '../types';

const transitionTextSequence = (props: TextTransitionProps): (() => void) => {
  const {
    text,
    duration,
    isEntering,
    easing: easingName,
    onChange,
    onComplete
  } = props;

  const animation = animate(
    progress => {
      const newLength = Math.round(progress * text.length);
      const newText = text.substring(0, newLength);

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

export { transitionTextSequence };
