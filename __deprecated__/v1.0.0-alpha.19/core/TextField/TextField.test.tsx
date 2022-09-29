/* eslint-env jest */

import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { ArwesThemeProvider } from '../ArwesThemeProvider';
import { TextField } from './index';

afterEach(cleanup);

test('Should render elements', () => {
  const { container } = render(
    <ArwesThemeProvider>
      <TextField />
    </ArwesThemeProvider>
  );
  const element = container.firstChild as HTMLElement;
  expect(element.tagName).toBe('DIV');
  expect(element.classList.contains('arwes-text-field')).toBeTruthy();
});
