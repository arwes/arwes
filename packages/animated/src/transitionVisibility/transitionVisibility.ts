import anime from 'animejs';

import { AnimatedSettingsTransitionFunction, AnimatedSettings } from '../constants';

const transitionVisibilityIn: AnimatedSettingsTransitionFunction = params => {
  const { targets, duration, delay = 0 } = params;

  anime
    .timeline({
      targets,
      easing: 'easeOutSine',
      duration: duration / 3
    })
    .add({ opacity: [0, 1] }, delay)
    .add({ opacity: [1, 0.5] })
    .add({ opacity: [0.5, 1] });
};

const transitionVisibilityOut: AnimatedSettingsTransitionFunction = params => {
  const { targets, duration, delay = 0 } = params;

  anime
    .timeline({
      targets,
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
  entering: params => transitionVisibilityIn({ ...params, delay: params.duration }),
  exiting: transitionVisibilityOut
};

export {
  transitionVisibilityIn,
  transitionVisibilityOut,
  transitionVisibility,
  transitionVisibilityDelayed
};
