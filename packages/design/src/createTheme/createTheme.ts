import {
  BREAKPOINTS_KEYS,
  BREAKPOINTS_DEFAULT,
  ThemeSettingsBreakpoint,
  ThemeSettingsBreakpointAny,
  ThemeSettings,
  ThemeSetup,
  ThemeBreakpoints,
  Theme
} from '../constants';

const getThemeSetup = (providedSettings?: ThemeSettings, extendTheme?: Theme): ThemeSetup => {
  const breakpoints = {
    values: Object.freeze({
      ...BREAKPOINTS_DEFAULT,
      ...extendTheme?.breakpoints.values,
      ...providedSettings?.breakpoints?.values
    })
  };

  return Object.freeze({ breakpoints });
};

const createThemeBreakpoints = (setup: ThemeSetup): ThemeBreakpoints => {
  const getBreakpointValue = (key: ThemeSettingsBreakpointAny): number => {
    if (typeof setup.breakpoints.values[key as ThemeSettingsBreakpoint] === 'number') {
      return setup.breakpoints.values[key as ThemeSettingsBreakpoint];
    }

    return Number(key);
  };

  const up = (key: ThemeSettingsBreakpointAny): string => (
    `@media screen and (min-width: ${getBreakpointValue(key)}px)`
  );

  const down = (key: ThemeSettingsBreakpointAny): string => (
    `@media screen and (max-width: ${getBreakpointValue(key) - 1}px)`
  );

  const only = (key: ThemeSettingsBreakpoint): string => {
    const lastBreakpointKey = BREAKPOINTS_KEYS[BREAKPOINTS_KEYS.length - 1];

    if (key !== lastBreakpointKey) {
      const currentBreakpoint = setup.breakpoints.values[key];

      if (
        process.env.NODE_ENV !== 'production' &&
        typeof currentBreakpoint !== 'number'
      ) {
        throw new Error(`Provided value "${key}" to theme.breakpoints.only() is not valid.`);
      }

      const nextBreakpointIndex = BREAKPOINTS_KEYS.findIndex(val => val === key) + 1;
      const nextBreakpointKey = BREAKPOINTS_KEYS[nextBreakpointIndex];
      const nextBreakpoint = setup.breakpoints.values[nextBreakpointKey as ThemeSettingsBreakpoint];

      return `@media screen and (min-width: ${currentBreakpoint}px) and (max-width: ${nextBreakpoint - 1}px)`;
    }

    return up(key);
  };

  const between = (start: ThemeSettingsBreakpointAny, end: ThemeSettingsBreakpointAny): string => {
    const min = getBreakpointValue(start);
    const max = getBreakpointValue(end);

    if (process.env.NODE_ENV !== 'production' && max < min) {
      throw new Error('The provided breakpoints to theme.breakpoints.between() are not valid.');
    }

    return `@media screen and (min-width: ${min}px) and (max-width: ${max - 1}px)`;
  };

  return Object.freeze({
    keys: BREAKPOINTS_KEYS,
    values: setup.breakpoints.values,
    up,
    down,
    only,
    between
  });
};

const createTheme = (settings?: ThemeSettings, extendTheme?: Theme): Theme => {
  const setup = getThemeSetup(settings, extendTheme);
  const breakpoints = createThemeBreakpoints(setup);

  return Object.freeze({ breakpoints });
};

export { createTheme };
