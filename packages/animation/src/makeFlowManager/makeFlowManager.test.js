/* eslint-env jest */

import { makeFlowManager } from './makeFlowManager';

describe('checkMount()', () => {
  test('Should do nothing if not animated not activated', () => {
    const isAnimate = jest.fn();
    const isActivated = jest.fn();
    const enter = jest.fn();
    const component = { isAnimate, isActivated, enter };
    const flowManager = makeFlowManager(component);

    flowManager.checkMount();
    expect(enter).not.toHaveBeenCalled();
  });

  test('Should enter() if animated and activated', () => {
    const isAnimate = jest.fn(() => true);
    const isActivated = jest.fn(() => true);
    const enter = jest.fn();
    const component = { isAnimate, isActivated, enter };
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

  test('Should call onActivate with value when activation changes', () => {
    const onActivate = jest.fn();
    const enter = jest.fn();
    const exit = jest.fn();
    const component = {
      props: { onActivate },
      isAnimate: jest.fn(() => true),
      isActivated: jest.fn(() => true),
      enter,
      exit
    };
    const flowManager = makeFlowManager(component);

    flowManager.checkUpdate();
    expect(onActivate).toHaveBeenCalledWith(true);

    component.isActivated = jest.fn(() => false);
    flowManager.checkUpdate();
    expect(onActivate).toHaveBeenCalledWith(false);
  });
});
