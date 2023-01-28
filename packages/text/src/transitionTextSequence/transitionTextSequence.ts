interface TransitionTextSequenceProps {
  text: string
  /**
   * Transition duration in seconds.
   */
  duration: number
  isEntering?: boolean
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
    onChange,
    onComplete
  } = props;

  let currentAnimationFrame: number | null = null;

  onChange(isEntering ? '' : text);

  const length = text.length;
  const duration = durationProvided * 1000; // seconds to ms
  let start = window.performance.now();
  let progress = null;

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
    const newLength = Math.round((progress * length) / duration);
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
