export const BREAKPOINTS_KEYS = Object.freeze(['xs', 'sm', 'md', 'lg', 'xl']);

export const BREAKPOINTS_DEFAULT = Object.freeze({
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920
});

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

export interface ThemeSettings {
  breakpoints?: ThemeSettingsBreakpoints
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

export interface ThemeSetup {
  breakpoints: ThemeSetupBreakpoints
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

export interface Theme {
  breakpoints: ThemeBreakpoints
}
