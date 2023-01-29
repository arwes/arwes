import { ease } from '@arwes/animated';

interface TransitionTextSequenceProps {
  text: string
  /**
   * Transition duration in seconds.
   */
  duration: number
  isEntering?: boolean
  ease?: keyof typeof ease
  onChange: (newText: string) => void
  onComplete?: () => void
}

const transitionTextSequence = (props: TransitionTextSequenceProps): (() => void) => {
  if (props.text.length === 0) {
    return () => {};
  }

  const {
    text,
    isEntering = true,
    duration: durationProvided,
    ease: easeName = 'linear',
    onChange,
    onComplete
  } = props;

  let currentAnimationFrame: number | null = null;

  onChange(isEntering ? '' : text);

  const easeFn = ease[easeName];
  const length = text.length;
  const duration = durationProvided * 1000; // seconds to ms

  let start = window.performance.now();
  let progress: number | null = null;

  const nextAnimation = (timestamp: number): void => {
    if (!start) {
      start = timestamp;
    }

    progress = Math.max(timestamp - start, 0);

    if (!isEntering) {
      progress = duration - progress;
    }

    // partialLength(n) = animationProgressDuration(ms).
    // textTotalLength(n) = totalDuration(ms).
    const newLength = Math.round(easeFn(progress / duration) * length);
    const newText = text.substring(0, newLength);

    onChange(newText);

    const continueAnimation = isEntering
      ? newLength < length
      : newLength > 0;

    if (continueAnimation) {
      currentAnimationFrame = window.requestAnimationFrame(nextAnimation);
    }
    else {
      onComplete?.();
    }
  };

  currentAnimationFrame = window.requestAnimationFrame(nextAnimation);

  return (): void => {
    window.cancelAnimationFrame(currentAnimationFrame as number);
  };
};

export type { TransitionTextSequenceProps };
export { transitionTextSequence };
