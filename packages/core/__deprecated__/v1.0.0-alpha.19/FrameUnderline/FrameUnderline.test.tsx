/* eslint-env jest */

import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { ArwesThemeProvider } from '../ArwesThemeProvider';
import { FrameUnderline } from './index';

afterEach(cleanup);

test('Should render <FrameSVG/> component with children elements', () => {
  const { container } = render(
    <ArwesThemeProvider>
      <FrameUnderline>
        Furutistic <b>Sci-Fi</b> UI <i>Web</i> Framework
      </FrameUnderline>
    </ArwesThemeProvider>
  );
  const element = container.firstChild as HTMLElement;
  expect(element.tagName).toBe('DIV');
  expect(element.classList.contains('arwes-frame-svg')).toBeTruthy();
  expect(element.classList.contains('arwes-frame-underline')).toBeTruthy();

  const content = container.querySelector('.arwes-frame-svg__content');
  expect(content?.innerHTML).toBe('Furutistic <b>Sci-Fi</b> UI <i>Web</i> Framework');
});
