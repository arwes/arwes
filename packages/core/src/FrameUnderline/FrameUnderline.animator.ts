import anime from 'animejs';
import { MutableRefObject } from 'react';
import { AnimatorClassSettings, AnimatorRef } from '@arwes/animation';
import { Bleeps } from '@arwes/sounds';

import { ArwesTheme } from '../ArwesThemeProvider';

type ContainerRef = MutableRefObject<HTMLDivElement>;

const stopFrameUnderlineBleeps = (bleeps: Bleeps): void => {
  if (bleeps.assemble?.getIsPlaying()) {
    bleeps.assemble?.stop();
  }
};

const transitionRemoveFrameUnderline = (
  animator: AnimatorRef,
  containerRef: ContainerRef,
  theme: ArwesTheme,
  bleeps: Bleeps
): void => {
  stopFrameUnderlineBleeps(bleeps);

  if (containerRef.current) {
    const container = containerRef.current;
    const animated = Array.from(
      container.querySelectorAll(
        '.arwes-frame-underline__line, .arwes-frame-underline__shapes'
      )
    );

    anime.remove([container, ...animated]);
  }
};

const transitionFrameUnderline = (
  animator: AnimatorRef,
  containerRef: ContainerRef,
  theme: ArwesTheme,
  bleeps: Bleeps
): void => {
  transitionRemoveFrameUnderline(animator, containerRef, theme, bleeps);

  bleeps.assemble?.play();

  const { duration, flow } = animator;
  const isEntering = flow.entering || flow.entered;
  const durationTransition = isEntering ? duration.enter : duration.exit;
  const { space } = theme;
  const container = containerRef.current;

  anime({
    targets: container,
    duration: durationTransition,
    easing: 'easeOutSine',
    translateX: isEntering ? [-space(2), 0] : [0, -space(2)]
  });

  anime({
    targets: container.querySelectorAll(
      '.arwes-frame-underline__shapes, .arwes-frame-underline__line'
    ),
    duration: durationTransition,
    easing: 'easeOutSine',
    opacity: isEntering ? [0, 1] : [1, 0]
  });
};

const onAnimateEntered = (
  animator: AnimatorRef,
  containerRef: ContainerRef,
  theme: ArwesTheme,
  bleeps: Bleeps
): void => {
  stopFrameUnderlineBleeps(bleeps);
};

const onAnimateExited = (
  animator: AnimatorRef,
  containerRef: ContainerRef,
  theme: ArwesTheme,
  bleeps: Bleeps
): void => {
  stopFrameUnderlineBleeps(bleeps);
};

const animator: AnimatorClassSettings = {
  onAnimateEntering: transitionFrameUnderline,
  onAnimateEntered,
  onAnimateExiting: transitionFrameUnderline,
  onAnimateExited,
  onAnimateUnmount: transitionRemoveFrameUnderline
};

export { animator };
