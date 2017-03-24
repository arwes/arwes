import React from 'react';
import { shallow } from 'enzyme';
import Button from './index';

const shallowEl = (props, children) => (
  shallow(<Button {...props}>{children}</Button>)
);

describe('Components', function () {
  describe('Button', function () {

    it('Element is "button.button"', function () {
      const el = shallowEl();
      expect(el.is('button.button')).to.be.true;
    });

  });
});
