/* eslint-env jest */

import React, { FC, useContext } from 'react';
import { render, cleanup } from '@testing-library/react';

import { AnimatorGeneralSettingsContext } from '../AnimatorGeneralSettingsContext';
import { AnimatorGeneralSettingsProvider } from './index';

afterEach(cleanup);

test('Should render children component', () => {
  const rendered = jest.fn();
  const Animated: FC = () => {
    rendered();
    return null;
  };
  render(
    <AnimatorGeneralSettingsProvider>
      <Animated />
    </AnimatorGeneralSettingsProvider>
  );
  expect(rendered).toHaveBeenCalled();
});

test('Should provide undefined if no settings were found', () => {
  let context;
  const Animated: FC = () => {
    context = useContext(AnimatorGeneralSettingsContext);
    return null;
  };
  render(
    <AnimatorGeneralSettingsProvider>
      <Animated />
    </AnimatorGeneralSettingsProvider>
  );
  expect(context).toBeUndefined();
});

test('Should provide "duration" value if defined', () => {
  let settings;
  const Animated: FC = () => {
    settings = useContext(AnimatorGeneralSettingsContext);
    return null;
  };
  render(
    <AnimatorGeneralSettingsProvider animator={{ duration: { enter: 200, exit: 300 } }}>
      <Animated />
    </AnimatorGeneralSettingsProvider>
  );
  expect(settings).toEqual({ duration: { enter: 200, exit: 300 } });
});

test('Should extend nested providers "duration" settings', () => {
  let settings;
  const Animated: FC = () => {
    settings = useContext(AnimatorGeneralSettingsContext);
    return null;
  };
  render(
    <AnimatorGeneralSettingsProvider animator={{ duration: { enter: 150, stagger: 50 } }}>
      <div>
        <AnimatorGeneralSettingsProvider animator={{ duration: { exit: 100, stagger: 75 } }}>
          <Animated />
        </AnimatorGeneralSettingsProvider>
      </div>
    </AnimatorGeneralSettingsProvider>
  );
  expect(settings).toEqual({
    duration: { enter: 150, exit: 100, stagger: 75 }
  });
});
