/* eslint-env jest */

import { formatAnimatedCSSPropsShorthands } from './formatAnimatedCSSPropsShorthands';

// Most functionalities are tested in the `Animated` component as integration testing.

test('Should return undefined if undefined is received', () => {
  expect(formatAnimatedCSSPropsShorthands()).toBeUndefined();
});
