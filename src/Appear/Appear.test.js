import React from 'react';
import testSetup from '../setup.test.js';
import Appear from './Appear';

const { mount } = testSetup(Appear);

describe('Appear', function () {

  it('Should render without crashing', function () {
    mount({
      Animation: ({ children }) => children({})
    });
  });

});
