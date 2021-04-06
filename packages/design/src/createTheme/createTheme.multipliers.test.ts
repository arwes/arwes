/* eslint-env jest */

import { THEME_FACTOR_MULTIPLIERS_NAMES } from '../constants';
import { createTheme } from './createTheme';

test('Should create font scale calculator based on provided factor with default value of 1', () => {
  const theme = createTheme();
  expect(theme.fontScale(1)).toBe(1);
  expect(theme.fontScale(2)).toBe(2);
});

test('Should create spacing calculator based on provided factor with default value of 5', () => {
  const theme = createTheme();
  expect(theme.space(1)).toBe(5);
  expect(theme.space(2)).toBe(10);
});

test('Should create outline calculator based on provided factor with default value of 1', () => {
  const theme = createTheme();
  expect(theme.outline(1)).toBe(1);
  expect(theme.outline(2)).toBe(2);
});

test('Should create shadow blur and spread calculator based on provided factors with default value of 1 for each', () => {
  const theme = createTheme();
  expect(theme.shadowBlur(1)).toBe(1);
  expect(theme.shadowBlur(2)).toBe(2);
  expect(theme.shadowSpread(1)).toBe(1);
  expect(theme.shadowSpread(2)).toBe(2);
});

test('Should create transition duration calculator based on provided factor with default value of 100', () => {
  const theme = createTheme();
  expect(theme.transitionDuration(1)).toBe(100);
  expect(theme.transitionDuration(2)).toBe(200);
});

THEME_FACTOR_MULTIPLIERS_NAMES.forEach((name: any) => {
  const createSettings = (value: any): any => value !== undefined ? { [name]: value } : {};
  const getResult = (theme: any): any => theme[name];

  describe(name, () => {
    test('Should allow to configure factor', () => {
      const theme = createTheme(createSettings(12));
      expect(getResult(theme)(1)).toBe(12);
      expect(getResult(theme)(2)).toBe(24);
      expect(getResult(theme)(0.5)).toBe(6);
    });

    test('Should return factor if no multiplier is provided', () => {
      const theme = createTheme(createSettings(17));
      expect(getResult(theme)()).toBe(17);
    });

    test('Should round calculated value', () => {
      const theme = createTheme(createSettings(8));
      expect(getResult(theme)(1.2)).toBe(10);
      expect(getResult(theme)(0.8)).toBe(6);
    });

    test('Should return 0 if provided multiplier is 0', () => {
      const theme = createTheme(createSettings(0));
      expect(getResult(theme)(0)).toBe(0);
      expect(getResult(theme)(1)).toBe(0);
      expect(getResult(theme)(2)).toBe(0);
    });

    test('Should throw error if provided factor is not a number', () => {
      expect(() => createTheme(createSettings('xxx')))
        .toThrow('Factor value was expected to be a number, but received "xxx".');
    });

    test('Should throw error if provided multiplier is not a number', () => {
      const theme = createTheme();
      expect(() => getResult(theme)('yyy'))
        .toThrow('Multiplier value was expected to be a number, but received "yyy".');
    });

    test('Should allow to extend factor', () => {
      const theme1 = createTheme(createSettings(24));
      const theme2 = createTheme({}, theme1);
      const theme3 = createTheme(createSettings(15), theme1);
      expect(getResult(theme1)(1)).toBe(24);
      expect(getResult(theme2)(1)).toBe(24);
      expect(getResult(theme3)(1)).toBe(15);
    });
  });
});
