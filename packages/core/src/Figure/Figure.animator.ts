import anime from 'animejs';
import { MutableRefObject } from 'react';
import { CSSObject } from '@emotion/css';
import { Theme } from '@arwes/design';
import { AnimatorClassSettings, AnimatorRef } from '@arwes/animator';
import { transitionVisibilityIn, transitionVisibilityOut } from '@arwes/animated';
import { Bleeps } from '@arwes/bleeps';

type ContainerRef = MutableRefObject<HTMLElement>;

const onAnimateEntering = (
  animator: AnimatorRef,
  containerRef: ContainerRef,
  theme: Theme,
  styles: CSSObject,
  bleeps: Bleeps
): void => {
  bleeps.object?.play();

  const { duration } = animator;
  const container = containerRef.current;

  anime({
    targets: container.querySelectorAll('.arwes-figure__line'),
    duration: duration.enter,
    easing: 'easeOutSine',
    opacity: [0, 1],
    translateY: (el: HTMLElement): number[] => {
      if (el.classList.contains('arwes-figure__line-b')) {
        return [theme.space(15), 0];
      }
      return [-theme.space(15), 0];
    },
    skewX: (el: HTMLElement): number[] | number => {
      if (el.classList.contains('arwes-figure__line-c')) {
        return [330, 330];
      }
      return 0;
    }
  });

  transitionVisibilityIn({
    targets: container.querySelectorAll([
      '.arwes-figure__asset',
      '.arwes-figure__description-bg'
    ].join(',')),
    duration: duration.enter,
    delay: duration.enter
  });
};

const onAnimateExiting = (animator: AnimatorRef, containerRef: ContainerRef): void => {
  const { duration } = animator;
  const container = containerRef.current;

  transitionVisibilityOut({
    targets: container.querySelectorAll([
      '.arwes-figure__asset',
      '.arwes-figure__description-bg',
      '.arwes-figure__line'
    ].join(',')),
    duration: duration.enter
  });
};

const onAnimateUnmount = (animator: AnimatorRef, containerRef: ContainerRef): void => {
  const container = containerRef.current;

  if (!container) {
    return;
  }

  anime.remove(
    container.querySelectorAll([
      '.arwes-figure__asset',
      '.arwes-figure__description-bg',
      '.arwes-figure__line'
    ].join(','))
  );
};

const animator: AnimatorClassSettings = {
  onAnimateEntering,
  onAnimateExiting,
  onAnimateUnmount
};

export { animator };
