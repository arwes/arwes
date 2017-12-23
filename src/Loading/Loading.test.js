import React from 'react';
import testSetup from '../setup.test.js';
import Loading from './Loading';

const { mount } = testSetup(Loading);

describe('Loading', function () {

  it('Should render without crashing', function () {
    mount({
      Animation: ({ children }) => children({})
    });
  });

});
