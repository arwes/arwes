import anime from 'animejs';
import { MutableRefObject } from 'react';
import { AnimatorClassSettings, AnimatorRef } from '@arwes/animation';
import { Bleeps } from '@arwes/sounds';

import { ArwesTheme } from '../ArwesThemeProvider';

type ContainerRef = MutableRefObject<HTMLDivElement>;

const transitionRemoveFrameUnderline = (
  animator: AnimatorRef,
  containerRef: ContainerRef
): void => {
  if (containerRef.current) {
    const container = containerRef.current;
    const lines = container.querySelectorAll('.arwes-frame-underline__line');

    anime.remove(container);
    anime.remove(lines);
  }
};

const transitionFrameUnderline = (
  animator: AnimatorRef,
  containerRef: ContainerRef,
  theme: ArwesTheme,
  bleeps: Bleeps
): void => {
  transitionRemoveFrameUnderline(animator, containerRef);

  const { duration, flow } = animator;
  const isEntering = flow.entering || flow.entered;
  const { space } = theme;
  const container = containerRef.current;

  anime({
    targets: container,
    duration: duration.enter,
    easing: 'easeOutSine',
    translateX: isEntering ? [-space(2), 0] : [0, -space(2)]
  });

  anime({
    targets: container.querySelectorAll('.arwes-frame-underline__line'),
    duration: duration.enter / 2,
    easing: 'easeOutSine',
    opacity: isEntering ? [0, 1] : [1, 0]
  });

  bleeps?.transition.play();
};

const useAnimateEntered = (
  animator: AnimatorRef,
  containerRef: ContainerRef,
  theme: ArwesTheme,
  bleeps: Bleeps
): void => {
  bleeps?.transition.stop();
};

const useAnimateExited = (
  animator: AnimatorRef,
  containerRef: ContainerRef,
  theme: ArwesTheme,
  bleeps: Bleeps
): void => {
  bleeps?.transition.stop();
};

const animator: AnimatorClassSettings = {
  useAnimateEntering: transitionFrameUnderline,
  useAnimateEntered,
  useAnimateExiting: transitionFrameUnderline,
  useAnimateExited,
  useAnimateUnmount: transitionRemoveFrameUnderline
};

export { animator };
