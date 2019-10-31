/* eslint-env jest */

import React, { useContext } from 'react';
import { render, cleanup } from '@testing-library/react';
import { AnimationContext } from '../AnimationContext';
import { AnimationProvider } from './AnimationProvider';

afterEach(cleanup);

test('Should provide empty object if no settings were defined', () => {
  function Animated () {
    const context = useContext(AnimationContext);
    expect(context).toEqual({});
    return <div />;
  }
  render(
    <AnimationProvider>
      <Animated />
    </AnimationProvider>
  );
});

test('Should provide "animate" if defined', () => {
  function Animated () {
    const { animate } = useContext(AnimationContext);
    expect(animate).toBe(true);
    return <div />;
  }
  render(
    <AnimationProvider animate>
      <Animated />
    </AnimationProvider>
  );
});

test('Should provide "duration" with enter/exit values if defined with number', () => {
  function Animated () {
    const { duration } = useContext(AnimationContext);
    expect(duration).toEqual({ enter: 100, exit: 100 });
    return <div />;
  }
  render(
    <AnimationProvider duration={100}>
      <Animated />
    </AnimationProvider>
  );
});

test('Should provide "duration" with defined values', () => {
  function Animated () {
    const { duration } = useContext(AnimationContext);
    expect(duration).toEqual({ enter: 150, delay: 50 });
    return <div />;
  }
  render(
    <AnimationProvider duration={{ enter: 150, delay: 50 }}>
      <Animated />
    </AnimationProvider>
  );
});

test('Should extend nested providers settings', () => {
  function Animated () {
    const context = useContext(AnimationContext);
    expect(context).toEqual({
      animate: true,
      duration: { enter: 150, exit: 100, stagger: 50 }
    });
    return <div />;
  }
  render(
    <AnimationProvider animate duration={{ enter: 150, stagger: 50 }}>
      <div>
        <AnimationProvider duration={{ exit: 100 }}>
          <Animated />
        </AnimationProvider>
      </div>
    </AnimationProvider>
  );
});
