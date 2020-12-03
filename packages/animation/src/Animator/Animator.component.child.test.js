/* eslint-env jest */

import React, { useState, useEffect } from 'react';
import { render, act, cleanup } from '@testing-library/react';

import { EXITED, EXITING, ENTERED, ENTERING } from '../constants';
import { AnimatorSettingsProvider } from '../AnimatorSettingsProvider';
import { useAnimator } from '../useAnimator';
import { Component as Animator } from './Animator.component';

jest.useFakeTimers();
afterEach(cleanup);

test('Should transition on "activate" changes', () => {
  let flow1;
  function ExampleParent () {
    const animator = useAnimator();
    useEffect(() => (flow1 = animator.flow), [animator]);
    return null;
  }

  let flow2;
  function ExampleChild () {
    const animator = useAnimator();
    useEffect(() => (flow2 = animator.flow), [animator]);
    return null;
  }

  function ExampleApp () {
    const [activate, setActivate] = useState(false);
    useEffect(() => setTimeout(() => setActivate(true), 1000), []);
    useEffect(() => setTimeout(() => setActivate(false), 2000), []);
    return (
      <Animator animator={{ activate }}>
        <ExampleParent />
        <Animator>
          <ExampleChild />
        </Animator>
      </Animator>
    );
  }

  render(<ExampleApp />);

  expect(flow1.value).toBe(EXITED);
  expect(flow2.value).toBe(EXITED);

  act(() => jest.advanceTimersByTime(1));
  expect(flow1.value).toBe(EXITED);
  expect(flow2.value).toBe(EXITED);

  act(() => jest.advanceTimersByTime(998)); // 999ms
  expect(flow1.value).toBe(EXITED);
  expect(flow2.value).toBe(EXITED);

  act(() => jest.advanceTimersByTime(2)); // 1001ms
  expect(flow1.value).toBe(ENTERING);
  expect(flow2.value).toBe(EXITED);

  act(() => jest.advanceTimersByTime(98)); // 1099ms
  expect(flow1.value).toBe(ENTERING);
  expect(flow2.value).toBe(EXITED);

  act(() => jest.advanceTimersByTime(2)); // 1101ms
  expect(flow1.value).toBe(ENTERED);
  expect(flow2.value).toBe(ENTERING);

  act(() => jest.advanceTimersByTime(98)); // 1199ms
  expect(flow1.value).toBe(ENTERED);
  expect(flow2.value).toBe(ENTERING);

  act(() => jest.advanceTimersByTime(2)); // 1201ms
  expect(flow1.value).toBe(ENTERED);
  expect(flow2.value).toBe(ENTERED);

  act(() => jest.advanceTimersByTime(798)); // 1999ms
  expect(flow1.value).toBe(ENTERED);
  expect(flow2.value).toBe(ENTERED);

  act(() => jest.advanceTimersByTime(2)); // 2001ms
  expect(flow1.value).toBe(EXITING);
  expect(flow2.value).toBe(EXITING);

  act(() => jest.advanceTimersByTime(98)); // 2099ms
  expect(flow1.value).toBe(EXITING);
  expect(flow2.value).toBe(EXITING);

  act(() => jest.advanceTimersByTime(2)); // 2101ms
  expect(flow1.value).toBe(EXITED);
  expect(flow2.value).toBe(EXITED);
});

test('Should not update flow if child node receives "activate"', () => {
  let flow1;
  function ExampleParent () {
    const animator = useAnimator();
    useEffect(() => (flow1 = animator.flow), [animator]);
    return null;
  }

  let flow2;
  function ExampleChild () {
    const animator = useAnimator();
    useEffect(() => (flow2 = animator.flow), [animator]);
    return null;
  }

  function ExampleApp () {
    const [activate, setActivate] = useState(false);
    useEffect(() => setTimeout(() => setActivate(true), 1000), []);
    useEffect(() => setTimeout(() => setActivate(false), 2000), []);
    return (
      <Animator animator={{ activate }}>
        <ExampleParent />
        {/*
          Child <Animator /> will not transition based on the "activate" prop.
          It should listen to its parent <Animator /> flow because it is not a root.
        */}
        <Animator animator={{ activate }}>
          <ExampleChild />
        </Animator>
      </Animator>
    );
  }

  render(<ExampleApp />);

  expect(flow1.value).toBe(EXITED);
  expect(flow2.value).toBe(EXITED);

  act(() => jest.advanceTimersByTime(1));
  expect(flow1.value).toBe(EXITED);
  expect(flow2.value).toBe(EXITED);

  act(() => jest.advanceTimersByTime(998)); // 999ms
  expect(flow1.value).toBe(EXITED);
  expect(flow2.value).toBe(EXITED);

  act(() => jest.advanceTimersByTime(2)); // 1001ms
  expect(flow1.value).toBe(ENTERING);
  expect(flow2.value).toBe(EXITED);

  act(() => jest.advanceTimersByTime(98)); // 1099ms
  expect(flow1.value).toBe(ENTERING);
  expect(flow2.value).toBe(EXITED);

  act(() => jest.advanceTimersByTime(2)); // 1101ms
  expect(flow1.value).toBe(ENTERED);
  expect(flow2.value).toBe(ENTERING);

  act(() => jest.advanceTimersByTime(98)); // 1199ms
  expect(flow1.value).toBe(ENTERED);
  expect(flow2.value).toBe(ENTERING);

  act(() => jest.advanceTimersByTime(2)); // 1201ms
  expect(flow1.value).toBe(ENTERED);
  expect(flow2.value).toBe(ENTERED);

  act(() => jest.advanceTimersByTime(798)); // 1999ms
  expect(flow1.value).toBe(ENTERED);
  expect(flow2.value).toBe(ENTERED);

  act(() => jest.advanceTimersByTime(2)); // 2001ms
  expect(flow1.value).toBe(EXITING);
  expect(flow2.value).toBe(EXITING);

  act(() => jest.advanceTimersByTime(98)); // 2099ms
  expect(flow1.value).toBe(EXITING);
  expect(flow2.value).toBe(EXITING);

  act(() => jest.advanceTimersByTime(2)); // 2101ms
  expect(flow1.value).toBe(EXITED);
  expect(flow2.value).toBe(EXITED);
});

test('Should merge child flow with parent if "merge" defined', () => {
  let flow1;
  function ExampleParent () {
    const animator = useAnimator();
    useEffect(() => (flow1 = animator.flow), [animator]);
    return null;
  }

  let flow2;
  function ExampleChild () {
    const animator = useAnimator();
    useEffect(() => (flow2 = animator.flow), [animator]);
    return null;
  }

  function ExampleApp () {
    const [activate, setActivate] = useState(false);
    useEffect(() => setTimeout(() => setActivate(true), 1000), []);
    useEffect(() => setTimeout(() => setActivate(false), 2000), []);
    return (
      <Animator animator={{ activate }}>
        <ExampleParent />
        <Animator animator={{ merge: true }}>
          <ExampleChild />
        </Animator>
      </Animator>
    );
  }

  render(<ExampleApp />);

  expect(flow1.value).toBe(EXITED);
  expect(flow2.value).toBe(EXITED);

  act(() => jest.advanceTimersByTime(1));
  expect(flow1.value).toBe(EXITED);
  expect(flow2.value).toBe(EXITED);

  act(() => jest.advanceTimersByTime(998)); // 999ms
  expect(flow1.value).toBe(EXITED);
  expect(flow2.value).toBe(EXITED);

  act(() => jest.advanceTimersByTime(2)); // 1001ms
  expect(flow1.value).toBe(ENTERING);
  expect(flow2.value).toBe(ENTERING);

  act(() => jest.advanceTimersByTime(98)); // 1099ms
  expect(flow1.value).toBe(ENTERING);
  expect(flow2.value).toBe(ENTERING);

  act(() => jest.advanceTimersByTime(2)); // 1101ms
  expect(flow1.value).toBe(ENTERED);
  expect(flow2.value).toBe(ENTERED);

  act(() => jest.advanceTimersByTime(98)); // 1199ms
  expect(flow1.value).toBe(ENTERED);
  expect(flow2.value).toBe(ENTERED);

  act(() => jest.advanceTimersByTime(2)); // 1201ms
  expect(flow1.value).toBe(ENTERED);
  expect(flow2.value).toBe(ENTERED);

  act(() => jest.advanceTimersByTime(798)); // 1999ms
  expect(flow1.value).toBe(ENTERED);
  expect(flow2.value).toBe(ENTERED);

  act(() => jest.advanceTimersByTime(2)); // 2001ms
  expect(flow1.value).toBe(EXITING);
  expect(flow2.value).toBe(EXITING);

  act(() => jest.advanceTimersByTime(98)); // 2099ms
  expect(flow1.value).toBe(EXITING);
  expect(flow2.value).toBe(EXITING);

  act(() => jest.advanceTimersByTime(2)); // 2101ms
  expect(flow1.value).toBe(EXITED);
  expect(flow2.value).toBe(EXITED);
});

test('Should allow "animate=false" on child node', () => {
  let flow1;
  function ExampleParent () {
    flow1 = useAnimator().flow;
    return null;
  }

  let flow2;
  function ExampleChild () {
    flow2 = useAnimator().flow;
    return null;
  }

  function ExampleApp () {
    return (
      <Animator animator={{ animate: false }}>
        <ExampleParent />
        <Animator animator={{ animate: false }}>
          <ExampleChild />
        </Animator>
      </Animator>
    );
  }

  render(<ExampleApp />);

  expect(flow1.value).toBe(ENTERED);
  expect(flow2.value).toBe(ENTERED);
  act(() => jest.advanceTimersByTime(1));
  expect(flow1.value).toBe(ENTERED);
  expect(flow2.value).toBe(ENTERED);
});

test('Should inherit "animate=false" setting from parent node', () => {
  let flow;
  function ExampleChild () {
    flow = useAnimator().flow;
    return null;
  }
  render(
    <Animator animator={{ animate: false }}>
      <Animator>
        <ExampleChild />
      </Animator>
    </Animator>
  );
  expect(flow.value).toBe(ENTERED);
  act(() => jest.advanceTimersByTime(1));
  expect(flow.value).toBe(ENTERED);
});

test('Should inherit "duration" setting from parent provider', () => {
  let animator;
  function ExampleChild () {
    animator = useAnimator();
    return null;
  }
  render(
    <AnimatorSettingsProvider animator={{ duration: 300 }}>
      <Animator>
        <ExampleChild />
      </Animator>
    </AnimatorSettingsProvider>
  );
  expect(animator.duration).toMatchObject({ enter: 300, exit: 300 });
});
