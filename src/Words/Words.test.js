import React from 'react';
import testSetup from '../test-setup';
import Words from './Words';

const { mount } = testSetup(Words);

describe('Words', function () {

  it('Should render without crashing', function () {
    mount({}, 'Random text');
  });

});
