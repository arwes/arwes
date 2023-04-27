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

test('Should not render leftTop corner', () => {
  expect(createFrameOctagonClip({ leftTop: false })).toBe(`polygon(
0 0,
calc(100% - 16px) 0,
100% 16px,
100% calc(100% - 16px),
calc(100% - 16px) 100%,
16px 100%,
0 calc(100% - 16px)
)`);
});

test('Should not render rightTop corner', () => {
  expect(createFrameOctagonClip({ rightTop: false })).toBe(`polygon(
0 16px,
16px 0,
100% 0,
100% calc(100% - 16px),
calc(100% - 16px) 100%,
16px 100%,
0 calc(100% - 16px)
)`);
});

test('Should not render rightBottom corner', () => {
  expect(createFrameOctagonClip({ rightBottom: false })).toBe(`polygon(
0 16px,
16px 0,
calc(100% - 16px) 0,
100% 16px,
100% 100%,
16px 100%,
0 calc(100% - 16px)
)`);
});

test('Should not render leftBottom corner', () => {
  expect(createFrameOctagonClip({ leftBottom: false })).toBe(`polygon(
0 16px,
16px 0,
calc(100% - 16px) 0,
100% 16px,
100% calc(100% - 16px),
calc(100% - 16px) 100%,
0 100%
)`);
});
