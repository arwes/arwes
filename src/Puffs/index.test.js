import React from 'react';
import testSetup from '../test-setup';
import Puffs from './index';

const { mount } = testSetup(Puffs);

describe('Puffs', function () {

  it('Should render without crashing', function () {
    mount();
  });

});
