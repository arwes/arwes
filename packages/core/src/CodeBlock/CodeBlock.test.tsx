/* eslint-env jest */

import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { ArwesThemeProvider } from '../ArwesThemeProvider';
import { CodeBlock } from './index';

afterEach(cleanup);

test('Should render element with code as <Text/> content', () => {
  const { container } = render(
    <ArwesThemeProvider>
      <CodeBlock>
        const value: number = 100;
      </CodeBlock>
    </ArwesThemeProvider>
  );
  const element = container.firstChild as HTMLElement;
  expect(element.tagName).toBe('DIV');
  expect(element.classList.contains('arwes-code-block')).toBeTruthy();

  const content = container.querySelector('.arwes-code-block__content .arwes-text__content');
  expect(content?.innerHTML).toBe('const value: number = 100;');
});
