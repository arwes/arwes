/* eslint-env jest */

import React, { ReactElement } from 'react';
import { render, cleanup } from '@testing-library/react';

import { useOnChange } from './index';

afterEach(cleanup);

test('Should be called on initial render', () => {
  const mock = jest.fn();
  const Example = (): ReactElement => {
    useOnChange(mock, []);
    return <div />;
  };
  render(<Example />);
  expect(mock).toHaveBeenCalledTimes(1);
});

test('Should call only once per dependencies update', () => {
  const onChange = jest.fn();
  const Example = (props: { a: number, b: number }): ReactElement => {
    const { a, b } = props;
    useOnChange(onChange, [a, b]);
    return <div />;
  };
  const { rerender } = render(<Example a={1} b={1} />);
  expect(onChange).toHaveBeenCalledTimes(1);

  rerender(<Example a={1} b={1} />);
  rerender(<Example a={1} b={1} />);
  expect(onChange).toHaveBeenCalledTimes(1);

  rerender(<Example a={1} b={2} />);
  rerender(<Example a={1} b={2} />);
  expect(onChange).toHaveBeenCalledTimes(2);

  rerender(<Example a={3} b={3} />);
  rerender(<Example a={3} b={3} />);
  expect(onChange).toHaveBeenCalledTimes(3);
});

test('Should call unsubscribe when provided only per dependencies update', () => {
  const onCancel = jest.fn();
  const onChange = jest.fn(() => onCancel);
  const Example = (props: { value: number }): ReactElement => {
    useOnChange(onChange, [props.value]);
    return <div />;
  };
  const { rerender, unmount } = render(<Example value={1} />);
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onCancel).toHaveBeenCalledTimes(0);

  rerender(<Example value={1} />);
  rerender(<Example value={1} />);
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onCancel).toHaveBeenCalledTimes(0);

  rerender(<Example value={2} />);
  rerender(<Example value={2} />);
  expect(onChange).toHaveBeenCalledTimes(2);
  expect(onCancel).toHaveBeenCalledTimes(1);

  unmount();
  expect(onChange).toHaveBeenCalledTimes(2);
  expect(onCancel).toHaveBeenCalledTimes(2);
});
