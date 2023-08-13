import type { PartialDeep } from '@arwes/tools';
import type {
  ThemeCreatorStructure,
  ThemeSettingsUnit,
  ThemeSettingsColor,
  ThemeSettingsStyle,
  ThemeUnit,
  ThemeColor,
  ThemeStyle,
  ThemeSettingsMultiplier,
  ThemeMultiplier
} from '../types';
import { createCreateTheme } from '../createCreateTheme/index';
import { deepExtend } from './deepExtend';

// THEME SETTINGS TYPES

interface AppThemeSettingsPalette {
  main: ThemeSettingsColor
  text: ThemeSettingsColor
  bg: ThemeSettingsColor
  ol: ThemeSettingsColor
  deco: ThemeSettingsColor
}

interface AppThemeSettingsColors {
  primary: AppThemeSettingsPalette
  secondary: AppThemeSettingsPalette
  success: AppThemeSettingsPalette
  info: AppThemeSettingsPalette
  warning: AppThemeSettingsPalette
  error: AppThemeSettingsPalette
}

interface AppThemeSettingsHues {
  primary: number
  secondary: number
  success: number
  info: number
  warning: number
  error: number
}

interface AppThemeSettings {
  dark: boolean
  space: ThemeSettingsUnit
  spaceN: ThemeSettingsMultiplier
  hues: AppThemeSettingsHues
  colors: AppThemeSettingsColors
  fontFamilies: {
    title: string
    body: string
    cta: string
    input: string
    code: string
  }
  typography: {
    title: ThemeSettingsStyle
    body: ThemeSettingsStyle
    cta: ThemeSettingsStyle
    input: ThemeSettingsStyle
    code: ThemeSettingsStyle
  }
  transitions: {
    duration: ThemeSettingsUnit
    durationN: ThemeSettingsMultiplier
  }
}

// THEME TYPES

interface AppThemePalette {
  main: ThemeColor
  text: ThemeColor
  bg: ThemeColor
  ol: ThemeColor
  deco: ThemeColor
}

interface AppThemeColors {
  primary: AppThemePalette
  secondary: AppThemePalette
  success: AppThemePalette
  info: AppThemePalette
  warning: AppThemePalette
  error: AppThemePalette
}

type AppThemeHues = AppThemeSettingsHues;

interface AppTheme {
  dark: boolean
  space: ThemeUnit
  spaceN: ThemeMultiplier
  hues: AppThemeHues
  colors: AppThemeColors
  fontFamilies: {
    title: string
    body: string
    cta: string
    input: string
    code: string
  }
  typography: {
    title: ThemeStyle
    body: ThemeStyle
    cta: ThemeStyle
    input: ThemeStyle
    code: ThemeStyle
  }
  transitions: {
    duration: ThemeUnit
    durationN: ThemeMultiplier
  }
}

// THEME STRUCTURE

const APP_THEME_STRUCTURE_PALETTE: ThemeCreatorStructure = {
  main: 'color',
  text: 'color',
  deco: 'color',
  bg: 'color',
  ol: 'color'
};

const APP_THEME_STRUCTURE: ThemeCreatorStructure = {
  dark: 'other',
  space: 'unit',
  spaceN: 'multiplier',
  hues: {
    primary: 'other',
    secondary: 'other',
    success: 'other',
    info: 'other',
    warning: 'other',
    error: 'other'
  },
  colors: {
    primary: APP_THEME_STRUCTURE_PALETTE,
    secondary: APP_THEME_STRUCTURE_PALETTE,
    success: APP_THEME_STRUCTURE_PALETTE,
    info: APP_THEME_STRUCTURE_PALETTE,
    warning: APP_THEME_STRUCTURE_PALETTE,
    error: APP_THEME_STRUCTURE_PALETTE
  },
  fontFamilies: {
    title: 'other',
    body: 'other',
    cta: 'other',
    input: 'other',
    code: 'other'
  },
  typography: {
    title: 'style',
    body: 'style',
    cta: 'style',
    input: 'style',
    code: 'style'
  },
  transitions: {
    duration: 'unit',
    durationN: 'multiplier'
  }
};

// CREATOR

interface CreateAppThemeProps <AppThemeSettingsExt extends AppThemeSettings = AppThemeSettings> {
  structure?: ThemeCreatorStructure
  settings?: PartialDeep<AppThemeSettingsExt>
}

const createAppThemePalette = (hue: number): AppThemeSettingsPalette => ({
  // Darkening colors.
  main: (i: number) => [hue, 80 + i, 92.5 - i * 9.44],
  text: (i: number) => [hue, 10, 92.5 - i * 9.44],

  // Lightening colors.
  bg: (i: number) => [hue, 10, 2 + i * 2],
  ol: (i: number) => [hue, 80 + 1, 2 + i * 2],
  deco: (i: number) => [hue, 80 + 1, 50, 0.025 + i * 0.025]
});

const createAppTheme = <
  AppThemeSettingsExt extends AppThemeSettings = AppThemeSettings,
  AppThemeExt extends AppTheme = AppTheme
>(props: CreateAppThemeProps<AppThemeSettingsExt> = {}): AppThemeExt => {
  const dark = props.settings?.dark === undefined ? true : !!props.settings?.dark;

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const hues = {
    primary: 200,
    secondary: 80,
    success: 120,
    info: 220,
    warning: 40,
    error: 0,
    ...props.settings?.hues
  } as AppTheme['hues'];

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const fontFamilies = {
    title: '"Segoe UI Web (West European)","Segoe UI",-apple-system,BlinkMacSystemFont,Roboto,"Helvetica Neue",sans-serif',
    body: '"Segoe UI Web (West European)","Segoe UI",-apple-system,BlinkMacSystemFont,Roboto,"Helvetica Neue",sans-serif',
    cta: '"Segoe UI Web (West European)","Segoe UI",-apple-system,BlinkMacSystemFont,Roboto,"Helvetica Neue",sans-serif',
    input: '"Segoe UI Web (West European)","Segoe UI",-apple-system,BlinkMacSystemFont,Roboto,"Helvetica Neue",sans-serif',
    code: 'JetBrains Mono,Menlo,Monaco,Consolas,Courier New,monospace',
    ...props.settings?.fontFamilies
  } as AppTheme['fontFamilies'];

  const appThemeSettingsBase: AppThemeSettings = {
    dark,
    space: index => `${index * 0.25}rem`,
    spaceN: index => index * 4,
    hues,
    colors: {
      primary: createAppThemePalette(hues.primary),
      secondary: createAppThemePalette(hues.secondary),
      success: createAppThemePalette(hues.success),
      info: createAppThemePalette(hues.info),
      warning: createAppThemePalette(hues.warning),
      error: createAppThemePalette(hues.error)
    },
    fontFamilies,
    typography: {
      title: [
        { fontFamily: fontFamilies.title, fontWeight: '600', fontSize: '1.75rem' },
        { fontFamily: fontFamilies.title, fontWeight: '600', fontSize: '1.625rem' },
        { fontFamily: fontFamilies.title, fontWeight: '600', fontSize: '1.5rem' },
        { fontFamily: fontFamilies.title, fontWeight: '600', fontSize: '1.375rem' },
        { fontFamily: fontFamilies.title, fontWeight: '600', fontSize: '1.25rem' },
        { fontFamily: fontFamilies.title, fontWeight: '600', fontSize: '1.125rem' }
      ],
      body: [
        { fontFamily: fontFamilies.body, fontWeight: '400', fontSize: '1.125rem' },
        { fontFamily: fontFamilies.body, fontWeight: '400', fontSize: '1rem' },
        { fontFamily: fontFamilies.body, fontWeight: '400', fontSize: '0.875rem' }
      ],
      cta: [
        { fontFamily: fontFamilies.cta, fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase' },
        { fontFamily: fontFamilies.cta, fontWeight: '500', fontSize: '0.875rem', textTransform: 'uppercase' },
        { fontFamily: fontFamilies.cta, fontWeight: '500', fontSize: '0.75rem', textTransform: 'uppercase' }
      ],
      input: [
        { fontFamily: fontFamilies.input, fontWeight: '400', fontSize: '1rem' },
        { fontFamily: fontFamilies.input, fontWeight: '400', fontSize: '0.875rem' },
        { fontFamily: fontFamilies.input, fontWeight: '400', fontSize: '0.75rem' }
      ],
      code: [
        { fontFamily: fontFamilies.code, fontWeight: '400', fontSize: '1rem' },
        { fontFamily: fontFamilies.code, fontWeight: '400', fontSize: '0.875rem' },
        { fontFamily: fontFamilies.code, fontWeight: '400', fontSize: '0.75rem' }
      ]
    },
    transitions: {
      duration: index => `${index * 0.15}s`,
      durationN: index => index * 0.15
    }
  };

  const createTheme = createCreateTheme<AppThemeSettings, AppTheme>(
    deepExtend(APP_THEME_STRUCTURE, props.structure),
    deepExtend(appThemeSettingsBase, props.settings)
  );

  const theme = createTheme();

  return theme as AppThemeExt;
};

export type {
  AppThemeSettingsColors,
  AppThemeSettingsPalette,
  AppThemeSettingsHues,
  AppThemeSettings,
  AppThemePalette,
  AppThemeColors,
  AppThemeHues,
  AppTheme,
  CreateAppThemeProps
};
export {
  APP_THEME_STRUCTURE_PALETTE,
  APP_THEME_STRUCTURE,
  createAppThemePalette,
  createAppTheme
};
