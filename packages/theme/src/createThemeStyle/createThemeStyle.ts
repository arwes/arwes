import type { ThemeSettingsStyle, ThemeStyleValue } from '../types';

const createThemeStyle = (series: ThemeSettingsStyle) => {
  return (indexProvided: number): ThemeStyleValue => {
    if (!series.length) {
      return {};
    }

    const index = Math.round(indexProvided);
    return series[index] || series[series.length - 1];
  };
};

export { createThemeStyle };
