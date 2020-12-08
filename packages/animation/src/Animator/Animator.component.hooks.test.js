/* eslint-env jest */

import React, { useState, useEffect } from 'react';
import { render, act, cleanup } from '@testing-library/react';

import { makeMoveTimeTo } from '../../test/makeMoveTimeTo';
import { EXITED, EXITING, ENTERED, ENTERING } from '../constants';
import { useAnimator } from '../useAnimator';
import { Component as Animator } from './Animator.component';

let moveTimeTo;

jest.useFakeTimers();

beforeEach(() => {
  moveTimeTo = makeMoveTimeTo();
});

afterEach(() => {
  moveTimeTo = null;
  cleanup();
});

test('Should call "useAnimateMount" with animator object and setup refs on <Animator/> mount', () => {
  let animator;
  function ExampleComponent () {
    animator = useAnimator();
    animator.setupAnimateRefs('xxx');
    return null;
  }

  const useAnimateMount = jest.fn();
  function ExampleApp () {
    return (
      <Animator animator={{ useAnimateMount }}>
        <ExampleComponent />
      </Animator>
    );
  }
  render(<ExampleApp />);
  expect(useAnimateMount).toHaveBeenCalledTimes(1);
  expect(useAnimateMount).toHaveBeenCalledWith(
    expect.objectContaining({ flow: expect.objectContaining({ value: EXITED }) }),
    'xxx'
  );

  act(() => moveTimeTo(1000));
  expect(useAnimateMount).toHaveBeenCalledTimes(1);
});

test('Should call "useAnimateUnmount" with animator object and setup refs on <Animator/> unmount', () => {
  let animator;
  function ExampleComponent () {
    animator = useAnimator();
    animator.setupAnimateRefs('xxx');
    return null;
  }

  const useAnimateUnmount = jest.fn();
  function ExampleApp () {
    const [show, setShow] = useState(true);
    useEffect(() => setTimeout(() => setShow(false), 1000), []);
    return (
      show && (
        <Animator animator={{ useAnimateUnmount }}>
          <ExampleComponent />
        </Animator>
      )
    );
  }
  render(<ExampleApp />);

  expect(useAnimateUnmount).toHaveBeenCalledTimes(0);

  act(() => moveTimeTo(999));
  expect(useAnimateUnmount).toHaveBeenCalledTimes(0);

  act(() => moveTimeTo(1001));
  expect(useAnimateUnmount).toHaveBeenCalledTimes(1);
  expect(useAnimateUnmount).toHaveBeenCalledWith(
    expect.objectContaining({ flow: expect.objectContaining({ value: EXITED }) }),
    'xxx'
  );
});

test('Should call "useAnimateEntered" with animator object and setup refs on flow entered', () => {
  let animator;
  function ExampleComponent () {
    animator = useAnimator();
    animator.setupAnimateRefs('xxx');
    return null;
  }

  const useAnimateEntered = jest.fn();
  function ExampleApp () {
    const [activate, setActivate] = useState(false);
    useEffect(() => setTimeout(() => setActivate(true), 1000), []);
    return (
      <Animator animator={{ activate, useAnimateEntered }}>
        <ExampleComponent />
      </Animator>
    );
  }
  render(<ExampleApp />);

  act(() => moveTimeTo(1099));
  expect(useAnimateEntered).toHaveBeenCalledTimes(0);

  act(() => moveTimeTo(1101));
  expect(useAnimateEntered).toHaveBeenCalledTimes(1);
  expect(useAnimateEntered).toHaveBeenCalledWith(
    expect.objectContaining({ flow: expect.objectContaining({ value: ENTERED }) }),
    'xxx'
  );
});

test('Should call "useAnimateEntering" with animator object and setup refs on flow entering', () => {
  let animator;
  function ExampleComponent () {
    animator = useAnimator();
    animator.setupAnimateRefs('xxx');
    return null;
  }

  const useAnimateEntering = jest.fn();
  function ExampleApp () {
    const [activate, setActivate] = useState(false);
    useEffect(() => setTimeout(() => setActivate(true), 1000), []);
    return (
      <Animator animator={{ activate, useAnimateEntering }}>
        <ExampleComponent />
      </Animator>
    );
  }
  render(<ExampleApp />);

  act(() => moveTimeTo(999));
  expect(useAnimateEntering).toHaveBeenCalledTimes(0);

  act(() => moveTimeTo(1001));
  expect(useAnimateEntering).toHaveBeenCalledTimes(1);
  expect(useAnimateEntering).toHaveBeenCalledWith(
    expect.objectContaining({ flow: expect.objectContaining({ value: ENTERING }) }),
    'xxx'
  );

  act(() => moveTimeTo(2000));
  expect(useAnimateEntering).toHaveBeenCalledTimes(1);
});

test('Should call "useAnimateExiting" with animator object and setup refs on flow exiting', () => {
  let animator;
  function ExampleComponent () {
    animator = useAnimator();
    animator.setupAnimateRefs('xxx');
    return null;
  }

  const useAnimateExiting = jest.fn();
  function ExampleApp () {
    const [activate, setActivate] = useState(true);
    useEffect(() => setTimeout(() => setActivate(false), 1000), []);
    return (
      <Animator animator={{ activate, useAnimateExiting }}>
        <ExampleComponent />
      </Animator>
    );
  }
  render(<ExampleApp />);

  act(() => moveTimeTo(999));
  expect(useAnimateExiting).toHaveBeenCalledTimes(0);

  act(() => moveTimeTo(1001));
  expect(useAnimateExiting).toHaveBeenCalledTimes(1);
  expect(useAnimateExiting).toHaveBeenCalledWith(
    expect.objectContaining({ flow: expect.objectContaining({ value: EXITING }) }),
    'xxx'
  );

  act(() => moveTimeTo(1101));
  expect(useAnimateExiting).toHaveBeenCalledTimes(1);
});

test('Should call "useAnimateExited" with animator object and setup refs on flow exited', () => {
  let animator;
  function ExampleComponent () {
    animator = useAnimator();
    animator.setupAnimateRefs('xxx');
    return null;
  }

  const useAnimateExited = jest.fn();
  function ExampleApp () {
    const [activate, setActivate] = useState(true);
    useEffect(() => setTimeout(() => setActivate(false), 1000), []);
    return (
      <Animator animator={{ activate, useAnimateExited }}>
        <ExampleComponent />
      </Animator>
    );
  }
  render(<ExampleApp />);

  expect(useAnimateExited).toHaveBeenCalledTimes(1);
  expect(useAnimateExited).toHaveBeenCalledWith(
    expect.objectContaining({ flow: expect.objectContaining({ value: EXITED }) }),
    'xxx'
  );

  act(() => moveTimeTo(1099));
  expect(useAnimateExited).toHaveBeenCalledTimes(1);

  act(() => moveTimeTo(1101));
  expect(useAnimateExited).toHaveBeenCalledTimes(2);
  expect(useAnimateExited.mock.calls[1]).toEqual([
    expect.objectContaining({ flow: expect.objectContaining({ value: EXITED }) }),
    'xxx'
  ]);
});
