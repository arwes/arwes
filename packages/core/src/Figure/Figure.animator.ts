import anime from 'animejs';

const useAnimateEntering = (animator: any, containerRef: any, theme: any, styles: any, bleeps: any): void => {
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

  anime
    .timeline({
      targets: container.querySelectorAll([
        '.arwes-figure__asset',
        '.arwes-figure__description-bg'
      ].join(', ')),
      duration: duration.enter / 3,
      easing: 'easeOutSine'
    })
    .add({ opacity: [0, 1] }, duration.enter)
    .add({ opacity: [1, 0.5] })
    .add({ opacity: [0.5, 1] });

  bleeps.transitionIn?.play();
};

const useAnimateExiting = (animator: any, containerRef: any): void => {
  const { duration } = animator;
  const container = containerRef.current;

  anime
    .timeline({
      targets: container.querySelectorAll([
        '.arwes-figure__asset',
        '.arwes-figure__description-bg',
        '.arwes-figure__line'
      ].join(', ')),
      easing: 'easeOutSine',
      duration: duration.enter / 3
    })
    .add({ opacity: [1, 0] }, duration.enter)
    .add({ opacity: [0, 0.5] })
    .add({ opacity: [0.5, 0] });
};

const animator = {
  useAnimateEntering,
  useAnimateExiting
};

export { animator };
