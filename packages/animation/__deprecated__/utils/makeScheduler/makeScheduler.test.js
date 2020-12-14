/* eslint-env jest */

import { makeMoveTimeTo } from '../../../test/makeMoveTimeTo';
import { makeScheduler } from './makeScheduler';

let moveTimeTo;

jest.useFakeTimers();

beforeEach(() => {
  moveTimeTo = makeMoveTimeTo();
});

test('Should schedule a function call by given id, time, and callback', () => {
  const scheduler = makeScheduler();
  const spy = jest.fn();
  scheduler.start(0, 100, spy);

  moveTimeTo(99);
  expect(spy).not.toHaveBeenCalled();

  moveTimeTo(101);
  expect(spy).toHaveBeenCalledTimes(1);
});

test('Should schedule a function call by given time and callback', () => {
  const scheduler = makeScheduler();
  const spy = jest.fn();
  scheduler.start(100, spy);

  moveTimeTo(99);
  expect(spy).not.toHaveBeenCalled();

  moveTimeTo(101);
  expect(spy).toHaveBeenCalledTimes(1);
});

test('Should stop scheduled function call by id', () => {
  const scheduler = makeScheduler();
  const spy = jest.fn();
  scheduler.start(0, 100, spy);

  moveTimeTo(99);
  scheduler.stop(0);
  expect(spy).not.toHaveBeenCalled();

  moveTimeTo(101);
  expect(spy).not.toHaveBeenCalled();
});

test('Should stop scheduled function call without id', () => {
  const scheduler = makeScheduler();
  const spy = jest.fn();
  scheduler.start(100, spy);

  moveTimeTo(99);
  scheduler.stop();
  expect(spy).not.toHaveBeenCalled();

  moveTimeTo(101);
  expect(spy).not.toHaveBeenCalled();
});

test('Should re-set schedule function call if called multiple times', () => {
  const scheduler = makeScheduler();
  const spy1 = jest.fn();
  const spy2 = jest.fn();
  scheduler.start(0, 100, spy1);

  moveTimeTo(50);
  scheduler.start(0, 100, spy2);

  moveTimeTo(149);
  expect(spy1).not.toHaveBeenCalled();
  expect(spy2).not.toHaveBeenCalled();

  moveTimeTo(151);
  expect(spy1).not.toHaveBeenCalled();
  expect(spy2).toHaveBeenCalledTimes(1);
});

test('Should be able to schedule multiple functions', () => {
  const scheduler = makeScheduler();
  const spy1 = jest.fn();
  const spy2 = jest.fn();
  scheduler.start(0, 100, spy1);
  scheduler.start(1, 100, spy2);

  moveTimeTo(99);
  expect(spy1).not.toHaveBeenCalled();
  expect(spy2).not.toHaveBeenCalled();

  moveTimeTo(101);
  expect(spy1).toHaveBeenCalledTimes(1);
  expect(spy2).toHaveBeenCalledTimes(1);
});

test('Should be able to stop all scheduled functions', () => {
  const scheduler = makeScheduler();
  const spy1 = jest.fn();
  const spy2 = jest.fn();
  scheduler.start(0, 100, spy1);
  scheduler.start(1, 100, spy2);

  moveTimeTo(10);
  scheduler.stopAll();

  moveTimeTo(110);
  expect(spy1).not.toHaveBeenCalled();
  expect(spy2).not.toHaveBeenCalled();
});
