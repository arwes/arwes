/* eslint-env jest */

import React, { useContext } from 'react';
import { render, cleanup } from '@testing-library/react';

import { AnimatorGeneralSettingsContext } from '../AnimatorGeneralSettingsContext';
import { AnimatorGeneralSettingsProvider } from './index';

afterEach(cleanup);

test('Should render children component', () => {
  const rendered = jest.fn();
  function Animated () {
    rendered();
    return null;
  }
  render(
    <AnimatorGeneralSettingsProvider>
      <Animated />
    </AnimatorGeneralSettingsProvider>
  );
  expect(rendered).toHaveBeenCalled();
});

test('Should provide undefined if no settings were found', () => {
  let context;
  function Animated () {
    context = useContext(AnimatorGeneralSettingsContext);
    return null;
  }
  render(
    <AnimatorGeneralSettingsProvider>
      <Animated />
    </AnimatorGeneralSettingsProvider>
  );
  expect(context).toBeUndefined();
});

test('Should provide "duration" with enter/exit values if defined with number', () => {
  let settings;
  function Animated () {
    settings = useContext(AnimatorGeneralSettingsContext);
    return null;
  }
  render(
    <AnimatorGeneralSettingsProvider animator={{ duration: 100 }}>
      <Animated />
    </AnimatorGeneralSettingsProvider>
  );
  expect(settings).toEqual({ duration: { enter: 100, exit: 100 } });
});

test('Should provide "duration" with defined values', () => {
  let settings;
  function Animated () {
    settings = useContext(AnimatorGeneralSettingsContext);
    return null;
  }
  render(
    <AnimatorGeneralSettingsProvider animator={{ duration: { enter: 150, delay: 50 } }}>
      <Animated />
    </AnimatorGeneralSettingsProvider>
  );
  expect(settings).toEqual({ duration: { enter: 150, delay: 50 } });
});

test('Should extend nested providers "duration" settings', () => {
  let settings;
  function Animated () {
    settings = useContext(AnimatorGeneralSettingsContext);
    return null;
  }
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
