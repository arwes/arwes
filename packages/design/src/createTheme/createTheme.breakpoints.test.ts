/* eslint-env jest */

import { THEME_BREAKPOINTS_KEYS, THEME_BREAKPOINTS_DEFAULT } from '../constants';
import { createTheme } from './createTheme';

test('Should allow to extend multiple themes', () => {
  const theme1 = createTheme({
    breakpoints: { values: { sm: 400 } }
  });
  const theme2 = createTheme({
    breakpoints: { values: { lg: 1500 } }
  }, theme1);
  const received = theme2.breakpoints.values;
  const expected = {
    ...THEME_BREAKPOINTS_DEFAULT,
    sm: 400,
    lg: 1500
  };
  expect(received).toEqual(expected);
});

describe('keys', () => {
  test('Should provide keys', () => {
    const theme = createTheme();
    expect(theme.breakpoints.keys).toEqual(THEME_BREAKPOINTS_KEYS);
  });
});

describe('values', () => {
  test('Should provide default values', () => {
    const theme = createTheme();
    expect(theme.breakpoints.values).toEqual(THEME_BREAKPOINTS_DEFAULT);
  });

  test('Should provide configured values', () => {
    const theme = createTheme({
      breakpoints: {
        values: { md: 400, lg: 1600 }
      }
    });
    expect(theme.breakpoints.values).toEqual({
      ...THEME_BREAKPOINTS_DEFAULT,
      md: 400,
      lg: 1600
    });
  });
});

describe('up', () => {
  test('Should get media query min-width for breakpoint with default value', () => {
    const theme = createTheme();
    const received = theme.breakpoints.up('sm');
    const expected = `@media screen and (min-width: ${THEME_BREAKPOINTS_DEFAULT.sm}px)`;
    expect(received).toBe(expected);
  });

  test('Should get media query min-width for breakpoint with configured value', () => {
    const theme = createTheme({
      breakpoints: {
        values: { lg: 1350 }
      }
    });
    const received = theme.breakpoints.up('lg');
    const expected = '@media screen and (min-width: 1350px)';
    expect(received).toBe(expected);
  });

  test('Should get media query min-width with provided number breakpoint', () => {
    const theme = createTheme();
    const received = theme.breakpoints.up(755);
    const expected = '@media screen and (min-width: 755px)';
    expect(received).toBe(expected);
  });
});

describe('down', () => {
  test('Should get media query max-width for breakpoint with default value', () => {
    const theme = createTheme();
    const received = theme.breakpoints.down('md');
    const expected = `@media screen and (max-width: ${THEME_BREAKPOINTS_DEFAULT.md - 1}px)`;
    expect(received).toBe(expected);
  });

  test('Should get media query max-width for breakpoint with configured value', () => {
    const theme = createTheme({
      breakpoints: {
        values: { xl: 1720 }
      }
    });
    const received = theme.breakpoints.down('xl');
    const expected = '@media screen and (max-width: 1719px)';
    expect(received).toBe(expected);
  });

  test('Should get media query max-width for provided number breakpoint', () => {
    const theme = createTheme();
    const received = theme.breakpoints.down(943);
    const expected = '@media screen and (max-width: 942px)';
    expect(received).toBe(expected);
  });
});

describe('only', () => {
  test('Should get media query for only one breakpoint and before the next with default values', () => {
    const theme = createTheme();
    const received = theme.breakpoints.only('sm');
    const expected = `@media screen and (min-width: ${THEME_BREAKPOINTS_DEFAULT.sm}px) and (max-width: ${THEME_BREAKPOINTS_DEFAULT.md - 1}px)`;
    expect(received).toBe(expected);
  });

  test('Should get media query for only one breakpoint onwards with configured value', () => {
    const theme = createTheme({
      breakpoints: {
        values: { xs: 100, sm: 200 }
      }
    });
    const received = theme.breakpoints.only('xs');
    const expected = '@media screen and (min-width: 100px) and (max-width: 199px)';
    expect(received).toBe(expected);
  });

  test('Should get media query for only one breakpoint onwards if it is the last breakpoint with default value', () => {
    const theme = createTheme();
    const received = theme.breakpoints.only('xl');
    const expected = `@media screen and (min-width: ${THEME_BREAKPOINTS_DEFAULT.xl}px)`;
    expect(received).toBe(expected);
  });

  test('Should throw error if no valid value is provided', () => {
    const theme = createTheme();
    const breakpoint: any = 'xxx';
    expect(() => theme.breakpoints.only(breakpoint))
      .toThrow('Provided value "xxx" to theme.breakpoints.only() is not valid.');
  });
});

describe('between', () => {
  test('Should get media query between two provided breakpoint keys', () => {
    const theme = createTheme();
    const received = theme.breakpoints.between('md', 'lg');
    const expected = `@media screen and (min-width: ${THEME_BREAKPOINTS_DEFAULT.md}px) and (max-width: ${THEME_BREAKPOINTS_DEFAULT.lg - 1}px)`;
    expect(received).toBe(expected);
  });

  test('Should get media query between two provided breakpoint numbers', () => {
    const theme = createTheme();
    const received = theme.breakpoints.between(300, 500);
    const expected = '@media screen and (min-width: 300px) and (max-width: 499px)';
    expect(received).toBe(expected);
  });

  test('Should throw error if breakpoint min/max values are not coherent', () => {
    const theme = createTheme();
    expect(() => theme.breakpoints.between('lg', 'sm'))
      .toThrow('The provided breakpoints to theme.breakpoints.between() are not valid.');
  });
});
