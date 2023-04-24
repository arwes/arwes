/* eslint-env jest */

import { createFrameHexagonClip } from './createFrameHexagonClip';

test('Should create a hexagon clip with default settings', () => {
  expect(createFrameHexagonClip()).toBe(`polygon(
  0 100%,
  0 16px,
  16px 0,
  100% 0,
  100% calc(100% - 16px),
  calc(100% - 16px) 100%
)`);
});

test('Should create a hexagon clip with custom square size', () => {
  expect(createFrameHexagonClip({ squareSize: '2rem' })).toBe(`polygon(
  0 100%,
  0 2rem,
  2rem 0,
  100% 0,
  100% calc(100% - 2rem),
  calc(100% - 2rem) 100%
)`);
});

test('Should create a hexagon clip inverted', () => {
  expect(createFrameHexagonClip({ inverted: true })).toBe(`polygon(
  0 0,
  calc(100% - 16px) 0,
  100% 16px,
  100% 100%,
  16px 100%,
  0 calc(100% - 16px)
)`);
});
