/* eslint-env jest */

import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { AnimationProvider } from '../AnimationProvider';
import { useAnimation } from './useAnimation';

afterEach(cleanup);

test('Should return an empty object if no provider was found', () => {
  const expected = {};
  const Example = () => {
    const received = useAnimation();
    expect(received).toEqual(expected);
    return <div />;
  };
  render(<Example />);
});

test('Should return provided data if provider was found', () => {
  const expected = { animate: true, duration: { enter: 100 } };
  const Example = () => {
    const received = useAnimation();
    expect(received).toEqual(expected);
    return <div />;
  };
  render(
    <AnimationProvider animate duration={{ enter: 100 }}>
      <Example />
    </AnimationProvider>
  );
});
