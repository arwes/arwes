import React from 'react';
import testSetup from '../test-setup';
import Highlight from './Highlight';

const { mount } = testSetup(Highlight);

describe('Highlight', function () {

  it('Should render without crashing', function () {
    mount();
  });

});
