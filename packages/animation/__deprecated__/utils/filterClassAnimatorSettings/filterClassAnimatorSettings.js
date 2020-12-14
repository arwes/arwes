const CLASS_ALLOWED_SETTINGS = [
  'duration',
  'animate',
  'root',
  'merge',
  'useAnimateMount',
  'useAnimateEntering',
  'useAnimateEntered',
  'useAnimateExiting',
  'useAnimateExited',
  'useAnimateUnmount'
];

function filterClassAnimatorSettings (providedSettings) {
  return CLASS_ALLOWED_SETTINGS
    .filter(key => providedSettings[key] !== undefined)
    .reduce((obj, key) => ({ ...obj, [key]: providedSettings[key] }), {});
}

export { filterClassAnimatorSettings };
