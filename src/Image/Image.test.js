import React from 'react';
import testSetup from '../setup.test.js';
import Image from './Image';

const { mount } = testSetup(Image);

describe('Image', function () {

  it('Should render without crashing', function () {
    mount({
      Animation: ({ children }) => children({}),
      Frame: ({ children }) => <div>{children}</div>,
      Loading: ({ children }) => <div>{children}</div>,
      resources: '/static/img/wallpaper.jpg'
    });
  });

});
