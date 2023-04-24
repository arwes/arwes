/* eslint-env jest */

import { createFrameOctagonClip } from './createFrameOctagonClip';

test('Should create a octagon clip with default settings', () => {
  expect(createFrameOctagonClip()).toBe(`polygon(
  0 16px,
  16px 0,
  calc(100% - 16px) 0,
  100% 16px,
  100% calc(100% - 16px),
  calc(100% - 16px) 100%,
  16px 100%,
  0 calc(100% - 16px)
)`);
});

test('Should create a octagon clip with custom square size', () => {
  expect(createFrameOctagonClip({ squareSize: '2rem' })).toBe(`polygon(
  0 2rem,
  2rem 0,
  calc(100% - 2rem) 0,
  100% 2rem,
  100% calc(100% - 2rem),
  calc(100% - 2rem) 100%,
  2rem 100%,
  0 calc(100% - 2rem)
)`);
});
