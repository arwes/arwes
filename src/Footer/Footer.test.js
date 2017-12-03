import React from 'react';
import testSetup from '../test-setup';
import Footer from './Footer';

const { mount } = testSetup(Footer);

describe('Footer', function () {

  it('Should render without crashing', function () {
    mount({
      Animation: ({ children }) => children({})
    });
  });

});
