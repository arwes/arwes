/* eslint-env jest */

import { makeDurationManager } from './makeDurationManager';

describe('get()', () => {
  test('Should get 200ms for enter/exit, 0ms for delay, 50ms for stagger, 0ms for offset, by default', () => {
    const component = { props: { animationContext: {} } };
    const durationManager = makeDurationManager(component);
    expect(durationManager.get()).toMatchObject({ enter: 200, exit: 200, delay: 0, offset: 0 });
  });

  test('Should duration be extended by animation context', () => {
    const component = { props: { animationContext: { duration: { exit: 500 } } } };
    const durationManager = makeDurationManager(component);
    expect(durationManager.get()).toMatchObject({ enter: 200, exit: 500 });
  });

  test('Should duration be extended by animation context and prop', () => {
    const component = { props: {
      animationContext: { duration: { enter: 700, exit: 500, delay: 50 } },
      duration: { exit: 700 }
    } };
    const durationManager = makeDurationManager(component);
    expect(durationManager.get()).toMatchObject({ enter: 700, exit: 700, delay: 50 });
  });

  test('Should get enter/exit values with provided prop number', () => {
    const component = { props: {
      animationContext: { duration: { enter: 500, exit: 500 } },
      duration: 250
    } };
    const durationManager = makeDurationManager(component);
    expect(durationManager.get()).toMatchObject({ enter: 250, exit: 250 });
  });

  test('Should get dynamic component duration if available, and it should take priority', () => {
    const component = {
      props: {
        animationContext: { duration: { enter: 500, exit: 500 } },
        duration: 250
      },
      getDynamicDuration (value) {
        const durationWithoutDynamicValue = { enter: 250, exit: 250 };
        expect(value).toMatchObject(durationWithoutDynamicValue);
        return { enter: 700, delay: 900 };
      }
    };
    const durationManager = makeDurationManager(component);
    expect(durationManager.get()).toMatchObject({ enter: 700, exit: 250, delay: 900 });
  });
});

describe('update()', () => {
  test('Should update duration with specific value', () => {
    const component = { props: { animationContext: {} } };
    const durationManager = makeDurationManager(component);
    durationManager.update({ enter: 900 });
    expect(durationManager.get()).toMatchObject({ enter: 900, exit: 200, delay: 0, stagger: 50 });
  });

  test('Should update duration with number', () => {
    const component = { props: { animationContext: {} } };
    const durationManager = makeDurationManager(component);
    durationManager.update(700);
    expect(durationManager.get()).toMatchObject({ enter: 700, exit: 700, delay: 0, stagger: 50 });
  });
});
