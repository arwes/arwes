/* eslint-env jest */

import { JestMoveTimeTo, makeJestMoveTimeTo } from '../../../test-utils/makeJestMoveTimeTo';
import { makeScheduler } from './makeScheduler';

let jestMoveTimeTo: JestMoveTimeTo;

jest.useFakeTimers();

beforeEach(() => {
  jestMoveTimeTo = makeJestMoveTimeTo();
});

test('Should schedule a function call by given id, time, and callback', () => {
  const scheduler = makeScheduler();
  const spy = jest.fn();
  scheduler.start(0, 100, spy);

  jestMoveTimeTo(99);
  expect(spy).not.toHaveBeenCalled();

  jestMoveTimeTo(101);
  expect(spy).toHaveBeenCalledTimes(1);
});

test('Should schedule a function call by given time and callback', () => {
  const scheduler = makeScheduler();
  const spy = jest.fn();
  scheduler.start(100, spy);

  jestMoveTimeTo(99);
  expect(spy).not.toHaveBeenCalled();

  jestMoveTimeTo(101);
  expect(spy).toHaveBeenCalledTimes(1);
});

test('Should stop scheduled function call by id', () => {
  const scheduler = makeScheduler();
  const spy = jest.fn();
  scheduler.start(0, 100, spy);

  jestMoveTimeTo(99);
  scheduler.stop(0);
  expect(spy).not.toHaveBeenCalled();

  jestMoveTimeTo(101);
  expect(spy).not.toHaveBeenCalled();
});

test('Should stop scheduled function call without id', () => {
  const scheduler = makeScheduler();
  const spy = jest.fn();
  scheduler.start(100, spy);

  jestMoveTimeTo(99);
  scheduler.stop();
  expect(spy).not.toHaveBeenCalled();

  jestMoveTimeTo(101);
  expect(spy).not.toHaveBeenCalled();
});

test('Should re-set schedule function call if called multiple times', () => {
  const scheduler = makeScheduler();
  const spy1 = jest.fn();
  const spy2 = jest.fn();
  scheduler.start(0, 100, spy1);

  jestMoveTimeTo(50);
  scheduler.start(0, 100, spy2);

  jestMoveTimeTo(149);
  expect(spy1).not.toHaveBeenCalled();
  expect(spy2).not.toHaveBeenCalled();

  jestMoveTimeTo(151);
  expect(spy1).not.toHaveBeenCalled();
  expect(spy2).toHaveBeenCalledTimes(1);
});

test('Should be able to schedule multiple functions', () => {
  const scheduler = makeScheduler();
  const spy1 = jest.fn();
  const spy2 = jest.fn();
  scheduler.start(0, 100, spy1);
  scheduler.start(1, 100, spy2);

  jestMoveTimeTo(99);
  expect(spy1).not.toHaveBeenCalled();
  expect(spy2).not.toHaveBeenCalled();

  jestMoveTimeTo(101);
  expect(spy1).toHaveBeenCalledTimes(1);
  expect(spy2).toHaveBeenCalledTimes(1);
});

test('Should be able to stop all scheduled functions', () => {
  const scheduler = makeScheduler();
  const spy1 = jest.fn();
  const spy2 = jest.fn();
  scheduler.start(0, 100, spy1);
  scheduler.start(1, 100, spy2);

  jestMoveTimeTo(10);
  scheduler.stopAll();

  jestMoveTimeTo(110);
  expect(spy1).not.toHaveBeenCalled();
  expect(spy2).not.toHaveBeenCalled();
});
