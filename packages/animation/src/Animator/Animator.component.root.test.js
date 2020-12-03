/* eslint-env jest */

import React, { useState, useEffect } from 'react';
import { render, act, cleanup } from '@testing-library/react';

import { EXITED, EXITING, ENTERED, ENTERING } from '../constants';
import { useAnimator } from '../useAnimator';
import { Component as Animator } from './Animator.component';

jest.useFakeTimers();
afterEach(cleanup);

test('Should transition from "exited" to "entering" if "activate" with default "duration" (by default)', () => {
  let flow;
  function Example () {
    flow = useAnimator().flow;
    return null;
  }
  render(<Animator><Example /></Animator>);

  expect(flow.value).toBe(EXITED);

  act(() => jest.advanceTimersByTime(1));
  expect(flow.value).toBe(ENTERING);

  act(() => jest.advanceTimersByTime(98)); // 99ms
  expect(flow.value).toBe(ENTERING);

  act(() => jest.advanceTimersByTime(100)); // 101ms
  expect(flow.value).toBe(ENTERED);
});

test('Should not transition from "exited" if "activate=false"', () => {
  let flow;
  function Example () {
    flow = useAnimator().flow;
    return null;
  }
  render(
    <Animator animator={{ activate: false }}>
      <Example />
    </Animator>
  );

  expect(flow.value).toBe(EXITED);

  act(() => jest.advanceTimersByTime(10));
  expect(flow.value).toBe(EXITED);

  act(() => jest.advanceTimersByTime(100)); // 110ms
  expect(flow.value).toBe(EXITED);
});

test('Should transition on "activate" changes with default "duration"', () => {
  let flow;
  function ExampleChild () {
    flow = useAnimator().flow;
    return null;
  }

  function ExampleApp () {
    const [activate, setActivate] = useState(false);
    useEffect(() => setTimeout(() => setActivate(true), 500), []);
    useEffect(() => setTimeout(() => setActivate(false), 1000), []);
    return (
      <Animator animator={{ activate }}>
        <ExampleChild />
      </Animator>
    );
  }

  render(<ExampleApp />);

  expect(flow.value).toBe(EXITED);

  act(() => jest.advanceTimersByTime(1));
  expect(flow.value).toBe(EXITED);

  act(() => jest.advanceTimersByTime(498)); // 499ms
  expect(flow.value).toBe(EXITED);

  act(() => jest.advanceTimersByTime(2)); // 501ms
  expect(flow.value).toBe(ENTERING);

  act(() => jest.advanceTimersByTime(98)); // 599ms
  expect(flow.value).toBe(ENTERING);

  act(() => jest.advanceTimersByTime(2)); // 601ms
  expect(flow.value).toBe(ENTERED);

  act(() => jest.advanceTimersByTime(398)); // 999ms
  expect(flow.value).toBe(ENTERED);

  act(() => jest.advanceTimersByTime(2)); // 1001ms
  expect(flow.value).toBe(EXITING);

  act(() => jest.advanceTimersByTime(98)); // 1099ms
  expect(flow.value).toBe(EXITING);

  act(() => jest.advanceTimersByTime(2)); // 1101ms
  expect(flow.value).toBe(EXITED);
});

test('Should receive flow state object when transitioning', () => {
  let flowReceived;
  const isFlow = flowExpected => expect(flowReceived).toEqual(flowExpected);

  function ExampleChild () {
    flowReceived = useAnimator().flow;
    return null;
  }

  function ExampleApp () {
    const [activate, setActivate] = useState(false);
    useEffect(() => setTimeout(() => setActivate(true), 1000), []);
    useEffect(() => setTimeout(() => setActivate(false), 2000), []);
    return (
      <Animator animator={{ activate }}>
        <ExampleChild />
      </Animator>
    );
  }

  render(<ExampleApp />);

  isFlow({ value: EXITED, [EXITED]: true, hasEntered: false, hasExited: true });

  // 1ms
  act(() => jest.advanceTimersByTime(1));
  isFlow({ value: EXITED, [EXITED]: true, hasEntered: false, hasExited: true });

  // 999ms
  act(() => jest.advanceTimersByTime(998));
  isFlow({ value: EXITED, [EXITED]: true, hasEntered: false, hasExited: true });

  // 1001ms
  act(() => jest.advanceTimersByTime(2));
  isFlow({ value: ENTERING, [ENTERING]: true, hasEntered: false, hasExited: true });

  // 1099ms
  act(() => jest.advanceTimersByTime(98));
  isFlow({ value: ENTERING, [ENTERING]: true, hasEntered: false, hasExited: true });

  // 1101ms
  act(() => jest.advanceTimersByTime(2));
  isFlow({ value: ENTERED, [ENTERED]: true, hasEntered: true, hasExited: true });

  // 1999ms
  act(() => jest.advanceTimersByTime(898));
  isFlow({ value: ENTERED, [ENTERED]: true, hasEntered: true, hasExited: true });

  // 2001ms
  act(() => jest.advanceTimersByTime(2));
  isFlow({ value: EXITING, [EXITING]: true, hasEntered: true, hasExited: true });

  // 2099ms
  act(() => jest.advanceTimersByTime(98));
  isFlow({ value: EXITING, [EXITING]: true, hasEntered: true, hasExited: true });

  // 2101ms
  act(() => jest.advanceTimersByTime(2));
  isFlow({ value: EXITED, [EXITED]: true, hasEntered: true, hasExited: true });
});

test('Should get notified "onTransition" with flow state object if provided', () => {
  const onTransition = jest.fn();
  const onNthWith = (time, value) => expect(onTransition).toHaveBeenNthCalledWith(time, value);

  function ExampleApp () {
    const [activate, setActivate] = useState(false);
    useEffect(() => setTimeout(() => setActivate(true), 1000), []);
    useEffect(() => setTimeout(() => setActivate(false), 2000), []);
    return <Animator animator={{ activate, onTransition }} />;
  }

  render(<ExampleApp />);

  expect(onTransition).toHaveBeenCalledTimes(1);
  onNthWith(1, { value: EXITED, [EXITED]: true, hasEntered: false, hasExited: true });

  // 1ms
  act(() => jest.advanceTimersByTime(1));
  expect(onTransition).toHaveBeenCalledTimes(1);

  // 999ms
  act(() => jest.advanceTimersByTime(998));
  expect(onTransition).toHaveBeenCalledTimes(1);

  // 1001ms
  act(() => jest.advanceTimersByTime(2));
  expect(onTransition).toHaveBeenCalledTimes(2);
  onNthWith(2, { value: ENTERING, [ENTERING]: true, hasEntered: false, hasExited: true });

  // 1099ms
  act(() => jest.advanceTimersByTime(98));
  expect(onTransition).toHaveBeenCalledTimes(2);

  // 1101ms
  act(() => jest.advanceTimersByTime(2));
  expect(onTransition).toHaveBeenCalledTimes(3);
  onNthWith(3, { value: ENTERED, [ENTERED]: true, hasEntered: true, hasExited: true });

  // 1999ms
  act(() => jest.advanceTimersByTime(898));
  expect(onTransition).toHaveBeenCalledTimes(3);

  // 2001ms
  act(() => jest.advanceTimersByTime(2));
  expect(onTransition).toHaveBeenCalledTimes(4);
  onNthWith(4, { value: EXITING, [EXITING]: true, hasEntered: true, hasExited: true });

  // 2099ms
  act(() => jest.advanceTimersByTime(98));
  expect(onTransition).toHaveBeenCalledTimes(4);

  // 2101ms
  act(() => jest.advanceTimersByTime(2));
  expect(onTransition).toHaveBeenCalledTimes(5);
  onNthWith(5, { value: EXITED, [EXITED]: true, hasEntered: true, hasExited: true });
});

test('Should not call "onTransition" if provided and "animate=false"', () => {
  const onTransition = jest.fn();
  render(<Animator animator={{ animate: false, onTransition }} />);
  expect(onTransition).not.toHaveBeenCalled();
});

test('Should still be the "root" even if configured "root=false" but no parent found', () => {
  let flow;
  function Example () {
    flow = useAnimator().flow;
    return null;
  }
  render(
    <Animator animator={{ root: false }}>
      <Example />
    </Animator>
  );

  expect(flow.value).toBe(EXITED);
  act(() => jest.advanceTimersByTime(1));
  expect(flow.value).toBe(ENTERING);
});

test('Should transition on "activate" changes with provided "duration" as object', () => {
  let flow;
  function ExampleChild () {
    flow = useAnimator().flow;
    return null;
  }

  function ExampleApp () {
    const [activate, setActivate] = useState(false);
    const duration = { enter: 400, exit: 200 };
    useEffect(() => setTimeout(() => setActivate(true), 1000), []);
    useEffect(() => setTimeout(() => setActivate(false), 2000), []);
    return (
      <Animator animator={{ activate, duration }}>
        <ExampleChild />
      </Animator>
    );
  }

  render(<ExampleApp />);

  expect(flow.value).toBe(EXITED);

  act(() => jest.advanceTimersByTime(1));
  expect(flow.value).toBe(EXITED);

  act(() => jest.advanceTimersByTime(998)); // 999ms
  expect(flow.value).toBe(EXITED);

  act(() => jest.advanceTimersByTime(2)); // 1001ms
  expect(flow.value).toBe(ENTERING);

  act(() => jest.advanceTimersByTime(398)); // 1399ms
  expect(flow.value).toBe(ENTERING);

  act(() => jest.advanceTimersByTime(2)); // 1401ms
  expect(flow.value).toBe(ENTERED);

  act(() => jest.advanceTimersByTime(598)); // 1999ms
  expect(flow.value).toBe(ENTERED);

  act(() => jest.advanceTimersByTime(2)); // 2001ms
  expect(flow.value).toBe(EXITING);

  act(() => jest.advanceTimersByTime(198)); // 2199ms
  expect(flow.value).toBe(EXITING);

  act(() => jest.advanceTimersByTime(2)); // 2201ms
  expect(flow.value).toBe(EXITED);
});

test('Should transition on "activate" changes with provided "duration" as number', () => {
  let flow;
  function ExampleChild () {
    flow = useAnimator().flow;
    return null;
  }

  function ExampleApp () {
    const [activate, setActivate] = useState(false);
    const duration = 300;
    useEffect(() => setTimeout(() => setActivate(true), 1000), []);
    useEffect(() => setTimeout(() => setActivate(false), 2000), []);
    return (
      <Animator animator={{ activate, duration }}>
        <ExampleChild />
      </Animator>
    );
  }

  render(<ExampleApp />);

  expect(flow.value).toBe(EXITED);

  act(() => jest.advanceTimersByTime(1));
  expect(flow.value).toBe(EXITED);

  act(() => jest.advanceTimersByTime(998)); // 999ms
  expect(flow.value).toBe(EXITED);

  act(() => jest.advanceTimersByTime(2)); // 1001ms
  expect(flow.value).toBe(ENTERING);

  act(() => jest.advanceTimersByTime(298)); // 1299ms
  expect(flow.value).toBe(ENTERING);

  act(() => jest.advanceTimersByTime(2)); // 1301ms
  expect(flow.value).toBe(ENTERED);

  act(() => jest.advanceTimersByTime(698)); // 1999ms
  expect(flow.value).toBe(ENTERED);

  act(() => jest.advanceTimersByTime(2)); // 2001ms
  expect(flow.value).toBe(EXITING);

  act(() => jest.advanceTimersByTime(298)); // 2299ms
  expect(flow.value).toBe(EXITING);

  act(() => jest.advanceTimersByTime(2)); // 2301ms
  expect(flow.value).toBe(EXITED);
});

test('Should delay transition from "exited" to "entering" if provided "duration.delay"', () => {
  let flow;
  function ExampleChild () {
    flow = useAnimator().flow;
    return null;
  }

  function ExampleApp () {
    const [activate, setActivate] = useState(false);
    const duration = { delay: 100 };
    useEffect(() => setTimeout(() => setActivate(true), 1000), []);
    useEffect(() => setTimeout(() => setActivate(false), 2000), []);
    return (
      <Animator animator={{ activate, duration }}>
        <ExampleChild />
      </Animator>
    );
  }

  render(<ExampleApp />);

  expect(flow.value).toBe(EXITED);

  act(() => jest.advanceTimersByTime(1));
  expect(flow.value).toBe(EXITED);

  act(() => jest.advanceTimersByTime(998)); // 999ms
  expect(flow.value).toBe(EXITED);

  act(() => jest.advanceTimersByTime(2)); // 1001ms
  expect(flow.value).toBe(EXITED);

  act(() => jest.advanceTimersByTime(98)); // 1099ms
  expect(flow.value).toBe(EXITED);

  act(() => jest.advanceTimersByTime(2)); // 1101ms
  expect(flow.value).toBe(ENTERING);

  act(() => jest.advanceTimersByTime(98)); // 1199ms
  expect(flow.value).toBe(ENTERING);

  act(() => jest.advanceTimersByTime(2)); // 1201ms
  expect(flow.value).toBe(ENTERED);

  act(() => jest.advanceTimersByTime(798)); // 1999ms
  expect(flow.value).toBe(ENTERED);

  act(() => jest.advanceTimersByTime(2)); // 2001ms
  expect(flow.value).toBe(EXITING);

  act(() => jest.advanceTimersByTime(98)); // 2099ms
  expect(flow.value).toBe(EXITING);

  act(() => jest.advanceTimersByTime(2)); // 2101ms
  expect(flow.value).toBe(EXITED);
});
