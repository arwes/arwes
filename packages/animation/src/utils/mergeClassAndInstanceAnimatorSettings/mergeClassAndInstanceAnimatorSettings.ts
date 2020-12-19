import { AnimatorSettingsDurationObject, AnimatorClassSettings, AnimatorInstanceSettings } from '../../constants';
import { expandAnimatorDuration } from '../expandAnimatorDuration';
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

  let newDuration: AnimatorSettingsDurationObject | undefined;

  if (classAnimator?.duration !== undefined) {
    newDuration = expandAnimatorDuration(classAnimator.duration);
  }

  if (instanceAnimator?.duration !== undefined) {
    const newInstanceDuration = newDuration ?? {};
    newDuration = {
      ...newInstanceDuration,
      ...expandAnimatorDuration(instanceAnimator.duration)
    };
  }

  if (newDuration) {
    newAnimatorSettings.duration = newDuration;
  }

  return newAnimatorSettings;
}

export { mergeClassAndInstanceAnimatorSettings };
