/* eslint-env jest */

import { makeScheduler } from './makeScheduler';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
});

test('Should schedule a function call by given id, time', () => {
  const scheduler = makeScheduler();
  const spy = jest.fn();
  scheduler.start(0, 100, spy);
  jest.advanceTimersByTime(90);
  expect(spy).not.toHaveBeenCalled();
  jest.advanceTimersByTime(20); // 110ms
  expect(spy).toHaveBeenCalledTimes(1);
});

test('Should stop scheduled function call by id', () => {
  const scheduler = makeScheduler();
  const spy = jest.fn();
  scheduler.start(0, 100, spy);
  jest.advanceTimersByTime(90);
  scheduler.stop(0);
  expect(spy).not.toHaveBeenCalled();
  jest.advanceTimersByTime(20); // 110ms
  expect(spy).not.toHaveBeenCalled();
});

test('Should re-set schedule function call if called multiple times', () => {
  const scheduler = makeScheduler();
  const spy1 = jest.fn();
  const spy2 = jest.fn();
  scheduler.start(0, 100, spy1);
  jest.advanceTimersByTime(90);
  scheduler.start(0, 100, spy2);
  jest.advanceTimersByTime(90); // 180ms
  expect(spy1).not.toHaveBeenCalled();
  expect(spy2).not.toHaveBeenCalled();
  jest.advanceTimersByTime(20); // 200ms
  expect(spy1).not.toHaveBeenCalled();
  expect(spy2).toHaveBeenCalledTimes(1);
});

test('Should be able to schedule multiple functions', () => {
  const scheduler = makeScheduler();
  const spy1 = jest.fn();
  const spy2 = jest.fn();
  scheduler.start(0, 100, spy1);
  scheduler.start(1, 100, spy2);
  jest.advanceTimersByTime(90);
  expect(spy1).not.toHaveBeenCalled();
  expect(spy2).not.toHaveBeenCalled();
  jest.advanceTimersByTime(20); // 110ms
  expect(spy1).toHaveBeenCalledTimes(1);
  expect(spy2).toHaveBeenCalledTimes(1);
});

test('Should be able to stop all scheduled functions', () => {
  const scheduler = makeScheduler();
  const spy1 = jest.fn();
  const spy2 = jest.fn();
  scheduler.start(0, 100, spy1);
  scheduler.start(1, 100, spy2);
  jest.advanceTimersByTime(10);
  scheduler.stopAll();
  jest.advanceTimersByTime(100); // 110ms
  expect(spy1).not.toHaveBeenCalled();
  expect(spy2).not.toHaveBeenCalled();
});
