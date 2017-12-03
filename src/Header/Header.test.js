import React from 'react';
import testSetup from '../test-setup';
import Header from './Header';

const { mount } = testSetup(Header);

describe('Header', function () {

  it('Should render without crashing', function () {
    mount({
      Animation: ({ children }) => children({})
    });
  });

});
