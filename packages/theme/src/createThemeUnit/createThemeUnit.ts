import type { ThemeSettingsUnit, ThemeUnit } from '../types';

const getSeriesItem = (list: string[], indexProvided: number): string => {
  const index = Math.round(indexProvided);
  return list[index > list.length - 1 ? list.length - 1 : index];
};

const createThemeUnit = (settings: ThemeSettingsUnit): ThemeUnit => index => {
  if (typeof index === 'string') {
    return index;
  }

  const indexes = Array.isArray(index) ? index : [index];

  if (Array.isArray(settings)) {
    if (!settings.length) {
      return '';
    }

    return indexes
      .map((subIndex) => {
        if (typeof subIndex === 'string') {
          return subIndex;
        }
        return getSeriesItem(settings, subIndex);
      })
      .join(' ');
  }

  return indexes
    .map(subIndex => {
      if (typeof subIndex === 'string') {
        return subIndex;
      }
      return settings(subIndex);
    })
    .join(' ');
};

export { createThemeUnit };
