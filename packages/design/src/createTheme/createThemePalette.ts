import lighten from 'polished/lib/color/lighten';
import darken from 'polished/lib/color/darken';
import readableColor from 'polished/lib/color/readableColor';

import {
  ThemeSetup,
  ThemeSettingsPaletteColorBasic,
  ThemePaletteColorBasic,
  ThemePaletteColorElevation,
  ThemePalette
} from '../constants';

const isColorLight = (color: string): boolean => readableColor(color) === '#000';

const createColorBasicVariations = (
  color: ThemeSettingsPaletteColorBasic,
  tonalOffset: number,
  contrastOffset: number
): ThemePaletteColorBasic => {
  if (!color.main) {
    throw new Error('Theme color requires "main" color.');
  }

  const { main } = color;
  const dark = color.dark ?? darken(tonalOffset, main);
  const light = color.light ?? lighten(tonalOffset, main);
  const contrast = color.contrast ?? (
    isColorLight(main)
      ? darken(contrastOffset, main)
      : lighten(contrastOffset, main)
  );

  return Object.freeze({ main, dark, light, contrast });
};

const createColorElevationVariations = (
  main: string,
  elevationOffset: number
): ThemePaletteColorElevation => {
  const elevate = (level: number): string => {
    const value = elevationOffset * level;

    if (value === 0) {
      return main;
    }

    return isColorLight(main) ? darken(value, main) : lighten(value, main);
  };

  return Object.freeze({ main, elevate });
};

const createThemePalette = (setup: ThemeSetup): ThemePalette => {
  const { tonalOffset, contrastOffset, elevationOffset, ...otherFeatures } = setup.palette;

  return Object.freeze({
    ...otherFeatures,
    tonalOffset,
    contrastOffset,
    elevationOffset,
    primary: createColorBasicVariations({ main: '#0ff', ...setup.palette.primary }, tonalOffset, contrastOffset),
    secondary: createColorBasicVariations({ main: '#ff0', ...setup.palette.secondary }, tonalOffset, contrastOffset),
    success: createColorBasicVariations({ main: '#0f0', ...setup.palette.success }, tonalOffset, contrastOffset),
    info: createColorBasicVariations({ main: '#00f', ...setup.palette.info }, tonalOffset, contrastOffset),
    warn: createColorBasicVariations({ main: '#fa0', ...setup.palette.warn }, tonalOffset, contrastOffset),
    error: createColorBasicVariations({ main: '#f00', ...setup.palette.error }, tonalOffset, contrastOffset),
    neutral: createColorElevationVariations(setup.palette.neutral?.main ?? '#000', elevationOffset)
  });
};

export { createThemePalette };
