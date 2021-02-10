/* eslint-env jest */

import React, { FC, useState, useEffect } from 'react';
import { render, cleanup } from '@testing-library/react';

import { makeJestMoveTimeTo } from '../../test-utils/makeJestMoveTimeTo';
import { ActJestMoveTimeTo, makeActJestMoveTimeTo } from '../../test-utils/makeActJestMoveTimeTo';
import {
  ENTERED,
  ENTERING,
  EXITING,
  EXITED,
  STAGGER,
  SEQUENCE,
  AnimatorSettingsManagerCustom,
  AnimatorSettingsManagerStatus,
  AnimatorChildActivations
} from '../constants';
import { useAnimator } from '../useAnimator';
import { Animator } from './Animator.component';

let actJestMoveTimeTo: ActJestMoveTimeTo;

jest.useFakeTimers();

beforeEach(() => {
  const jestMoveTimeTo = makeJestMoveTimeTo();
  actJestMoveTimeTo = makeActJestMoveTimeTo(jestMoveTimeTo);
});

afterEach(cleanup);

test('Should parent node combine children (diverse) durations if "combine" and "manager=parallel" (this case also applies to all managers on EXITING)', () => {
  let f0: any;
  const ExampleParent: FC = () => {
    f0 = useAnimator()?.flow.value;
    return null;
  };
  let f1: any;
  const ExampleChild1: FC = () => {
    f1 = useAnimator()?.flow.value;
    return null;
  };
  let f2: any;
  const ExampleChild2: FC = () => {
    f2 = useAnimator()?.flow.value;
    return null;
  };
  let f3: any;
  const ExampleChild3: FC = () => {
    f3 = useAnimator()?.flow.value;
    return null;
  };

  const Example: FC = () => {
    const [activate, setActivate] = useState(true);
    useEffect(() => {
      setTimeout(() => setActivate(false), 1000);
    }, []);
    return (
      <Animator animator={{ activate, combine: true }}>
        <ExampleParent />
        <Animator animator={{ duration: { enter: 200, exit: 200 } }}>
          <ExampleChild1 />
        </Animator>
        <Animator animator={{ duration: { enter: 250, exit: 250 } }}>
          <ExampleChild2 />
        </Animator>
        <Animator animator={{ duration: { enter: 150, exit: 150 } }}>
          <ExampleChild3 />
        </Animator>
      </Animator>
    );
  };

  render(<Example />);

  expect([f0, f1, f2, f3]).toEqual([EXITED, EXITED, EXITED, EXITED]);

  actJestMoveTimeTo(1);
  expect([f0, f1, f2, f3]).toEqual([ENTERING, ENTERING, ENTERING, ENTERING]);

  actJestMoveTimeTo(151);
  expect([f0, f1, f2, f3]).toEqual([ENTERING, ENTERING, ENTERING, ENTERED]);

  actJestMoveTimeTo(201);
  expect([f0, f1, f2, f3]).toEqual([ENTERING, ENTERED, ENTERING, ENTERED]);

  // Just before the last child is ENTERED.
  actJestMoveTimeTo(249);
  expect([f0, f1, f2, f3]).toEqual([ENTERING, ENTERED, ENTERING, ENTERED]);

  actJestMoveTimeTo(251);
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERED, ENTERED, ENTERED]);

  actJestMoveTimeTo(999);
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERED, ENTERED, ENTERED]);

  actJestMoveTimeTo(1001);
  expect([f0, f1, f2, f3]).toEqual([EXITING, EXITING, EXITING, EXITING]);

  actJestMoveTimeTo(1151);
  expect([f0, f1, f2, f3]).toEqual([EXITING, EXITING, EXITING, EXITED]);

  actJestMoveTimeTo(1201);
  expect([f0, f1, f2, f3]).toEqual([EXITING, EXITED, EXITING, EXITED]);

  actJestMoveTimeTo(1251);
  expect([f0, f1, f2, f3]).toEqual([EXITED, EXITED, EXITED, EXITED]);
});

test('Should parent node combine children durations if "combine" and "manager=stagger"', () => {
  let f0: any;
  const ExampleParent: FC = () => {
    f0 = useAnimator()?.flow.value;
    return null;
  };
  let f1: any;
  const ExampleChild1: FC = () => {
    f1 = useAnimator()?.flow.value;
    return null;
  };
  let f2: any;
  const ExampleChild2: FC = () => {
    f2 = useAnimator()?.flow.value;
    return null;
  };
  let f3: any;
  const ExampleChild3: FC = () => {
    f3 = useAnimator()?.flow.value;
    return null;
  };

  const Example: FC = () => {
    const [activate, setActivate] = useState(true);
    useEffect(() => {
      setTimeout(() => setActivate(false), 1000);
    }, []);
    return (
      <Animator animator={{ activate, combine: true, manager: STAGGER }}>
        <ExampleParent />
        <Animator>
          <ExampleChild1 />
        </Animator>
        <Animator>
          <ExampleChild2 />
        </Animator>
        <Animator>
          <ExampleChild3 />
        </Animator>
      </Animator>
    );
  };

  render(<Example />);

  expect([f0, f1, f2, f3]).toEqual([EXITED, EXITED, EXITED, EXITED]);

  actJestMoveTimeTo(1);
  expect([f0, f1, f2, f3]).toEqual([ENTERING, ENTERING, EXITED, EXITED]);

  actJestMoveTimeTo(26);
  expect([f0, f1, f2, f3]).toEqual([ENTERING, ENTERING, ENTERING, EXITED]);

  actJestMoveTimeTo(51);
  expect([f0, f1, f2, f3]).toEqual([ENTERING, ENTERING, ENTERING, ENTERING]);

  // Just before the last child is ENTERED.
  actJestMoveTimeTo(149);
  expect([f0, f1, f2, f3]).toEqual([ENTERING, ENTERED, ENTERED, ENTERING]);

  actJestMoveTimeTo(151);
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERED, ENTERED, ENTERED]);

  actJestMoveTimeTo(999);
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERED, ENTERED, ENTERED]);

  actJestMoveTimeTo(1001);
  expect([f0, f1, f2, f3]).toEqual([EXITING, EXITING, EXITING, EXITING]);

  actJestMoveTimeTo(1101);
  expect([f0, f1, f2, f3]).toEqual([EXITED, EXITED, EXITED, EXITED]);
});

test('Should parent node combine children durations if "combine" and "manager=sequence"', () => {
  let f0: any;
  const ExampleParent: FC = () => {
    f0 = useAnimator()?.flow.value;
    return null;
  };
  let f1: any;
  const ExampleChild1: FC = () => {
    f1 = useAnimator()?.flow.value;
    return null;
  };
  let f2: any;
  const ExampleChild2: FC = () => {
    f2 = useAnimator()?.flow.value;
    return null;
  };
  let f3: any;
  const ExampleChild3: FC = () => {
    f3 = useAnimator()?.flow.value;
    return null;
  };

  const Example: FC = () => {
    const [activate, setActivate] = useState(true);
    useEffect(() => {
      setTimeout(() => setActivate(false), 1000);
    }, []);
    return (
      <Animator animator={{ activate, combine: true, manager: SEQUENCE }}>
        <ExampleParent />
        <Animator>
          <ExampleChild1 />
        </Animator>
        <Animator>
          <ExampleChild2 />
        </Animator>
        <Animator>
          <ExampleChild3 />
        </Animator>
      </Animator>
    );
  };

  render(<Example />);

  expect([f0, f1, f2, f3]).toEqual([EXITED, EXITED, EXITED, EXITED]);

  actJestMoveTimeTo(1);
  expect([f0, f1, f2, f3]).toEqual([ENTERING, ENTERING, EXITED, EXITED]);

  actJestMoveTimeTo(101);
  expect([f0, f1, f2, f3]).toEqual([ENTERING, ENTERED, ENTERING, EXITED]);

  actJestMoveTimeTo(201);
  expect([f0, f1, f2, f3]).toEqual([ENTERING, ENTERED, ENTERED, ENTERING]);

  // Just before the last child is ENTERED.
  actJestMoveTimeTo(299);
  expect([f0, f1, f2, f3]).toEqual([ENTERING, ENTERED, ENTERED, ENTERING]);

  actJestMoveTimeTo(301);
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERED, ENTERED, ENTERED]);

  actJestMoveTimeTo(999);
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERED, ENTERED, ENTERED]);

  actJestMoveTimeTo(1001);
  expect([f0, f1, f2, f3]).toEqual([EXITING, EXITING, EXITING, EXITING]);

  actJestMoveTimeTo(1101);
  expect([f0, f1, f2, f3]).toEqual([EXITED, EXITED, EXITED, EXITED]);
});

test('Should parent node combine children durations if "combine" and "manager" custom', () => {
  let f0: any;
  const ExampleParent: FC = () => {
    f0 = useAnimator()?.flow.value;
    return null;
  };
  let f1: any;
  const ExampleChild1: FC = () => {
    f1 = useAnimator()?.flow.value;
    return null;
  };
  let f2: any;
  const ExampleChild2: FC = () => {
    f2 = useAnimator()?.flow.value;
    return null;
  };
  let f3: any;
  const ExampleChild3: FC = () => {
    f3 = useAnimator()?.flow.value;
    return null;
  };

  const manager: AnimatorSettingsManagerCustom = (status: AnimatorSettingsManagerStatus): AnimatorChildActivations => ({
    duration: 500,
    times: status.nodes.map(node => ({ node, time: 50 }))
  });
  const Example: FC = () => {
    const [activate, setActivate] = useState(true);
    useEffect(() => {
      setTimeout(() => setActivate(false), 1000);
    }, []);
    return (
      <Animator animator={{ activate, combine: true, manager }}>
        <ExampleParent />
        <Animator>
          <ExampleChild1 />
        </Animator>
        <Animator>
          <ExampleChild2 />
        </Animator>
        <Animator>
          <ExampleChild3 />
        </Animator>
      </Animator>
    );
  };

  render(<Example />);

  expect([f0, f1, f2, f3]).toEqual([EXITED, EXITED, EXITED, EXITED]);

  actJestMoveTimeTo(1);
  expect([f0, f1, f2, f3]).toEqual([ENTERING, EXITED, EXITED, EXITED]);

  actJestMoveTimeTo(51);
  expect([f0, f1, f2, f3]).toEqual([ENTERING, ENTERING, ENTERING, ENTERING]);

  actJestMoveTimeTo(151);
  expect([f0, f1, f2, f3]).toEqual([ENTERING, ENTERED, ENTERED, ENTERED]);

  actJestMoveTimeTo(499);
  expect([f0, f1, f2, f3]).toEqual([ENTERING, ENTERED, ENTERED, ENTERED]);

  actJestMoveTimeTo(501);
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERED, ENTERED, ENTERED]);

  actJestMoveTimeTo(999);
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERED, ENTERED, ENTERED]);

  actJestMoveTimeTo(1001);
  expect([f0, f1, f2, f3]).toEqual([EXITING, EXITING, EXITING, EXITING]);

  actJestMoveTimeTo(1101);
  expect([f0, f1, f2, f3]).toEqual([EXITED, EXITED, EXITED, EXITED]);
});

test('Should console.log() manager total duration missing error if "combine" and "manager" custom does not provide child activations "duration"', () => {
  const consoleError = jest.spyOn(console, 'error').mockImplementation();

  // No total duration provided.
  const manager: AnimatorSettingsManagerCustom = (status: AnimatorSettingsManagerStatus): AnimatorChildActivations => ({
    duration: undefined,
    times: status.nodes.map(node => ({ node, time: 0 }))
  });
  render(
    <Animator animator={{ combine: true, manager }}>
      <Animator />
      <Animator />
      <Animator />
    </Animator>
  );
  actJestMoveTimeTo(1);
  expect(consoleError).toHaveBeenCalledWith(
    expect.stringMatching('Animator with custom "manager" and "combine" enabled should return')
  );

  consoleError.mockRestore();
});

test('Should console.log() error if updateDuration() is called if "combine"', () => {
  const consoleError = jest.spyOn(console, 'error').mockImplementation();

  const Example: FC = () => {
    useAnimator()?.updateDuration({ enter: 200 });
    return null;
  };
  render(
    <Animator animator={{ combine: true }}>
      <Example />
    </Animator>
  );
  actJestMoveTimeTo(1);
  expect(consoleError).toHaveBeenCalledWith(
    'Animator can not update duration dynamically when "combine" is enabled.'
  );

  consoleError.mockRestore();
});
