import { ThemeSettings, Theme } from '../constants';
import { makeFactorMultiplier } from '../utils/makeFactorMultiplier';
import { getThemeSetup } from './getThemeSetup';
import { createThemeBreakpoints } from './createThemeBreakpoints';
import { createThemeTypography } from './createThemeTypography';

// All the functionalities are tested in integration with `createTheme()`.
// They are not unit tested since only `createTheme()` is exposed and
// it integrates them all.

const createTheme = (settings?: ThemeSettings, extendTheme?: Theme): Theme => {
  const setup = getThemeSetup(settings, extendTheme);

  const breakpoints = createThemeBreakpoints(setup);
  const typography = createThemeTypography(setup);
  const space = makeFactorMultiplier(setup.space);
  const shadow = Object.freeze({
    blur: makeFactorMultiplier(setup.shadow.blur),
    spread: makeFactorMultiplier(setup.shadow.spread)
  });
  const zIndexes = setup.zIndexes;

  return Object.freeze({
    ...setup.extraFeatures,
    breakpoints,
    typography,
    space,
    shadow,
    zIndexes
  });
};

export { createTheme };
