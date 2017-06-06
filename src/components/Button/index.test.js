import React from 'react';
import { shallow } from 'enzyme';
import Button from './index';

const shallowEl = (props, children) => (
  shallow(<Button {...props}>{children}</Button>)
);

describe('Components', function () {
  describe('Button', function () {

    it('Element is "button.arwes-button"', function () {
      const el = shallowEl();
      expect(el.is('button.arwes-button')).to.be.true;
    });

  });
});
