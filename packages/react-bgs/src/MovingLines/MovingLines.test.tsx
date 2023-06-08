/* eslint-env jest */

import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { MovingLines } from './index';

afterEach(cleanup);

test('Should render canvas element with arwes class', () => {
  const { container } = render(<MovingLines sets={10} />);
  const element = container.firstChild as HTMLElement;
  expect(element.tagName).toBe('CANVAS');
  expect(element.classList.contains('arwes-react-bgs-movinglines')).toBeTruthy();
});
