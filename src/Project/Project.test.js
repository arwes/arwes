import React from 'react';
import testSetup from '../setup.test.js';
import Project from './Project';

const { mount } = testSetup(Project);

describe('Project', function () {

  it('Should render without crashing', function () {
    mount({
      Animation: ({ children }) => children({}),
      Frame: ({ children }) => <div>{children}</div>,
      Words: ({ children }) => <div>{children}</div>,
      Heading: ({ children }) => <div>{children}</div>,
      header: 'Header',
    }, 'Children');
  });

});
