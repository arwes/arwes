/* eslint-env jest */

import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { AnimatorSettingsProvider } from '../AnimatorSettingsProvider';
import { useAnimatorSettings } from './useAnimatorSettings';

afterEach(cleanup);

test('Should return nothing if no provider was found', () => {
  let received;
  const Example = () => {
    received = useAnimatorSettings();
    return null;
  };
  render(<Example />);
  expect(received).toBeUndefined();
});

test('Should return provided data if provider was found', () => {
  let received;
  const Example = () => {
    received = useAnimatorSettings();
    return null;
  };
  render(
    <AnimatorSettingsProvider animator={{ duration: { enter: 100 } }}>
      <Example />
    </AnimatorSettingsProvider>
  );
  const expected = { duration: { enter: 100 } };
  expect(received).toEqual(expected);
});
