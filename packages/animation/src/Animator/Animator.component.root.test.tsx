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

test('Should transition from "exited" to "entering" if "activate" with default "duration" (by default)', () => {
  let flow: any;
  const Example: FC = () => {
    flow = useAnimator()?.flow;
    return null;
  };
  render(<Animator><Example /></Animator>);

  expect(flow.value).toBe(EXITED);

  actJestMoveTimeTo(1);
  expect(flow.value).toBe(ENTERING);

  actJestMoveTimeTo(99);
  expect(flow.value).toBe(ENTERING);

  actJestMoveTimeTo(101);
  expect(flow.value).toBe(ENTERED);
});

test('Should not transition from "exited" if "activate=false"', () => {
  let flow: any;
  const Example: FC = () => {
    flow = useAnimator()?.flow;
    return null;
  };
  render(
    <Animator animator={{ activate: false }}>
      <Example />
    </Animator>
  );

  expect(flow.value).toBe(EXITED);

  actJestMoveTimeTo(10);
  expect(flow.value).toBe(EXITED);

  actJestMoveTimeTo(110);
  expect(flow.value).toBe(EXITED);
});

test('Should transition on "activate" changes with default "duration"', () => {
  let flow: any;
  const ExampleChild: FC = () => {
    flow = useAnimator()?.flow;
    return null;
  };
  const ExampleApp: FC = () => {
    const [activate, setActivate] = useState(false);
    useEffect(() => {
      setTimeout(() => setActivate(true), 500);
      setTimeout(() => setActivate(false), 1000);
    }, []);
    return (
      <Animator animator={{ activate }}>
        <ExampleChild />
      </Animator>
    );
  };
  render(<ExampleApp />);

  expect(flow.value).toBe(EXITED);

  actJestMoveTimeTo(1);
  expect(flow.value).toBe(EXITED);

  actJestMoveTimeTo(499);
  expect(flow.value).toBe(EXITED);

  actJestMoveTimeTo(501);
  expect(flow.value).toBe(ENTERING);

  actJestMoveTimeTo(599);
  expect(flow.value).toBe(ENTERING);

  actJestMoveTimeTo(601);
  expect(flow.value).toBe(ENTERED);

  actJestMoveTimeTo(999);
  expect(flow.value).toBe(ENTERED);

  actJestMoveTimeTo(1001);
  expect(flow.value).toBe(EXITING);

  actJestMoveTimeTo(1099);
  expect(flow.value).toBe(EXITING);

  actJestMoveTimeTo(1101);
  expect(flow.value).toBe(EXITED);
});

test('Should receive flow state object when transitioning', () => {
  let flowReceived: any;
  const isFlow = (flowExpected: any): void => expect(flowReceived).toEqual(flowExpected);
  const ExampleChild: FC = () => {
    flowReceived = useAnimator()?.flow;
    return null;
  };
  const ExampleApp: FC = () => {
    const [activate, setActivate] = useState(false);
    useEffect(() => {
      setTimeout(() => setActivate(true), 1000);
      setTimeout(() => setActivate(false), 2000);
    }, []);
    return (
      <Animator animator={{ activate }}>
        <ExampleChild />
      </Animator>
    );
  };
  render(<ExampleApp />);

  isFlow({ value: EXITED, [EXITED]: true, hasEntered: false, hasExited: true });

  actJestMoveTimeTo(1);
  isFlow({ value: EXITED, [EXITED]: true, hasEntered: false, hasExited: true });

  actJestMoveTimeTo(999);
  isFlow({ value: EXITED, [EXITED]: true, hasEntered: false, hasExited: true });

  actJestMoveTimeTo(1001);
  isFlow({ value: ENTERING, [ENTERING]: true, hasEntered: false, hasExited: true });

  actJestMoveTimeTo(1099);
  isFlow({ value: ENTERING, [ENTERING]: true, hasEntered: false, hasExited: true });

  actJestMoveTimeTo(1101);
  isFlow({ value: ENTERED, [ENTERED]: true, hasEntered: true, hasExited: true });

  actJestMoveTimeTo(1999);
  isFlow({ value: ENTERED, [ENTERED]: true, hasEntered: true, hasExited: true });

  actJestMoveTimeTo(2001);
  isFlow({ value: EXITING, [EXITING]: true, hasEntered: true, hasExited: true });

  actJestMoveTimeTo(2099);
  isFlow({ value: EXITING, [EXITING]: true, hasEntered: true, hasExited: true });

  actJestMoveTimeTo(2101);
  isFlow({ value: EXITED, [EXITED]: true, hasEntered: true, hasExited: true });
});

test('Should get notified "onTransition" with flow state object if provided', () => {
  const onTransition = jest.fn();
  const onNthWith = (time: number, value: any): void => expect(onTransition).toHaveBeenNthCalledWith(time, value);
  const ExampleApp: FC = () => {
    const [activate, setActivate] = useState(false);
    useEffect(() => {
      setTimeout(() => setActivate(true), 1000);
      setTimeout(() => setActivate(false), 2000);
    }, []);
    return <Animator animator={{ activate, onTransition }} />;
  };
  render(<ExampleApp />);

  expect(onTransition).toHaveBeenCalledTimes(1);
  onNthWith(1, { value: EXITED, [EXITED]: true, hasEntered: false, hasExited: true });

  actJestMoveTimeTo(1);
  expect(onTransition).toHaveBeenCalledTimes(1);

  actJestMoveTimeTo(999);
  expect(onTransition).toHaveBeenCalledTimes(1);

  actJestMoveTimeTo(1001);
  expect(onTransition).toHaveBeenCalledTimes(2);
  onNthWith(2, { value: ENTERING, [ENTERING]: true, hasEntered: false, hasExited: true });

  actJestMoveTimeTo(1099);
  expect(onTransition).toHaveBeenCalledTimes(2);

  actJestMoveTimeTo(1101);
  expect(onTransition).toHaveBeenCalledTimes(3);
  onNthWith(3, { value: ENTERED, [ENTERED]: true, hasEntered: true, hasExited: true });

  actJestMoveTimeTo(1999);
  expect(onTransition).toHaveBeenCalledTimes(3);

  actJestMoveTimeTo(2001);
  expect(onTransition).toHaveBeenCalledTimes(4);
  onNthWith(4, { value: EXITING, [EXITING]: true, hasEntered: true, hasExited: true });

  actJestMoveTimeTo(2099);
  expect(onTransition).toHaveBeenCalledTimes(4);

  actJestMoveTimeTo(2101);
  expect(onTransition).toHaveBeenCalledTimes(5);
  onNthWith(5, { value: EXITED, [EXITED]: true, hasEntered: true, hasExited: true });
});

test('Should not call "onTransition" if provided and "animate=false"', () => {
  const onTransition = jest.fn();
  render(<Animator animator={{ animate: false, onTransition }} />);
  actJestMoveTimeTo(1000);
  expect(onTransition).not.toHaveBeenCalled();
});

test('Should still be the "root" even if configured "root=false" but no parent found', () => {
  let flow: any;
  const Example: FC = () => {
    flow = useAnimator()?.flow;
    return null;
  };
  render(
    <Animator animator={{ root: false }}>
      <Example />
    </Animator>
  );

  expect(flow.value).toBe(EXITED);
  actJestMoveTimeTo(1);
  expect(flow.value).toBe(ENTERING);
});

test('Should transition on "activate" changes with provided "duration"', () => {
  let flow: any;
  const ExampleChild: FC = () => {
    flow = useAnimator()?.flow;
    return null;
  };
  const ExampleApp: FC = () => {
    const [activate, setActivate] = useState(false);
    const duration = { enter: 400, exit: 200 };
    useEffect(() => {
      setTimeout(() => setActivate(true), 1000);
      setTimeout(() => setActivate(false), 2000);
    }, []);
    return (
      <Animator animator={{ activate, duration }}>
        <ExampleChild />
      </Animator>
    );
  };
  render(<ExampleApp />);

  expect(flow.value).toBe(EXITED);

  actJestMoveTimeTo(1);
  expect(flow.value).toBe(EXITED);

  actJestMoveTimeTo(999);
  expect(flow.value).toBe(EXITED);

  actJestMoveTimeTo(1001);
  expect(flow.value).toBe(ENTERING);

  actJestMoveTimeTo(1399);
  expect(flow.value).toBe(ENTERING);

  actJestMoveTimeTo(1401);
  expect(flow.value).toBe(ENTERED);

  actJestMoveTimeTo(1999);
  expect(flow.value).toBe(ENTERED);

  actJestMoveTimeTo(2001);
  expect(flow.value).toBe(EXITING);

  actJestMoveTimeTo(2199);
  expect(flow.value).toBe(EXITING);

  actJestMoveTimeTo(2201);
  expect(flow.value).toBe(EXITED);
});

test('Should delay transition from "exited" to "entering" if provided "duration.delay"', () => {
  let flow: any;
  const ExampleChild: FC = () => {
    flow = useAnimator()?.flow;
    return null;
  };
  const ExampleApp: FC = () => {
    const [activate, setActivate] = useState(false);
    const duration = { delay: 100 };
    useEffect(() => {
      setTimeout(() => setActivate(true), 1000);
      setTimeout(() => setActivate(false), 2000);
    }, []);
    return (
      <Animator animator={{ activate, duration }}>
        <ExampleChild />
      </Animator>
    );
  };
  render(<ExampleApp />);

  expect(flow.value).toBe(EXITED);

  actJestMoveTimeTo(1);
  expect(flow.value).toBe(EXITED);

  actJestMoveTimeTo(999);
  expect(flow.value).toBe(EXITED);

  actJestMoveTimeTo(1001);
  expect(flow.value).toBe(EXITED);

  actJestMoveTimeTo(1099);
  expect(flow.value).toBe(EXITED);

  actJestMoveTimeTo(1101);
  expect(flow.value).toBe(ENTERING);

  actJestMoveTimeTo(1199);
  expect(flow.value).toBe(ENTERING);

  actJestMoveTimeTo(1201);
  expect(flow.value).toBe(ENTERED);

  actJestMoveTimeTo(1999);
  expect(flow.value).toBe(ENTERED);

  actJestMoveTimeTo(2001);
  expect(flow.value).toBe(EXITING);

  actJestMoveTimeTo(2099);
  expect(flow.value).toBe(EXITING);

  actJestMoveTimeTo(2101);
  expect(flow.value).toBe(EXITED);
});

test('Should transition even with zero durations', () => {
  let flow: any;
  const ExampleChild: FC = () => {
    flow = useAnimator()?.flow;
    return null;
  };
  const ExampleApp: FC = () => {
    const [activate, setActivate] = useState(false);
    const duration = { enter: 0, exit: 0 };
    useEffect(() => {
      setTimeout(() => setActivate(true), 1000);
      setTimeout(() => setActivate(false), 2000);
    }, []);
    return (
      <Animator animator={{ activate, duration }}>
        <ExampleChild />
      </Animator>
    );
  };
  render(<ExampleApp />);

  expect(flow.value).toBe(EXITED);

  actJestMoveTimeTo(1);
  expect(flow.value).toBe(EXITED);

  actJestMoveTimeTo(999);
  expect(flow.value).toBe(EXITED);

  // At 1000ms it is supposed to change to ENTERING and immediately to ENTERED.

  actJestMoveTimeTo(1001);
  expect(flow.value).toBe(ENTERED);

  actJestMoveTimeTo(1999);
  expect(flow.value).toBe(ENTERED);

  // At 2000ms it is supposed to change to EXITING and immediately to EXITED.

  actJestMoveTimeTo(2001);
  expect(flow.value).toBe(EXITED);
});

test('Should imperatively update duration', () => {
  let flow: any;
  let duration: any;
  const ExampleChild: FC = () => {
    const animator = useAnimator();
    flow = animator?.flow;
    duration = animator?.duration;
    useEffect(() => {
      animator?.updateDuration({ enter: 500, exit: 500 });
    }, []);
    return null;
  };
  render(
    <Animator>
      <ExampleChild />
    </Animator>
  );

  expect(flow.value).toBe(EXITED);
  expect(duration).toMatchObject({ enter: 500, exit: 500 });

  actJestMoveTimeTo(1);
  expect(flow.value).toBe(ENTERING);

  actJestMoveTimeTo(499);
  expect(flow.value).toBe(ENTERING);

  actJestMoveTimeTo(501);
  expect(flow.value).toBe(ENTERED);
});
