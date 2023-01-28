/* eslint-env jest */

import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { Text } from './index';

afterEach(cleanup);

test('Should render component classes and content with default "span" element', () => {
  const { container } = render(
    <Text>Furutistic Sci-Fi UI Web Framework</Text>
  );
  const element = container.firstChild as HTMLElement;
  const contentEl = element.firstChild as HTMLElement;
  expect(element.classList.contains('arwes_react-text_Text')).toBeTruthy();
  expect(element.tagName).toBe('SPAN');
  expect(contentEl.classList.contains('arwes_react-text_Text__content')).toBeTruthy();
  expect(contentEl.innerHTML).toBe('Furutistic Sci-Fi UI Web Framework');
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
