import React from 'react';
import testSetup from '../test-setup';
import Button from './index';

const { mount } = testSetup(Button);

describe('Button', function () {

  it('Should render without crashing', function () {
    mount();
  });

});
