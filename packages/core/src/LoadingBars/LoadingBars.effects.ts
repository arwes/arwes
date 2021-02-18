import anime from 'animejs';
import { MutableRefObject } from 'react';
import { CSSObject } from '@emotion/react';
import { AnimatorRef } from '@arwes/animation';

import { ArwesTheme } from '../ArwesThemeProvider';

type LoadingBarsEffectsRefs = MutableRefObject<{
  rootRef: MutableRefObject<HTMLDivElement | null>
  animationFrameId: number
}>;

const stopLoadingBarsTransition = (
  animator: AnimatorRef,
  refs: LoadingBarsEffectsRefs
): void => {
  const root = refs.current.rootRef.current;

  if (root) {
    const container = root.querySelector('.arwes-loading-bars__container') as HTMLElement;

    anime.remove(container);
    Object.assign(container.style, {
      transform: '',
      opacity: ''
    });
  }
};

const startLoadingBarsTransition = (
  animator: AnimatorRef,
  refs: LoadingBarsEffectsRefs,
  theme: ArwesTheme
): void => {
  stopLoadingBarsTransition(animator, refs);

  const { duration, flow } = animator;
  const isEntering = flow.entering || flow.entered;
  const { space } = theme;

  const root = refs.current.rootRef.current as HTMLDivElement;
  const container = root.querySelector('.arwes-loading-bars__container');

  anime({
    targets: container,
    duration: isEntering ? duration.enter : duration.exit,
    easing: 'easeOutSine',
    translateX: isEntering ? [-space(4), 0] : [0, space(4)],
    opacity: isEntering ? [0, 1] : [1, 0]
  });
};

const stopLoadingBarsUndeterminateAnimation = (
  animator: AnimatorRef,
  refs: LoadingBarsEffectsRefs,
  styles: Record<string, CSSObject>
): void => {
  window.cancelAnimationFrame(refs.current.animationFrameId);

  const root = refs.current.rootRef.current as HTMLElement;

  if (root) {
    const items: HTMLElement[] = Array.from(root.querySelectorAll('.arwes-loading-bars__item'));

    items.forEach(item => {
      Object.assign(item.style, styles.itemInactive);
    });
  }
};

const startLoadingBarsUndeterminateAnimation = (
  animator: AnimatorRef,
  refs: LoadingBarsEffectsRefs,
  styles: Record<string, CSSObject>,
  options: { speed: number }
): void => {
  stopLoadingBarsUndeterminateAnimation(animator, refs, styles);

  const root = refs.current.rootRef.current as HTMLElement;
  const items: HTMLElement[] = Array.from(root.querySelectorAll('.arwes-loading-bars__item'));
  const { speed } = options;

  // A normal FPS duration times a speed time factor.
  const itemDuration = (1000 / 60) * speed;
  const roundDuration = items.length * itemDuration;

  let timeStart = 0;

  const addNextFrame = (render: (ts: number) => void): void => {
    refs.current.animationFrameId = window.requestAnimationFrame(render);
  };

  const renderFrame = (timestamp: number): void => {
    if (!timeStart) {
      timeStart = timestamp;
    }

    const durationProgress = Math.max(timestamp - timeStart, 0);
    const currentRoundDuration = durationProgress % roundDuration;
    const currentPosition = Math.max(Math.floor(currentRoundDuration / itemDuration), 0);

    items.forEach(item => {
      Object.assign(item.style, styles.itemInactive);
    });

    if (currentPosition > 0) {
      Object.assign(items[currentPosition - 1].style, styles.itemSecondaryActive);
    }

    Object.assign(items[currentPosition].style, styles.itemPrimaryActive);

    if (currentPosition < items.length - 1) {
      Object.assign(items[currentPosition + 1].style, styles.itemSecondaryActive);
    }

    addNextFrame(renderFrame);
  };

  addNextFrame(renderFrame);
};

export {
  LoadingBarsEffectsRefs,
  stopLoadingBarsTransition,
  startLoadingBarsTransition,
  stopLoadingBarsUndeterminateAnimation,
  startLoadingBarsUndeterminateAnimation
};
