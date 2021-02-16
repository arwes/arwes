import rgba from 'polished/lib/color/rgba';
import anime from 'animejs';
import { MutableRefObject } from 'react';
import { AnimatorClassSettings, AnimatorRef } from '@arwes/animation';
import { Bleeps } from '@arwes/sounds';

import { ArwesTheme } from '../ArwesThemeProvider';

type RootRef = MutableRefObject<HTMLElement>;

const playBleeps = (bleeps: Bleeps): void => {
  bleeps.readout?.play();
};

const stopBleeps = (bleeps: Bleeps): void => {
  if (bleeps.readout?.getIsPlaying()) {
    bleeps.readout?.stop();
  }
};

const stopCodeBlockAnimation = (animator: AnimatorRef, ref: RootRef): void => {
  if (ref.current) {
    const root = ref.current;
    const lines = root.querySelectorAll('.arwes-code-block__line');

    anime.remove(root);
    anime.remove(lines);
  }
};

const startCodeBlockAnimation = (animator: AnimatorRef, ref: RootRef, theme: ArwesTheme): void => {
  stopCodeBlockAnimation(animator, ref);

  const { duration, flow } = animator;
  const isEntering = flow.entering || flow.entered;
  const { palette } = theme;

  const root = ref.current;
  const lines = root.querySelectorAll('.arwes-code-block__line');

  anime({
    targets: root,
    duration: isEntering ? duration.enter : duration.exit,
    easing: isEntering ? 'easeOutSine' : 'easeInSine',
    backgroundColor: isEntering ? rgba(palette.primary.light2, 0.05) : 'rgba(0,0,0,0)'
  });

  anime({
    targets: lines,
    duration: isEntering ? duration.enter : duration.exit,
    easing: isEntering ? 'easeOutSine' : 'easeInSine',
    width: isEntering ? [0, '100%'] : ['100%', 0]
  });
};

const useAnimateEntering = (animator: AnimatorRef, ref: RootRef, theme: ArwesTheme, bleeps: Bleeps): void => {
  startCodeBlockAnimation(animator, ref, theme);
  playBleeps(bleeps);
};

const useAnimateEntered = (animator: AnimatorRef, ref: RootRef, theme: ArwesTheme, bleeps: Bleeps): void => {
  stopBleeps(bleeps);
};

const useAnimateExiting = (animator: AnimatorRef, ref: RootRef, theme: ArwesTheme): void => {
  startCodeBlockAnimation(animator, ref, theme);
};

const useAnimateUnmount = (animator: AnimatorRef, ref: RootRef, theme: ArwesTheme, bleeps: Bleeps): void => {
  stopCodeBlockAnimation(animator, ref);
  stopBleeps(bleeps);
};

const animator: AnimatorClassSettings = {
  useAnimateEntering,
  useAnimateEntered,
  useAnimateExiting,
  useAnimateUnmount
};

export { animator };
