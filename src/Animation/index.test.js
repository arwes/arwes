import React from 'react';
import testSetup from '../test-setup';
import Animation from './index';

const { mount } = testSetup(Animation);

describe('Animation', function () {

  it('Should render without crashing', function () {
    mount(null, () => <div />);
  });

});
