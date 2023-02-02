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

  const blinkElement = document.createElement('span');
  blinkElement.innerHTML = '&#9614;';
  Object.assign(blinkElement.style, {
    position: 'relative',
    display: 'inline-block',
    width: 0,
    height: 0,
    lineHeight: '0',
    color: 'inherit'
  });

  rootElement.appendChild(cloneElement);
  contentElement.style.visibility = 'hidden';

  const blinkAnimation = animate(
    blinkElement,
    {
      color: ['transparent', 'inherit', 'transparent']
    },
    {
      duration: 0.1,
      easing: 'steps(2, end)',
      repeat: Infinity
    }
  );

  const mainAnimation = animate(
    progress => {
      const newLength = Math.round(progress * text.length);
      const newText = text.substring(0, newLength);

      cloneElement.textContent = newText;
      cloneElement.appendChild(blinkElement);
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
    blinkAnimation.cancel();
    mainAnimation.cancel();
  };

  mainAnimation.finished.then(onComplete).catch(() => {});

  return onComplete;
};

export { transitionTextSequence };
