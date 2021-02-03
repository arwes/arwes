export const THEME_BREAKPOINTS_KEYS = Object.freeze(['xs', 'sm', 'md', 'lg', 'xl']);
export const THEME_BREAKPOINTS_DEFAULT = Object.freeze({
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920
});

export const THEME_PALETTE_TONAL_OFFSET_DEFAULT = 0.1;
export const THEME_PALETTE_CONTRAST_OFFSET_DEFAULT = 0.45;
export const THEME_PALETTE_ELEVATION_OFFSET_DEFAULT = 0.025;

export const THEME_SPACE_DEFAULT = 8;

export const THEME_SHADOW_BLUR_DEFAULT = 1;
export const THEME_SHADOW_SPREAD_DEFAULT = 1;

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

export type ThemeSettingsPaletteColorRays = Partial<ThemePaletteColorRays>;
export type ThemeSettingsPaletteColorBasic = Partial<ThemePaletteColorBasic>;
export interface ThemeSettingsPaletteColorElevation {
  main?: string
}
export interface ThemeSettingsPalette {
  tonalOffset?: number
  contrastOffset?: number
  elevationOffset?: number
  primary?: ThemeSettingsPaletteColorRays
  secondary?: ThemeSettingsPaletteColorRays
  success?: ThemeSettingsPaletteColorBasic
  info?: ThemeSettingsPaletteColorBasic
  warn?: ThemeSettingsPaletteColorBasic
  error?: ThemeSettingsPaletteColorBasic
  neutral?: ThemeSettingsPaletteColorElevation
  [prop: string]: any
}

export type ThemeSettingsTypographyKey = keyof HTMLElementTagNameMap | 'root' | 'headings' | 'codes' | 'controls';
export interface ThemeSettingsTypographyProps {
  fontFamily?: string
  fontSize?: number | string
  lineHeight?: number | string
}
export type ThemeSettingsTypographyPropsArrayItem = ThemeSettingsTypographyProps | undefined | null;
export type ThemeSettingsTypographyValue = ThemeSettingsTypographyProps | ThemeSettingsTypographyPropsArrayItem[];
export type ThemeSettingsTypography = Partial<Record<ThemeSettingsTypographyKey, ThemeSettingsTypographyValue>>;

export type ThemeSettingsSpace = number;

export interface ThemeSettingsShadow {
  blur?: number
  spread?: number
}

export interface ThemeSettings {
  breakpoints?: ThemeSettingsBreakpoints
  palette?: ThemeSettingsPalette
  typography?: ThemeSettingsTypography
  space?: ThemeSettingsSpace
  shadow?: ThemeSettingsShadow
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
  contrastOffset: number
  elevationOffset: number
}

export interface ThemeSetupTypography extends ThemeSettingsTypography {}

export type ThemeSetupSpace = ThemeSettingsSpace;

export interface ThemeSetupShadow {
  blur: number
  spread: number
}

export interface ThemeSetup {
  breakpoints: ThemeSetupBreakpoints
  palette: ThemeSetupPalette
  typography: ThemeSetupTypography
  space: ThemeSetupSpace
  shadow: ThemeSetupShadow
  extraFeatures: Record<string, any>
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

export interface ThemePaletteColorRays {
  main: string
  dark1: string
  dark2: string
  dark3: string
  light1: string
  light2: string
  light3: string
}
export interface ThemePaletteColorBasic {
  main: string
  dark: string
  light: string
  contrast: string
}
export interface ThemePaletteColorElevation {
  main: string
  elevate: (level: number) => string
}
export interface ThemePalette {
  tonalOffset: number
  contrastOffset: number
  elevationOffset: number
  primary: ThemePaletteColorRays
  secondary: ThemePaletteColorRays
  success: ThemePaletteColorBasic
  info: ThemePaletteColorBasic
  warn: ThemePaletteColorBasic
  error: ThemePaletteColorBasic
  neutral: ThemePaletteColorElevation
  [prop: string]: any
}

export type ThemeTypographyKey = ThemeSettingsTypographyKey;
export type ThemeTypographyProps = ThemeSettingsTypographyProps | Partial<Record<string, ThemeSettingsTypographyProps>>;
export type ThemeTypography = Partial<Record<ThemeTypographyKey, ThemeTypographyProps>>;

export type ThemeSpace = (multiplier?: number) => number;

export interface ThemeShadow {
  blur: (multiplier?: number) => number
  spread: (multiplier?: number) => number
}

export interface Theme {
  breakpoints: ThemeBreakpoints
  palette: ThemePalette
  typography: ThemeTypography
  space: ThemeSpace
  shadow: ThemeShadow
  [prop: string]: any
}
