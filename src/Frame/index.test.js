import React from 'react';
import testSetup from '../test-setup';
import Frame from './index';

const { mount } = testSetup(Frame);

describe('Frame', function () {

  it('Should render without crashing', function () {
    mount();
  });

});
