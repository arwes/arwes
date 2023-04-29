/* eslint-env jest */

import { formatFrameSVGPath } from './formatFrameSVGPath';

test('Should format single absolute values', () => {
  const path = formatFrameSVGPath(100, 1000, [
    ['M', 10, 10],
    ['L', 50, 50]
  ]);
  expect(path).toBe('M 10,10 L 50,50');
});

test('Should format single percentage values', () => {
  const path = formatFrameSVGPath(100, 1000, [
    ['M', '100% - 20', 10],
    ['L', 50, '50% + 20']
  ]);
  expect(path).toBe('M 80,10 L 50,520');
});

test('Should format value with multiple calculations', () => {
  const path = formatFrameSVGPath(100, 1000, [
    ['M', '50% + 10 - 5 + 25%', '- 10 - 15% + 50']
  ]);
  expect(path).toBe('M 80,-110');
});

describe('One dimension commands', () => {
  test('Should format "H" command of horizontal dimension', () => {
    const path = formatFrameSVGPath(100, 1000, [
      ['H', 10],
      ['H', '10% + 2']
    ]);
    expect(path).toBe('H 10 H 12');
  });

  test('Should format "h" command of horizontal dimension', () => {
    const path = formatFrameSVGPath(100, 1000, [
      ['h', 10],
      ['h', '10% + 2']
    ]);
    expect(path).toBe('h 10 h 12');
  });

  test('Should format "V" command of vertical dimension', () => {
    const path = formatFrameSVGPath(100, 1000, [
      ['V', 10],
      ['V', '10% + 2']
    ]);
    expect(path).toBe('V 10 V 102');
  });

  test('Should format "v" command of vertical dimension', () => {
    const path = formatFrameSVGPath(100, 1000, [
      ['v', 10],
      ['v', '10% + 2']
    ]);
    expect(path).toBe('v 10 v 102');
  });
});

describe('Multiple (x,y)+ dimension commands', () => {
  (['M', 'm', 'L', 'l', 'T', 't'] as const).forEach(commandName => {
    test(`Should format "${commandName}" command of 2 dimensions`, () => {
      const path = formatFrameSVGPath(100, 1000, [
        [commandName, '100% - 20', 10],
        [commandName, 50, '50% + 20']
      ]);
      expect(path).toBe(`${commandName} 80,10 ${commandName} 50,520`);
    });
  });

  (['S', 's', 'Q', 'q'] as const).forEach(commandName => {
    test(`Should format "${commandName}" command of 4 dimensions`, () => {
      const path = formatFrameSVGPath(100, 1000, [
        [commandName, '100% - 20', 10, 50, '50% + 20']
      ]);
      expect(path).toBe(`${commandName} 80,10,50,520`);
    });
  });

  (['C', 'c'] as const).forEach(commandName => {
    test(`Should format "${commandName}" command of 6 dimensions`, () => {
      const path = formatFrameSVGPath(100, 1000, [
        [commandName, 1, '2', '100% - 3', '100% + 4', 5, '100% - 6']
      ]);
      expect(path).toBe(`${commandName} 1,2,97,1004,5,994`);
    });
  });
});

describe('Elliptical Arc Curve commands', () => {
  (['A', 'a'] as const).forEach(commandName => {
    test(`Should format "${commandName}" command`, () => {
      const path = formatFrameSVGPath(100, 1000, [
        [commandName, '10% + 2', '10% - 2', 45, 1, 0, '10% + 2', '10% - 2']
      ]);
      expect(path).toBe(`${commandName} 12,98,45,1,0,12,98`);
    });
  });
});

describe('No parameters commands', () => {
  test('Should format "Z", "z" commands', () => {
    const path = formatFrameSVGPath(100, 1000, [
      'Z',
      'z'
    ]);
    expect(path).toBe('Z z');
  });
});
