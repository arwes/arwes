/* eslint-env jest */

import { createTheme } from './createTheme';

test('Should create shadow blur and spread calculator based on provided factors with default value of 1 for each', () => {
  const theme = createTheme();
  expect(theme.shadow.blur(1)).toBe(1);
  expect(theme.shadow.blur(2)).toBe(2);
  expect(theme.shadow.spread(1)).toBe(1);
  expect(theme.shadow.spread(2)).toBe(2);
});

test('Should round space calculated value', () => {
  const theme = createTheme();
  expect(theme.shadow.blur(5.8)).toBe(6);
  expect(theme.shadow.blur(4.2)).toBe(4);
  expect(theme.shadow.spread(5.8)).toBe(6);
  expect(theme.shadow.spread(4.2)).toBe(4);
});

test('Should allow to configure shadow factors', () => {
  const theme = createTheme({
    shadow: { blur: 4, spread: 8 }
  });
  expect(theme.shadow.blur(1)).toBe(4);
  expect(theme.shadow.blur(2)).toBe(8);
  expect(theme.shadow.spread(1)).toBe(8);
  expect(theme.shadow.spread(2)).toBe(16);
});

test('Should return factor if no multiplier is provided', () => {
  const theme = createTheme({ shadow: { blur: 7, spread: 15 } });
  expect(theme.shadow.blur()).toBe(7);
  expect(theme.shadow.spread()).toBe(15);
});

test('Should allow to extend theme factor', () => {
  const theme1 = createTheme({ shadow: { blur: 12 } });
  const theme2 = createTheme({ shadow: { spread: 20 } }, theme1);
  expect(theme2.shadow.blur(1)).toBe(12);
  expect(theme2.shadow.spread(1)).toBe(20);
});

test('Should throw error if provided factor is not a number', () => {
  const factor: any = 'rrr';
  expect(() => createTheme({ shadow: { blur: factor } }))
    .toThrow('Factor value was expected to be a number, but received "rrr".');
  expect(() => createTheme({ shadow: { spread: factor } }))
    .toThrow('Factor value was expected to be a number, but received "rrr".');
});

test('Should throw error if provided multiplier is not a number', () => {
  const multiplier: any = 'ppp';
  expect(() => createTheme().shadow.blur(multiplier))
    .toThrow('Multiplier value was expected to be a number, but received "ppp".');
  expect(() => createTheme().shadow.spread(multiplier))
    .toThrow('Multiplier value was expected to be a number, but received "ppp".');
});
