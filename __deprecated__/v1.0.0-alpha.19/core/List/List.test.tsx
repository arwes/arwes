/* eslint-env jest */

import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { ArwesThemeProvider } from '../ArwesThemeProvider';
import { List } from './index';

afterEach(cleanup);

test('Should render ul element with content children by default', () => {
  const { container } = render(
    <ArwesThemeProvider>
      <List>
        Furutistic <b>Sci-Fi</b> UI <i>Web</i> Framework
      </List>
    </ArwesThemeProvider>
  );
  const element = container.firstChild as HTMLElement;
  expect(element.tagName).toBe('UL');
  expect(element.classList.contains('arwes-list')).toBeTruthy();
  expect(element.innerHTML).toBe('Furutistic <b>Sci-Fi</b> UI <i>Web</i> Framework');
});

test('Should render ol element with content children if provided', () => {
  const { container } = render(
    <ArwesThemeProvider>
      <List as='ol'>
        Furutistic <b>Sci-Fi</b> UI <i>Web</i> Framework
      </List>
    </ArwesThemeProvider>
  );
  const element = container.firstChild as HTMLElement;
  expect(element.tagName).toBe('OL');
});
