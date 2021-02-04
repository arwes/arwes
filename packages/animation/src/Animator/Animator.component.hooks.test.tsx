/* eslint-env jest */

import React, { FC, useState, useEffect } from 'react';
import { render, cleanup } from '@testing-library/react';

import { makeJestMoveTimeTo } from '../../test-utils/makeJestMoveTimeTo';
import { ActJestMoveTimeTo, makeActJestMoveTimeTo } from '../../test-utils/makeActJestMoveTimeTo';
import { EXITED, EXITING, ENTERED, ENTERING } from '../constants';
import { useAnimator } from '../useAnimator';
import { Animator } from './Animator.component';

let actJestMoveTimeTo: ActJestMoveTimeTo;

jest.useFakeTimers();

beforeEach(() => {
  const jestMoveTimeTo = makeJestMoveTimeTo();
  actJestMoveTimeTo = makeActJestMoveTimeTo(jestMoveTimeTo);
});

afterEach(cleanup);

test('Should call "useAnimateMount" with animator object and setup refs on <Animator/> mount', () => {
  let animator: any;
  const ExampleComponent: FC = () => {
    animator = useAnimator();
    animator?.setupAnimateRefs('x', 'y', 'z');
    return null;
  };
  const useAnimateMount = jest.fn();
  const ExampleApp: FC = () => {
    return (
      <Animator animator={{ useAnimateMount }}>
        <ExampleComponent />
      </Animator>
    );
  };
  render(<ExampleApp />);
  expect(useAnimateMount).toHaveBeenCalledTimes(1);
  expect(useAnimateMount).toHaveBeenCalledWith(
    expect.objectContaining({ flow: expect.objectContaining({ value: EXITED }) }),
    'x',
    'y',
    'z'
  );

  actJestMoveTimeTo(1000);
  expect(useAnimateMount).toHaveBeenCalledTimes(1);
});

test('Should call "useAnimateUnmount" with animator object and setup refs on <Animator/> unmount', () => {
  let animator: any;
  const ExampleComponent: FC = () => {
    animator = useAnimator();
    animator.setupAnimateRefs('x', 'y', 'z');
    return null;
  };
  const useAnimateUnmount = jest.fn();
  const ExampleApp: FC = () => {
    const [show, setShow] = useState(true);
    useEffect(() => {
      setTimeout(() => setShow(false), 1000);
    }, []);
    if (show) {
      return (
        <Animator animator={{ useAnimateUnmount }}>
          <ExampleComponent />
        </Animator>
      );
    }
    return null;
  };
  render(<ExampleApp />);

  expect(useAnimateUnmount).toHaveBeenCalledTimes(0);

  actJestMoveTimeTo(999);
  expect(useAnimateUnmount).toHaveBeenCalledTimes(0);

  actJestMoveTimeTo(1001);
  expect(useAnimateUnmount).toHaveBeenCalledTimes(1);
  expect(useAnimateUnmount).toHaveBeenCalledWith(
    expect.objectContaining({ flow: expect.objectContaining({ value: EXITED }) }),
    'x',
    'y',
    'z'
  );
});

test('Should call "useAnimateEntered" with animator object and setup refs on flow entered', () => {
  let animator: any;
  const ExampleComponent: FC = () => {
    animator = useAnimator();
    animator.setupAnimateRefs('x', 'y', 'z');
    return null;
  };
  const useAnimateEntered = jest.fn();
  const ExampleApp: FC = () => {
    const [activate, setActivate] = useState(false);
    useEffect(() => {
      setTimeout(() => setActivate(true), 1000);
    }, []);
    return (
      <Animator animator={{ activate, useAnimateEntered }}>
        <ExampleComponent />
      </Animator>
    );
  };
  render(<ExampleApp />);

  actJestMoveTimeTo(1099);
  expect(useAnimateEntered).toHaveBeenCalledTimes(0);

  actJestMoveTimeTo(1101);
  expect(useAnimateEntered).toHaveBeenCalledTimes(1);
  expect(useAnimateEntered).toHaveBeenCalledWith(
    expect.objectContaining({ flow: expect.objectContaining({ value: ENTERED }) }),
    'x',
    'y',
    'z'
  );
});

test('Should call "useAnimateEntering" with animator object and setup refs on flow entering', () => {
  let animator: any;
  const ExampleComponent: FC = () => {
    animator = useAnimator();
    animator.setupAnimateRefs('x', 'y', 'z');
    return null;
  };

  const useAnimateEntering = jest.fn();
  const ExampleApp: FC = () => {
    const [activate, setActivate] = useState(false);
    useEffect(() => {
      setTimeout(() => setActivate(true), 1000);
    }, []);
    return (
      <Animator animator={{ activate, useAnimateEntering }}>
        <ExampleComponent />
      </Animator>
    );
  };
  render(<ExampleApp />);

  actJestMoveTimeTo(999);
  expect(useAnimateEntering).toHaveBeenCalledTimes(0);

  actJestMoveTimeTo(1001);
  expect(useAnimateEntering).toHaveBeenCalledTimes(1);
  expect(useAnimateEntering).toHaveBeenCalledWith(
    expect.objectContaining({ flow: expect.objectContaining({ value: ENTERING }) }),
    'x',
    'y',
    'z'
  );

  actJestMoveTimeTo(2000);
  expect(useAnimateEntering).toHaveBeenCalledTimes(1);
});

test('Should call "useAnimateExiting" with animator object and setup refs on flow exiting', () => {
  let animator: any;
  const ExampleComponent: FC = () => {
    animator = useAnimator();
    animator.setupAnimateRefs('x', 'y', 'z');
    return null;
  };
  const useAnimateExiting = jest.fn();
  const ExampleApp: FC = () => {
    const [activate, setActivate] = useState(true);
    useEffect(() => {
      setTimeout(() => setActivate(false), 1000);
    }, []);
    return (
      <Animator animator={{ activate, useAnimateExiting }}>
        <ExampleComponent />
      </Animator>
    );
  };
  render(<ExampleApp />);

  actJestMoveTimeTo(999);
  expect(useAnimateExiting).toHaveBeenCalledTimes(0);

  actJestMoveTimeTo(1001);
  expect(useAnimateExiting).toHaveBeenCalledTimes(1);
  expect(useAnimateExiting).toHaveBeenCalledWith(
    expect.objectContaining({ flow: expect.objectContaining({ value: EXITING }) }),
    'x',
    'y',
    'z'
  );

  actJestMoveTimeTo(1101);
  expect(useAnimateExiting).toHaveBeenCalledTimes(1);
});

test('Should call "useAnimateExited" with animator object and setup refs on flow exited', () => {
  let animator: any;
  const ExampleComponent: FC = () => {
    animator = useAnimator();
    animator.setupAnimateRefs('x', 'y', 'z');
    return null;
  };
  const useAnimateExited = jest.fn();
  const ExampleApp: FC = () => {
    const [activate, setActivate] = useState(true);
    useEffect(() => {
      setTimeout(() => setActivate(false), 1000);
    }, []);
    return (
      <Animator animator={{ activate, useAnimateExited }}>
        <ExampleComponent />
      </Animator>
    );
  };
  render(<ExampleApp />);

  expect(useAnimateExited).toHaveBeenCalledTimes(1);
  expect(useAnimateExited).toHaveBeenCalledWith(
    expect.objectContaining({ flow: expect.objectContaining({ value: EXITED }) }),
    'x',
    'y',
    'z'
  );

  actJestMoveTimeTo(1099);
  expect(useAnimateExited).toHaveBeenCalledTimes(1);

  actJestMoveTimeTo(1101);
  expect(useAnimateExited).toHaveBeenCalledTimes(2);
  expect(useAnimateExited.mock.calls[1]).toEqual([
    expect.objectContaining({ flow: expect.objectContaining({ value: EXITED }) }),
    'x',
    'y',
    'z'
  ]);
});
