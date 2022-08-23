import type { ThemeSettingsMultiplierFunction, ThemeSettingsMultiplier } from '../types';

const createThemeMultiplier = (settings: ThemeSettingsMultiplier) => (index: number): number => {
  if (Number.isFinite(settings)) {
    const baseValue = settings as number;
    return baseValue * index;
  }

  if (Array.isArray(settings)) {
    if (!settings.length) {
      return 0;
    }
    const series = settings;
    const seriesIndex = Math.round(index);
    return series[seriesIndex > series.length - 1 ? series.length - 1 : seriesIndex];
  }

  const multiplier = settings as ThemeSettingsMultiplierFunction;
  return multiplier(index);
};

export { createThemeMultiplier };
