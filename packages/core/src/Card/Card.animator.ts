import anime from 'animejs';
import { MutableRefObject } from 'react';
import { AnimatorClassSettings, AnimatorRef } from '@arwes/animation';
import { Bleeps } from '@arwes/sounds';

import { transitionAppear, transitionDisappear } from '../utils/appearTransitions';
import { ArwesTheme } from '../ArwesThemeProvider';

type ContainerRef = MutableRefObject<HTMLDivElement>;

const transitionRemoveCard = (animator: AnimatorRef, containerRef: ContainerRef): void => {
  const container = containerRef.current;

  if (container) {
    const animatedElements = container.querySelectorAll([
      '.arwes-card__line',
      '.arwes-card__image',
      '.arwes-card__content-bg'
    ].join(','));

    anime.remove(animatedElements);
  }
};

const transitionCard = (
  animator: AnimatorRef,
  containerRef: ContainerRef,
  theme: ArwesTheme,
  bleeps: Bleeps
): void => {
  const { flow, duration } = animator;
  const isEntering = flow.entering || flow.entered;
  const transitionDuration = isEntering ? duration.enter : duration.exit;
  const container = containerRef.current;
  const { space } = theme;

  if (isEntering) {
    bleeps.object?.play();

    anime({
      targets: container.querySelector('.arwes-card__line-picture'),
      duration: transitionDuration,
      easing: 'easeOutSine',
      translateX: [space(4), 0]
    });

    anime({
      targets: container.querySelector('.arwes-card__line-content'),
      duration: transitionDuration,
      easing: 'easeOutSine',
      translateY: [-space(4), 0]
    });

    transitionAppear(
      container.querySelectorAll('.arwes-card__line'),
      transitionDuration
    );

    transitionAppear(
      container.querySelectorAll('.arwes-card__image, .arwes-card__content-bg'),
      transitionDuration,
      transitionDuration
    );
  }
  else {
    transitionDisappear(
      container.querySelectorAll([
        '.arwes-card__line',
        '.arwes-card__image',
        '.arwes-card__content-bg'
      ].join(',')),
      transitionDuration
    );
  }
};

const animator: AnimatorClassSettings = {
  manager: 'stagger',
  useAnimateEntering: transitionCard,
  useAnimateExiting: transitionCard,
  useAnimateUnmount: transitionRemoveCard
};

export { animator };
