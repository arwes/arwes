import type { ThemeSettingsColor, ThemeColor } from '../types';

const minMax = (min: number, max: number) => (value: number) => Math.min(max, Math.max(min, value));
const minMax0to1 = minMax(0, 1);
const minMax0to100 = minMax(0, 100);

const fromArrayToHSLA = (src: number[]): string => {
  const [h] = src;
  const s = minMax0to100(src[1]);
  const l = minMax0to100(src[2]);
  const a = minMax0to1(src[3] ?? 1);
  return `hsla(${h}, ${s}%, ${l}%, ${a})`;
};

const patchColor = (color: number[], patch: Array<number | undefined | null>): number[] => {
  return [color[0], patch[0] ?? color[1], patch[1] ?? color[2], patch[2] ?? color[3]];
};

const createThemeColor = (settings: ThemeSettingsColor): ThemeColor => {
  if (typeof settings === 'function') {
    const createColor = settings;

    return (indexProvided: number, colorPatch?: Array<number | undefined | null>): string => {
      const index = Math.round(indexProvided);
      const color = createColor(index);
      return fromArrayToHSLA(colorPatch ? patchColor(color, colorPatch) : color);
    };
  }

  const series = settings;

  return (indexProvided: number, colorPatch?: Array<number | undefined | null>): string => {
    if (!series.length) {
      return '';
    }
    const index = Math.round(indexProvided);
    const color = series[index > series.length - 1 ? series.length - 1 : index];
    return fromArrayToHSLA(colorPatch ? patchColor(color, colorPatch) : color);
  };
};

export { createThemeColor };
