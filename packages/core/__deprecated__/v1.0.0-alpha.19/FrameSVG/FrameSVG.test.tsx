/* eslint-env jest */

import React, { HTMLProps } from 'react';
import { render, cleanup } from '@testing-library/react';
import { ArwesThemeProvider } from '../ArwesThemeProvider';

import { FrameSVG } from './index';

afterEach(cleanup);

test('Should render component classes, children, and content with default "DIV" elements', () => {
  const { container } = render(
    <ArwesThemeProvider>
      <FrameSVG>
        Arwes!
      </FrameSVG>
    </ArwesThemeProvider>
  );
  const element = container.firstChild as HTMLElement;
  const structureEl = element.children[0] as HTMLElement;
  const contentEl = element.children[1] as HTMLElement;
  expect(element.classList.contains('arwes-frame-svg')).toBeTruthy();
  expect(element.tagName).toBe('DIV');
  expect(structureEl.classList.contains('arwes-frame-svg__structure')).toBeTruthy();
  expect(contentEl.classList.contains('arwes-frame-svg__content')).toBeTruthy();
  expect(contentEl.innerHTML).toBe('Arwes!');
});

test('Should allow to set custom element', () => {
  const { container } = render(
    <ArwesThemeProvider>
      <FrameSVG<HTMLAnchorElement, HTMLProps<HTMLAnchorElement>>
        as='a'
        href='https://arwes.dev'
      >
        Arwes!
      </FrameSVG>
    </ArwesThemeProvider>
  );
  const element = container.firstChild as HTMLElement;
  expect(element.tagName).toBe('A');
  expect(element.getAttribute('href')).toBe('https://arwes.dev');
});
