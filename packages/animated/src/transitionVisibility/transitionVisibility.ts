import anime from 'animejs';

import { AnimatedSettings } from '../constants';

interface TransitionVisibilityParams {
  target: HTMLElement | SVGElement | Array<HTMLElement | SVGElement> | NodeListOf<HTMLElement | SVGElement>
  duration: number
  delay?: number
}

const transitionVisibilityIn = (params: TransitionVisibilityParams): void => {
  const { target, duration, delay = 0 } = params;

  anime
    .timeline({
      targets: target,
      easing: 'easeOutSine',
      duration: duration / 3
    })
    .add({ opacity: [0, 1] }, delay)
    .add({ opacity: [1, 0.5] })
    .add({ opacity: [0.5, 1] });
};

const transitionVisibilityOut = (params: TransitionVisibilityParams): void => {
  const { target, duration, delay } = params;

  anime
    .timeline({
      targets: target,
      easing: 'easeOutSine',
      duration: duration / 3
    })
    .add({ opacity: [1, 0] }, delay)
    .add({ opacity: [0, 0.5] })
    .add({ opacity: [0.5, 0] });
};

const transitionVisibility: AnimatedSettings = {
  initialStyles: { opacity: 0 },
  entering: transitionVisibilityIn,
  exiting: transitionVisibilityOut
};

const transitionVisibilityDelayed: AnimatedSettings = {
  initialStyles: { opacity: 0 },
  entered: transitionVisibilityIn,
  exiting: transitionVisibilityOut
};

export {
  transitionVisibilityIn,
  transitionVisibilityOut,
  transitionVisibility,
  transitionVisibilityDelayed
};
