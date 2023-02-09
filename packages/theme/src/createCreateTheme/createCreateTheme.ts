import type { PartialDeep } from '@arwes/tools';

import type { ThemeCreatorStructure, ThemeCreator } from '../types';
import { createThemeMultiplier } from '../createThemeMultiplier/index';
import { createThemeUnit } from '../createThemeUnit/index';
import { createThemeColor } from '../createThemeColor/index';
import { createThemeStyle } from '../createThemeStyle/index';
import { createThemeBreakpoints } from '../createThemeBreakpoints/index';

// TODO: Set typing.
const extendDeepObject = (structure: any, defaults: any, extension: any): any => {
  const newObject: any = {};
  Object.keys(structure).forEach(key => {
    if (typeof structure[key] === 'object') {
      if (structure[key] === null) {
        throw new Error('Theme structure values can not be null.');
      }
      if (!defaults[key] || typeof defaults[key] !== 'object') {
        throw new Error('Theme default value should match theme structure object.');
      }
      newObject[key] = extendDeepObject(structure[key], defaults[key], extension?.[key]);
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
        case 'unit': newObject[key] = createThemeUnit(settings[key]); break;
        case 'color': newObject[key] = createThemeColor(settings[key]); break;
        case 'style': newObject[key] = createThemeStyle(settings[key]); break;
        case 'breakpoints': newObject[key] = createThemeBreakpoints(settings[key]); break;
        case 'other': newObject[key] = settings[key]; break;
        default: throw new Error(`Invalid theme structure key "${structure[key]}" provided.`);
      }
    }
  });
  return newObject;
};

const createCreateTheme = <ThemeSettings, Theme>(
  themeStructure: ThemeCreatorStructure,
  themeSettingsDefaults: ThemeSettings
): ThemeCreator<ThemeSettings, Theme> => {
  const createTheme: ThemeCreator<ThemeSettings, Theme> = (themeSettingsExtensions = {}) => {
    let themeSettings: ThemeSettings | undefined;

    if (Array.isArray(themeSettingsExtensions)) {
      // @ts-expect-error TODO.
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

export { createCreateTheme };
