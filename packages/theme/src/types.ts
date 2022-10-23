import type { Properties as CSSProperties } from 'csstype';
import type { PartialDeep } from '@arwes/tools';

// Theme Settings

export type ThemeSettingsMultiplierFunction = (index: number) => number;
export type ThemeSettingsMultiplier = number | number[] | ThemeSettingsMultiplierFunction;

export type ThemeSettingsUnitFunction = (index: number) => string;
export type ThemeSettingsUnit = string[] | ThemeSettingsUnitFunction;

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

export type ThemeUnit = (index: number | number[]) => string;

export interface ThemeColorOptions {
  alpha?: number
}
export type ThemeColor = (index: number, options?: ThemeColorOptions) => string;

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
  [key: string]: 'multiplier' | 'unit' | 'color' | 'style' | 'breakpoints' | 'other' | ThemeCreatorStructure
}

export interface ThemeCreatorOptions {
  getCacheColorScheme: () => string | null | undefined
  setCacheColorScheme: (colorScheme: string) => void
}

export type ThemeCreator<ThemeSettings, Theme> = (
  themeSettingsExtensions?: PartialDeep<ThemeSettings> | Array<PartialDeep<ThemeSettings> | undefined> | undefined
) => Theme;
