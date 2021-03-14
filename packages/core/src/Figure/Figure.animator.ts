import anime from 'animejs';
import { MutableRefObject } from 'react';
import { CSSObject } from '@emotion/css';
import { AnimatorClassSettings, AnimatorRef } from '@arwes/animation';
import { Bleeps } from '@arwes/sounds';

import { ArwesTheme } from '../ArwesThemeProvider';
import { transitionAppear, transitionDisappear } from '../utils/appearTransitions';

type ContainerRef = MutableRefObject<HTMLElement>;

const useAnimateEntering = (
  animator: AnimatorRef,
  containerRef: ContainerRef,
  theme: ArwesTheme,
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

  transitionAppear(
    container.querySelectorAll([
      '.arwes-figure__asset',
      '.arwes-figure__description-bg'
    ].join(',')),
    duration.enter,
    duration.enter
  );
};

const useAnimateExiting = (animator: AnimatorRef, containerRef: ContainerRef): void => {
  const { duration } = animator;
  const container = containerRef.current;

  transitionDisappear(
    container.querySelectorAll([
      '.arwes-figure__asset',
      '.arwes-figure__description-bg',
      '.arwes-figure__line'
    ].join(',')),
    duration.enter
  );
};

const useAnimateUnmount = (animator: AnimatorRef, containerRef: ContainerRef): void => {
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
  useAnimateEntering,
  useAnimateExiting,
  useAnimateUnmount
};

export { animator };
