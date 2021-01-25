/* eslint-env jest */

import { createTheme } from './createTheme';

test('Should create spacing calculator based on provided factor with default value of 8', () => {
  const theme = createTheme();
  expect(theme.space(1)).toBe(8);
  expect(theme.space(2)).toBe(16);
  expect(theme.space(0.5)).toBe(4);
});

test('Should round space calculated value', () => {
  const theme = createTheme();
  expect(theme.space(1.2)).toBe(10);
  expect(theme.space(0.8)).toBe(6);
});

test('Should allow to configure space factor', () => {
  const theme = createTheme({
    space: 5
  });
  expect(theme.space(1)).toBe(5);
  expect(theme.space(2)).toBe(10);
  expect(theme.space(0.5)).toBe(3);
});

test('Should return factor if no multiplier is provided', () => {
  const theme = createTheme({ space: 17 });
  expect(theme.space()).toBe(17);
});

test('Should allow to extend theme factor', () => {
  const theme1 = createTheme({ space: 24 });
  const theme2 = createTheme({}, theme1);
  const theme3 = createTheme({ space: 15 }, theme1);
  expect(theme1.space(1)).toBe(24);
  expect(theme2.space(1)).toBe(24);
  expect(theme3.space(1)).toBe(15);
});

test('Should throw error if provided factor is not a number', () => {
  const factor: any = 'zzz';
  expect(() => createTheme({ space: factor }))
    .toThrow('Factor value was expected to be a number, but received "zzz".');
});

test('Should throw error if provided multiplier is not a number', () => {
  const multiplier: any = 'yyy';
  expect(() => createTheme().space(multiplier))
    .toThrow('Multiplier value was expected to be a number, but received "yyy".');
});
