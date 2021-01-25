import {
  THEME_BREAKPOINTS_DEFAULT,
  THEME_SPACE_DEFAULT,
  THEME_SHADOW_BLUR_DEFAULT,
  THEME_SHADOW_SPREAD_DEFAULT,
  ThemeSettings,
  ThemeSetup,
  Theme
} from '../constants';

const extractExtraFeatures = (providedSettings: ThemeSettings = {}): Record<string, any> => {
  const { breakpoints, typography, space, shadow, zIndexes, ...extraFeatures } = providedSettings;
  return extraFeatures;
};

const getThemeSetup = (providedSettings?: ThemeSettings, extendTheme?: Theme): ThemeSetup => {
  const breakpoints = Object.freeze({
    values: Object.freeze({
      ...THEME_BREAKPOINTS_DEFAULT,
      ...extendTheme?.breakpoints?.values,
      ...providedSettings?.breakpoints?.values
    })
  });

  const typography = {
    ...extendTheme?.typography,
    ...providedSettings?.typography
  };

  const space = providedSettings?.space || extendTheme?.space(1) || THEME_SPACE_DEFAULT;

  const shadow = {
    blur: providedSettings?.shadow?.blur || extendTheme?.shadow.blur(1) || THEME_SHADOW_BLUR_DEFAULT,
    spread: providedSettings?.shadow?.spread || extendTheme?.shadow.spread(1) || THEME_SHADOW_SPREAD_DEFAULT
  };

  const zIndexes = Object.freeze({
    ...extendTheme?.zIndexes,
    ...providedSettings?.zIndexes
  });

  const extraFeatures = extractExtraFeatures(providedSettings);

  return Object.freeze({
    breakpoints,
    typography,
    space,
    shadow,
    zIndexes,
    extraFeatures
  });
};

export { getThemeSetup };
