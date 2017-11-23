import React from 'react';
import testSetup from '../test-setup';
import Puffs from './Puffs';

const { mount } = testSetup(Puffs);

describe('Puffs', function () {

  it('Should render without crashing', function () {
    mount();
  });

});
