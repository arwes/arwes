export const THEME_BREAKPOINTS_KEYS = Object.freeze(['xs', 'sm', 'md', 'lg', 'xl']);
export const THEME_BREAKPOINTS_DEFAULT = Object.freeze({
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920
});

export const THEME_PALETTE_TONAL_OFFSET_DEFAULT = 0.1;
export const THEME_PALETTE_ELEVATION_OFFSET_DEFAULT = 0.025;

export const THEME_FONT_SCALE_DEFAULT = 1;
export const THEME_SPACE_DEFAULT = 5;
export const THEME_OUTLINE_DEFAULT = 1;
export const THEME_SHADOW_BLUR_DEFAULT = 1;
export const THEME_SHADOW_SPREAD_DEFAULT = 1;
export const THEME_TRANSITION_DURATION_DEFAULT = 100;

export const THEME_FACTOR_MULTIPLIERS_NAMES = Object.freeze([
  'fontScale',
  'space',
  'outline',
  'shadowBlur',
  'shadowSpread',
  'transitionDuration'
]);

// THEME SETTINGS

export type ThemeSettingsBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ThemeSettingsBreakpointAny = ThemeSettingsBreakpoint | number;
export interface ThemeSettingsBreakpoints {
  values?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
}

export type ThemeSettingsPaletteBasic = Partial<ThemePaletteBasic>;
export interface ThemeSettingsPaletteElevation {
  main?: string
}
export interface ThemeSettingsPalette {
  tonalOffset?: number
  elevationOffset?: number
  primary?: ThemeSettingsPaletteBasic
  secondary?: ThemeSettingsPaletteBasic
  success?: ThemeSettingsPaletteBasic
  error?: ThemeSettingsPaletteBasic
  neutral?: ThemeSettingsPaletteElevation
  [prop: string]: any
}

export interface ThemeSettings {
  breakpoints?: ThemeSettingsBreakpoints
  palette?: ThemeSettingsPalette
  fontScale?: number
  space?: number
  outline?: number
  shadowBlur?: number
  shadowSpread?: number
  transitionDuration?: number
  [prop: string]: any
}

// THEME SETUP

export interface ThemeSetupBreakpoints {
  values: {
    xs: number
    sm: number
    md: number
    lg: number
    xl: number
  }
}

export interface ThemeSetupPalette extends ThemeSettingsPalette {
  tonalOffset: number
  elevationOffset: number
}

export interface ThemeSetup {
  breakpoints: ThemeSetupBreakpoints
  palette: ThemeSetupPalette
  fontScale: number
  space: number
  outline: number
  shadowBlur: number
  shadowSpread: number
  transitionDuration: number
  [prop: string]: any
}

// THEME CONSUMER

export interface ThemeBreakpoints {
  keys: readonly string[]
  values: ThemeSetupBreakpoints['values']
  up: (key: ThemeSettingsBreakpointAny) => string
  down: (key: ThemeSettingsBreakpointAny) => string
  only: (key: ThemeSettingsBreakpoint) => string
  between: (start: ThemeSettingsBreakpointAny, end: ThemeSettingsBreakpointAny) => string
}

export interface ThemePaletteBasic {
  main: string
  dark1: string
  dark2: string
  dark3: string
  light1: string
  light2: string
  light3: string
}
export interface ThemePaletteElevation {
  main: string
  elevate: (level: number) => string
}
export interface ThemePalette {
  tonalOffset: number
  elevationOffset: number
  primary: ThemePaletteBasic
  secondary: ThemePaletteBasic
  success: ThemePaletteBasic
  error: ThemePaletteBasic
  neutral: ThemePaletteElevation
  [prop: string]: any
}

export type ThemeFactorMultiplier = (multiplier?: number) => number;

export interface Theme {
  breakpoints: ThemeBreakpoints
  palette: ThemePalette
  fontScale: ThemeFactorMultiplier
  space: ThemeFactorMultiplier
  outline: ThemeFactorMultiplier
  shadowBlur: ThemeFactorMultiplier
  shadowSpread: ThemeFactorMultiplier
  transitionDuration: ThemeFactorMultiplier
  [prop: string]: any
}
