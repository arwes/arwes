import React from 'react';
import testSetup from '../setup.test.js';
import Arwes from './Arwes';

const { mount } = testSetup(Arwes);

describe('Arwes', function () {

  it('Should render without crashing', function () {
    mount({
      Animation: ({ children }) => children({}),
      Puffs: ({ children }) => <div>{children}</div>,
    });
  });

});
