function filterAnimatorClassSettings (providedSettings) {
  const { duration, animate, root, merge } = providedSettings;
  const toFilterSettings = { duration, animate, root, merge };
  const settings = Object
    .keys(toFilterSettings)
    .filter(key => toFilterSettings[key] !== undefined)
    .reduce((obj, key) => ({ ...obj, [key]: toFilterSettings[key] }), {});

  return settings;
}

export { filterAnimatorClassSettings };
