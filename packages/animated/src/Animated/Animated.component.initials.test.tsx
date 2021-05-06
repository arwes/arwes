/* eslint-env jest */

import React, { SVGProps } from 'react';
import { render, cleanup } from '@testing-library/react';
import { Animator } from '@arwes/animator';

import { Animated } from './Animated.component';

afterEach(cleanup);

test('Should add "animated.initialAttributes" and "animated.initialStyles" if Animator is animated', () => {
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

test('Should not add "animated.initialAttributes" nor "animated.initialStyles" if Animator is not animated', () => {
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

describe('Transform Distance Shorthands', () => {
  [
    'translateX',
    'translateY',
    'translateZ',
    'perspective'
  ].forEach(transformName => {
    test(`Should support "animated.initialStyles" CSS transform "${transformName}" property as distance shorthard with default unit "px"`, () => {
      const { container } = render(
        <Animator>
          <Animated animated={{
            initialStyles: { [transformName]: 10 }
          }} />
        </Animator>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.style.transform).toBe(`${transformName}(10px)`);
    });

    test(`Should support "animated.initialStyles" CSS transform "${transformName}" property as distance shorthard with provided value`, () => {
      const { container } = render(
        <Animator>
          <Animated animated={{
            initialStyles: { [transformName]: '7em' }
          }} />
        </Animator>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.style.transform).toBe(`${transformName}(7em)`);
    });
  });
});

describe('Transform Angle Shorthands', () => {
  [
    'rotate',
    'rotateX',
    'rotateY',
    'rotateZ',
    'skew',
    'skewX',
    'skewY'
  ].forEach(transformName => {
    test(`Should support "animated.initialStyles" CSS transform "${transformName}" property as angle shorthard with default unit "deg"`, () => {
      const { container } = render(
        <Animator>
          <Animated animated={{
            initialStyles: { [transformName]: 10 }
          }} />
        </Animator>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.style.transform).toBe(`${transformName}(10deg)`);
    });

    test(`Should support "animated.initialStyles" CSS transform "${transformName}" property as angle shorthard with provided value`, () => {
      const { container } = render(
        <Animator>
          <Animated animated={{
            initialStyles: { [transformName]: '7deg' }
          }} />
        </Animator>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.style.transform).toBe(`${transformName}(7deg)`);
    });
  });
});

describe('Transform Unitless Shorthands', () => {
  [
    'scale',
    'scaleX',
    'scaleY',
    'scaleZ'
  ].forEach(transformName => {
    test(`Should support "animated.initialStyles" CSS transform "${transformName}" property as unitless shorthard with numeric value`, () => {
      const { container } = render(
        <Animator>
          <Animated animated={{
            initialStyles: { [transformName]: 71.9 }
          }} />
        </Animator>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.style.transform).toBe(`${transformName}(71.9)`);
    });

    test(`Should support "animated.initialStyles" CSS transform "${transformName}" property as unitless shorthard with string value`, () => {
      const { container } = render(
        <Animator>
          <Animated animated={{
            initialStyles: { [transformName]: '27.5' }
          }} />
        </Animator>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.style.transform).toBe(`${transformName}(27.5)`);
    });
  });
});

test('Should support "animated.initialStyles" CSS transform shorthands and multiple props', () => {
  const { container } = render(
    <Animator>
      <Animated animated={{
        initialStyles: {
          translateX: 28,
          skew: '13turn',
          scaleY: 1.2,
          color: 'blue',
          fontSize: 27
        }
      }} />
    </Animator>
  );
  const element = container.firstChild as HTMLElement;
  expect(element.style.transform).toBe('translateX(28px) skew(13turn) scaleY(1.2)');
  expect(element.style.color).toBe('blue');
  expect(element.style.fontSize).toBe('27px');
});

test('Should ignore "animated.initialStyles" CSS "transform" prop when transform shorthands', () => {
  const { container } = render(
    <Animator>
      <Animated animated={{
        initialStyles: {
          translateY: 12,
          transform: 'scale(2.5)'
        }
      }} />
    </Animator>
  );
  const element = container.firstChild as HTMLElement;
  expect(element.style.transform).toBe('translateY(12px)');
});

test('Should support "animated.initialStyles" CSS transform prop with no shorthands', () => {
  const { container } = render(
    <Animator>
      <Animated animated={{
        initialStyles: {
          transform: 'scaleX(0.8) translateX(20px)'
        }
      }} />
    </Animator>
  );
  const element = container.firstChild as HTMLElement;
  expect(element.style.transform).toBe('scaleX(0.8) translateX(20px)');
});
