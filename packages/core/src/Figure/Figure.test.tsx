/* eslint-env jest */

import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { ArwesThemeProvider } from '../ArwesThemeProvider';
import { Figure } from './index';

afterEach(cleanup);

test('Should render figure element with children as <Text/> description', () => {
  const { container } = render(
    <ArwesThemeProvider>
      <Figure src={'/image.png'}>
        Furutistic <b>Sci-Fi</b> UI <i>Web</i> Framework
      </Figure>
    </ArwesThemeProvider>
  );
  const element = container.firstChild as HTMLElement;
  expect(element.tagName).toBe('FIGURE');
  expect(element.classList.contains('arwes-figure')).toBeTruthy();

  const content = container.querySelector('.arwes-figure__description-text .arwes-text__content');
  expect(content?.innerHTML).toBe('Furutistic <b>Sci-Fi</b> UI <i>Web</i> Framework');
});
