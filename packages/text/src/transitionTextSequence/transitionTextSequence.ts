import { animate } from 'motion';
import { easing } from '@arwes/animated';

import type { TextTransitionProps } from '../types';

const transitionTextSequence = (props: TextTransitionProps): (() => void) => {
  const {
    rootElement,
    contentElement,
    text,
    duration,
    isEntering = true,
    easing: easingName = 'linear'
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

  const animation = animate(
    progress => {
      const newLength = Math.round(progress * text.length);
      const newText = text.substring(0, newLength);

      cloneElement.textContent = newText;
    },
    {
      duration,
      easing: easing[easingName],
      direction: isEntering ? 'normal' : 'reverse'
    }
  );

  const onComplete = (): void => {
    contentElement.style.visibility = isEntering ? 'visible' : 'hidden';
    cloneElement.remove();
    animation.cancel();
  };

  animation.finished.then(onComplete).catch(() => {});

  return onComplete;
};

export { transitionTextSequence };
