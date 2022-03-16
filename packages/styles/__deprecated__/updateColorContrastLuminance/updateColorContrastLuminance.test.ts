/* eslint-env jest */

import { updateColorContrastLuminance } from './updateColorContrastLuminance';

test('Should darken light color provided contrast offset', () => {
  const received = updateColorContrastLuminance(0.1, '#bbb');
  const expected = '#a2a2a2';
  expect(received).toBe(expected);
});

test('Should lighten dark color provided contrast offset', () => {
  const received = updateColorContrastLuminance(0.1, '#444');
  const expected = '#5e5e5e';
  expect(received).toBe(expected);
});
