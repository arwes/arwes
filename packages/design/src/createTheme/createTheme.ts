import { ThemeSettings, Theme } from '../constants';
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
  const space = createThemeFactorMultiplier(setup.space);
  const outline = createThemeFactorMultiplier(setup.outline);
  const shadow = Object.freeze({
    blur: createThemeFactorMultiplier(setup.shadow.blur),
    spread: createThemeFactorMultiplier(setup.shadow.spread)
  });

  return Object.freeze({
    ...setup.extraFeatures,
    breakpoints,
    palette,
    space,
    outline,
    shadow
  });
};

export { createTheme };
