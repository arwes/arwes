import React from 'react';
import testSetup from '../setup.test.js';
import Header from './Header';

const { mount } = testSetup(Header);

describe('Header', function () {

  it('Should render without crashing', function () {
    mount({
      Animation: ({ children }) => children({})
    });
  });

});
