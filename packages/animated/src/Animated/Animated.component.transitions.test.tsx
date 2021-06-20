/* eslint-env jest */

import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Animator } from '@arwes/animator';
import anime from 'animejs';

import { makeJestMoveTimeTo } from '../../test-utils/makeJestMoveTimeTo';
import { ActJestMoveTimeTo, makeActJestMoveTimeTo } from '../../test-utils/makeActJestMoveTimeTo';

import { AnimatedSettings, AnimatedSettingsTransitionFunction } from '../constants';
import { Animated } from './Animated.component';

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

describe('Objects Settings', () => {
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

    actJestMoveTimeTo(999);
    expect(anime).not.toHaveBeenCalled();

    actJestMoveTimeTo(1001);
    expect(anime).toHaveBeenCalledWith({
      targets: element,
      easing: 'easeOutSine',
      duration: 127,
      opacity: 1
    });
  });

  test('Should transition "animated.entered" with object setting', () => {
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
              entered: { width: 100 }
            }}
          />
        </Animator>
      );
    };

    const { container } = render(<Example />);
    const element = container.firstChild as HTMLDivElement;

    actJestMoveTimeTo(1000 + 127 - 1);
    expect(anime).not.toHaveBeenCalled();

    actJestMoveTimeTo(1000 + 127 + 1);
    expect(anime).toHaveBeenCalledWith({
      targets: element,
      easing: 'easeOutSine',
      duration: 127,
      width: 100
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

  test('Should transition "animated.exited" with object setting', () => {
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
              exited: { scale: 1.75 }
            }}
          />
        </Animator>
      );
    };
    const { container } = render(<Example />);
    const element = container.firstChild as HTMLDivElement;

    // Initial call.
    expect(anime).toHaveBeenNthCalledWith(1, {
      targets: element,
      easing: 'easeOutSine',
      duration: 176,
      scale: 1.75
    });

    actJestMoveTimeTo(1000 + 176 - 1);
    expect(anime).toHaveBeenCalledTimes(1);

    actJestMoveTimeTo(1000 + 176 + 1);
    expect(anime).toHaveBeenCalledTimes(2);
    expect(anime).toHaveBeenNthCalledWith(2, {
      targets: element,
      easing: 'easeOutSine',
      duration: 176,
      scale: 1.75
    });
  });

  test('Should run transitions on "animated" array of object transitions', () => {
    const animated: AnimatedSettings[] = [
      {
        entering: { width: 200 },
        exiting: { width: 20 }
      },
      {
        entering: { height: 300 },
        exiting: { height: 30 }
      }
    ];
    const Example: React.FC = () => {
      const [activate, setActivate] = React.useState(false);

      React.useEffect(() => {
        const t1 = setTimeout(() => setActivate(true), 1000);
        const t2 = setTimeout(() => setActivate(false), 2000);
        return () => {
          clearTimeout(t1);
          clearTimeout(t2);
        };
      }, []);

      return (
        <Animator animator={{ activate, duration: { enter: 80, exit: 90 } }}>
          <Animated animated={animated} />
        </Animator>
      );
    };
    const { container } = render(<Example />);
    const element = container.firstChild as HTMLDivElement;

    actJestMoveTimeTo(999);
    expect(anime).not.toHaveBeenCalled();

    actJestMoveTimeTo(1001);
    expect(anime).toHaveBeenCalledTimes(2);
    expect(anime).toHaveBeenNthCalledWith(1, {
      targets: element,
      easing: 'easeOutSine',
      duration: 80,
      width: 200
    });
    expect(anime).toHaveBeenNthCalledWith(2, {
      targets: element,
      easing: 'easeOutSine',
      duration: 80,
      height: 300
    });

    actJestMoveTimeTo(1999);
    expect(anime).toHaveBeenCalledTimes(2);

    actJestMoveTimeTo(2001);
    expect(anime).toHaveBeenCalledTimes(4);
    expect(anime).toHaveBeenNthCalledWith(3, {
      targets: element,
      easing: 'easeOutSine',
      duration: 90,
      width: 20
    });
    expect(anime).toHaveBeenNthCalledWith(4, {
      targets: element,
      easing: 'easeOutSine',
      duration: 90,
      height: 30
    });
  });
});

describe('Functions Settings', () => {
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

    actJestMoveTimeTo(999);
    expect(entering).not.toHaveBeenCalled();

    actJestMoveTimeTo(1001);
    expect(entering).toHaveBeenCalledWith({
      target: element,
      duration: 127
    });
  });

  test('Should transition "animated.entered" with function setting', () => {
    const entered: AnimatedSettingsTransitionFunction = jest.fn();
    const Example: React.FC = () => {
      const [activate, setActivate] = React.useState(false);

      React.useEffect(() => {
        const timeout = setTimeout(() => setActivate(true), 1000);
        return () => clearTimeout(timeout);
      }, []);

      return (
        <Animator animator={{ activate, duration: { enter: 127 } }}>
          <Animated animated={{ entered }} />
        </Animator>
      );
    };

    const { container } = render(<Example />);
    const element = container.firstChild as HTMLDivElement;

    actJestMoveTimeTo(1000 + 127 - 1);
    expect(entered).not.toHaveBeenCalled();

    actJestMoveTimeTo(1000 + 127 + 1);
    expect(entered).toHaveBeenCalledWith({
      target: element,
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
      target: element,
      duration: 814
    });
  });

  test('Should transition "animated.exited" with function setting', () => {
    const exited: AnimatedSettingsTransitionFunction = jest.fn();
    const Example: React.FC = () => {
      const [activate, setActivate] = React.useState(true);

      React.useEffect(() => {
        const timeout = setTimeout(() => setActivate(false), 1000);
        return () => clearTimeout(timeout);
      }, []);

      return (
        <Animator animator={{ activate, duration: { exit: 814 } }}>
          <Animated animated={{ exited }} />
        </Animator>
      );
    };

    const { container } = render(<Example />);
    const element = container.firstChild as HTMLDivElement;

    expect(exited).toHaveBeenNthCalledWith(1, {
      target: element,
      duration: 814
    });

    actJestMoveTimeTo(1000 + 814 - 1);
    expect(exited).toHaveBeenCalledTimes(1);

    actJestMoveTimeTo(1000 + 814 + 1);
    expect(exited).toHaveBeenCalledTimes(2);
    expect(exited).toHaveBeenNthCalledWith(2, {
      target: element,
      duration: 814
    });
  });

  test('Should run transitions on "animated" array of function transitions', () => {
    const animated1Entering = jest.fn();
    const animated1Exiting = jest.fn();
    const animated2Entering = jest.fn();
    const animated2Exiting = jest.fn();
    const animated: AnimatedSettings[] = [
      {
        entering: animated1Entering,
        exiting: animated1Exiting
      },
      {
        entering: animated2Entering,
        exiting: animated2Exiting
      }
    ];
    const Example: React.FC = () => {
      const [activate, setActivate] = React.useState(false);

      React.useEffect(() => {
        const t1 = setTimeout(() => setActivate(true), 1000);
        const t2 = setTimeout(() => setActivate(false), 2000);
        return () => {
          clearTimeout(t1);
          clearTimeout(t2);
        };
      }, []);

      return (
        <Animator animator={{ activate, duration: { enter: 80, exit: 90 } }}>
          <Animated animated={animated} />
        </Animator>
      );
    };
    const { container } = render(<Example />);
    const element = container.firstChild as HTMLDivElement;

    actJestMoveTimeTo(999);
    expect(animated1Entering).not.toHaveBeenCalled();
    expect(animated1Exiting).not.toHaveBeenCalled();
    expect(animated2Entering).not.toHaveBeenCalled();
    expect(animated2Exiting).not.toHaveBeenCalled();

    actJestMoveTimeTo(1001);
    expect(animated1Entering).toHaveBeenCalledTimes(1);
    expect(animated2Entering).toHaveBeenCalledTimes(1);
    expect(animated1Entering).toHaveBeenCalledWith({
      target: element,
      duration: 80
    });
    expect(animated2Entering).toHaveBeenCalledWith({
      target: element,
      duration: 80
    });
    expect(animated1Exiting).not.toHaveBeenCalled();
    expect(animated2Exiting).not.toHaveBeenCalled();

    actJestMoveTimeTo(1999);
    expect(animated1Entering).toHaveBeenCalledTimes(1);
    expect(animated2Entering).toHaveBeenCalledTimes(1);
    expect(animated1Exiting).not.toHaveBeenCalled();
    expect(animated2Exiting).not.toHaveBeenCalled();

    actJestMoveTimeTo(2001);
    expect(animated1Entering).toHaveBeenCalledTimes(1);
    expect(animated2Entering).toHaveBeenCalledTimes(1);
    expect(animated1Exiting).toHaveBeenCalledTimes(1);
    expect(animated2Exiting).toHaveBeenCalledTimes(1);
    expect(animated1Exiting).toHaveBeenCalledWith({
      target: element,
      duration: 90
    });
    expect(animated2Exiting).toHaveBeenCalledWith({
      target: element,
      duration: 90
    });
  });
});

test('Should not call "anime" if no settings are provided', () => {
  const Example: React.FC = () => {
    const [activate, setActivate] = React.useState(false);

    React.useEffect(() => {
      const timeout = setTimeout(() => setActivate(true), 1000);
      return () => clearTimeout(timeout);
    }, []);

    return (
      <Animator animator={{ activate }}>
        <Animated />
      </Animator>
    );
  };
  render(<Example />);

  actJestMoveTimeTo(1);
  expect(anime).not.toHaveBeenCalled();
  actJestMoveTimeTo(1001);
  expect(anime).not.toHaveBeenCalled();
});

test('Should set "style.visibility=hidden" when EXITED', () => {
  const Example: React.FC = () => {
    const [activate, setActivate] = React.useState(true);

    React.useEffect(() => {
      const timeout = setTimeout(() => setActivate(false), 1000);
      return () => clearTimeout(timeout);
    }, []);

    return (
      <Animator animator={{ activate }}>
        <Animated />
      </Animator>
    );
  };
  const { container } = render(<Example />);
  const element = container.firstChild as HTMLElement;

  // Since the component has initial state EXITED..
  expect(element.style.visibility).toBe('hidden');

  actJestMoveTimeTo(1);
  expect(element.style.visibility).toBe('');

  actJestMoveTimeTo(1099);
  expect(element.style.visibility).toBe('');

  actJestMoveTimeTo(1101);
  expect(element.style.visibility).toBe('hidden');
});
