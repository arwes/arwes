/* eslint-env jest */

import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { Text } from './Text.component';

afterEach(cleanup);

test('Should render component classes and content with default "span" element', () => {
  const animator: any = {
    setupAnimateRefs: () => {},
    flow: {}
  };
  const { container } = render(
    <Text animator={animator}>
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

test.todo('Should allow to set custom element');

test.todo('Should set animate refs with animation state values and bleeps ref');

test.todo('Should set actual children element opacity as 0 when animated');

test.todo('Should set actual children element opacity as empty when not animated');

test.todo('Should create blink element when animated');

test.todo('Should set dynamic duration based on children text length when enabled');

test.todo('Should start text animation when animator ENTERED and children text changes');
