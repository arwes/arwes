/* eslint-env jest */

import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { ArwesThemeProvider } from '../ArwesThemeProvider';
import { StylesBaseline } from './index';

afterEach(cleanup);

test('Should render component', () => {
  render(
    <ArwesThemeProvider>
      <StylesBaseline />
    </ArwesThemeProvider>
  );
});
