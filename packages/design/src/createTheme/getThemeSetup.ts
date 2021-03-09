import {
  THEME_BREAKPOINTS_DEFAULT,
  THEME_PALETTE_TONAL_OFFSET_DEFAULT,
  THEME_PALETTE_ELEVATION_OFFSET_DEFAULT,
  THEME_SPACE_DEFAULT,
  THEME_OUTLINE_DEFAULT,
  THEME_SHADOW_BLUR_DEFAULT,
  THEME_SHADOW_SPREAD_DEFAULT,
  ThemeSettings,
  ThemeSetup,
  Theme
} from '../constants';

const extractExtraFeatures = (providedSettings: ThemeSettings = {}): Record<string, any> => {
  const {
    breakpoints,
    palette,
    typography,
    space,
    outline,
    shadow,
    ...extraFeatures
  } = providedSettings;
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

  const palette = {
    tonalOffset: THEME_PALETTE_TONAL_OFFSET_DEFAULT,
    elevationOffset: THEME_PALETTE_ELEVATION_OFFSET_DEFAULT,
    ...extendTheme?.palette,
    ...providedSettings?.palette
  };

  const space = providedSettings?.space ?? extendTheme?.space(1) ?? THEME_SPACE_DEFAULT;
  const outline = providedSettings?.outline ?? extendTheme?.outline(1) ?? THEME_OUTLINE_DEFAULT;
  const shadow = {
    blur: providedSettings?.shadow?.blur ?? extendTheme?.shadow.blur(1) ?? THEME_SHADOW_BLUR_DEFAULT,
    spread: providedSettings?.shadow?.spread ?? extendTheme?.shadow.spread(1) ?? THEME_SHADOW_SPREAD_DEFAULT
  };

  const extraFeatures = extractExtraFeatures(providedSettings);

  return Object.freeze({
    breakpoints,
    palette,
    space,
    outline,
    shadow,
    extraFeatures
  });
};

export { getThemeSetup };
