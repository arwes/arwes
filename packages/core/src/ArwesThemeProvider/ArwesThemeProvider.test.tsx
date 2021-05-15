/* eslint-env jest */

import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { ArwesThemeProvider } from './index';

afterEach(cleanup);

test('Should render component with children elements', () => {
  const { container } = render(
    <ArwesThemeProvider>
      Furutistic <b>Sci-Fi</b> UI <i>Web</i> Framework
    </ArwesThemeProvider>
  );
  expect(container.innerHTML).toBe('Furutistic <b>Sci-Fi</b> UI <i>Web</i> Framework');
});
