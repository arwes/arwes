/* eslint-env jest */

import React, { useState, useEffect } from 'react';
import { render, act, cleanup } from '@testing-library/react';

import { makeMoveTimeTo } from '../../test/makeMoveTimeTo';
import { EXITED, EXITING, ENTERED, ENTERING } from '../constants';
import { AnimatorGeneralSettingsProvider } from '../AnimatorGeneralSettingsProvider';
import { useAnimator } from '../useAnimator';
import { Component as Animator } from './Animator.component';

let moveTimeTo;

jest.useFakeTimers();

beforeEach(() => {
  moveTimeTo = makeMoveTimeTo();
});

afterEach(cleanup);

test('Should transition on "activate" changes', () => {
  let flow1;
  function ExampleParent () {
    flow1 = useAnimator().flow.value;
    return null;
  }

  let flow2;
  function ExampleChild () {
    flow2 = useAnimator().flow.value;
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

  expect(flow1).toBe(EXITED);
  expect(flow2).toBe(EXITED);

  act(() => moveTimeTo(1));
  expect(flow1).toBe(EXITED);
  expect(flow2).toBe(EXITED);

  act(() => moveTimeTo(999));
  expect(flow1).toBe(EXITED);
  expect(flow2).toBe(EXITED);

  act(() => moveTimeTo(1001));
  expect(flow1).toBe(ENTERING);
  expect(flow2).toBe(EXITED);

  act(() => moveTimeTo(1099));
  expect(flow1).toBe(ENTERING);
  expect(flow2).toBe(EXITED);

  act(() => moveTimeTo(1101));
  expect(flow1).toBe(ENTERED);
  expect(flow2).toBe(ENTERING);

  act(() => moveTimeTo(1199));
  expect(flow1).toBe(ENTERED);
  expect(flow2).toBe(ENTERING);

  act(() => moveTimeTo(1201));
  expect(flow1).toBe(ENTERED);
  expect(flow2).toBe(ENTERED);

  act(() => moveTimeTo(1999));
  expect(flow1).toBe(ENTERED);
  expect(flow2).toBe(ENTERED);

  act(() => moveTimeTo(2001));
  expect(flow1).toBe(EXITING);
  expect(flow2).toBe(EXITING);

  act(() => moveTimeTo(2099));
  expect(flow1).toBe(EXITING);
  expect(flow2).toBe(EXITING);

  act(() => moveTimeTo(2101));
  expect(flow1).toBe(EXITED);
  expect(flow2).toBe(EXITED);
});

test('Should not update flow if child node receives "activate"', () => {
  let flow1;
  function ExampleParent () {
    flow1 = useAnimator().flow.value;
    return null;
  }

  let flow2;
  function ExampleChild () {
    flow2 = useAnimator().flow.value;
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

  expect(flow1).toBe(EXITED);
  expect(flow2).toBe(EXITED);

  act(() => moveTimeTo(1));
  expect(flow1).toBe(EXITED);
  expect(flow2).toBe(EXITED);

  act(() => moveTimeTo(999));
  expect(flow1).toBe(EXITED);
  expect(flow2).toBe(EXITED);

  act(() => moveTimeTo(1001));
  expect(flow1).toBe(ENTERING);
  expect(flow2).toBe(EXITED);

  act(() => moveTimeTo(1099));
  expect(flow1).toBe(ENTERING);
  expect(flow2).toBe(EXITED);

  act(() => moveTimeTo(1101));
  expect(flow1).toBe(ENTERED);
  expect(flow2).toBe(ENTERING);

  act(() => moveTimeTo(1199));
  expect(flow1).toBe(ENTERED);
  expect(flow2).toBe(ENTERING);

  act(() => moveTimeTo(1201));
  expect(flow1).toBe(ENTERED);
  expect(flow2).toBe(ENTERED);

  act(() => moveTimeTo(1999));
  expect(flow1).toBe(ENTERED);
  expect(flow2).toBe(ENTERED);

  act(() => moveTimeTo(2001));
  expect(flow1).toBe(EXITING);
  expect(flow2).toBe(EXITING);

  act(() => moveTimeTo(2099));
  expect(flow1).toBe(EXITING);
  expect(flow2).toBe(EXITING);

  act(() => moveTimeTo(2101));
  expect(flow1).toBe(EXITED);
  expect(flow2).toBe(EXITED);
});

test('Should merge child flow with parent if "merge" defined', () => {
  let flow1;
  function ExampleParent () {
    flow1 = useAnimator().flow.value;
    return null;
  }

  let flow2;
  function ExampleChild () {
    flow2 = useAnimator().flow.value;
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

  expect(flow1).toBe(EXITED);
  expect(flow2).toBe(EXITED);

  act(() => moveTimeTo(1));
  expect(flow1).toBe(EXITED);
  expect(flow2).toBe(EXITED);

  act(() => moveTimeTo(999));
  expect(flow1).toBe(EXITED);
  expect(flow2).toBe(EXITED);

  act(() => moveTimeTo(1001));
  expect(flow1).toBe(ENTERING);
  expect(flow2).toBe(ENTERING);

  act(() => moveTimeTo(1099));
  expect(flow1).toBe(ENTERING);
  expect(flow2).toBe(ENTERING);

  act(() => moveTimeTo(1101));
  expect(flow1).toBe(ENTERED);
  expect(flow2).toBe(ENTERED);

  act(() => moveTimeTo(1199));
  expect(flow1).toBe(ENTERED);
  expect(flow2).toBe(ENTERED);

  act(() => moveTimeTo(1201));
  expect(flow1).toBe(ENTERED);
  expect(flow2).toBe(ENTERED);

  act(() => moveTimeTo(1999));
  expect(flow1).toBe(ENTERED);
  expect(flow2).toBe(ENTERED);

  act(() => moveTimeTo(2001));
  expect(flow1).toBe(EXITING);
  expect(flow2).toBe(EXITING);

  act(() => moveTimeTo(2099));
  expect(flow1).toBe(EXITING);
  expect(flow2).toBe(EXITING);

  act(() => moveTimeTo(2101));
  expect(flow1).toBe(EXITED);
  expect(flow2).toBe(EXITED);
});

test('Should allow "animate=false" on child node', () => {
  let flow;
  function ExampleChild () {
    flow = useAnimator().flow.value;
    return null;
  }

  function ExampleApp () {
    return (
      <Animator>
        <Animator animator={{ animate: false }}>
          <ExampleChild />
        </Animator>
      </Animator>
    );
  }

  render(<ExampleApp />);

  expect(flow).toBe(ENTERED);
  act(() => jest.advanceTimersByTime(1));
  expect(flow).toBe(ENTERED);
});

test('Should inherit "animate=false" setting from parent node', () => {
  let flow;
  function ExampleChild () {
    flow = useAnimator().flow.value;
    return null;
  }
  render(
    <Animator animator={{ animate: false }}>
      <Animator>
        <ExampleChild />
      </Animator>
    </Animator>
  );
  expect(flow).toBe(ENTERED);
  act(() => jest.advanceTimersByTime(1));
  expect(flow).toBe(ENTERED);
});

test('Should inherit "duration" setting from parent provider', () => {
  let animator;
  function ExampleChild () {
    animator = useAnimator();
    return null;
  }
  render(
    <AnimatorGeneralSettingsProvider animator={{ duration: 300 }}>
      <Animator>
        <ExampleChild />
      </Animator>
    </AnimatorGeneralSettingsProvider>
  );
  expect(animator.duration).toMatchObject({ enter: 300, exit: 300 });
});
