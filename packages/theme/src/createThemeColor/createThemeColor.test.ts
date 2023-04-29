/* eslint-env jest */

import { createThemeColor } from './createThemeColor';

test('Should return empty string if empty list and provided', () => {
  const themeColor = createThemeColor([]);
  expect(themeColor(0)).toBe('');
  expect(themeColor(1)).toBe('');
});

test('Should accept list of string colors and return by index', () => {
  const themeColor = createThemeColor(['a', 'b', 'c']);
  expect(themeColor(0)).toBe('a');
  expect(themeColor(1)).toBe('b');
  expect(themeColor(2)).toBe('c');
});

test('Should accept list of HSLA numberic values and convert them to HSLA strings', () => {
  const themeColor = createThemeColor([
    [1, 21, 31, 0.41],
    [2, 22, 32, 0.42],
    [3, 23, 33, 0.43]
  ]);
  expect(themeColor(0)).toBe('hsla(1,21%,31%,0.41)');
  expect(themeColor(1)).toBe('hsla(2,22%,32%,0.42)');
  expect(themeColor(2)).toBe('hsla(3,23%,33%,0.43)');
});

test('Should accept list of HSLA numberic values with optional alpha value of 1 and convert them to HSLA strings', () => {
  const themeColor = createThemeColor([
    [1, 21, 31],
    [2, 22, 32],
    [3, 23, 33]
  ]);
  expect(themeColor(0)).toBe('hsla(1,21%,31%,1)');
  expect(themeColor(1)).toBe('hsla(2,22%,32%,1)');
  expect(themeColor(2)).toBe('hsla(3,23%,33%,1)');
});

test('Should accept a HSLA generator function and create new HSLA strings based on calls by index', () => {
  const themeColor = createThemeColor(index => [index, 10, 20]);
  expect(themeColor(0)).toBe('hsla(0,10%,20%,1)');
  expect(themeColor(1)).toBe('hsla(1,10%,20%,1)');
  expect(themeColor(2)).toBe('hsla(2,10%,20%,1)');
});

test('Should HSLA generator function create valid ranges of HSLA values', () => {
  const themeColor = createThemeColor(index => [index, 50 * index, 50 * index, 0.5 * index]);
  expect(themeColor(0)).toBe('hsla(0,0%,0%,0)');
  expect(themeColor(1)).toBe('hsla(1,50%,50%,0.5)');
  expect(themeColor(2)).toBe('hsla(2,100%,100%,1)');
  expect(themeColor(3)).toBe('hsla(3,100%,100%,1)');
});

test('Should HSLA numeric list be valid ranges of HSLA values', () => {
  const themeColor = createThemeColor([
    [-10, -10, -10, -1],
    [0, 0, 0, 0],
    [150, 50, 50, 0.5],
    [360, 100, 100, 1],
    [400, 120, 120, 1.5]
  ]);
  expect(themeColor(0)).toBe('hsla(0,0%,0%,0)');
  expect(themeColor(1)).toBe('hsla(0,0%,0%,0)');
  expect(themeColor(2)).toBe('hsla(150,50%,50%,0.5)');
  expect(themeColor(3)).toBe('hsla(360,100%,100%,1)');
  expect(themeColor(4)).toBe('hsla(360,100%,100%,1)');
});

test('Should return the last available item if index exceeds', () => {
  const themeColor = createThemeColor(['a', 'b', 'c']);
  expect(themeColor(3)).toBe('c');
  expect(themeColor(4)).toBe('c');
});

describe('alpha overwrite', () => {
  test('Should HSL "hsl(hue, saturation, lightness)" string colors list accept alpha option', () => {
    const themeColor = createThemeColor(['hsl(100,50%,50%)']);
    expect(themeColor(0, { alpha: 0.5 })).toBe('hsl(100,50%,50%,0.5)');
  });

  test('Should HSL "hsl(hue, saturation, lightness, alpha)" string colors list accept alpha option', () => {
    const themeColor = createThemeColor(['hsl(100, 50%, 50%, 0.5)']);
    expect(themeColor(0, { alpha: 0.5 })).toBe('hsl(100, 50%, 50%, 0.25)');
  });

  test('Should HSL "hsl(hue, saturation, lightness, alpha%)" string colors list accept alpha option', () => {
    const themeColor = createThemeColor(['hsl(100, 50%, 50%, 50%)']);
    expect(themeColor(0, { alpha: 0.5 })).toBe('hsl(100, 50%, 50%, 25%)');
  });

  test('Should HSL "hsl(hue saturation lightness)" string colors list accept alpha option', () => {
    const themeColor = createThemeColor(['hsl(100 50% 50%)']);
    expect(themeColor(0, { alpha: 0.5 })).toBe('hsl(100 50% 50% / 0.5)');
  });

  test('Should HSL "hsl(hue saturation lightness / alpha)" string colors list accept alpha option', () => {
    const themeColor = createThemeColor(['hsl(100 50% 50% / 0.5)']);
    expect(themeColor(0, { alpha: 0.5 })).toBe('hsl(100 50% 50% / 0.25)');
  });

  test('Should HSL "hsl(hue saturation lightness / alpha%)" string colors list accept alpha option', () => {
    const themeColor = createThemeColor(['hsl(100 50% 50% / 50%)']);
    expect(themeColor(0, { alpha: 0.5 })).toBe('hsl(100 50% 50% / 25%)');
  });

  test('Should HSLA string colors list accept alpha adjust option', () => {
    const themeColor = createThemeColor([
      'hsla(100,50%,50%,0)',
      'hsla(100,50%,50%,0.3)',
      'hsla(100,50%,50%,0.6)',
      'hsla(100,50%,50%,1)'
    ]);
    expect(themeColor(0, { alpha: 0.2 })).toBe('hsla(100,50%,50%,0)');
    expect(themeColor(1, { alpha: 0.2 })).toBe('hsla(100,50%,50%,0.06)');
    expect(themeColor(2, { alpha: 0.2 })).toBe('hsla(100,50%,50%,0.12)');
    expect(themeColor(3, { alpha: 0.2 })).toBe('hsla(100,50%,50%,0.2)');
  });

  test('Should RGB string colors list accept alpha option', () => {
    const themeColor = createThemeColor(['rgb(150,255,150)']);
    expect(themeColor(0, { alpha: 0.5 })).toBe('rgb(150,255,150,0.5)');
  });

  test('Should RGBA string colors list accept alpha adjust option', () => {
    const themeColor = createThemeColor([
      'rgba(100,255,100,0)',
      'rgba(100,255,100,0.3)',
      'rgba(100,255,100,0.6)',
      'rgba(100,255,100,1)'
    ]);
    expect(themeColor(0, { alpha: 0.2 })).toBe('rgba(100,255,100,0)');
    expect(themeColor(1, { alpha: 0.2 })).toBe('rgba(100,255,100,0.06)');
    expect(themeColor(2, { alpha: 0.2 })).toBe('rgba(100,255,100,0.12)');
    expect(themeColor(3, { alpha: 0.2 })).toBe('rgba(100,255,100,0.2)');
  });

  test('Should HSLA generator function accept alpha adjust option', () => {
    const themeColor = createThemeColor(index => [0, 50, 50, 0.5 * index]);
    expect(themeColor(0, { alpha: 0.5 })).toBe('hsla(0,50%,50%,0)');
    expect(themeColor(1, { alpha: 0.5 })).toBe('hsla(0,50%,50%,0.25)');
    expect(themeColor(2, { alpha: 0.5 })).toBe('hsla(0,50%,50%,0.5)');
  });

  test('Should HSLA numeric list accept alpha adjust option', () => {
    const themeColor = createThemeColor([
      [150, 50, 50, 0],
      [150, 50, 50, 0.5],
      [150, 50, 50, 1]
    ]);
    expect(themeColor(0, { alpha: 0.5 })).toBe('hsla(150,50%,50%,0)');
    expect(themeColor(1, { alpha: 0.5 })).toBe('hsla(150,50%,50%,0.25)');
    expect(themeColor(2, { alpha: 0.5 })).toBe('hsla(150,50%,50%,0.5)');
  });

  test('Should not allow to alpha overwrite string colors list not applicable', () => {
    const themeColor = createThemeColor(['red', 'blue', 'currentcolor', 'transparent']);
    expect(themeColor(0, { alpha: 0.5 })).toBe('red');
    expect(themeColor(1, { alpha: 0.5 })).toBe('blue');
    expect(themeColor(2, { alpha: 0.5 })).toBe('currentcolor');
    expect(themeColor(3, { alpha: 0.5 })).toBe('transparent');
  });
});
