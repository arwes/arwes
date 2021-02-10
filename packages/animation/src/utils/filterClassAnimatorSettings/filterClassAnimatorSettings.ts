import { AnimatorClassSettings } from '../../constants';

const CLASS_ALLOWED_SETTINGS = [
  'duration',
  'animate',
  'root',
  'merge',
  'combine',
  'manager',
  'useAnimateMount',
  'useAnimateEntering',
  'useAnimateEntered',
  'useAnimateExiting',
  'useAnimateExited',
  'useAnimateUnmount'
];

function filterClassAnimatorSettings (
  providedSettings: Record<string, any>
): AnimatorClassSettings {
  return CLASS_ALLOWED_SETTINGS
    .filter(key => providedSettings[key] !== undefined)
    .reduce((obj, key) => ({ ...obj, [key]: providedSettings[key] }), {});
}

export { filterClassAnimatorSettings };
