import type { PartialDeep } from '@arwes/tools';

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
  medias?: Record<string, ThemeSettingsPartial | undefined>
}

export interface ThemeExtensionColorScheme {
  colorScheme: 'light' | 'dark'
  colorSchemeControl: 'user' | 'system'
  setColorScheme: (scheme: 'light' | 'dark' | null) => void
}

export type ThemeExtend<T> = T & ThemeExtensionColorScheme;
