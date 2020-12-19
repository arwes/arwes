import { AnimatorSettingsDuration, AnimatorSettingsDurationObject } from '../../constants';

function expandAnimatorDuration (duration: AnimatorSettingsDuration): AnimatorSettingsDurationObject {
  if (typeof duration === 'number') {
    return { enter: duration, exit: duration };
  }

  return duration;
}

export { expandAnimatorDuration };
