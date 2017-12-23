import React from 'react';
import testSetup from '../setup.test.js';
import Line from './Line';

const { mount } = testSetup(Line);

describe('Line', function () {

  it('Should render without crashing', function () {
    mount({
      Animation: ({ children }) => children({})
    });
  });

});
