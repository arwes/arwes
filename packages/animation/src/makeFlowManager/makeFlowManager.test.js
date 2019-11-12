/* eslint-env jest */

import { makeFlowManager } from './makeFlowManager';

describe('checkMount()', () => {
  test('Should do nothing if not animated', () => {
    const isAnimate = jest.fn(() => false);
    const isActivated = jest.fn(() => true);
    const isOutsourced = jest.fn(() => false);
    const enter = jest.fn();
    const component = { props: {}, isAnimate, isActivated, isOutsourced, enter };
    const flowManager = makeFlowManager(component);

    flowManager.checkMount();
    expect(enter).not.toHaveBeenCalled();
  });

  test('Should do nothing if outsourced', () => {
    const isAnimate = jest.fn(() => true);
    const isActivated = jest.fn(() => true);
    const isOutsourced = jest.fn(() => true);
    const enter = jest.fn();
    const component = { props: {}, isAnimate, isActivated, isOutsourced, enter };
    const flowManager = makeFlowManager(component);

    flowManager.checkMount();
    expect(enter).not.toHaveBeenCalled();
  });

  test('Should enter() if animated and activated', () => {
    const isAnimate = jest.fn(() => true);
    const isActivated = jest.fn(() => true);
    const isOutsourced = jest.fn(() => false);
    const enter = jest.fn();
    const component = { props: {}, isAnimate, isActivated, isOutsourced, enter };
    const flowManager = makeFlowManager(component);

    flowManager.checkMount();
    expect(enter).toHaveBeenCalledTimes(1);
  });
});

describe('checkUpdate()', () => {
  test('Should enter() if animated and activated', () => {
    const enter = jest.fn();
    const exit = jest.fn();
    const component = {
      props: {},
      isAnimate: jest.fn(() => true),
      isActivated: jest.fn(() => true),
      isOutsourced: jest.fn(() => false),
      enter,
      exit
    };
    const flowManager = makeFlowManager(component);

    flowManager.checkUpdate();
    expect(enter).toHaveBeenCalledTimes(1);
    expect(exit).toHaveBeenCalledTimes(0);
  });

  test('Should exit() if entered and updated', () => {
    const enter = jest.fn();
    const exit = jest.fn();
    const component = {
      props: {},
      isAnimate: jest.fn(() => true),
      isActivated: jest.fn(() => true),
      isOutsourced: jest.fn(() => false),
      enter,
      exit
    };
    const flowManager = makeFlowManager(component);

    flowManager.checkUpdate();
    component.isActivated = jest.fn(() => false);
    flowManager.checkUpdate();
    expect(enter).toHaveBeenCalledTimes(1);
    expect(exit).toHaveBeenCalledTimes(1);
  });

  test('Should do nothing if outsourced', () => {
    const enter = jest.fn();
    const exit = jest.fn();
    const component = {
      props: { imperative: true },
      isAnimate: jest.fn(() => true),
      isActivated: jest.fn(() => true),
      isOutsourced: jest.fn(() => true),
      enter,
      exit
    };
    const flowManager = makeFlowManager(component);

    flowManager.checkUpdate();
    expect(enter).not.toHaveBeenCalled();
    expect(exit).not.toHaveBeenCalled();
  });
});
