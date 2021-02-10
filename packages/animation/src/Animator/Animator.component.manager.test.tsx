/* eslint-env jest */

import React, { FC, useState, useEffect } from 'react';
import { render, cleanup } from '@testing-library/react';

import { makeJestMoveTimeTo } from '../../test-utils/makeJestMoveTimeTo';
import { ActJestMoveTimeTo, makeActJestMoveTimeTo } from '../../test-utils/makeActJestMoveTimeTo';
import {
  ENTERED,
  EXITED,
  EXITING,
  PARALLEL,
  STAGGER,
  SEQUENCE,
  AnimatorSettingsManagerCustom,
  AnimatorSettingsManager
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

[PARALLEL, STAGGER, SEQUENCE, 'custom'].forEach(managerTypeName => {
  const managerCustom: AnimatorSettingsManagerCustom = ({ nodes }) => ({
    times: nodes.map(node => ({ node, time: 100 }))
  });

  const manager = (managerTypeName === 'custom' ? managerCustom : managerTypeName) as AnimatorSettingsManager;

  test(`Should deactivate all children nodes in parallel when parent is EXITING in "manager=${managerTypeName}"`, () => {
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

    const Example: FC = () => {
      const [activate, setActivate] = useState(true);
      useEffect(() => {
        setTimeout(() => setActivate(false), 1000);
      }, []);
      return (
        <Animator animator={{ activate, manager }}>
          <ExampleParent />
          <Animator>
            <ExampleChild1 />
          </Animator>
          <Animator>
            <ExampleChild2 />
          </Animator>
        </Animator>
      );
    };
    render(<Example />);

    actJestMoveTimeTo(999);
    expect([f0, f1, f2]).toEqual([ENTERED, ENTERED, ENTERED]);

    actJestMoveTimeTo(1001);
    expect([f0, f1, f2]).toEqual([EXITING, EXITING, EXITING]);

    actJestMoveTimeTo(1099);
    expect([f0, f1, f2]).toEqual([EXITING, EXITING, EXITING]);

    actJestMoveTimeTo(1101);
    expect([f0, f1, f2]).toEqual([EXITED, EXITED, EXITED]);
  });
});

test('Should console.error() if manager is unknown', () => {
  const consoleError = jest.spyOn(console, 'error').mockImplementation();

  const manager: any = 'XXX';
  render(<Animator animator={{ manager }} />);

  actJestMoveTimeTo(1000);
  expect(consoleError).toHaveBeenCalledWith('Animator manager "XXX" is not supported.');

  consoleError.mockRestore();
});
