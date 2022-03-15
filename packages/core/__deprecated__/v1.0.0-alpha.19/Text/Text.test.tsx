/* eslint-env jest */

import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { Text } from './index';

afterEach(cleanup);

test('Should render component classes and content with default "span" element', () => {
  const { container } = render(
    <Text>
      Furutistic <b>Sci-Fi</b> UI <i>Web</i> Framework
    </Text>
  );
  const element = container.firstChild as HTMLElement;
  const contentEl = element.firstChild as HTMLElement;
  expect(element.classList.contains('arwes-text')).toBeTruthy();
  expect(element.tagName).toBe('SPAN');
  expect(contentEl.classList.contains('arwes-text__content')).toBeTruthy();
  expect(contentEl.innerHTML).toBe('Furutistic <b>Sci-Fi</b> UI <i>Web</i> Framework');
});

test('Should allow to set custom element', () => {
  const { container } = render(
    <Text
      as='a'
      href='https://arwes.dev'
      target='arwes'
    >
      Arwes
    </Text>
  );
  const element = container.firstChild as HTMLElement;
  expect(element.tagName).toBe('A');
  expect(element.getAttribute('href')).toBe('https://arwes.dev');
  expect(element.getAttribute('target')).toBe('arwes');
});

test.todo('Should set animate refs with animation state values and bleeps ref');

test.todo('Should set actual children element opacity as 0 when animated');

test.todo('Should set actual children element opacity as empty when not animated');

test.todo('Should create blink element when animated');

test.todo('Should set dynamic duration based on children text length when enabled');

test.todo('Should start text animation when animator ENTERED and children text changes');
