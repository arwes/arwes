import {
  THEME_BREAKPOINTS_KEYS,
  THEME_BREAKPOINTS_DEFAULT,
  THEME_SPACE_DEFAULT,
  ThemeSettingsBreakpoint,
  ThemeSettingsBreakpointAny,
  ThemeSettings,
  ThemeSetup,
  ThemeBreakpoints,
  ThemeSpace,
  Theme
} from '../constants';

const getThemeSetup = (providedSettings?: ThemeSettings, extendTheme?: Theme): ThemeSetup => {
  const breakpoints = Object.freeze({
    values: Object.freeze({
      ...THEME_BREAKPOINTS_DEFAULT,
      ...extendTheme?.breakpoints?.values,
      ...providedSettings?.breakpoints?.values
    })
  });

  const space = providedSettings?.space || extendTheme?.space(1) || THEME_SPACE_DEFAULT;

  if (process.env.NODE_ENV !== 'production' && !Number.isFinite(space)) {
    throw new Error(`Theme space factor provided "${String(space)}" is not a number.`);
  }

  const zIndexes = Object.freeze({
    ...extendTheme?.zIndexes,
    ...providedSettings?.zIndexes
  });

  return Object.freeze({
    breakpoints,
    space,
    zIndexes
  });
};

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

      if (
        process.env.NODE_ENV !== 'production' &&
        !Number.isFinite(currentBreakpoint)
      ) {
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

const createThemeSpace = (setup: ThemeSetup): ThemeSpace => {
  return (multiplier: number = 1): number => {
    if (process.env.NODE_ENV !== 'production' && !Number.isFinite(multiplier)) {
      throw new Error(`Theme space multiplier provided "${multiplier}" is not a number.`);
    }

    return Math.round(setup.space * multiplier);
  };
};

const createTheme = (settings?: ThemeSettings, extendTheme?: Theme): Theme => {
  const setup = getThemeSetup(settings, extendTheme);

  const breakpoints = createThemeBreakpoints(setup);
  const space = createThemeSpace(setup);

  const zIndexes = setup.zIndexes;

  return Object.freeze({ breakpoints, space, zIndexes });
};

export { createTheme };
