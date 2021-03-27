import { THEME_FACTOR_MULTIPLIERS_NAMES, ThemeSettings, Theme } from '../constants';
import { createThemeFactorMultiplier } from '../createThemeFactorMultiplier';
import { getThemeSetup } from './getThemeSetup';
import { createThemeBreakpoints } from './createThemeBreakpoints';
import { createThemePalette } from './createThemePalette';

// All the functionalities are tested in integration with `createTheme()`.
// They are not unit tested since only `createTheme()` is exposed and
// it integrates them all.

const createTheme = (settings?: ThemeSettings, extendTheme?: Theme): Theme => {
  const setup = getThemeSetup(settings, extendTheme);

  const breakpoints = createThemeBreakpoints(setup);
  const palette = createThemePalette(setup);

  const multipliers: any = THEME_FACTOR_MULTIPLIERS_NAMES
    .reduce((multipliers, multiplierName) => ({
      ...multipliers,
      [multiplierName]: createThemeFactorMultiplier(setup[multiplierName])
    }), {});

  return Object.freeze({
    ...setup,
    breakpoints,
    palette,
    ...multipliers
  });
};

export { createTheme };
