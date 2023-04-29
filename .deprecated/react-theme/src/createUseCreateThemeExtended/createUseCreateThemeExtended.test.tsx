/** eslint-env jest */

import React, { type ReactElement } from 'react';
import { render } from '@testing-library/react';
import type {
  ThemeColor,
  ThemeMultiplier,
  ThemeSettingsColor,
  ThemeSettingsMultiplier,
  ThemeSettingsStyle,
  ThemeStyle,
  ThemeCreatorStructure
} from '@arwes/theme';

import type { ThemeExtend, ThemeSettingsExtend } from '../types';
import { createUseCreateThemeExtended } from './createUseCreateThemeExtended';

test('Should create create theme hook', () => {
  interface ThemeSettings {
    space: ThemeSettingsMultiplier
    color: ThemeSettingsColor
    font: ThemeSettingsStyle
    other: number
  }
  type ThemeSettingsExtended = ThemeSettingsExtend<ThemeSettings>;
  interface Theme {
    space: ThemeMultiplier
    color: ThemeColor
    font: ThemeStyle
    other: number
  }
  type ThemeExtended = ThemeExtend<Theme>;
  const themeStructure: ThemeCreatorStructure = {
    space: 'multiplier',
    color: 'color',
    font: 'style',
    other: 'other'
  };
  const themeSettingsDefaults: ThemeSettings = {
    space: 4,
    color: () => [0, 0, 0, 1],
    font: [{ fontSize: '10px' }],
    other: 100
  };
  const useCreateThemeExtended = createUseCreateThemeExtended<ThemeSettings, Theme>(themeStructure, themeSettingsDefaults);
  let theme: ThemeExtended | undefined;
  const Example = (): ReactElement | null => {
    theme = useCreateThemeExtended(() => {
      const settings: ThemeSettingsExtended = {
        common: {
          space: 4
        },
        colorSchemes: {
          light: {
            color: () => [10, 10, 10, 1]
          }
        },
        medias: {
          '(min-width: 300px)': {
            other: 200
          }
        }
      };
      return settings;
    }, []);
    return null;
  };
  render(<Example />);

  expect(theme).toBeInstanceOf(Object);
  expect(theme?.space).toBeInstanceOf(Function);
  expect(theme?.color).toBeInstanceOf(Function);
  expect(theme?.font).toBeInstanceOf(Function);
  expect(theme?.other).toBe(100);
});
