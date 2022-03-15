/* eslint-env jest */

import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { ArwesThemeProvider } from '../ArwesThemeProvider';
import { Card } from './index';

afterEach(cleanup);

test('Should render article element with content children', () => {
  const { container } = render(
    <ArwesThemeProvider>
      <Card>
        Furutistic <b>Sci-Fi</b> UI <i>Web</i> Framework
      </Card>
    </ArwesThemeProvider>
  );
  const element = container.firstChild as HTMLElement;
  expect(element.tagName).toBe('ARTICLE');
  expect(element.classList.contains('arwes-card')).toBeTruthy();

  const children = container.querySelector('.arwes-card__children');
  expect(children?.innerHTML).toBe('Furutistic <b>Sci-Fi</b> UI <i>Web</i> Framework');
});
