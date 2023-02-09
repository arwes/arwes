/* eslint-env jest */

import { type JestMoveTimeTo, makeJestMoveTimeTo } from '../../__testUtils__/makeJestMoveTimeTo';
import { createTOScheduler } from './createTOScheduler';

let jestMoveTimeTo: JestMoveTimeTo;

jest.useFakeTimers();

beforeEach(() => {
  jestMoveTimeTo = makeJestMoveTimeTo();
});

test('Should schedule a function call by given id, time, and callback', () => {
  const scheduler = createTOScheduler();
  const spy = jest.fn();
  scheduler.start('id', 0.1, spy);

  jestMoveTimeTo(0.099);
  expect(spy).not.toHaveBeenCalled();

  jestMoveTimeTo(0.101);
  expect(spy).toHaveBeenCalledTimes(1);
});

test('Should schedule a function call by given time and callback', () => {
  const scheduler = createTOScheduler();
  const spy = jest.fn();
  scheduler.start(0.1, spy);

  jestMoveTimeTo(0.099);
  expect(spy).not.toHaveBeenCalled();

  jestMoveTimeTo(0.101);
  expect(spy).toHaveBeenCalledTimes(1);
});

test('Should stop scheduled function call by id', () => {
  const scheduler = createTOScheduler();
  const spy = jest.fn();
  scheduler.start(0, 0.1, spy);

  jestMoveTimeTo(0.099);
  scheduler.stop(0);
  expect(spy).not.toHaveBeenCalled();

  jestMoveTimeTo(0.101);
  expect(spy).not.toHaveBeenCalled();
});

test('Should stop scheduled function call without id', () => {
  const scheduler = createTOScheduler();
  const spy = jest.fn();
  scheduler.start(0.1, spy);

  jestMoveTimeTo(0.099);
  scheduler.stop();
  expect(spy).not.toHaveBeenCalled();

  jestMoveTimeTo(0.101);
  expect(spy).not.toHaveBeenCalled();
});

test('Should re-set schedule function call if called multiple times', () => {
  const scheduler = createTOScheduler();
  const spy1 = jest.fn();
  const spy2 = jest.fn();
  scheduler.start(0, 0.1, spy1);

  jestMoveTimeTo(0.050);
  scheduler.start(0, 0.1, spy2);

  jestMoveTimeTo(0.149);
  expect(spy1).not.toHaveBeenCalled();
  expect(spy2).not.toHaveBeenCalled();

  jestMoveTimeTo(0.151);
  expect(spy1).not.toHaveBeenCalled();
  expect(spy2).toHaveBeenCalledTimes(1);
});

test('Should be able to schedule multiple functions', () => {
  const scheduler = createTOScheduler();
  const spy1 = jest.fn();
  const spy2 = jest.fn();
  scheduler.start(0, 0.1, spy1);
  scheduler.start(1, 0.1, spy2);

  jestMoveTimeTo(0.099);
  expect(spy1).not.toHaveBeenCalled();
  expect(spy2).not.toHaveBeenCalled();

  jestMoveTimeTo(0.101);
  expect(spy1).toHaveBeenCalledTimes(1);
  expect(spy2).toHaveBeenCalledTimes(1);
});

test('Should be able to stop all scheduled functions', () => {
  const scheduler = createTOScheduler();
  const spy1 = jest.fn();
  const spy2 = jest.fn();
  scheduler.start(0, 0.1, spy1);
  scheduler.start(1, 0.1, spy2);

  jestMoveTimeTo(0.010);
  scheduler.stopAll();

  jestMoveTimeTo(0.110);
  expect(spy1).not.toHaveBeenCalled();
  expect(spy2).not.toHaveBeenCalled();
});
