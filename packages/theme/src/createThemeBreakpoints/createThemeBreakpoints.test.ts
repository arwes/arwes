/* eslint-env jest */

import { createThemeBreakpoints } from './createThemeBreakpoints';

describe('up', () => {
  test('Should return media query min-width', () => {
    const bgs = createThemeBreakpoints();
    expect(bgs.up('100px')).toBe('@media (min-width: 100px)');
  });

  test('Should return media query without the strip', () => {
    const bgs = createThemeBreakpoints();
    expect(bgs.up('100px', { strip: true })).toBe('(min-width: 100px)');
  });
});

describe('down', () => {
  test('Should return media query max-width', () => {
    const bgs = createThemeBreakpoints();
    expect(bgs.down('20rem')).toBe('@media (max-width: calc(20rem - 1px))');
  });

  test('Should return media query without the strip', () => {
    const bgs = createThemeBreakpoints();
    expect(bgs.down('20rem', { strip: true })).toBe('(max-width: calc(20rem - 1px))');
  });
});

describe('between', () => {
  test('Should return media of a range', () => {
    const bgs = createThemeBreakpoints();
    expect(bgs.between('100px', '200px')).toBe('@media (min-width: 100px) and (max-width: calc(200px - 1px))');
  });

  test('Should return media query without the strip', () => {
    const bgs = createThemeBreakpoints();
    expect(bgs.between('100px', '200px', { strip: true })).toBe('(min-width: 100px) and (max-width: calc(200px - 1px))');
  });
});
