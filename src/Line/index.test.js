import React from 'react';
import testSetup from '../test-setup';
import Line from './index';

const { mount } = testSetup(Line);

describe('Line', function () {

  it('Should render without crashing', function () {
    mount();
  });

});
