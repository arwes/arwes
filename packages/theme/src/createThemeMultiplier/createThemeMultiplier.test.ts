/* eslint-env jest */

import { createThemeMultiplier } from './createThemeMultiplier';

test('Should return multiplied value if number is provided', () => {
  const themeColor = createThemeMultiplier(2);
  expect(themeColor(0)).toBe(0);
  expect(themeColor(1)).toBe(2);
  expect(themeColor(2)).toBe(4);
  expect(themeColor(3)).toBe(6);
});

test('Should return result of multiplier', () => {
  const themeColor = createThemeMultiplier(i => i * 3);
  expect(themeColor(0)).toBe(0);
  expect(themeColor(1)).toBe(3);
  expect(themeColor(2)).toBe(6);
  expect(themeColor(3)).toBe(9);
});

test('Should return element in provided list', () => {
  const themeColor = createThemeMultiplier([0, 1, 2, 4, 8]);
  expect(themeColor(0)).toBe(0);
  expect(themeColor(1)).toBe(1);
  expect(themeColor(2)).toBe(2);
  expect(themeColor(3)).toBe(4);
  expect(themeColor(4)).toBe(8);
});

test('Should return last element in provided list if index exceeds', () => {
  const themeColor = createThemeMultiplier([0, 1, 2]);
  expect(themeColor(0)).toBe(0);
  expect(themeColor(1)).toBe(1);
  expect(themeColor(2)).toBe(2);
  expect(themeColor(3)).toBe(2);
  expect(themeColor(4)).toBe(2);
});

test('Should return 0 if empty list and provided', () => {
  const themeColor = createThemeMultiplier([]);
  expect(themeColor(0)).toBe(0);
  expect(themeColor(1)).toBe(0);
});
