import React from 'react';
import testSetup from '../setup.test.js';
import Table from './Table';

const { mount } = testSetup(Table);

describe('Table', function () {

  it('Should render without crashing', function () {
    mount({
      Animation: ({ children }) => children({})
    });
  });

});
