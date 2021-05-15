/* eslint-env jest */

import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { ArwesThemeProvider } from '../ArwesThemeProvider';
import { Blockquote } from './index';

afterEach(cleanup);

test('Should render blockquote element with content children', () => {
  const { container } = render(
    <ArwesThemeProvider>
      <Blockquote>
        Furutistic <b>Sci-Fi</b> UI <i>Web</i> Framework
      </Blockquote>
    </ArwesThemeProvider>
  );
  const element = container.firstChild as HTMLElement;
  expect(element.tagName).toBe('BLOCKQUOTE');
  expect(element.classList.contains('arwes-blockquote')).toBeTruthy();

  const content = container.querySelector('.arwes-blockquote__content');
  expect(content?.innerHTML).toBe('Furutistic <b>Sci-Fi</b> UI <i>Web</i> Framework');
});
