/* eslint-env jest */

import { createTheme } from './createTheme';

test('Should create spacing calculator based on provided factor with default value of 8', () => {
  const theme = createTheme();
  expect(theme.space(1)).toBe(8);
  expect(theme.space(2)).toBe(16);
  expect(theme.space(0.5)).toBe(4);
});

test('Should create outline calculator based on provided factor with default value of 1', () => {
  const theme = createTheme();
  expect(theme.outline(1)).toBe(1);
  expect(theme.outline(2)).toBe(2);
  expect(theme.outline(0.5)).toBe(1);
});

test('Should create shadow blur and spread calculator based on provided factors with default value of 1 for each', () => {
  const theme = createTheme();
  expect(theme.shadow.blur(1)).toBe(1);
  expect(theme.shadow.blur(2)).toBe(2);
  expect(theme.shadow.spread(1)).toBe(1);
  expect(theme.shadow.spread(2)).toBe(2);
});

[
  [
    'space',
    (value: any) => value !== undefined ? { space: value } : {},
    (theme: any) => theme.space
  ],
  [
    'outline',
    (value: any) => value !== undefined ? { outline: value } : {},
    (theme: any) => theme.outline
  ],
  [
    'blur',
    (value: any) => value !== undefined ? { shadow: { blur: value } } : {},
    (theme: any) => theme.shadow.blur
  ],
  [
    'spread',
    (value: any) => value !== undefined ? { shadow: { spread: value } } : {},
    (theme: any) => theme.shadow.spread
  ]
].forEach(([name, createSettings, getResult]: any) => {
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
