import React from 'react';
import testSetup from '../test-setup';
import Button from './Button';

const { mount } = testSetup(Button);

describe('Button', function () {

  it('Should render without crashing', function () {
    mount({
      Animation: ({ children }) => children({}),
      Highlight: ({ children }) => <div>{children}</div>,
      Frame: ({ children }) => <div>{children}</div>,
    });
  });

});
