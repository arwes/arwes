/* eslint-env jest */

import { createFramePentagonClip } from './createFramePentagonClip';

test('Should create a pentagon clip with default settings', () => {
  expect(createFramePentagonClip()).toBe(`polygon(
  0 0,
  100% 0,
  100% calc(100% - 16px),
  calc(100% - 16px) 100%,
  0 100%
)`);
});

test('Should create a pentagon clip with custom square size', () => {
  expect(createFramePentagonClip({ squareSize: '2rem' })).toBe(`polygon(
  0 0,
  100% 0,
  100% calc(100% - 2rem),
  calc(100% - 2rem) 100%,
  0 100%
)`);
});

test('Should create a pentagon clip inverted', () => {
  expect(createFramePentagonClip({ inverted: true })).toBe(`polygon(
  0 0,
  100% 0,
  100% 100%,
  16px 100%,
  0 calc(100% - 16px)
)`);
});
