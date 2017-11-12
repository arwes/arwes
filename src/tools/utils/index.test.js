import { mapProps } from './index';

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
});
