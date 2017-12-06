import React from 'react';
import testSetup from '../test-setup';
import Code from './Code';

const { mount } = testSetup(Code);

describe('Code', function () {

  it('Should render without crashing', function () {
    mount();
  });

});
