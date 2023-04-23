import type { ThemeSettingsBreakpoints, ThemeBreakpoints } from '../types';

const createThemeBreakpoints = (settings: ThemeSettingsBreakpoints = []): ThemeBreakpoints => {
  const getBreakpointValue = (key: string | number): string => {
    if (typeof key === 'string') {
      for (const item of settings) {
        if (typeof item !== 'string' && item.key === key) {
          return item.value;
        }
      }
      return key;
    }
    const item = settings[key > settings.length - 1 ? settings.length - 1 : key];
    return typeof item === 'string' ? item : item.value;
  };

  const up = (key: string | number, opts?: { strip?: boolean }): string => {
    const media = opts?.strip ? '' : '@media ';
    return `${media}(min-width: ${getBreakpointValue(key)})`;
  };

  const down = (key: string | number, opts?: { strip?: boolean }): string => {
    const media = opts?.strip ? '' : '@media ';
    return `${media}(max-width: calc(${getBreakpointValue(key)} - 1px))`;
  };

  const between = (startKey: string | number, endKey: string | number, opts?: { strip?: boolean }): string => {
    const media = opts?.strip ? '' : '@media ';
    const min = getBreakpointValue(startKey);
    const max = getBreakpointValue(endKey);

    return `${media}(min-width: ${min}) and (max-width: calc(${max} - 1px))`;
  };

  return Object.freeze({
    settings,
    up,
    down,
    between
  });
};

export { createThemeBreakpoints };
