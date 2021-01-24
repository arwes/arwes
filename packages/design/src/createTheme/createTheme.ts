import {
  THEME_BREAKPOINTS_KEYS,
  THEME_BREAKPOINTS_DEFAULT,
  THEME_SPACE_DEFAULT,
  THEME_SHADOW_BLUR_DEFAULT,
  THEME_SHADOW_SPREAD_DEFAULT,
  ThemeSettingsBreakpoint,
  ThemeSettingsBreakpointAny,
  ThemeSettings,
  ThemeSetup,
  ThemeBreakpoints,
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

  const shadow = {
    blur: providedSettings?.shadow?.blur || extendTheme?.shadow.blur(1) || THEME_SHADOW_BLUR_DEFAULT,
    spread: providedSettings?.shadow?.spread || extendTheme?.shadow.spread(1) || THEME_SHADOW_SPREAD_DEFAULT
  };

  const zIndexes = Object.freeze({
    ...extendTheme?.zIndexes,
    ...providedSettings?.zIndexes
  });

  return Object.freeze({
    breakpoints,
    space,
    shadow,
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

type FactorMultiplier = (multiplier?: number) => number;

const makeFactorMultiplier = (factor: number): FactorMultiplier => {
  if (process.env.NODE_ENV !== 'production' && !Number.isFinite(factor)) {
    throw new Error(`Theme factor value was expected to be a number, but received "${String(factor)}".`);
  }

  return (multiplier: number = 1): number => {
    if (process.env.NODE_ENV !== 'production' && !Number.isFinite(multiplier)) {
      throw new Error(`Theme multiplier value was expected to be a number, but received "${multiplier}".`);
    }

    return Math.round(factor * multiplier);
  };
};

const createTheme = (settings?: ThemeSettings, extendTheme?: Theme): Theme => {
  const setup = getThemeSetup(settings, extendTheme);

  const breakpoints = createThemeBreakpoints(setup);

  const space = makeFactorMultiplier(setup.space);

  const shadow = Object.freeze({
    blur: makeFactorMultiplier(setup.shadow.blur),
    spread: makeFactorMultiplier(setup.shadow.spread)
  });

  const zIndexes = setup.zIndexes;

  return Object.freeze({
    breakpoints,
    space,
    shadow,
    zIndexes
  });
};

export { createTheme };
