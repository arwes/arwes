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

test('Should call "onAnimateMount" with animator object and setup refs on <Animator/> mount', () => {
  let animator: any;
  const ExampleComponent: FC = () => {
    animator = useAnimator();
    animator?.setupAnimateRefs('x', 'y', 'z');
    return null;
  };
  const onAnimateMount = jest.fn();
  const ExampleApp: FC = () => {
    return (
      <Animator animator={{ onAnimateMount }}>
        <ExampleComponent />
      </Animator>
    );
  };
  render(<ExampleApp />);
  expect(onAnimateMount).toHaveBeenCalledTimes(1);
  expect(onAnimateMount).toHaveBeenCalledWith(
    expect.objectContaining({ flow: expect.objectContaining({ value: EXITED }) }),
    'x',
    'y',
    'z'
  );

  actJestMoveTimeTo(1000);
  expect(onAnimateMount).toHaveBeenCalledTimes(1);
});

test('Should call "onAnimateUnmount" with animator object and setup refs on <Animator/> unmount', () => {
  let animator: any;
  const ExampleComponent: FC = () => {
    animator = useAnimator();
    animator.setupAnimateRefs('x', 'y', 'z');
    return null;
  };
  const onAnimateUnmount = jest.fn();
  const ExampleApp: FC = () => {
    const [show, setShow] = useState(true);
    useEffect(() => {
      setTimeout(() => setShow(false), 1000);
    }, []);
    if (show) {
      return (
        <Animator animator={{ onAnimateUnmount }}>
          <ExampleComponent />
        </Animator>
      );
    }
    return null;
  };
  render(<ExampleApp />);

  expect(onAnimateUnmount).toHaveBeenCalledTimes(0);

  actJestMoveTimeTo(999);
  expect(onAnimateUnmount).toHaveBeenCalledTimes(0);

  actJestMoveTimeTo(1001);
  expect(onAnimateUnmount).toHaveBeenCalledTimes(1);
  expect(onAnimateUnmount).toHaveBeenCalledWith(
    expect.objectContaining({ flow: expect.objectContaining({ value: EXITED }) }),
    'x',
    'y',
    'z'
  );
});

test('Should call "onAnimateEntered" with animator object and setup refs on flow entered', () => {
  let animator: any;
  const ExampleComponent: FC = () => {
    animator = useAnimator();
    animator.setupAnimateRefs('x', 'y', 'z');
    return null;
  };
  const onAnimateEntered = jest.fn();
  const ExampleApp: FC = () => {
    const [activate, setActivate] = useState(false);
    useEffect(() => {
      setTimeout(() => setActivate(true), 1000);
    }, []);
    return (
      <Animator animator={{ activate, onAnimateEntered }}>
        <ExampleComponent />
      </Animator>
    );
  };
  render(<ExampleApp />);

  actJestMoveTimeTo(1099);
  expect(onAnimateEntered).toHaveBeenCalledTimes(0);

  actJestMoveTimeTo(1101);
  expect(onAnimateEntered).toHaveBeenCalledTimes(1);
  expect(onAnimateEntered).toHaveBeenCalledWith(
    expect.objectContaining({ flow: expect.objectContaining({ value: ENTERED }) }),
    'x',
    'y',
    'z'
  );
});

test('Should call "onAnimateEntering" with animator object and setup refs on flow entering', () => {
  let animator: any;
  const ExampleComponent: FC = () => {
    animator = useAnimator();
    animator.setupAnimateRefs('x', 'y', 'z');
    return null;
  };

  const onAnimateEntering = jest.fn();
  const ExampleApp: FC = () => {
    const [activate, setActivate] = useState(false);
    useEffect(() => {
      setTimeout(() => setActivate(true), 1000);
    }, []);
    return (
      <Animator animator={{ activate, onAnimateEntering }}>
        <ExampleComponent />
      </Animator>
    );
  };
  render(<ExampleApp />);

  actJestMoveTimeTo(999);
  expect(onAnimateEntering).toHaveBeenCalledTimes(0);

  actJestMoveTimeTo(1001);
  expect(onAnimateEntering).toHaveBeenCalledTimes(1);
  expect(onAnimateEntering).toHaveBeenCalledWith(
    expect.objectContaining({ flow: expect.objectContaining({ value: ENTERING }) }),
    'x',
    'y',
    'z'
  );

  actJestMoveTimeTo(2000);
  expect(onAnimateEntering).toHaveBeenCalledTimes(1);
});

test('Should call "onAnimateExiting" with animator object and setup refs on flow exiting', () => {
  let animator: any;
  const ExampleComponent: FC = () => {
    animator = useAnimator();
    animator.setupAnimateRefs('x', 'y', 'z');
    return null;
  };
  const onAnimateExiting = jest.fn();
  const ExampleApp: FC = () => {
    const [activate, setActivate] = useState(true);
    useEffect(() => {
      setTimeout(() => setActivate(false), 1000);
    }, []);
    return (
      <Animator animator={{ activate, onAnimateExiting }}>
        <ExampleComponent />
      </Animator>
    );
  };
  render(<ExampleApp />);

  actJestMoveTimeTo(999);
  expect(onAnimateExiting).toHaveBeenCalledTimes(0);

  actJestMoveTimeTo(1001);
  expect(onAnimateExiting).toHaveBeenCalledTimes(1);
  expect(onAnimateExiting).toHaveBeenCalledWith(
    expect.objectContaining({ flow: expect.objectContaining({ value: EXITING }) }),
    'x',
    'y',
    'z'
  );

  actJestMoveTimeTo(1101);
  expect(onAnimateExiting).toHaveBeenCalledTimes(1);
});

test('Should call "onAnimateExited" with animator object and setup refs on flow exited', () => {
  let animator: any;
  const ExampleComponent: FC = () => {
    animator = useAnimator();
    animator.setupAnimateRefs('x', 'y', 'z');
    return null;
  };
  const onAnimateExited = jest.fn();
  const ExampleApp: FC = () => {
    const [activate, setActivate] = useState(true);
    useEffect(() => {
      setTimeout(() => setActivate(false), 1000);
    }, []);
    return (
      <Animator animator={{ activate, onAnimateExited }}>
        <ExampleComponent />
      </Animator>
    );
  };
  render(<ExampleApp />);

  expect(onAnimateExited).toHaveBeenCalledTimes(1);
  expect(onAnimateExited).toHaveBeenCalledWith(
    expect.objectContaining({ flow: expect.objectContaining({ value: EXITED }) }),
    'x',
    'y',
    'z'
  );

  actJestMoveTimeTo(1099);
  expect(onAnimateExited).toHaveBeenCalledTimes(1);

  actJestMoveTimeTo(1101);
  expect(onAnimateExited).toHaveBeenCalledTimes(2);
  expect(onAnimateExited.mock.calls[1]).toEqual([
    expect.objectContaining({ flow: expect.objectContaining({ value: EXITED }) }),
    'x',
    'y',
    'z'
  ]);
});
