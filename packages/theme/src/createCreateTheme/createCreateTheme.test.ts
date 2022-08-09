/** eslint-env jest */

import type {
  ThemeSettingsMultiplier,
  ThemeSettingsColor,
  ThemeSettingsStyle,
  ThemeMultiplier,
  ThemeColor,
  ThemeStyle,
  ThemeCreatorStructure
} from '../types';
import { createCreateTheme } from './createCreateTheme';

test('Should create theme creator with plain theme structure object', () => {
  interface ThemeSettings {
    space: ThemeSettingsMultiplier
    color: ThemeSettingsColor
    font: ThemeSettingsStyle
    other: string
  }
  interface Theme {
    space: ThemeMultiplier
    color: ThemeColor
    font: ThemeStyle
    other: string
  }
  const themeStructure: ThemeCreatorStructure = {
    space: 'multiplier',
    color: 'color',
    font: 'style',
    other: 'other'
  };
  const themeDefaults: ThemeSettings = {
    space: 1,
    color: () => [0, 0, 0, 0],
    font: [{ fontSize: '10px' }],
    other: 'something else'
  };
  const createTheme = createCreateTheme<ThemeSettings, Theme>(themeStructure, themeDefaults);
  const theme = createTheme({
    space: 3
  });
  expect(theme).toBeInstanceOf(Object);
  expect(theme.space).toBeInstanceOf(Function);
  expect(theme.color).toBeInstanceOf(Function);
  expect(theme.font).toBeInstanceOf(Function);
  expect(theme.other).toBe('something else');
});

test('Should create theme creator with deep theme structure object', () => {
  interface ThemeSettings {
    space: ThemeSettingsMultiplier
    width: ThemeSettingsMultiplier
    colors: {
      c1: ThemeSettingsColor
      c2: ThemeSettingsColor
    }
    fonts: {
      f1: ThemeSettingsStyle
      f2: ThemeSettingsStyle
    }
    others: {
      o1: string
      o2: number
    }
  }
  interface Theme {
    space: ThemeMultiplier
    width: ThemeMultiplier
    colors: {
      c1: ThemeColor
      c2: ThemeColor
    }
    fonts: {
      f1: ThemeStyle
      f2: ThemeStyle
    }
    others: {
      o1: string
      o2: number
    }
  }
  const themeStructure: ThemeCreatorStructure = {
    space: 'multiplier',
    colors: {
      c1: 'color',
      c2: 'color'
    },
    fonts: {
      f1: 'style',
      f2: 'style'
    },
    others: {
      o1: 'other',
      o2: 'other'
    }
  };
  const themeDefaults: ThemeSettings = {
    space: 1,
    width: 10,
    colors: {
      c1: () => [0, 0, 0, 0],
      c2: () => [0, 0, 0, 0]
    },
    fonts: {
      f1: [{ fontSize: '10px' }],
      f2: [{ fontSize: '10px' }]
    },
    others: {
      o1: 'hello',
      o2: 100
    }
  };
  const createTheme = createCreateTheme<ThemeSettings, Theme>(themeStructure, themeDefaults);
  const providedThemeSettings = {
    space: 3,
    colors: {
      c2: () => [0, 0, 0, 0]
    }
  };
  const theme = createTheme(providedThemeSettings);
  expect(theme).toBeInstanceOf(Object);
  expect(theme.space).toBeInstanceOf(Function);
  expect(theme.colors).toBeInstanceOf(Object);
  expect(theme.colors.c1).toBeInstanceOf(Function);
  expect(theme.colors.c2).toBeInstanceOf(Function);
  expect(theme.fonts).toBeInstanceOf(Object);
  expect(theme.fonts.f1).toBeInstanceOf(Function);
  expect(theme.fonts.f2).toBeInstanceOf(Function);
  expect(theme.others).toBeInstanceOf(Object);
  expect(theme.others.o1).toBe('hello');
  expect(theme.others.o2).toBe(100);
});
