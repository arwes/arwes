import type { PartialDeep } from '@arwes/tools';

import type { ThemeCreatorStructure } from '../types';
import { createThemeMultiplier } from '../createThemeMultiplier/index';
import { createThemeColor } from '../createThemeColor/index';
import { createThemeStyle } from '../createThemeStyle/index';
import { createThemeBreakpoints } from '../createThemeBreakpoints/index';

// TODO: Set typing.
const extendDeepObject = (structure: any, defaults: any, extension: any): any => {
  const newObject: any = {};
  Object.keys(structure).forEach(key => {
    if (typeof structure[key] === 'object') {
      newObject[key] = extendDeepObject(structure[key], defaults[key], extension[key]);
    }
    else {
      newObject[key] = extension?.[key] ?? defaults[key];
    }
  });
  return newObject;
};

// TODO: Set typing.
const createDeepThemeSetup = (structure: any, settings: any): any => {
  const newObject: any = {};
  Object.keys(structure).forEach(key => {
    if (typeof structure[key] === 'object') {
      newObject[key] = createDeepThemeSetup(structure[key], settings[key]);
    }
    else {
      switch (structure[key]) {
        case 'multiplier': newObject[key] = createThemeMultiplier(settings[key]); break;
        case 'color': newObject[key] = createThemeColor(settings[key]); break;
        case 'style': newObject[key] = createThemeStyle(settings[key]); break;
        case 'breakpoints': newObject[key] = createThemeBreakpoints(settings[key]); break;
        case 'other': newObject[key] = settings[key]; break;
      }
    }
  });
  return newObject;
};

type CreateTheme<ThemeSettings, Theme> = (
  themeSettingsExtensions?: PartialDeep<ThemeSettings> | Array<PartialDeep<ThemeSettings> | undefined> | undefined
) => Theme;

const createCreateTheme = <ThemeSettings, Theme>(
  themeStructure: ThemeCreatorStructure,
  themeSettingsDefaults: ThemeSettings
): CreateTheme<ThemeSettings, Theme> => {
  const createTheme: CreateTheme<ThemeSettings, Theme> = (themeSettingsExtensions = {}) => {
    let themeSettings: ThemeSettings | undefined;

    if (Array.isArray(themeSettingsExtensions)) {
      themeSettings = themeSettingsExtensions.reduce(
        (settingsTotal: ThemeSettings, settingsItem: PartialDeep<ThemeSettings> | undefined) => {
          if (!settingsItem) {
            return settingsTotal;
          }
          return extendDeepObject(themeStructure, settingsTotal, settingsItem) as ThemeSettings;
        },
        themeSettingsDefaults
      );
    }
    else {
      themeSettings = extendDeepObject(themeStructure, themeSettingsDefaults, themeSettingsExtensions);
    }

    return createDeepThemeSetup(themeStructure, themeSettings);
  };

  return createTheme;
};

export type { CreateTheme };
export { createCreateTheme };
