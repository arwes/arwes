/* eslint-env jest */

import React, { useContext } from 'react';
import { render, cleanup } from '@testing-library/react';

import { AnimationContext } from '../AnimationContext';
import { Component as AnimationProvider } from './AnimationProvider.component';

afterEach(cleanup);

test('Should render children component', () => {
  const rendered = jest.fn();
  function Animated () {
    rendered();
    return null;
  }
  render(
    <AnimationProvider>
      <Animated />
    </AnimationProvider>
  );
  expect(rendered).toHaveBeenCalled();
});

test('Should provide undefined if no settings were found', () => {
  function Animated () {
    const context = useContext(AnimationContext);
    expect(context).toBeUndefined();
    return null;
  }
  render(
    <AnimationProvider>
      <Animated />
    </AnimationProvider>
  );
});

test('Should provide "animate" if defined', () => {
  function Animated () {
    const settings = useContext(AnimationContext);
    expect(settings).toEqual({ animate: true });
    return null;
  }
  render(
    <AnimationProvider animation={{ animate: true }}>
      <Animated />
    </AnimationProvider>
  );
});

test('Should provide "duration" with enter/exit values if defined with number', () => {
  function Animated () {
    const settings = useContext(AnimationContext);
    expect(settings).toEqual({ duration: { enter: 100, exit: 100 } });
    return null;
  }
  render(
    <AnimationProvider animation={{ duration: 100 }}>
      <Animated />
    </AnimationProvider>
  );
});

test('Should provide "duration" with defined values', () => {
  function Animated () {
    const settings = useContext(AnimationContext);
    expect(settings).toEqual({ duration: { enter: 150, delay: 50 } });
    return null;
  }
  render(
    <AnimationProvider animation={{ duration: { enter: 150, delay: 50 } }}>
      <Animated />
    </AnimationProvider>
  );
});

test('Should extend nested providers settings', () => {
  function Animated () {
    const settings = useContext(AnimationContext);
    expect(settings).toEqual({
      animate: true,
      duration: { enter: 150, exit: 100, stagger: 75 }
    });
    return null;
  }
  render(
    <AnimationProvider animation={{ animate: true, duration: { enter: 150, stagger: 50 } }}>
      <div>
        <AnimationProvider animation={{ duration: { exit: 100, stagger: 75 } }}>
          <Animated />
        </AnimationProvider>
      </div>
    </AnimationProvider>
  );
});
