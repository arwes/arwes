import { easing } from '../easing/index';

interface AnimationProps {
  /**
   * Duration in seconds.
   */
  duration: number
  isEntering?: boolean
  easing?: keyof typeof easing
  onChange: (progress: number) => void
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
    isEntering = true,
    easing: easingName = 'outSine',
    onChange,
    onComplete,
    onCancel
  } = props;

  const ease = easing[easingName];
  const duration = durationProvided * 1000; // seconds to ms

  let currentAnimationFrame: number | null = null;
  let start = window.performance.now();
  let slapsed = 0;

  const nextAnimation = (timestamp: number): void => {
    if (!start) {
      start = timestamp;
    }

    slapsed = Math.max(timestamp - start, 0);

    if (!isEntering) {
      slapsed = duration - slapsed;
    }

    const progress = Math.min(1, Math.max(0, ease(slapsed / duration)));
    const continueAnimation = isEntering ? slapsed < duration : slapsed > 0;

    onChange(progress);

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
