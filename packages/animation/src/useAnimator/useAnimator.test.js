/* eslint-env jest */

import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { AnimatorContext } from '../AnimatorContext';
import { useAnimator } from './useAnimator';

afterEach(cleanup);

test('Should return null if no provider was found', () => {
  const Example = () => {
    expect(useAnimator()).toBeUndefined();
    return null;
  };
  render(<Example />);
});

test('Should return provided data if provider was found', () => {
  const Example = () => {
    expect(useAnimator()).toEqual(100);
    return null;
  };
  render(
    <AnimatorContext.Provider value={100}>
      <Example />
    </AnimatorContext.Provider>
  );
});
