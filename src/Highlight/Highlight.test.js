import React from 'react';
import testSetup from '../setup.test.js';
import Highlight from './Highlight';

const { mount } = testSetup(Highlight);

describe('Highlight', function () {

  it('Should render without crashing', function () {
    mount();
  });

});
