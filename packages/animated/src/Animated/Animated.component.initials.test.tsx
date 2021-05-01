/* eslint-env jest */

import React, { SVGProps } from 'react';
import { render, cleanup } from '@testing-library/react';
import { Animator } from '@arwes/animator';

import { Animated } from './Animated.component';

afterEach(cleanup);

test('Should add "animated.initialAttributes" and "animated.initialStyles" if animator is animated', () => {
  const { container } = render(
    <Animator>
      <Animated<SVGPathElement, SVGProps<SVGPathElement>>
        animated={{
          initialAttributes: { fill: 'blue' },
          initialStyles: { color: 'red' }
        }}
      >
        Hello!
      </Animated>
    </Animator>
  );
  const element = container.firstChild as SVGPathElement;
  expect(element.getAttribute('fill')).toBe('blue');
  expect(element.style.color).toBe('red');
});

// TODO: Similar as "animejs" does it.
test.todo('Should add "animated.initialStyles" transform shorthards values');

test('Should not add "animated.initialAttributes" nor "animated.initialStyles" if animator is not animated', () => {
  const { container } = render(
    <Animator animator={{ animate: false }}>
      <Animated<SVGPathElement, SVGProps<SVGPathElement>>
        animated={{
          initialAttributes: { fill: 'blue' },
          initialStyles: { color: 'red' }
        }}
      >
        Hello!
      </Animated>
    </Animator>
  );
  const element = container.firstChild as SVGPathElement;
  expect(element.getAttribute('fill')).toBeNull();
  expect(element.style.color).toBe('');
});
