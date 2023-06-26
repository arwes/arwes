import type { ThemeSettingsColor, ThemeColorOptions, ThemeColor } from '../types';

const minMax = (min: number, max: number) => (value: number) => Math.min(max, Math.max(min, value));
const minMax0to360 = minMax(0, 360);
const minMax0to100 = minMax(0, 100);
const minMax0to1 = minMax(0, 1);
const searchRegExp = (string: string, regexp: RegExp): string | null => {
  const result = string.match(regexp);
  if (Array.isArray(result)) {
    return String(result[0]);
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
  if (typeof color !== 'string') {
    return fromHSLAArrayToHSLAString(color, options);
  }

  const { alpha } = options;

  if (alpha === undefined || alpha === null) {
    return color;
  }

  // Make sure the color format complies with:
  // - hsl, hsla, rgb, rgba color functions.
  // - Either 3 or 4 arguments.
  // - Each argument separated by either "," or "space", except fourth one.
  // - Fourth argument is optional and can be separated by either "," or "/".
  // - First argument can be an integer, floating, percentage or degree value.
  // - Each argument can be aa integer, floating, or percentage value.
  // See:
  // - https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl
  // - https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgb
  if (!/^(hsla?|rgba?)\(\d+(\.\d+)?(%|deg)?(,\s?|\s)\d+(\.\d+)?%?(,\s?|\s)\d+(\.\d+)?%?((,\s?|\s?\/\s?)\d+(\.\d+)?%?)?\)$/.test(color)) {
    return color;
  }

  const separators = Array.from(color.matchAll(/(,\s?|\s?\/\s?|\s)/g));
  const hasCurrentAlpha = separators.length === 3;

  const isCommaSeparated = color.includes(',');
  const alphaAdjust = minMax0to1(alpha);

  if (hasCurrentAlpha) {
    const alphaCurrentMatch = searchRegExp(color, /\d+(\.\d+)?%?\)$/) as string;
    const isPercentage = alphaCurrentMatch.includes('%');
    const alphaCurrent = Number(alphaCurrentMatch.replace(/%?\)$/g, ''));

    return color.replace(/\d+(\.\d+)?%?\)$/, `${alphaCurrent * alphaAdjust}${isPercentage ? '%' : ''})`);
  }

  return color.replace(/\)$/, isCommaSeparated ? `,${alphaAdjust})` : ` / ${alphaAdjust})`);
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
