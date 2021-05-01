/* eslint-env jest */

import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Animator } from '@arwes/animator';
import anime from 'animejs';

import { makeJestMoveTimeTo } from '../../test-utils/makeJestMoveTimeTo';
import { ActJestMoveTimeTo, makeActJestMoveTimeTo } from '../../test-utils/makeActJestMoveTimeTo';
import { AnimatedSettingsTransitionFunction, Animated } from './Animated.component';

jest.useFakeTimers();
jest.mock('animejs');

let actJestMoveTimeTo: ActJestMoveTimeTo;

beforeEach(() => {
  (anime as any).mockReset();
  (anime as any).mockImplementation(() => {
    const mock: any = jest.fn();
    mock.remove = jest.fn();
    return mock;
  });

  const jestMoveTimeTo = makeJestMoveTimeTo();
  actJestMoveTimeTo = makeActJestMoveTimeTo(jestMoveTimeTo);
});

afterEach(cleanup);

describe('objects settings', () => {
  test('Should transition "animated.entering" with object setting', () => {
    const Example: React.FC = () => {
      const [activate, setActivate] = React.useState(false);

      React.useEffect(() => {
        const timeout = setTimeout(() => setActivate(true), 1000);
        return () => clearTimeout(timeout);
      }, []);

      return (
        <Animator animator={{ activate, duration: { enter: 127 } }}>
          <Animated
            animated={{
              entering: { opacity: 1 }
            }}
          />
        </Animator>
      );
    };

    const { container } = render(<Example />);
    const element = container.firstChild as HTMLDivElement;

    actJestMoveTimeTo(1);
    expect(anime).not.toHaveBeenCalled();

    actJestMoveTimeTo(1001);
    expect(anime).toHaveBeenCalledWith({
      targets: element,
      easing: 'easeOutSine',
      duration: 127,
      opacity: 1
    });
  });

  test('Should transition "animated.exiting" with object setting', () => {
    const Example: React.FC = () => {
      const [activate, setActivate] = React.useState(true);

      React.useEffect(() => {
        const timeout = setTimeout(() => setActivate(false), 1000);
        return () => clearTimeout(timeout);
      }, []);

      return (
        <Animator animator={{ activate, duration: { exit: 176 } }}>
          <Animated
            animated={{
              exiting: { width: 913 }
            }}
          />
        </Animator>
      );
    };
    const { container } = render(<Example />);
    const element = container.firstChild as HTMLDivElement;

    actJestMoveTimeTo(999);
    expect(anime).not.toHaveBeenCalled();

    actJestMoveTimeTo(1001);
    expect(anime).toHaveBeenCalledWith({
      targets: element,
      easing: 'easeOutSine',
      duration: 176,
      width: 913
    });
  });
});

describe('functions settings', () => {
  test('Should transition "animated.entering" with function setting', () => {
    const entering: AnimatedSettingsTransitionFunction = jest.fn();
    const Example: React.FC = () => {
      const [activate, setActivate] = React.useState(false);

      React.useEffect(() => {
        const timeout = setTimeout(() => setActivate(true), 1000);
        return () => clearTimeout(timeout);
      }, []);

      return (
        <Animator animator={{ activate, duration: { enter: 127 } }}>
          <Animated animated={{ entering }} />
        </Animator>
      );
    };

    const { container } = render(<Example />);
    const element = container.firstChild as HTMLDivElement;

    actJestMoveTimeTo(1);
    expect(entering).not.toHaveBeenCalled();

    actJestMoveTimeTo(1001);
    expect(entering).toHaveBeenCalledWith({
      targets: element,
      duration: 127
    });
  });

  test('Should transition "animated.exiting" with function setting', () => {
    const exiting: AnimatedSettingsTransitionFunction = jest.fn();
    const Example: React.FC = () => {
      const [activate, setActivate] = React.useState(true);

      React.useEffect(() => {
        const timeout = setTimeout(() => setActivate(false), 1000);
        return () => clearTimeout(timeout);
      }, []);

      return (
        <Animator animator={{ activate, duration: { exit: 814 } }}>
          <Animated animated={{ exiting }} />
        </Animator>
      );
    };

    const { container } = render(<Example />);
    const element = container.firstChild as HTMLDivElement;

    actJestMoveTimeTo(1);
    expect(exiting).not.toHaveBeenCalled();

    actJestMoveTimeTo(1001);
    expect(exiting).toHaveBeenCalledWith({
      targets: element,
      duration: 814
    });
  });
});

test.todo('Should transitions with "animated" object setting');
