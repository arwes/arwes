import { mapProps, getResponsiveResource } from './index';

describe('Utils', function () {

  describe('mapProps()', function () {

    it('Should return empty object with no params', function () {
      const actual = mapProps();
      expect(actual).to.eql({});
    });

    it('Should return empty object with empty provided object', function () {
      const actual = mapProps({});
      expect(actual).to.eql({});
    });

    it('Should map properties of a plain object', function () {
      const obj = { a: 1, b: 2, c: 3 };
      const map = (name, value) => ({ name: name + 'x', value: value * 10 });
      const actual = mapProps(obj, map);
      const expected = { ax: 10, bx: 20, cx: 30 };
      expect(actual).to.eql(expected);
    });

  });

  describe('getResponsiveResource()', function () {

    it('Should return null when no parameters provided', function () {
      const actual = getResponsiveResource();
      const expected = null;
      expect(actual).to.equal(expected);
    });

    it('Should return resource string when it was the only provided', function () {
      const resource = '/static/img/path.png';
      const actual = getResponsiveResource(resource);
      const expected = resource;
      expect(actual).to.equal(expected);
    });

    it('Should return resource small when responsive is small', function () {
      const resources = { small: '1', medium: '2', large: '3', xlarge: '4' };
      const responsive = { small: 1 };
      const actual = getResponsiveResource(resources, responsive);
      const expected = resources.small;
      expect(actual).to.equal(expected);
    });

    it('Should return resource medium when responsive is medium', function () {
      const resources = { small: '1', medium: '2', large: '3', xlarge: '4' };
      const responsive = { medium: 1 };
      const actual = getResponsiveResource(resources, responsive);
      const expected = resources.medium;
      expect(actual).to.equal(expected);
    });

    it('Should return resource large when responsive is large', function () {
      const resources = { small: '1', medium: '2', large: '3', xlarge: '4' };
      const responsive = { large: 1 };
      const actual = getResponsiveResource(resources, responsive);
      const expected = resources.large;
      expect(actual).to.equal(expected);
    });

    it('Should return resource xlarge when responsive is xlarge', function () {
      const resources = { small: '1', medium: '2', large: '3', xlarge: '4' };
      const responsive = { xlarge: 1 };
      const actual = getResponsiveResource(resources, responsive);
      const expected = resources.xlarge;
      expect(actual).to.equal(expected);
    });

  });

});
