/* eslint-env jest */

import { createThemeUnit } from './createThemeUnit';

test('Should return result of multiplier', () => {
  const themeColor = createThemeUnit(i => `${i * 3}px`);
  expect(themeColor(0)).toBe('0px');
  expect(themeColor(1)).toBe('3px');
  expect(themeColor(2)).toBe('6px');
  expect(themeColor(3)).toBe('9px');
});

test('Should return list of results of multiplier', () => {
  const themeColor = createThemeUnit(i => `${i * 3}rem`);
  expect(themeColor([])).toBe('');
  expect(themeColor([2])).toBe('6rem');
  expect(themeColor([0, 2])).toBe('0rem 6rem');
  expect(themeColor([1, 1])).toBe('3rem 3rem');
  expect(themeColor([3, 0, 2])).toBe('9rem 0rem 6rem');
});

test('Should return element in provided list', () => {
  const themeColor = createThemeUnit(['0px', '1px', '2px', '4px', '8px']);
  expect(themeColor(0)).toBe('0px');
  expect(themeColor(1)).toBe('1px');
  expect(themeColor(2)).toBe('2px');
  expect(themeColor(3)).toBe('4px');
  expect(themeColor(4)).toBe('8px');
});

test('Should return list of elements in provided list', () => {
  const themeColor = createThemeUnit(['0px', '1px', '2px', '4px', '8px']);
  expect(themeColor([])).toBe('');
  expect(themeColor([2])).toBe('2px');
  expect(themeColor([0, 2])).toBe('0px 2px');
  expect(themeColor([1, 1])).toBe('1px 1px');
  expect(themeColor([3, 0, 2])).toBe('4px 0px 2px');
});

test('Should return last element in provided list if index exceeds', () => {
  const themeColor = createThemeUnit(['0px', '1px', '2px']);
  expect(themeColor(0)).toBe('0px');
  expect(themeColor(1)).toBe('1px');
  expect(themeColor(2)).toBe('2px');
  expect(themeColor(3)).toBe('2px');
  expect(themeColor(4)).toBe('2px');
});

test('Should return same string if provided string', () => {
  const themeColor = createThemeUnit(i => `${i * 2}rem`);
  expect(themeColor('auto')).toBe('auto');
  expect(themeColor([2, 'auto', 1])).toBe('4rem auto 2rem');
});

test('Should return empty string if empty list and provided', () => {
  const themeColor = createThemeUnit([]);
  expect(themeColor(0)).toBe('');
  expect(themeColor(1)).toBe('');
});
