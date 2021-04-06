import {
  THEME_BREAKPOINTS_DEFAULT,
  THEME_PALETTE_TONAL_OFFSET_DEFAULT,
  THEME_PALETTE_ELEVATION_OFFSET_DEFAULT,
  THEME_FONT_SCALE_DEFAULT,
  THEME_SPACE_DEFAULT,
  THEME_OUTLINE_DEFAULT,
  THEME_SHADOW_BLUR_DEFAULT,
  THEME_SHADOW_SPREAD_DEFAULT,
  THEME_TRANSITION_DURATION_DEFAULT,
  ThemeSettings,
  ThemeSetup,
  Theme
} from '../constants';

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

  const fontScale = providedSettings?.fontScale ?? extendTheme?.fontScale(1) ?? THEME_FONT_SCALE_DEFAULT;
  const space = providedSettings?.space ?? extendTheme?.space(1) ?? THEME_SPACE_DEFAULT;

  const outline = providedSettings?.outline ?? extendTheme?.outline(1) ?? THEME_OUTLINE_DEFAULT;
  const shadowBlur = providedSettings?.shadowBlur ?? extendTheme?.shadowBlur(1) ?? THEME_SHADOW_BLUR_DEFAULT;

  const shadowSpread = providedSettings?.shadowSpread ?? extendTheme?.shadowSpread(1) ?? THEME_SHADOW_SPREAD_DEFAULT;
  const transitionDuration = providedSettings?.transitionDuration ?? extendTheme?.transitionDuration(1) ?? THEME_TRANSITION_DURATION_DEFAULT;

  return Object.freeze({
    ...providedSettings,
    breakpoints,
    palette,
    fontScale,
    space,
    outline,
    shadowBlur,
    shadowSpread,
    transitionDuration
  });
};

export { getThemeSetup };
