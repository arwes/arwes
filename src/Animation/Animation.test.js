import React from 'react';
import testSetup from '../setup.test.js';
import Animation from './Animation';

const { mount } = testSetup(Animation);

describe('Animation', function () {

  it('Should render without crashing', function () {
    mount(null, () => <div />);
  });

});
