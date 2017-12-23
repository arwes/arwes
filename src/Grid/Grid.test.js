import React from 'react';
import testSetup from '../setup.test.js';
import Grid from './Grid';

const { mount } = testSetup(Grid);

describe('Grid', function () {

  it('Should render without crashing', function () {
    mount();
  });

});
