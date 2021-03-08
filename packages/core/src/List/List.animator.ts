import anime from 'animejs';
import { MutableRefObject } from 'react';
import { AnimatorClassSettings, AnimatorRef } from '@arwes/animation';

import { ArwesTheme } from '../ArwesThemeProvider';

type ContainerRef = MutableRefObject<HTMLUListElement>;

const transitionRemoveList = (animator: AnimatorRef, containerRef: ContainerRef): void => {
  const container = containerRef.current;

  if (container) {
    const items = container.querySelectorAll(':scope > li');
    anime.remove(items);
  }
};

const transitionList = (animator: AnimatorRef, containerRef: ContainerRef, theme: ArwesTheme): void => {
  transitionRemoveList(animator, containerRef);

  const { flow, duration } = animator;
  const isEntering = flow.entering || flow.entered;
  const transitionDuration = isEntering ? duration.enter : duration.exit;

  const container = containerRef.current;
  const items = container.querySelectorAll(':scope > li');

  const { space } = theme;

  if (isEntering) {
    anime({
      targets: items,
      delay: anime.stagger(duration.stagger),
      opacity: {
        easing: 'easeOutExpo',
        duration: transitionDuration / 3,
        value: [0, 1]
      },
      translateX: {
        easing: 'easeOutSine',
        duration: transitionDuration,
        value: [-space(2), 0]
      }
    });
  }
  else {
    anime({
      targets: items,
      // Only set `opacity: 0` when the animation is completed so the <List/>
      // children text components can be animated properly.
      easing: () => (progress: number): number => progress === 1 ? 1 : 0,
      duration: transitionDuration,
      opacity: [1, 0]
    });
  }
};

const animator: AnimatorClassSettings = {
  combine: true,
  manager: 'stagger',
  useAnimateEntering: transitionList,
  useAnimateExiting: transitionList,
  useAnimateUnmount: transitionRemoveList
};

export { animator };
