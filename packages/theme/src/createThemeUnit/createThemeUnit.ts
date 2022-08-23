import type { ThemeSettingsUnit, ThemeUnit } from '../types';

const getSeriesItem = (list: string[], indexProvided: number): string => {
  const index = Math.round(indexProvided);
  return list[index > list.length - 1 ? list.length - 1 : index];
};

const createThemeUnit = (settings: ThemeSettingsUnit): ThemeUnit => index => {
  const indexes = Array.isArray(index) ? index : [index];

  if (Array.isArray(settings)) {
    if (!settings.length) {
      return '';
    }

    return indexes.map((subIndex) => getSeriesItem(settings, subIndex)).join(' ');
  }

  return indexes.map(settings).join(' ');
};

export { createThemeUnit };
