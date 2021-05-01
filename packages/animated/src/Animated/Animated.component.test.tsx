/* eslint-env jest */

import React, { HTMLProps, SVGProps } from 'react';
import { render, cleanup } from '@testing-library/react';
import { Animator } from '@arwes/animator';

import { Animated } from './Animated.component';

afterEach(cleanup);

test('Should render DIV element content by default', () => {
  const { container } = render(
    <Animator>
      <Animated className='hello'>
        Hello!
      </Animated>
    </Animator>
  );
  expect(container.innerHTML).toBe('<div class="hello">Hello!</div>');
});

test('Should render custom HTML element content', () => {
  const { container } = render(
    <Animator>
      <Animated<HTMLAnchorElement, HTMLProps<HTMLAnchorElement>>
        as='a'
        href='#'
        download
      >
        Hello!
      </Animated>
    </Animator>
  );
  expect(container.innerHTML).toBe('<a href="#" download="">Hello!</a>');
});

test('Should render custom SVG element content', () => {
  const { container } = render(
    <Animator>
      <svg>
        <Animated<SVGPathElement, SVGProps<SVGPathElement>>
          as='path'
          d='M0,0'
        >
          Hello!
        </Animated>
      </svg>
    </Animator>
  );
  expect(container.innerHTML).toBe('<svg><path d="M0,0">Hello!</path></svg>');
});

test.todo('Should get HTML/SVG element reference with "rootRef" prop');

test('Should throw error if no parent <Animator/> is found', () => {
  const consoleError = jest.spyOn(console, 'error').mockImplementation();

  let catchedError: any;
  class Catcher extends React.Component {
    render (): React.ReactNode {
      return this.props.children;
    }

    componentDidCatch (err: Error): void {
      catchedError = err;
    }
  }
  render(<Catcher><Animated /></Catcher>);
  expect(catchedError).not.toBeUndefined();
  expect(catchedError.message).toBe('Animated component can only be used inside an Animator.');

  consoleError.mockRestore();
});
