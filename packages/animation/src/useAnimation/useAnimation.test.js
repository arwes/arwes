/* eslint-env jest */

import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { AnimationProvider } from '../AnimationProvider';
import { useAnimation } from './useAnimation';

afterEach(cleanup);

test('Should return nothing if no provider was found', () => {
  const Example = () => {
    const received = useAnimation();
    expect(received).toBeUndefined();
    return null;
  };
  render(<Example />);
});

test('Should return provided data if provider was found', () => {
  const Example = () => {
    const received = useAnimation();
    const expected = { animate: true, duration: { enter: 100 } };
    expect(received).toEqual(expected);
    return null;
  };
  render(
    <AnimationProvider animation={{ animate: true, duration: { enter: 100 } }}>
      <Example />
    </AnimationProvider>
  );
});
