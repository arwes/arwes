import { type Easing, easing } from '../easing/index';

interface AnimationProps {
  /**
   * Duration in seconds.
   */
  duration: number
  easing?: Easing
  direction?: 'normal' | 'reverse'
  onUpdate: (progress: number) => void
  onComplete?: () => void
  onCancel?: () => void
}

interface Animation {
  isPending: () => boolean
  cancel: () => void
}

const createAnimation = (props: AnimationProps): Animation => {
  const {
    duration: durationProvided,
    easing: easingName = 'outSine',
    direction = 'normal',
    onUpdate,
    onComplete,
    onCancel
  } = props;

  const ease = typeof easingName === 'function' ? easingName : easing[easingName];
  const duration = durationProvided * 1000; // seconds to ms

  let currentAnimationFrame: number | null = null;
  let start = window.performance.now();
  let slapsed = 0;

  const nextAnimation = (timestamp: number): void => {
    if (!start) {
      start = timestamp;
    }

    slapsed = Math.max(timestamp - start, 0);

    if (direction === 'reverse') {
      slapsed = duration - slapsed;
    }

    const progress = Math.min(1, Math.max(0, ease(slapsed / duration)));
    const continueAnimation = direction === 'normal' ? slapsed < duration : slapsed > 0;

    onUpdate(progress);

    if (continueAnimation) {
      currentAnimationFrame = window.requestAnimationFrame(nextAnimation);
    }
    else {
      currentAnimationFrame = null;
      onComplete?.();
    }
  };

  currentAnimationFrame = window.requestAnimationFrame(nextAnimation);

  const isPending = (): boolean => {
    return currentAnimationFrame !== null;
  };

  const cancel = (): void => {
    if (currentAnimationFrame !== null) {
      window.cancelAnimationFrame(currentAnimationFrame);
      onCancel?.();
    }
  };

  return { isPending, cancel };
};

export type { AnimationProps, Animation };
export { createAnimation };
