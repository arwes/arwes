import type { ThemeSettingsColor, ThemeColor } from '../types';

const minMax = (min: number, max: number) => (value: number) => Math.min(max, Math.max(min, value));
const minMax0to360 = minMax(0, 360);
const minMax0to100 = minMax(0, 100);
const minMax0to1 = minMax(0, 1);

const fromArrayToHSLA = (src: [number, number, number, number?]): string => {
  const h = minMax0to360(src[0]);
  const s = minMax0to100(src[1]);
  const l = minMax0to100(src[2]);
  const a = minMax0to1(src[3] ?? 1);
  return `hsla(${h}, ${s}%, ${l}%, ${a})`;
};

const formatColor = (color: string | [number, number, number, number?]): string => {
  if (typeof color === 'string') {
    return color;
  }
  return fromArrayToHSLA(color);
};

const createThemeColor = (settings: ThemeSettingsColor): ThemeColor => {
  if (typeof settings === 'function') {
    const createColor = settings;

    return (indexProvided: number): string => {
      const index = Math.round(indexProvided);
      const color = createColor(index);
      return formatColor(color);
    };
  }

  const series = settings;

  return (indexProvided: number): string => {
    if (!series.length) {
      return '';
    }
    const index = Math.round(indexProvided);
    const color = series[index > series.length - 1 ? series.length - 1 : index];
    return formatColor(color);
  };
};

export { createThemeColor };
