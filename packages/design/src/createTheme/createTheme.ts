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
  ThemeSettingsTypography,
  ThemeSettingsTypographyValue,
  ThemeTypographyProps,
  ThemeTypography,
  Theme,
  ThemeSetupBreakpoints
} from '../constants';
import { makeFilterObjectKeys } from '../utils/makeFilterObjectKeys';

const getThemeSetup = (providedSettings?: ThemeSettings, extendTheme?: Theme): ThemeSetup => {
  const breakpoints = Object.freeze({
    values: Object.freeze({
      ...THEME_BREAKPOINTS_DEFAULT,
      ...extendTheme?.breakpoints?.values,
      ...providedSettings?.breakpoints?.values
    })
  });

  const typography = {
    ...extendTheme?.typography,
    ...providedSettings?.typography
  };

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
    typography,
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

const expandThemeTypographyGroups = (selector: string): string => {
  switch (selector) {
    case 'root': return 'html, body';
    case 'headings': return 'h1, h2, h3, h4, h5, h6';
    case 'codes': return 'code, pre';
    case 'controls': return 'input, textarea, select, option, button';
  }
  return selector;
};

const filterThemeTypographyProps = makeFilterObjectKeys([
  'fontFamily',
  'fontSize',
  'lineHeight'
]);

const getThemeTypographyStyleProps = (breakpoints: ThemeSetupBreakpoints, props: ThemeSettingsTypographyValue): ThemeTypographyProps => {
  if (Array.isArray(props)) {
    return props
      .map((item, index) => {
        if (!item) {
          return undefined;
        }

        const itemProps = filterThemeTypographyProps(item);

        if (index === 0 && breakpoints.values.xs === 0) {
          return { selector: undefined, props: itemProps };
        }

        const breakpointKey = THEME_BREAKPOINTS_KEYS[index] as ThemeSettingsBreakpoint;
        const breakpoint = breakpoints.values[breakpointKey];
        const selector = `@media screen and (min-width: ${breakpoint}px)`;

        return { selector, props: itemProps };
      })
      .reduce((accum, item) => {
        if (!item) {
          return accum;
        }

        const { selector, props } = item;

        if (!selector) {
          return { ...accum, ...props };
        }

        return { ...accum, [selector]: props };
      }, {});
  }

  return filterThemeTypographyProps(props);
};

const createThemeTypography = (setup: ThemeSetup): ThemeTypography =>
  Object.freeze(
    Object
      .keys(setup.typography)
      .map(rawSelector => {
        const providedSelector = rawSelector as keyof ThemeSettingsTypography;
        const selector = expandThemeTypographyGroups(rawSelector) as keyof ThemeSettingsTypography;

        const providedProps = setup.typography[providedSelector] || {};
        const props = Object.freeze(getThemeTypographyStyleProps(setup.breakpoints, providedProps));

        return { selector, props };
      })
      .reduce((accum, { selector, props }) => ({
        ...accum,
        [selector]: props
      }), {})
  );

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
  const typography = createThemeTypography(setup);
  const space = makeFactorMultiplier(setup.space);
  const shadow = Object.freeze({
    blur: makeFactorMultiplier(setup.shadow.blur),
    spread: makeFactorMultiplier(setup.shadow.spread)
  });
  const zIndexes = setup.zIndexes;

  return Object.freeze({
    breakpoints,
    typography,
    space,
    shadow,
    zIndexes
  });
};

export { createTheme };
