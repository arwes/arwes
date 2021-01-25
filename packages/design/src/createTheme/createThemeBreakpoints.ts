import {
  THEME_BREAKPOINTS_KEYS,
  ThemeSettingsBreakpoint,
  ThemeSettingsBreakpointAny,
  ThemeSetup,
  ThemeBreakpoints
} from '../constants';

const createThemeBreakpoints = (setup: ThemeSetup): ThemeBreakpoints => {
  const getBreakpointValue = (key: ThemeSettingsBreakpointAny): number => {
    if (Number.isFinite(setup.breakpoints.values[key as ThemeSettingsBreakpoint])) {
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
    const lastBreakpointKey = THEME_BREAKPOINTS_KEYS[THEME_BREAKPOINTS_KEYS.length - 1];

    if (key !== lastBreakpointKey) {
      const currentBreakpoint = setup.breakpoints.values[key];

      if (process.env.NODE_ENV !== 'production' && !Number.isFinite(currentBreakpoint)) {
        throw new Error(`Provided value "${key}" to theme.breakpoints.only() is not valid.`);
      }

      const nextBreakpointIndex = THEME_BREAKPOINTS_KEYS.findIndex(val => val === key) + 1;
      const nextBreakpointKey = THEME_BREAKPOINTS_KEYS[nextBreakpointIndex];
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
    keys: THEME_BREAKPOINTS_KEYS,
    values: setup.breakpoints.values,
    up,
    down,
    only,
    between
  });
};

export { createThemeBreakpoints };
