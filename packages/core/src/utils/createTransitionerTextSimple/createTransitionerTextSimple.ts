interface CreateTransitionerTextSimpleParams {
  text: string
  duration: number
  isEntering?: boolean
  dynamicDuration?: boolean
  onChange: (newText: string) => void
  onComplete?: () => void
}

interface TransitionerTextSimple {
  cancel: () => void
}

const createTransitionerTextSimple = (params: CreateTransitionerTextSimpleParams): TransitionerTextSimple | null => {
  const {
    text,
    isEntering = true,
    dynamicDuration = true,
    duration: providedDuration,
    onChange,
    onComplete
  } = params;

  let currentAnimationFrame: number | null = null;

  if (text.length === 0) {
    return null;
  }

  // The time it will take to add/remove a character per frame.
  const realDuration = (1000 / 60) * text.length;

  const duration = dynamicDuration
    ? Math.min(realDuration, providedDuration)
    : providedDuration;

  onChange(isEntering ? '' : text);

  const length = text.length;
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

  const cancel = (): void => {
    if (typeof currentAnimationFrame === 'number') {
      window.cancelAnimationFrame(currentAnimationFrame);
    }
  };

  const transitionerTextSimple: TransitionerTextSimple = { cancel };

  return transitionerTextSimple;
};

export {
  CreateTransitionerTextSimpleParams,
  createTransitionerTextSimple,
  TransitionerTextSimple
};
