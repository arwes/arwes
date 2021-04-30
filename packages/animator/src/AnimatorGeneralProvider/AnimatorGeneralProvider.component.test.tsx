/* eslint-env jest */

import React, { FC, useContext } from 'react';
import { render, cleanup } from '@testing-library/react';

import { AnimatorGeneralContext } from '../AnimatorGeneralContext';
import { AnimatorGeneralProvider } from './AnimatorGeneralProvider.component';

afterEach(cleanup);

test('Should render children component', () => {
  const rendered = jest.fn();
  const Animated: FC = () => {
    rendered();
    return null;
  };
  render(
    <AnimatorGeneralProvider>
      <Animated />
    </AnimatorGeneralProvider>
  );
  expect(rendered).toHaveBeenCalled();
});

test('Should provide undefined if no settings were found', () => {
  let context;
  const Animated: FC = () => {
    context = useContext(AnimatorGeneralContext);
    return null;
  };
  render(
    <AnimatorGeneralProvider>
      <Animated />
    </AnimatorGeneralProvider>
  );
  expect(context).toBeUndefined();
});

test('Should provide "duration" value if defined', () => {
  let settings;
  const Animated: FC = () => {
    settings = useContext(AnimatorGeneralContext);
    return null;
  };
  render(
    <AnimatorGeneralProvider animator={{ duration: { enter: 200, exit: 300 } }}>
      <Animated />
    </AnimatorGeneralProvider>
  );
  expect(settings).toEqual({ duration: { enter: 200, exit: 300 } });
});

test('Should extend nested providers "duration" settings', () => {
  let settings;
  const Animated: FC = () => {
    settings = useContext(AnimatorGeneralContext);
    return null;
  };
  render(
    <AnimatorGeneralProvider animator={{ duration: { enter: 150, stagger: 50 } }}>
      <div>
        <AnimatorGeneralProvider animator={{ duration: { exit: 100, stagger: 75 } }}>
          <Animated />
        </AnimatorGeneralProvider>
      </div>
    </AnimatorGeneralProvider>
  );
  expect(settings).toEqual({
    duration: { enter: 150, exit: 100, stagger: 75 }
  });
});
