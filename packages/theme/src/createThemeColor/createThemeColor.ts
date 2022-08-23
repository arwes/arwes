import type { ThemeSettingsColor, ThemeColorOptions, ThemeColor } from '../types';

const minMax = (min: number, max: number) => (value: number) => Math.min(max, Math.max(min, value));
const minMax0to360 = minMax(0, 360);
const minMax0to100 = minMax(0, 100);
const minMax0to1 = minMax(0, 1);
const searchRegExp = (string: string, regexp: RegExp): string | null => {
  const result = string.match(regexp);
  if (Array.isArray(result)) {
    return result[0];
  }
  return null;
};

const colorOptionsDefault = {};

const fromHSLAArrayToHSLAString = (
  src: [number, number, number, number?],
  options: ThemeColorOptions = colorOptionsDefault
): string => {
  const { alpha = 1 } = options;
  const alphaAdjust = minMax0to1(alpha);

  const h = minMax0to360(src[0]);
  const s = minMax0to100(src[1]);
  const l = minMax0to100(src[2]);
  const a = minMax0to1((src[3] ?? 1) * alphaAdjust);
  return `hsla(${h},${s}%,${l}%,${a})`;
};

const formatColor = (
  color: string | [number, number, number, number?],
  options: ThemeColorOptions = colorOptionsDefault
): string => {
  if (typeof color === 'string') {
    const { alpha } = options;

    if (alpha !== undefined) {
      const colorClean = color.replace(/\s/g, '');
      const alphaAdjust = minMax0to1(alpha);

      if (/^(hsl|rgb)\(/i.test(colorClean)) {
        return colorClean
          .replace('(', 'a(')
          .replace(/\)$/, `,${alphaAdjust})`);
      }

      if (/^(hsla|rgba)\(/i.test(colorClean)) {
        const alphaCurrentMatch = searchRegExp(colorClean, /,[\d.]+\)$/);
        if (alphaCurrentMatch) {
          const alphaCurrent = Number(alphaCurrentMatch.replace(/[,)]/g, ''));
          return colorClean.replace(/,[\d.]+\)$/, `,${alphaCurrent * alphaAdjust})`);
        }
      }

      return colorClean;
    }

    return color;
  }

  return fromHSLAArrayToHSLAString(color, options);
};

const createThemeColor = (settings: ThemeSettingsColor): ThemeColor => {
  if (typeof settings === 'function') {
    const createColor = settings;

    return (indexProvided: number, options?: ThemeColorOptions): string => {
      const index = Math.round(indexProvided);
      const color = createColor(index);
      return formatColor(color, options);
    };
  }

  const series = settings;

  return (indexProvided: number, options?: ThemeColorOptions): string => {
    if (!series.length) {
      return '';
    }
    const index = Math.round(indexProvided);
    const color = series[index > series.length - 1 ? series.length - 1 : index];
    return formatColor(color, options);
  };
};

export { createThemeColor };
