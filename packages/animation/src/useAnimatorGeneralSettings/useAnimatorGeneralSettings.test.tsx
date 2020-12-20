/* eslint-env jest */

import React, { FC } from 'react';
import { render, cleanup } from '@testing-library/react';

import { AnimatorGeneralSettingsProvider } from '../AnimatorGeneralSettingsProvider';
import { useAnimatorGeneralSettings } from './useAnimatorGeneralSettings';

afterEach(cleanup);

test('Should return nothing if no provider was found', () => {
  let received;
  const Example: FC = () => {
    received = useAnimatorGeneralSettings();
    return null;
  };
  render(<Example />);
  expect(received).toBeUndefined();
});

test('Should return provided data if provider was found', () => {
  let received;
  const Example: FC = () => {
    received = useAnimatorGeneralSettings();
    return null;
  };
  render(
    <AnimatorGeneralSettingsProvider animator={{ duration: { enter: 100 } }}>
      <Example />
    </AnimatorGeneralSettingsProvider>
  );
  const expected = { duration: { enter: 100 } };
  expect(received).toEqual(expected);
});
