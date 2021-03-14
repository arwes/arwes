import anime from 'animejs';
import { MutableRefObject } from 'react';
import { AnimatorClassSettings, AnimatorRef } from '@arwes/animation';
import { Bleeps } from '@arwes/sounds';

type ContainerRef = MutableRefObject<HTMLElement>;

const playBleeps = (bleeps: Bleeps): void => {
  bleeps.readout?.play();
};

const stopBleeps = (bleeps: Bleeps): void => {
  if (bleeps.readout?.getIsPlaying()) {
    bleeps.readout?.stop();
  }
};

const stopCodeBlockAnimation = (animator: AnimatorRef, containerRef: ContainerRef): void => {
  if (containerRef.current) {
    const container = containerRef.current;
    const elements = container.querySelectorAll([
      '.arwes-code-block__wrap',
      '.arwes-code-block__bg',
      '.arwes-code-block__lang-bg',
      '.arwes-code-block__line'
    ].join(','));

    anime.remove(elements);
  }
};

const startCodeBlockAnimation = (animator: AnimatorRef, containerRef: ContainerRef): void => {
  stopCodeBlockAnimation(animator, containerRef);

  const { duration, flow } = animator;
  const isEntering = flow.entering || flow.entered;
  const container = containerRef.current;

  anime({
    targets: container.querySelector('.arwes-code-block__wrap'),
    duration: isEntering ? duration.enter : duration.exit,
    easing: 'easeInExpo',
    opacity: isEntering ? [0, 1] : [1, 0]
  });

  anime({
    targets: container.querySelectorAll('.arwes-code-block__bg, .arwes-code-block__lang-bg'),
    duration: isEntering ? duration.enter : duration.exit,
    easing: 'easeOutSine',
    opacity: isEntering ? [0, 1] : [1, 0]
  });

  anime({
    targets: container.querySelectorAll('.arwes-code-block__line'),
    duration: isEntering ? duration.enter : duration.exit,
    easing: 'easeOutSine',
    width: isEntering ? [0, '100%'] : ['100%', 0]
  });
};

const useAnimateEntering = (animator: AnimatorRef, containerRef: ContainerRef, bleeps: Bleeps): void => {
  startCodeBlockAnimation(animator, containerRef);
  playBleeps(bleeps);
};

const useAnimateEntered = (animator: AnimatorRef, containerRef: ContainerRef, bleeps: Bleeps): void => {
  stopBleeps(bleeps);
};

const useAnimateExiting = (animator: AnimatorRef, containerRef: ContainerRef): void => {
  startCodeBlockAnimation(animator, containerRef);
};

const useAnimateUnmount = (animator: AnimatorRef, containerRef: ContainerRef, bleeps: Bleeps): void => {
  stopCodeBlockAnimation(animator, containerRef);
  stopBleeps(bleeps);
};

const animator: AnimatorClassSettings = {
  useAnimateEntering,
  useAnimateEntered,
  useAnimateExiting,
  useAnimateUnmount
};

export { animator };
