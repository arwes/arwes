import anime from 'animejs';
import { AnimatedSettingsTransitionFunctionParams } from '@arwes/animated';

const transitionAppear = (
  params: AnimatedSettingsTransitionFunctionParams
): anime.AnimeTimelineInstance => {
  const { targets, duration, delay = 0 } = params;

  return anime
    .timeline({
      targets,
      easing: 'easeOutSine',
      duration: duration / 3
    })
    .add({ opacity: [0, 1] }, delay)
    .add({ opacity: [1, 0.5] })
    .add({ opacity: [0.5, 1] });
};

const transitionDisappear = (
  params: AnimatedSettingsTransitionFunctionParams
): anime.AnimeTimelineInstance => {
  const { targets, duration, delay = 0 } = params;

  return anime
    .timeline({
      targets,
      easing: 'easeOutSine',
      duration: duration / 3
    })
    .add({ opacity: [1, 0] }, delay)
    .add({ opacity: [0, 0.5] })
    .add({ opacity: [0.5, 0] });
};

export { transitionAppear, transitionDisappear };
