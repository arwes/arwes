/* eslint-env jest */

import React, { createRef, FC, ReactNode, useEffect } from 'react';
import { render, cleanup, act } from '@testing-library/react';

import { EXITED, ENTERED, ENTERING, AnimatorRef, AnimatorClassSettings } from '../constants';
import { Animator } from '../Animator';
import { withAnimator } from './withAnimator';

jest.useFakeTimers();
afterEach(cleanup);

interface ExampleComponentWithAnimatorProps {
  animator: AnimatorRef
}

test('Should add <Animator/> wrapper and provide "animator" settings to component', () => {
  let animator: AnimatorRef | undefined;
  const ExampleComponent: FC<ExampleComponentWithAnimatorProps> = props => {
    animator = props.animator;
    return null;
  };
  const ExampleNode = withAnimator()(ExampleComponent);
  render(<ExampleNode />);

  expect(animator).toBeInstanceOf(Object);
  expect(animator?.setupAnimateRefs).toBeInstanceOf(Function);
  expect(animator?.updateDuration).toBeInstanceOf(Function);
  expect(animator?.flow).toBeInstanceOf(Object);
  expect(animator?.flow.value).toBe(EXITED);
  act(() => {
    jest.advanceTimersByTime(1);
  });
  expect(animator?.flow.value).toBe(ENTERING);
});

['class', 'instance'].forEach(typeOfTest => {
  describe(`${typeOfTest} settings`, () => {
    const isClassTestType = typeOfTest === 'class';

    test(`Should allow "animator.animate" in ${typeOfTest} setting`, () => {
      const settingsToSet = { animate: false };
      const classSettings = isClassTestType ? settingsToSet : undefined;
      const instanceSettings = !isClassTestType ? settingsToSet : undefined;

      let animator: any;
      const ExampleComponent: FC<ExampleComponentWithAnimatorProps> = props => {
        animator = props.animator;
        return null;
      };
      const ExampleNode = withAnimator<typeof ExampleComponent>(classSettings)(ExampleComponent);
      render(<ExampleNode animator={instanceSettings} />);
      expect(animator.animate).toBe(false);
      expect(animator.flow.value).toBe(ENTERED);
      act(() => {
        jest.advanceTimersByTime(1);
      });
      expect(animator.flow.value).toBe(ENTERED);
    });

    test(`Should allow "animator.duration" in ${typeOfTest} setting`, () => {
      const settingsToSet = { duration: { enter: 200, delay: 50 } };
      const classSettings = isClassTestType ? settingsToSet : undefined;
      const instanceSettings = !isClassTestType ? settingsToSet : undefined;

      let animator: any;
      const ExampleComponent: FC<ExampleComponentWithAnimatorProps> = props => {
        animator = props.animator;
        return null;
      };
      const ExampleNode = withAnimator(classSettings)(ExampleComponent);
      render(<ExampleNode animator={instanceSettings} />);
      expect(animator.duration).toMatchObject({ enter: 200, delay: 50 });
    });

    test(`Should allow "animator.root" in ${typeOfTest} setting`, () => {
      const settingsToSet = { root: true };
      const classSettings = isClassTestType ? settingsToSet : undefined;
      const instanceSettings = !isClassTestType ? settingsToSet : undefined;

      let animator: any;
      const ExampleComponent: FC<ExampleComponentWithAnimatorProps> = props => {
        animator = props.animator;
        return null;
      };
      const ExampleNode = withAnimator(classSettings)(ExampleComponent);

      // In this case, the animator child should not be a root, but it is a root
      // because it was configured to be so.
      render(
        <Animator>
          <ExampleNode animator={instanceSettings} />
        </Animator>
      );

      expect(animator).toMatchObject({ root: true });
    });

    test(`Should allow "animator.merge" in ${typeOfTest} setting`, () => {
      const settingsToSet = { merge: true };
      const classSettings = isClassTestType ? settingsToSet : undefined;
      const instanceSettings = !isClassTestType ? settingsToSet : undefined;

      let animator: any;
      const ExampleComponent: FC<ExampleComponentWithAnimatorProps> = props => {
        animator = props.animator;
        return null;
      };
      const ExampleNode = withAnimator(classSettings)(ExampleComponent);
      render(
        <Animator>
          <ExampleNode animator={instanceSettings} />
        </Animator>
      );
      expect(animator).toMatchObject({ merge: true });
    });

    test(`Should allow "animator.manager" in ${typeOfTest} setting`, () => {
      const settingsToSet: AnimatorClassSettings = { manager: 'stagger' };
      const classSettings = isClassTestType ? settingsToSet : undefined;
      const instanceSettings = !isClassTestType ? settingsToSet : undefined;

      let animator: any;
      const ExampleComponent: FC<ExampleComponentWithAnimatorProps> = props => {
        animator = props.animator;
        return null;
      };
      const ExampleNode = withAnimator(classSettings)(ExampleComponent);
      render(
        <Animator>
          <ExampleNode animator={instanceSettings} />
        </Animator>
      );
      expect(animator).toMatchObject({ manager: 'stagger' });
    });
  });
});

test('Should "animator.animate" setting take priority in instance setting', () => {
  let animator: any;
  const ExampleComponent: FC<ExampleComponentWithAnimatorProps> = props => {
    animator = props.animator;
    return null;
  };
  const ExampleNode = withAnimator({ animate: false })(ExampleComponent);
  render(<ExampleNode animator={{ animate: true }} />);
  expect(animator.animate).toBe(true);
});

test('Should "animator.duration" setting take priority in instance setting', () => {
  let animator: any;
  const ExampleComponent: FC<ExampleComponentWithAnimatorProps> = props => {
    animator = props.animator;
    return null;
  };
  const ExampleNode = withAnimator({ duration: { enter: 300, exit: 300 } })(ExampleComponent);
  render(<ExampleNode animator={{ duration: { enter: 600, exit: 600 } }} />);
  expect(animator.duration).toMatchObject({ enter: 600, exit: 600 });
});

test('Should "animator.root" setting take priority in instance setting', () => {
  let animator: any;
  const ExampleComponent: FC<ExampleComponentWithAnimatorProps> = props => {
    animator = props.animator;
    return null;
  };
  const ExampleNode = withAnimator({ root: true })(ExampleComponent);

  // In this case, the animator child should be root. In class settings it is
  // configured as "root=true", then it is overwriten in instance settings as "false".
  render(
    <Animator>
      <ExampleNode animator={{ root: false }} />
    </Animator>
  );

  expect(animator).toMatchObject({ root: false });
});

test('Should "animator.merge" setting take priority in instance setting', () => {
  let animator: any;
  const ExampleComponent: FC<ExampleComponentWithAnimatorProps> = props => {
    animator = props.animator;
    return null;
  };
  const ExampleNode = withAnimator({ merge: true })(ExampleComponent);
  render(
    <Animator>
      <ExampleNode animator={{ merge: false }} />
    </Animator>
  );
  expect(animator).toMatchObject({ merge: false });
});

test('Should "animator.combine" setting take priority in instance setting', () => {
  let animator: any;
  const ExampleComponent: FC<ExampleComponentWithAnimatorProps> = props => {
    animator = props.animator;
    return null;
  };
  const ExampleNode = withAnimator({ combine: true })(ExampleComponent);
  render(
    <Animator>
      <ExampleNode animator={{ combine: false }} />
    </Animator>
  );
  expect(animator).toMatchObject({ combine: false });
});

test('Should "animator.manager" setting take priority in instance setting', () => {
  let animator: any;
  const ExampleComponent: FC<ExampleComponentWithAnimatorProps> = props => {
    animator = props.animator;
    return null;
  };
  const ExampleNode = withAnimator({ manager: 'sequence' })(ExampleComponent);
  render(
    <Animator>
      <ExampleNode animator={{ manager: 'stagger' }} />
    </Animator>
  );
  expect(animator).toMatchObject({ manager: 'stagger' });
});

test('Should allow passing a "ref" to wrapped component', () => {
  class ExampleComponent extends React.Component<ExampleComponentWithAnimatorProps> {
    render (): ReactNode {
      return null;
    }

    hello (): number {
      return 100;
    }
  }

  interface ExampleComponentInterface extends React.ComponentClass<ExampleComponentWithAnimatorProps> {
    new(props: ExampleComponentWithAnimatorProps, context?: any): ExampleComponent
    hello: () => number
  };

  const ExampleNode = withAnimator()(ExampleComponent);

  const ExampleApp: FC = () => {
    const ref = createRef<ExampleComponentInterface>();

    useEffect(() => {
      expect(ref.current?.hello()).toBe(100);
    }, []);

    return (
      <Animator>
        <ExampleNode ref={ref} />
      </Animator>
    );
  };

  render(<ExampleApp />);
});
