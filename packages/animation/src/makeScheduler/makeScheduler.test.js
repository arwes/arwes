/* eslint-env jest */

import { makeScheduler } from './makeScheduler';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
});

test('Should schedule a function call by given time', () => {
  const scheduler = makeScheduler();
  const spy = jest.fn();
  scheduler.start(100, spy);
  jest.advanceTimersByTime(90);
  expect(spy).not.toHaveBeenCalled();
  jest.advanceTimersByTime(20); // 110ms
  expect(spy).toHaveBeenCalledTimes(1);
});

test('Should stop scheduled function call', () => {
  const scheduler = makeScheduler();
  const spy = jest.fn();
  scheduler.start(100, spy);
  jest.advanceTimersByTime(90);
  scheduler.stop();
  expect(spy).not.toHaveBeenCalled();
  jest.advanceTimersByTime(20); // 110ms
  expect(spy).not.toHaveBeenCalled();
});

test('Should re-set schedule function call if called multiple times', () => {
  const scheduler = makeScheduler();
  const spy1 = jest.fn();
  const spy2 = jest.fn();
  scheduler.start(100, spy1);
  jest.advanceTimersByTime(90);
  scheduler.start(100, spy2);
  jest.advanceTimersByTime(90); // 180ms
  expect(spy1).not.toHaveBeenCalled();
  expect(spy2).not.toHaveBeenCalled();
  jest.advanceTimersByTime(20); // 200ms
  expect(spy1).not.toHaveBeenCalled();
  expect(spy2).toHaveBeenCalledTimes(1);
});
