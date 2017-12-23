import React from 'react';
import testSetup from '../setup.test.js';
import Frame from './Frame';

const { mount } = testSetup(Frame);

describe('Frame', function () {

  it('Should render without crashing', function () {
    mount({
      Animation: ({ children }) => children({})
    });
  });

});
