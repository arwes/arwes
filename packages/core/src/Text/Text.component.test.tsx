/* eslint-env jest */

import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { Text } from './Text.component';

afterEach(cleanup);

test('Should render component classes and content', () => {
  const animator: any = {
    setupAnimateRefs: () => {},
    flow: {}
  };
  const bleeps: any = {};
  const { container } = render(
    <Text animator={animator} bleeps={bleeps}>
      Furutistic <b>Sci-Fi</b> UI <i>Web</i> Framework
    </Text>
  );
  const element = container.firstChild as HTMLElement;
  const contentEl = element.firstChild as HTMLElement;
  expect(element.classList.contains('arwes-core-text')).toBeTruthy();
  expect(contentEl.classList.contains('arwes-core-text__content')).toBeTruthy();
  expect(contentEl.innerHTML).toBe('Furutistic <b>Sci-Fi</b> UI <i>Web</i> Framework');
});
