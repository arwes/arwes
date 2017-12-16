import React from 'react';
import testSetup from '../test-setup';
import Logo from './Logo';

const { mount } = testSetup(Logo);

describe('Logo', function () {

  it('Should render without crashing', function () {
    mount({
      Animation: ({ children }) => children({})
    });
  });

});
