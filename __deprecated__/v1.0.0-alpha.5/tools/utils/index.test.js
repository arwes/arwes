/* eslint-env jest */

import { mapProps, getResponsiveResource } from './index';

describe('Utils', () => {
  describe('mapProps()', () => {
    test('Should return empty object with no params', () => {
      const actual = mapProps();
      expect(actual).toEqual({});
    });

    test('Should return empty object with empty provided object', () => {
      const actual = mapProps({});
      expect(actual).toEqual({});
    });

    test('Should map properties of a plain object', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const map = (name, value) => ({ name: name + 'x', value: value * 10 });
      const actual = mapProps(obj, map);
      const expected = { ax: 10, bx: 20, cx: 30 };
      expect(actual).toEqual(expected);
    });
  });

  describe('getResponsiveResource()', () => {
    test('Should return null when no parameters provided', () => {
      const actual = getResponsiveResource();
      const expected = null;
      expect(actual).toBe(expected);
    });

    test('Should return resource string when it was the only provided', () => {
      const resource = '/static/images/path.png';
      const actual = getResponsiveResource(resource);
      const expected = resource;
      expect(actual).toBe(expected);
    });

    test('Should return resource small when responsive is small', () => {
      const resources = { small: '1', medium: '2', large: '3', xlarge: '4' };
      const responsive = { small: 1 };
      const actual = getResponsiveResource(resources, responsive);
      const expected = resources.small;
      expect(actual).toBe(expected);
    });

    test('Should return resource medium when responsive is medium', () => {
      const resources = { small: '1', medium: '2', large: '3', xlarge: '4' };
      const responsive = { medium: 1 };
      const actual = getResponsiveResource(resources, responsive);
      const expected = resources.medium;
      expect(actual).toBe(expected);
    });

    test('Should return resource large when responsive is large', () => {
      const resources = { small: '1', medium: '2', large: '3', xlarge: '4' };
      const responsive = { large: 1 };
      const actual = getResponsiveResource(resources, responsive);
      const expected = resources.large;
      expect(actual).toBe(expected);
    });

    test('Should return resource xlarge when responsive is xlarge', () => {
      const resources = { small: '1', medium: '2', large: '3', xlarge: '4' };
      const responsive = { xlarge: 1 };
      const actual = getResponsiveResource(resources, responsive);
      const expected = resources.xlarge;
      expect(actual).toBe(expected);
    });
  });
});
