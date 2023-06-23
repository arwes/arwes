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
import type { PartialDeep } from '@arwes/tools';

// THEME SETTINGS TYPES

type AppThemeType = 'dark' | 'light';

interface AppThemeSettingsPalette {
  main: ThemeSettingsColor
  text: ThemeSettingsColor
  bg: ThemeSettingsColor
  ol: ThemeSettingsColor
  deco: ThemeSettingsColor
}

interface AppThemeSettings {
  type: AppThemeType
  space: ThemeSettingsUnit
  spaceN: ThemeSettingsMultiplier
  hues: {
    primary: number
    secondary: number
    success: number
    info: number
    warning: number
    error: number
  }
  colors: {
    primary: AppThemeSettingsPalette
    secondary: AppThemeSettingsPalette
    success: AppThemeSettingsPalette
    info: AppThemeSettingsPalette
    warning: AppThemeSettingsPalette
    error: AppThemeSettingsPalette
  }
  fontFamilies: {
    title: string
    body: string
    cta: string
    input: string
    code: string
  }
  fontWeights: ThemeSettingsUnit
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

interface AppTheme {
  type: AppThemeType
  space: ThemeUnit
  spaceN: ThemeMultiplier
  hues: {
    primary: number
    secondary: number
    success: number
    info: number
    warning: number
    error: number
  }
  colors: {
    primary: AppThemePalette
    secondary: AppThemePalette
    success: AppThemePalette
    info: AppThemePalette
    warning: AppThemePalette
    error: AppThemePalette
  }
  fontFamilies: {
    title: string
    body: string
    cta: string
    input: string
    code: string
  }
  fontWeights: ThemeUnit
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

const appThemeStructurePalette: ThemeCreatorStructure = {
  main: 'color',
  text: 'color',
  bg: 'color',
  ol: 'color',
  deco: 'color'
};

const appThemeStructure: ThemeCreatorStructure = {
  type: 'other',
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
    primary: appThemeStructurePalette,
    secondary: appThemeStructurePalette,
    success: appThemeStructurePalette,
    info: appThemeStructurePalette,
    warning: appThemeStructurePalette,
    error: appThemeStructurePalette
  },
  fontFamilies: {
    title: 'other',
    body: 'other',
    cta: 'other',
    input: 'other',
    code: 'other'
  },
  fontWeights: 'unit',
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

interface CreateAppThemeProps {
  type?: AppThemeType
  structure?: ThemeCreatorStructure
  settings?: PartialDeep<AppThemeSettings>
}

const createAppTheme = (props: CreateAppThemeProps = {}): AppTheme => {
  const createPalette = (hue: number): AppThemeSettingsPalette => ({
    main: (i: number) => [hue, 80 + i, 5 + i * 10],
    text: (i: number) => [hue, 40 + i, 5 + i * 10],
    bg: (i: number) => [hue, 40 + i, 2 + i * 2],
    ol: (i: number) => [hue, 80 + i, 2 + i * 2],
    deco: (i: number) => [hue, 80 + i, 50, 0.05 + i * 0.05]
  });

  const hues = {
    primary: 200,
    secondary: 80,
    success: 120,
    info: 220,
    warning: 40,
    error: 0
  };

  const fontFamilies = {
    title: '"Segoe UI Web (West European)","Segoe UI",-apple-system,BlinkMacSystemFont,Roboto,"Helvetica Neue",sans-serif',
    body: '"Segoe UI Web (West European)","Segoe UI",-apple-system,BlinkMacSystemFont,Roboto,"Helvetica Neue",sans-serif',
    cta: '"Segoe UI Web (West European)","Segoe UI",-apple-system,BlinkMacSystemFont,Roboto,"Helvetica Neue",sans-serif',
    input: '"Segoe UI Web (West European)","Segoe UI",-apple-system,BlinkMacSystemFont,Roboto,"Helvetica Neue",sans-serif',
    code: 'JetBrains Mono,Menlo,Monaco,Consolas,Courier New,monospace'
  };

  const themeSettings: AppThemeSettings = {
    type: 'dark',
    space: index => `${index * 0.25}rem`,
    spaceN: index => index * 4,
    hues,
    colors: {
      primary: createPalette(hues.primary),
      secondary: createPalette(hues.secondary),
      success: createPalette(hues.success),
      info: createPalette(hues.info),
      warning: createPalette(hues.warning),
      error: createPalette(hues.error)
    },
    fontFamilies,
    fontWeights: ['600', '400', '300'],
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
    {
      ...appThemeStructure,
      // TODO: Implement deep nesting extension.
      ...props.structure
    },
    themeSettings
  );

  const theme = createTheme(props.settings);

  return theme;
};

export type { AppThemeSettings, AppTheme };
export { createAppTheme };
