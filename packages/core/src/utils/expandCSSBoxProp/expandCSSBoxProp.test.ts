/* eslint-env jest */

import { expandCSSBoxProp } from './expandCSSBoxProp';

test('Should expand single value to four sides', () => {
  expect(expandCSSBoxProp<number>(3, 0)).toEqual([3, 3, 3, 3]);
});

test('Should expand single array value to four sides', () => {
  expect(expandCSSBoxProp<boolean>([true], false)).toEqual([true, true, true, true]);
});

test('Should expand vertical/horizontal values to four sides', () => {
  expect(expandCSSBoxProp<string>(['a', 'b'], 'x')).toEqual(['a', 'b', 'a', 'b']);
});

test('Should expand top/horizontal/bottom values to four sides', () => {
  expect(expandCSSBoxProp<number>([8, 6, 4], 0)).toEqual([8, 6, 4, 6]);
});

test('Should return four sides if already defined', () => {
  expect(expandCSSBoxProp<number>([1, 2, 3, 4], 0)).toEqual([1, 2, 3, 4]);
});

test('Should limit array to four data', () => {
  expect(expandCSSBoxProp<number>([1, 2, 3, 4, 5, 6, 7], 0)).toEqual([1, 2, 3, 4]);
});

test('Should set default value for undefined/null side values', () => {
  expect(expandCSSBoxProp<number>([undefined], 7)).toEqual([7, 7, 7, 7]);
  expect(expandCSSBoxProp<number>([undefined, null], 7)).toEqual([7, 7, 7, 7]);
  expect(expandCSSBoxProp<number>([undefined, 3, null], 7)).toEqual([7, 3, 7, 3]);
  expect(expandCSSBoxProp<number>([undefined, 2, null, 4], 7)).toEqual([7, 2, 7, 4]);
});
