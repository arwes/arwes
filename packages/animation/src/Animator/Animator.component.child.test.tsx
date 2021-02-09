/* eslint-env jest */

import React, { FC, useState, useEffect } from 'react';
import { render, cleanup } from '@testing-library/react';

import { makeJestMoveTimeTo } from '../../test-utils/makeJestMoveTimeTo';
import { ActJestMoveTimeTo, makeActJestMoveTimeTo } from '../../test-utils/makeActJestMoveTimeTo';
import { EXITED, EXITING, ENTERED, ENTERING } from '../constants';
import { AnimatorGeneralProvider } from '../AnimatorGeneralProvider';
import { useAnimator } from '../useAnimator';
import { Animator } from './Animator.component';

let actJestMoveTimeTo: ActJestMoveTimeTo;

jest.useFakeTimers();

beforeEach(() => {
  const jestMoveTimeTo = makeJestMoveTimeTo();
  actJestMoveTimeTo = makeActJestMoveTimeTo(jestMoveTimeTo);
});

afterEach(cleanup);

test('Should transition on "activate" changes', () => {
  let flow1: any;
  const ExampleParent: FC = () => {
    flow1 = useAnimator()?.flow.value;
    return null;
  };

  let flow2: any;
  const ExampleChild: FC = () => {
    flow2 = useAnimator()?.flow.value;
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
        <ExampleParent />
        <Animator>
          <ExampleChild />
        </Animator>
      </Animator>
    );
  };

  render(<ExampleApp />);

  expect(flow1).toBe(EXITED);
  expect(flow2).toBe(EXITED);

  actJestMoveTimeTo(1);
  expect(flow1).toBe(EXITED);
  expect(flow2).toBe(EXITED);

  actJestMoveTimeTo(999);
  expect(flow1).toBe(EXITED);
  expect(flow2).toBe(EXITED);

  actJestMoveTimeTo(1001);
  expect(flow1).toBe(ENTERING);
  expect(flow2).toBe(EXITED);

  actJestMoveTimeTo(1099);
  expect(flow1).toBe(ENTERING);
  expect(flow2).toBe(EXITED);

  actJestMoveTimeTo(1101);
  expect(flow1).toBe(ENTERED);
  expect(flow2).toBe(ENTERING);

  actJestMoveTimeTo(1199);
  expect(flow1).toBe(ENTERED);
  expect(flow2).toBe(ENTERING);

  actJestMoveTimeTo(1201);
  expect(flow1).toBe(ENTERED);
  expect(flow2).toBe(ENTERED);

  actJestMoveTimeTo(1999);
  expect(flow1).toBe(ENTERED);
  expect(flow2).toBe(ENTERED);

  actJestMoveTimeTo(2001);
  expect(flow1).toBe(EXITING);
  expect(flow2).toBe(EXITING);

  actJestMoveTimeTo(2099);
  expect(flow1).toBe(EXITING);
  expect(flow2).toBe(EXITING);

  actJestMoveTimeTo(2101);
  expect(flow1).toBe(EXITED);
  expect(flow2).toBe(EXITED);
});

test('Should not update flow if child node receives "activate"', () => {
  let flow1: any;
  const ExampleParent: FC = () => {
    flow1 = useAnimator()?.flow.value;
    return null;
  };

  let flow2: any;
  const ExampleChild: FC = () => {
    flow2 = useAnimator()?.flow.value;
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
  };

  render(<ExampleApp />);

  expect(flow1).toBe(EXITED);
  expect(flow2).toBe(EXITED);

  actJestMoveTimeTo(1);
  expect(flow1).toBe(EXITED);
  expect(flow2).toBe(EXITED);

  actJestMoveTimeTo(999);
  expect(flow1).toBe(EXITED);
  expect(flow2).toBe(EXITED);

  actJestMoveTimeTo(1001);
  expect(flow1).toBe(ENTERING);
  expect(flow2).toBe(EXITED);

  actJestMoveTimeTo(1099);
  expect(flow1).toBe(ENTERING);
  expect(flow2).toBe(EXITED);

  actJestMoveTimeTo(1101);
  expect(flow1).toBe(ENTERED);
  expect(flow2).toBe(ENTERING);

  actJestMoveTimeTo(1199);
  expect(flow1).toBe(ENTERED);
  expect(flow2).toBe(ENTERING);

  actJestMoveTimeTo(1201);
  expect(flow1).toBe(ENTERED);
  expect(flow2).toBe(ENTERED);

  actJestMoveTimeTo(1999);
  expect(flow1).toBe(ENTERED);
  expect(flow2).toBe(ENTERED);

  actJestMoveTimeTo(2001);
  expect(flow1).toBe(EXITING);
  expect(flow2).toBe(EXITING);

  actJestMoveTimeTo(2099);
  expect(flow1).toBe(EXITING);
  expect(flow2).toBe(EXITING);

  actJestMoveTimeTo(2101);
  expect(flow1).toBe(EXITED);
  expect(flow2).toBe(EXITED);
});

test('Should merge child flow with parent if "merge" defined', () => {
  let flow1: any;
  const ExampleParent: FC = () => {
    flow1 = useAnimator()?.flow.value;
    return null;
  };

  let flow2: any;
  const ExampleChild: FC = () => {
    flow2 = useAnimator()?.flow.value;
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
        <ExampleParent />
        <Animator animator={{ merge: true }}>
          <ExampleChild />
        </Animator>
      </Animator>
    );
  };

  render(<ExampleApp />);

  expect(flow1).toBe(EXITED);
  expect(flow2).toBe(EXITED);

  actJestMoveTimeTo(1);
  expect(flow1).toBe(EXITED);
  expect(flow2).toBe(EXITED);

  actJestMoveTimeTo(999);
  expect(flow1).toBe(EXITED);
  expect(flow2).toBe(EXITED);

  actJestMoveTimeTo(1001);
  expect(flow1).toBe(ENTERING);
  expect(flow2).toBe(ENTERING);

  actJestMoveTimeTo(1099);
  expect(flow1).toBe(ENTERING);
  expect(flow2).toBe(ENTERING);

  actJestMoveTimeTo(1101);
  expect(flow1).toBe(ENTERED);
  expect(flow2).toBe(ENTERED);

  actJestMoveTimeTo(1199);
  expect(flow1).toBe(ENTERED);
  expect(flow2).toBe(ENTERED);

  actJestMoveTimeTo(1201);
  expect(flow1).toBe(ENTERED);
  expect(flow2).toBe(ENTERED);

  actJestMoveTimeTo(1999);
  expect(flow1).toBe(ENTERED);
  expect(flow2).toBe(ENTERED);

  actJestMoveTimeTo(2001);
  expect(flow1).toBe(EXITING);
  expect(flow2).toBe(EXITING);

  actJestMoveTimeTo(2099);
  expect(flow1).toBe(EXITING);
  expect(flow2).toBe(EXITING);

  actJestMoveTimeTo(2101);
  expect(flow1).toBe(EXITED);
  expect(flow2).toBe(EXITED);
});

test('Should allow "animate=false" on child node', () => {
  let flow: any;
  const ExampleChild: FC = () => {
    flow = useAnimator()?.flow.value;
    return null;
  };

  const ExampleApp: FC = () => {
    return (
      <Animator>
        <Animator animator={{ animate: false }}>
          <ExampleChild />
        </Animator>
      </Animator>
    );
  };

  render(<ExampleApp />);

  expect(flow).toBe(ENTERED);
  actJestMoveTimeTo(1);
  expect(flow).toBe(ENTERED);
});

test('Should inherit "animate=false" setting from parent node', () => {
  let flow: any;
  const ExampleChild: FC = () => {
    flow = useAnimator()?.flow.value;
    return null;
  };
  render(
    <Animator animator={{ animate: false }}>
      <Animator>
        <ExampleChild />
      </Animator>
    </Animator>
  );
  expect(flow).toBe(ENTERED);
  actJestMoveTimeTo(1);
  expect(flow).toBe(ENTERED);
});

test('Should inherit "duration" setting from parent provider', () => {
  let animator: any;
  const ExampleChild: FC = () => {
    animator = useAnimator();
    return null;
  };
  render(
    <AnimatorGeneralProvider animator={{ duration: { enter: 300, exit: 300 } }}>
      <Animator>
        <ExampleChild />
      </Animator>
    </AnimatorGeneralProvider>
  );
  expect(animator.duration).toMatchObject({ enter: 300, exit: 300 });
});
