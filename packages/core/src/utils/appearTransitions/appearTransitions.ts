import anime from 'animejs';

const transitionAppear = (
  targets: anime.AnimeAnimParams['targets'],
  duration: number,
  delay: number = 0
): anime.AnimeTimelineInstance => {
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
  targets: anime.AnimeAnimParams['targets'],
  duration: number,
  delay: number = 0
): anime.AnimeTimelineInstance => {
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
