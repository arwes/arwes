/* eslint-env jest */

import { getDistanceFromOriginToCornerProgress } from './getDistanceFromOriginToCornerProgress';

test('Should get distance in progress from origin left', () => {
  expect(getDistanceFromOriginToCornerProgress(10, 10, 0, 7, 'left')).toBe(0);
  expect(getDistanceFromOriginToCornerProgress(10, 10, 5, 7, 'left')).toBe(0.5);
  expect(getDistanceFromOriginToCornerProgress(10, 10, 10, 7, 'left')).toBe(1);
});

test('Should get distance in progress from origin right', () => {
  expect(getDistanceFromOriginToCornerProgress(10, 10, 0, 7, 'right')).toBe(1);
  expect(getDistanceFromOriginToCornerProgress(10, 10, 5, 7, 'right')).toBe(0.5);
  expect(getDistanceFromOriginToCornerProgress(10, 10, 10, 7, 'right')).toBe(0);
});

test('Should get distance in progress from origin top', () => {
  expect(getDistanceFromOriginToCornerProgress(10, 10, 7, 0, 'top')).toBe(0);
  expect(getDistanceFromOriginToCornerProgress(10, 10, 7, 5, 'top')).toBe(0.5);
  expect(getDistanceFromOriginToCornerProgress(10, 10, 7, 10, 'top')).toBe(1);
});

test('Should get distance in progress from origin bottom', () => {
  expect(getDistanceFromOriginToCornerProgress(10, 10, 7, 0, 'bottom')).toBe(1);
  expect(getDistanceFromOriginToCornerProgress(10, 10, 7, 5, 'bottom')).toBe(0.5);
  expect(getDistanceFromOriginToCornerProgress(10, 10, 7, 10, 'bottom')).toBe(0);
});

test('Should get distance in progress from origin center', () => {
  expect(getDistanceFromOriginToCornerProgress(10, 10, 5, 5, 'center')).toBe(0);
  expect(getDistanceFromOriginToCornerProgress(10, 10, 7, 7, 'center')).toBe(0.4);
  expect(getDistanceFromOriginToCornerProgress(10, 10, 2, 2, 'center')).toBe(0.6);
  expect(getDistanceFromOriginToCornerProgress(10, 10, 0, 0, 'center')).toBe(1);
  expect(getDistanceFromOriginToCornerProgress(10, 10, 10, 10, 'center')).toBe(1);
  expect(getDistanceFromOriginToCornerProgress(10, 10, 0, 10, 'center')).toBe(1);
  expect(getDistanceFromOriginToCornerProgress(10, 10, 10, 0, 'center')).toBe(1);
});

test('Should get distance in progress from origin custom point (A)', () => {
  expect(getDistanceFromOriginToCornerProgress(10, 10, 0, 0, [0, 0])).toBe(0);
  expect(getDistanceFromOriginToCornerProgress(10, 10, 3, 3, [0, 0])).toBe(0.3);
  expect(getDistanceFromOriginToCornerProgress(10, 10, 5, 5, [0, 0])).toBe(0.5);
  expect(getDistanceFromOriginToCornerProgress(10, 10, 8, 8, [0, 0])).toBe(0.8);
  expect(getDistanceFromOriginToCornerProgress(10, 10, 10, 10, [0, 0])).toBe(1);
});

test('Should get distance in progress from origin custom point (B)', () => {
  expect(getDistanceFromOriginToCornerProgress(10, 10, 0, 0, [0.3, 0.7])).toBe(0.7693092581620721);
  expect(getDistanceFromOriginToCornerProgress(10, 10, 3, 3, [0.3, 0.7])).toBe(0.40406101782088427);
  expect(getDistanceFromOriginToCornerProgress(10, 10, 5, 5, [0.3, 0.7])).toBe(0.28571428571428575);
  expect(getDistanceFromOriginToCornerProgress(10, 10, 8, 8, [0.3, 0.7])).toBe(0.5150787536377127);
  expect(getDistanceFromOriginToCornerProgress(10, 10, 10, 10, [0.3, 0.7])).toBe(0.7693092581620721);
});
