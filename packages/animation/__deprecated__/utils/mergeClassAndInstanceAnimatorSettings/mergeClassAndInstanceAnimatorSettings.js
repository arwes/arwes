import { expandAnimatorDuration } from '../expandAnimatorDuration';
import { filterClassAnimatorSettings } from '../filterClassAnimatorSettings';

function mergeClassAndInstanceAnimatorSettings (providedClassAnimator, instanceAnimator) {
  const classAnimator = providedClassAnimator && filterClassAnimatorSettings(providedClassAnimator);

  return {
    ...classAnimator,
    ...instanceAnimator,
    duration: {
      ...expandAnimatorDuration(classAnimator?.duration),
      ...expandAnimatorDuration(instanceAnimator?.duration)
    }
  };
}

export { mergeClassAndInstanceAnimatorSettings };
