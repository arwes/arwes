import { AnimatorSettingsDuration, AnimatorClassSettings, AnimatorInstanceSettings } from '../../constants';
import { filterClassAnimatorSettings } from '../filterClassAnimatorSettings';

function mergeClassAndInstanceAnimatorSettings (
  providedClassAnimator: AnimatorClassSettings | undefined,
  instanceAnimator: AnimatorInstanceSettings | undefined
): AnimatorInstanceSettings {
  const classAnimator = providedClassAnimator ? filterClassAnimatorSettings(providedClassAnimator) : {};

  const newAnimatorSettings = {
    ...classAnimator,
    ...instanceAnimator
  };

  let newDuration: AnimatorSettingsDuration | undefined;

  if (classAnimator?.duration !== undefined) {
    newDuration = classAnimator.duration;
  }

  if (instanceAnimator?.duration !== undefined) {
    const newInstanceDuration = newDuration ?? {};
    newDuration = {
      ...newInstanceDuration,
      ...instanceAnimator.duration
    };
  }

  if (newDuration) {
    newAnimatorSettings.duration = newDuration;
  }

  return newAnimatorSettings;
}

export { mergeClassAndInstanceAnimatorSettings };
