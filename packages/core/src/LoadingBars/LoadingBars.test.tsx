/* eslint-env jest */

import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { ArwesThemeProvider } from '../ArwesThemeProvider';
import { LoadingBars } from './index';

afterEach(cleanup);

test('Should render component', () => {
  const { container } = render(
    <ArwesThemeProvider>
      <LoadingBars />
    </ArwesThemeProvider>
  );
  const element = container.firstChild as HTMLElement;
  expect(element.tagName).toBe('DIV');
  expect(element.classList.contains('arwes-loading-bars')).toBeTruthy();
});
