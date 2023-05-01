/* eslint-env jest */

import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { Text } from './index';

afterEach(cleanup);

test('Should render component classes and content with default "p" element', () => {
  const { container } = render(
    <Text>Furutistic <b>Sci-Fi</b> UI Web Framework</Text>
  );
  const element = container.firstChild as HTMLElement;
  const contentEl = element.firstChild as HTMLElement;
  expect(element.classList.contains('arwes-react-text-text')).toBeTruthy();
  expect(element.tagName).toBe('P');
  expect(contentEl.classList.contains('arwes-react-text-text__content')).toBeTruthy();
  expect(contentEl.innerHTML).toBe('Furutistic <b>Sci-Fi</b> UI Web Framework');
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
