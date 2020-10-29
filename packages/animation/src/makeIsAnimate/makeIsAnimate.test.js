/* eslint-env jest */

import { makeIsAnimate } from './makeIsAnimate';

test('Should return true by default with no animation context', () => {
  const component = { props: { animationContext: {} } };
  const isAnimate = makeIsAnimate(component);
  expect(isAnimate()).toBe(true);
});

test('Should return false if provided with no animation context', () => {
  const component = { props: { animationContext: {}, animate: false } };
  const isAnimate = makeIsAnimate(component);
  expect(isAnimate()).toBe(false);
});

test('Should return false if animation context says so', () => {
  const component = { props: { animationContext: { animate: false } } };
  const isAnimate = makeIsAnimate(component);
  expect(isAnimate()).toBe(false);
});

test('Should prop be imperative over animation context', () => {
  const component = { props: { animationContext: { animate: false }, animate: true } };
  const isAnimate = makeIsAnimate(component);
  expect(isAnimate()).toBe(true);
});
