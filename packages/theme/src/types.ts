import type { Properties as CSSProperties } from 'csstype';

import type { PartialDeep } from '@arwes/tools';

// Theme Settings

export type ThemeSettingsMultiplierFunction = (index: number) => number;

export type ThemeSettingsMultiplier = number | number[] | ThemeSettingsMultiplierFunction;

export type ThemeSettingsColor =
  | Array<[number, number, number, number?] | string>
  | ((index: number) => [number, number, number, number?] | string);

export type ThemeSettingsStyle = ThemeStyleValue[];

export interface ThemeSettingsBreakpointsKeyListItem {
  key: string
  value: string
}

export type ThemeSettingsBreakpoints = string[] | ThemeSettingsBreakpointsKeyListItem[];

// Theme Consumer

export type ThemeMultiplier = (index: number) => number;

export type ThemeColor = (index: number) => string;

export type ThemeStyleValue = CSSProperties;

export type ThemeStyle = (index: number) => ThemeStyleValue;

export interface ThemeBreakpoints {
  settings: ThemeSettingsBreakpoints
  up: (key: string | number) => string
  down: (key: string | number) => string
  between: (startKey: string | number, endKey: string | number) => string
}

// Theme Creators

export interface ThemeCreatorStructure {
  [key: string]: 'multiplier' | 'color' | 'style' | 'breakpoints' | 'other' | ThemeCreatorStructure
}

export interface ThemeCreatorOptions {
  getCacheColorScheme: () => string | null | undefined
  setCacheColorScheme: (colorScheme: string) => void
}

// Theme Extensions

export interface ThemeSettingsExtensionColorScheme {
  colorScheme: 'light' | 'dark'
  colorSchemeControl: 'user' | 'system'
  setColorScheme: (scheme: 'light' | 'dark' | null) => void
}

export type ThemeSettingsExtendColorScheme<ThemeSettings> = ThemeSettings & ThemeSettingsExtensionColorScheme;

export interface ThemeSettingsExtend<
  T,
  ThemeSettings = ThemeSettingsExtendColorScheme<T>,
  ThemeSettingsPartial = PartialDeep<ThemeSettings>
> {
  common?: ThemeSettingsPartial
  colorSchemes?: {
    light?: ThemeSettingsPartial
    dark?: ThemeSettingsPartial
  }
  medias?: {
    [media: string]: ThemeSettingsPartial | undefined
  }
}

export interface ThemeExtensionColorScheme {
  colorScheme: 'light' | 'dark'
  colorSchemeControl: 'user' | 'system'
  setColorScheme: (scheme: 'light' | 'dark' | null) => void
}

export type ThemeExtend<T> = T & ThemeExtensionColorScheme;
