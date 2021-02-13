import {
  THEME_BREAKPOINTS_KEYS,
  ThemeSettingsBreakpoint,
  ThemeSetup,
  ThemeSettingsTypography,
  ThemeSettingsTypographyValue,
  ThemeTypographyProps,
  ThemeTypography,
  ThemeSetupBreakpoints
} from '../constants';
import { makeFilterObjectKeys } from '../utils/makeFilterObjectKeys';

const expandThemeTypographyGroups = (selector: string): string => {
  switch (selector) {
    case 'root': return 'html, body';
    case 'headings': return 'h1, h2, h3, h4, h5, h6';
    case 'codes': return 'code, pre';
    case 'controls': return 'label, input, textarea, select, option, optgroup, button, fieldset, legend, datalist, output';
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

export { createThemeTypography };
