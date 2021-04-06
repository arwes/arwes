import anime from 'animejs';
import { MutableRefObject } from 'react';
import { AnimatorClassSettings, AnimatorRef } from '@arwes/animation';

import { transitionAppear, transitionDisappear } from '../utils/appearTransitions';

type ContainerRef = MutableRefObject<HTMLDivElement>;

const transitionRemoveBlockquote = (animator: AnimatorRef, containerRef: ContainerRef): void => {
  const container = containerRef.current;

  if (container) {
    const animatedElements = container.querySelectorAll(
      '.arwes-blockquote__line, .arwes-blockquote__bg'
    );

    anime.remove(animatedElements);
  }
};

const transitionCard = (animator: AnimatorRef, containerRef: ContainerRef): void => {
  const { flow, duration } = animator;
  const isEntering = flow.entering || flow.entered;
  const durationTransition = isEntering ? duration.enter : duration.exit;

  const container = containerRef.current;
  const line = container.querySelector('.arwes-blockquote__line');
  const bg = container.querySelector('.arwes-blockquote__bg');

  if (isEntering) {
    anime({
      targets: line,
      duration: durationTransition,
      easing: 'easeOutSine',
      height: [0, '100%']
    });

    transitionAppear([line, bg], durationTransition);
  }
  else {
    transitionDisappear([line, bg], durationTransition);
  }
};

const animator: AnimatorClassSettings = {
  manager: 'stagger',
  onAnimateEntering: transitionCard,
  onAnimateExiting: transitionCard,
  onAnimateUnmount: transitionRemoveBlockquote
};

export { animator };
