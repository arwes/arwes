export const THEME_BREAKPOINTS_KEYS = Object.freeze(['xs', 'sm', 'md', 'lg', 'xl']);

export const THEME_BREAKPOINTS_DEFAULT = Object.freeze({
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920
});

export const THEME_SPACE_DEFAULT = 8;

// SETTINGS

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

export type ThemeSettingsSpace = number;

export type ThemeSettingsZIndexes = Record<string, number>;

export interface ThemeSettings {
  breakpoints?: ThemeSettingsBreakpoints
  space?: ThemeSettingsSpace
  zIndexes?: ThemeSettingsZIndexes
}

// SETUP

export interface ThemeSetupBreakpoints {
  values: {
    xs: number
    sm: number
    md: number
    lg: number
    xl: number
  }
}

export type ThemeSetupSpace = ThemeSettingsSpace;

export type ThemeSetupZIndexes = ThemeSettingsZIndexes;

export interface ThemeSetup {
  breakpoints: ThemeSetupBreakpoints
  space: ThemeSetupSpace
  zIndexes: ThemeSetupZIndexes
}

// CONSUMER

export interface ThemeBreakpoints {
  keys: readonly string[]
  values: ThemeSetupBreakpoints['values']
  up: (key: ThemeSettingsBreakpointAny) => string
  down: (key: ThemeSettingsBreakpointAny) => string
  only: (key: ThemeSettingsBreakpoint) => string
  between: (start: ThemeSettingsBreakpointAny, end: ThemeSettingsBreakpointAny) => string
}

export type ThemeZIndexes = ThemeSettingsZIndexes;

export type ThemeSpace = (multiplier?: number) => number;

export interface Theme {
  breakpoints: ThemeBreakpoints
  space: ThemeSpace
  zIndexes: ThemeZIndexes
}
