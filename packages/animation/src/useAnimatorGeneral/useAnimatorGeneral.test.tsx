/* eslint-env jest */

import React, { FC } from 'react';
import { render, cleanup } from '@testing-library/react';

import { AnimatorGeneralProvider } from '../AnimatorGeneralProvider';
import { useAnimatorGeneral } from './useAnimatorGeneral';

afterEach(cleanup);

test('Should return nothing if no provider was found', () => {
  let received;
  const Example: FC = () => {
    received = useAnimatorGeneral();
    return null;
  };
  render(<Example />);
  expect(received).toBeUndefined();
});

test('Should return provided data if provider was found', () => {
  let received;
  const Example: FC = () => {
    received = useAnimatorGeneral();
    return null;
  };
  render(
    <AnimatorGeneralProvider animator={{ duration: { enter: 100 } }}>
      <Example />
    </AnimatorGeneralProvider>
  );
  const expected = { duration: { enter: 100 } };
  expect(received).toEqual(expected);
});
