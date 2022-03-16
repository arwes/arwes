import type { ThemeSettingsMultiplierFunction, ThemeSettingsMultiplier } from '../types';

const createThemeMultiplier = (settings: ThemeSettingsMultiplier) => (indexProvided: number) => {
  const index = Math.round(indexProvided);

  if (Number.isFinite(settings)) {
    const baseValue = settings as number;
    return baseValue * index;
  }
  else if (Array.isArray(settings)) {
    const series = settings;
    return series[index > series.length - 1 ? series.length - 1 : index];
  }

  const multiplier = settings as ThemeSettingsMultiplierFunction;
  return multiplier(index);
};

export { createThemeMultiplier };
