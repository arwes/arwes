/* eslint-env jest */

import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { ArwesThemeProvider } from '../ArwesThemeProvider';
import { Button } from './index';

afterEach(cleanup);

test('Should render button element with content children', () => {
  const { container } = render(
    <ArwesThemeProvider>
      <Button>
        <b>Arwes</b>
      </Button>
    </ArwesThemeProvider>
  );
  const element = container.firstChild as HTMLElement;
  expect(element.tagName).toBe('BUTTON');
  expect(element.classList.contains('arwes-button')).toBeTruthy();

  const content = container.querySelector('.arwes-frame-svg__content');
  expect(content?.innerHTML).toBe('<b>Arwes</b>');
});

test('Should support custom frame components', () => {
  interface CustomFrameProps {
    children?: React.ReactNode
  }
  const CustomFrame = (props: CustomFrameProps): React.ReactElement => {
    return <article className='custom-frame'>{props.children}</article>;
  };
  const { container } = render(
    <ArwesThemeProvider>
      <Button FrameComponent={CustomFrame}>
        <b>Arwes</b>
      </Button>
    </ArwesThemeProvider>
  );
  const element = container.firstChild as HTMLElement;
  expect(element.tagName).toBe('ARTICLE');
  expect(element.classList.contains('custom-frame')).toBeTruthy();
  expect(element?.innerHTML).toBe('<b>Arwes</b>');
});
